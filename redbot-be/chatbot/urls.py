from django.urls import path
from .views import ModeDispatchAPIView, WhatsAppWebhookAPIView, DownloadICSAPIView

urlpatterns = [
    path("mode/", ModeDispatchAPIView.as_view(), name="mode-dispatch"),
    path("webhooks/whatsapp/", WhatsAppWebhookAPIView.as_view(), name="whatsapp-webhook"),
    path("calendar/", DownloadICSAPIView.as_view(), name="download-ics"),
]