from django.core.management.base import BaseCommand
from django.utils import timezone
from chatbot.models import ChatbotUser, PresetState, TTDComplianceLog
from chatbot.services import send_whatsapp_message
import datetime

class Command(BaseCommand):
    help = 'Mengirim pesan WhatsApp proaktif untuk reminder TTD'

    def handle(self, *args, **kwargs):
        now = timezone.localtime()
        current_hour = now.hour
        today = now.date()

        # Cari user yang jam pengingatnya sama dengan jam saat ini
        users = ChatbotUser.objects.filter(reminder_hour_24=current_hour)
        sent_count = 0

        for user in users:
            should_send = False

            if user.is_currently_menstruating:
                # Sedang menstruasi = Tiap hari
                should_send = True
            else:
                # Tidak menstruasi = Seminggu sekali (selisih hari kelipatan 7 dari pendaftaran)
                if user.reminder_start_date:
                    days_diff = (today - user.reminder_start_date).days
                    if days_diff % 7 == 0:
                        should_send = True

            if should_send:
                # 1. Buat log pending di database
                TTDComplianceLog.objects.create(user=user, date=today, is_taken=None)

                # 2. Ubah state user agar bot tahu pertanyaan apa yang sedang diajukan
                user.preset_state = PresetState.AWAITING_TTD_CONFIRMATION
                user.save()

                # 3. Tembak pesan Fonnte
                msg = "Halo Girls! 😆\nSaatnya minum Tablet Tambah Darah (TTD) nih!\n\nApakah kamu sudah meminumnya hari ini?\n1. Sudah dong! 👍\n2. Belum minum 🙁"
                send_whatsapp_message(user.user_id, msg)
                sent_count += 1

        self.stdout.write(f"[{now}] Berhasil menembakkan {sent_count} pesan reminder.")