from django.conf import settings
from django.db import transaction
from django.http import HttpResponse, JsonResponse
from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
import datetime

from .models import ChatbotUser, InteractionLog, PresetState
from .serializers import ModeDispatchSerializer, WhatsAppWebhookPayloadSerializer
from .faq_data import FAQ_CONTENT  # <--- INI IMPORT YANG SEBELUMNYA HILANG
from .services import (
    ExternalAIServiceError,
    InputValidationError,
    ask_external_ai,
    extract_whatsapp_message,
    generate_ics_payload,
    get_period_end_date,
    normalize_yes_no,
    parse_ddmmyyyy,
    parse_hour_24,
    parse_webhook_mode_and_message,
    send_whatsapp_message, 
    send_whatsapp_document
)
from .utils import log_interaction

RESET_COMMANDS = {"reset", "restart", "menu", "kembali", "halo", "hi", "p", "ping", "hai", "mulai"}
RESET_HINT_MESSAGE = "Kamu sudah 3x salah input. Untuk kembali ke awal, ketik 'menu'."

def reset_preset_user(user: ChatbotUser):
    user.preset_state = PresetState.NOT_STARTED
    user.invalid_input_count = 0
    user.is_currently_menstruating = None
    user.last_period_start_date = None
    user.period_end_date = None
    user.has_ttd_pill = None
    user.reminder_hour_24 = None
    # Reset field baru untuk menu
    user.persona = None
    user.selected_topic = None
    user.save()

def handle_ai_qna(user_id: str, prompt: str, endpoint_name: str):
    user, _ = ChatbotUser.objects.get_or_create(user_id=user_id)
    try:
        answer = ask_external_ai(prompt)
    except ExternalAIServiceError as exc:
        log_interaction(user=user, user_id=user_id, mode=InteractionLog.MODE_AI_QNA, endpoint=endpoint_name, user_message=prompt, bot_response=str(exc), status=InteractionLog.STATUS_ERROR)
        return Response({"error": str(exc)}, status=status.HTTP_502_BAD_GATEWAY)

    log_interaction(user=user, user_id=user_id, mode=InteractionLog.MODE_AI_QNA, endpoint=endpoint_name, user_message=prompt, bot_response=answer, status=InteractionLog.STATUS_SUCCESS)
    return Response({"mode": "ai_qna", "response": answer}, status=status.HTTP_200_OK)


def advance_preset_flow(user: ChatbotUser, message: str):
    # 1. STATE AWAL: Tanyakan Persona
    if user.preset_state in {PresetState.NOT_STARTED, PresetState.COMPLETED}:
        user.preset_state = PresetState.AWAITING_PERSONA
        user.save()
        return {
            "mode": "preset_interaction",
            "state": user.preset_state,
            "response": "Halo! 👋 \n\nAku REDBOT, asisten virtual kamu untuk mencari informasi seputar kesehatan reproduksi.\nREDBOT adalah inovasi teknologi kesehatan dari RED Project Indonesia yang dirancang untuk membantu ibu hamil dan remaja putri mendapatkan informasi kesehatan, khususnya tentang anemia. Di sini, kamu bisa mengakses berbagai fitur sesuai kebutuhanmu.\n\nUntuk remaja putri, tersedia pengingat Tablet Tambah Darah (TTD), kalender menstruasi, serta FAQ untuk mencari informasi kesehatan lainnya. Sedangkan untuk ibu hamil, tersedia FAQ seputar kesehatan dan juga bisa mengajukan pertanyaan, lo!\n\nYuk, kita mulai!\nSebelumnya, siapakah kamu?\n1. Ibu hamil🤰\n2. Remaja putri👧"
        }

    # 2. STATE: Memilih Persona
    if user.preset_state == PresetState.AWAITING_PERSONA:
        if message == '1':
            user.persona = 'ibu_hamil'
            user.preset_state = PresetState.AWAITING_TOPIC
            user.save()
            return {
                "mode": "preset_interaction",
                "state": user.preset_state,
                "response": "Halo, Moms!💐\n\nSelamat menjalani masa kehamilan, ya. Masa ini tentu tidak selalu mudah. Oleh karena itu, aku hadir untuk mendampingi dan membantu menemukan informasi yang Moms butuhkan, mulai dari anemia, Tablet Tambah Darah (TTD), Multiple Micronutrient Supplement (MMS), hingga kesehatan kehamilan lainnya.\n\nHari ini mau tahu tentang apa, nih, Moms?\n1. Anemia🩸\n2. Tablet Tambah Darah (TTD)/Multiple Micronutrient Supplement (MMS)💊\n3. Umum📚\n4. Lainnya🔍"
            }
        elif message == '2':
            # Sesuai Master Docs, fitur Rematri dinonaktifkan
            reset_preset_user(user)
            return {
                "mode": "preset_interaction",
                "state": user.preset_state,
                "response": "Maaf, ya, untuk saat ini fitur remaja putri belum bisa diakses.😊🙏"
            }
        else:
            raise InputValidationError("Pilihan tidak valid. Silakan balas dengan angka 1 (Ibu hamil) atau 2 (Remaja putri).")

    # 3. STATE: Memilih Topik FAQ (Ibu Hamil)
    if user.preset_state == PresetState.AWAITING_TOPIC:
        topic_map = {'1': 'anemia', '2': 'ttd', '3': 'umum'}
        if message in topic_map:
            topic_key = topic_map[message]
            topic_data = FAQ_CONTENT.get(topic_key)
            user.selected_topic = topic_key
            user.preset_state = PresetState.AWAITING_FAQ_QUESTION
            user.save()
            
            # Buat list pertanyaan dinamis
            text_response = f"Yuk, kita cari tahu pertanyaan-pertanyaan yang sering muncul seputar {topic_data['title']}, Moms!🩸\n\nBerikut beberapa pertanyaan yang bisa dipilih:\n"
            for i, q_item in enumerate(topic_data['questions'], 1):
                text_response += f"{i}. {q_item['q']}\n"
            
            next_idx = len(topic_data['questions']) + 1
            text_response += f"{next_idx}. lainnya\n{next_idx + 1}. kembali ke menu topik"
            
            return {"mode": "preset_interaction", "state": user.preset_state, "response": text_response}
            
        elif message == '4':
            user.preset_state = PresetState.AWAITING_MANUAL_QUESTION
            user.save()
            return {"mode": "preset_interaction", "state": user.preset_state, "response": "Silakan tulis pertanyaannya, Moms!"}
        else:
            raise InputValidationError("Pilihan tidak valid. Silakan ketik angka 1, 2, 3, atau 4.")

    # 4. STATE: Memilih Nomor Pertanyaan FAQ
    if user.preset_state == PresetState.AWAITING_FAQ_QUESTION:
        topic_key = user.selected_topic
        topic_data = FAQ_CONTENT.get(topic_key)
        try:
            q_idx = int(message) - 1
            total_q = len(topic_data['questions'])
            
            # Jika user memilih "lainnya"
            if q_idx == total_q:
                user.preset_state = PresetState.AWAITING_MANUAL_QUESTION
                user.save()
                return {"mode": "preset_interaction", "state": user.preset_state, "response": "Silakan tulis pertanyaannya, Moms!"}
            
            # Jika user memilih "kembali ke menu topik"
            elif q_idx == total_q + 1:
                user.preset_state = PresetState.AWAITING_TOPIC
                user.save()
                return {"mode": "preset_interaction", "state": user.preset_state, "response": "Hari ini mau tahu tentang apa, nih, Moms?\n1. Anemia\n2. Tablet Tambah Darah (TTD)/Multiple Micronutrient Supplement (MMS)\n3. Umum\n4. Lainnya"}
            
            if q_idx < 0 or q_idx >= total_q:
                raise ValueError()
            
            answer = topic_data['questions'][q_idx]['a']
            
            user.preset_state = PresetState.AWAITING_ASK_MORE
            user.save()
            return {
                "mode": "preset_interaction", 
                "state": user.preset_state, 
                "response": f"{answer}\n\n---\nGimana, nih, Moms, apakah masih ada pertanyaan lainnya?\n1. Ya✔️\n2. Tidak❌"
            }
        except (ValueError, TypeError):
            raise InputValidationError("Nomor tidak valid. Silakan ketik angka yang sesuai dengan daftar pertanyaan.")

    # 5. STATE: Ya / Tidak (Bertanya Lagi)
    if user.preset_state == PresetState.AWAITING_ASK_MORE:
        if message == '1':
            user.preset_state = PresetState.AWAITING_SAME_OR_OTHER_TOPIC
            user.save()
            topic_title = FAQ_CONTENT.get(user.selected_topic, {}).get("title", "topik ini")
            return {
                "mode": "preset_interaction", 
                "state": user.preset_state, 
                "response": f"Apakah pertanyaannya masih seputar {topic_title} atau ingin membahas topik lainnya, Moms?\n1. Masih seputar {topic_title}🩸\n2. Topik lainnya📚"
            }
        elif message == '2':
            reset_preset_user(user)
            return {"mode": "preset_interaction", "state": user.preset_state, "response": "Terima kasih sudah menggunakan REDBOT, Moms!💝 \n\n Semoga informasi yang diberikan dapat membantu, ya. Sehat selalu Moms, baby, dan keluarga. Kalau butuh informasi lagi, aku siap membantu kapan saja.\n\nSampai jumpa lagi!👋"}
        else:
            raise InputValidationError("Pilihan tidak valid. Ketik 1 untuk Ya, atau 2 untuk Tidak.")

    # 6. STATE: Masih Topik Sama / Topik Lainnya
    if user.preset_state == PresetState.AWAITING_SAME_OR_OTHER_TOPIC:
        if message == '1':
            topic_key = user.selected_topic
            topic_data = FAQ_CONTENT.get(topic_key)
            user.preset_state = PresetState.AWAITING_FAQ_QUESTION
            user.save()

            text_response = f"Yuk, kita cari tahu pertanyaan-pertanyaan yang sering muncul seputar {topic_data['title']}, Moms!\n\nBerikut beberapa pertanyaan yang bisa dipilih:\n"
            for i, q_item in enumerate(topic_data['questions'], 1):
                text_response += f"{i}. {q_item['q']}\n"
            
            next_idx = len(topic_data['questions']) + 1
            text_response += f"{next_idx}. lainnya\n{next_idx + 1}. kembali ke menu topik"

            return {"mode": "preset_interaction", "state": user.preset_state, "response": text_response}
        
        elif message == '2':
            user.preset_state = PresetState.AWAITING_TOPIC
            user.save()
            return {"mode": "preset_interaction", "state": user.preset_state, "response": "Hari ini mau tahu tentang apa, nih, Moms?\n1. Anemia\n2. Tablet Tambah Darah (TTD)/Multiple Micronutrient Supplement (MMS)\n3. Umum\n4. Lainnya"}
        else:
            raise InputValidationError("Pilihan tidak valid. Ketik 1 atau 2.")

    # 7. STATE: Pertanyaan Manual ("Lainnya")
    if user.preset_state == PresetState.AWAITING_MANUAL_QUESTION:
        reset_preset_user(user)
        return {
            "mode": "preset_interaction", 
            "state": user.preset_state, 
            "response": "Terima kasih banyak atas pertanyaannya!\n\nPertanyaan tersebut akan aku teruskan untuk dipelajari lebih lanjut, ya. Jawaban akan diberikan dalam kurun waktu maksimal 7 x 24 jam.\n\nMohon ditunggu, Moms!😊🙏 "
        }

    # Fallback
    reset_preset_user(user)
    return advance_preset_flow(user, "")

def handle_preset_interaction(user_id: str, message: str | None, endpoint_name: str):
    raw_message = (message or "").strip()
    normalized_message = raw_message.lower()

    with transaction.atomic():
        user, _ = ChatbotUser.objects.get_or_create(user_id=user_id)

        # 1. Cek apakah user mengetik perintah reset/sapaan awal
        if normalized_message in RESET_COMMANDS:
            reset_preset_user(user)
            response_payload = advance_preset_flow(user, "")
            log_interaction(user=user, user_id=user_id, mode=InteractionLog.MODE_PRESET, endpoint=endpoint_name, user_message=raw_message, bot_response=response_payload.get("response", ""))
            return Response(response_payload, status=status.HTTP_200_OK)

        # 2. Proses flow normal berdasarkan state
        try:
            response_payload = advance_preset_flow(user, raw_message)
            if user.invalid_input_count != 0:
                user.invalid_input_count = 0
                user.save(update_fields=["invalid_input_count"])
            interaction_status = InteractionLog.STATUS_SUCCESS
        except InputValidationError as exc:
            user.invalid_input_count += 1
            user.save(update_fields=["invalid_input_count"])
            response_payload = {
                "mode": "preset_interaction",
                "state": user.preset_state,
                "error": str(exc),
            }
            if user.invalid_input_count >= 3:
                response_payload["hint"] = RESET_HINT_MESSAGE
                response_payload["error"] = f"{str(exc)}\n\n💡 *Hint:* {RESET_HINT_MESSAGE}"
            interaction_status = InteractionLog.STATUS_ERROR

        log_interaction(user=user, user_id=user_id, mode=InteractionLog.MODE_PRESET, endpoint=endpoint_name, user_message=raw_message, bot_response=response_payload.get("response") or response_payload.get("error", ""), status=interaction_status)
        http_status = status.HTTP_400_BAD_REQUEST if interaction_status == InteractionLog.STATUS_ERROR else status.HTTP_200_OK
        return Response(response_payload, status=http_status)

class ModeDispatchAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    endpoint_name = "mode-dispatch"
    throttle_scope = "chatbot_general"

    def post(self, request):
        serializer = ModeDispatchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        mode = serializer.validated_data["mode"]
        user_id = serializer.validated_data["user_id"]
        if mode == InteractionLog.MODE_AI_QNA:
            prompt = serializer.validated_data.get("prompt", "")
            return handle_ai_qna(user_id=user_id, prompt=prompt, endpoint_name=self.endpoint_name)
        message = serializer.validated_data.get("message")
        return handle_preset_interaction(user_id=user_id, message=message, endpoint_name=self.endpoint_name)

class WhatsAppWebhookAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "whatsapp_webhook"
    endpoint_name = "whatsapp-webhook"

    def get(self, request):
        mode = request.query_params.get("hub.mode")
        verify_token = request.query_params.get("hub.verify_token")
        challenge = request.query_params.get("hub.challenge")
        if mode == "subscribe" and verify_token and verify_token == settings.WHATSAPP_WEBHOOK_VERIFY_TOKEN:
            return HttpResponse(challenge or "", status=status.HTTP_200_OK)
        return Response({"error": "Webhook verification failed."}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request):
        sender = request.data.get("sender")
        message_text = request.data.get("message")

        if not sender or not message_text:
             return Response({"status": "ignored"}, status=status.HTTP_200_OK)

        mode, normalized_text = parse_webhook_mode_and_message(message_text)
        user_id = str(sender)

        if mode == InteractionLog.MODE_AI_QNA:
            if not normalized_text:
                return Response({"error": "AI prompt is empty. Use format: ai: <pertanyaan>"}, status=status.HTTP_400_BAD_REQUEST)
            chatbot_response = handle_ai_qna(user_id=user_id, prompt=normalized_text, endpoint_name=self.endpoint_name)
        else:
            chatbot_response = handle_preset_interaction(user_id=user_id, message=normalized_text, endpoint_name=self.endpoint_name)

        teks_balasan = chatbot_response.data.get("response") or chatbot_response.data.get("error")
        if teks_balasan:
            send_whatsapp_message(to_number=user_id, message_text=teks_balasan)
            
        ics_file = chatbot_response.data.get("ics_file")
        if ics_file:
            send_whatsapp_document(to_number=user_id, filename=ics_file["filename"], content_base64=ics_file["content_base64"], mime_type=ics_file["content_type"])
            
        return Response({"status": "processed"}, status=status.HTTP_200_OK)