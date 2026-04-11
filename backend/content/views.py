from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import BlogPost, Circuit, Destination, Excursion, Signature, VideoCard, HeroMedia
from .serializers import (
    BlogPostSerializer, CircuitSerializer, DestinationSerializer, ExcursionSerializer,
    SignatureSerializer, VideoCardSerializer, HeroMediaSerializer
)
import resend

resend.api_key = os.environ.get("RESEND_API_KEY")

class PublicReadOnly(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]

class BlogPostViewSet(PublicReadOnly):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"

class CircuitViewSet(PublicReadOnly):
    queryset = Circuit.objects.all()
    serializer_class = CircuitSerializer
    lookup_field = "slug"

class DestinationViewSet(PublicReadOnly):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    lookup_field = "slug"

class ExcursionViewSet(PublicReadOnly):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer
    lookup_field = "slug"

class SignatureViewSet(PublicReadOnly):
    queryset = Signature.objects.all()
    serializer_class = SignatureSerializer
    lookup_field = "slug"

class VideoCardViewSet(PublicReadOnly):
    queryset = VideoCard.objects.all()
    serializer_class = VideoCardSerializer

class HeroMediaViewSet(PublicReadOnly):
    queryset = HeroMedia.objects.all()
    serializer_class = HeroMediaSerializer

class ContactView(APIView):
    permission_classes = [AllowAny]

    REQUIRED_FIELDS = ("name", "email", "message")
    TRAVEL_TYPE_LABELS = {
        "sur-mesure": "Sur mesure",
        "circuit": "Circuit organisé",
        "excursion": "Excursion",
        "signature": "Expérience Signature",
    }

    def post(self, request):
        import resend
        import os

        data = request.data

        for field in self.REQUIRED_FIELDS:
            if not data.get(field, "").strip():
                return Response(
                    {"detail": f"Le champ « {field} » est obligatoire."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        travel_label = self.TRAVEL_TYPE_LABELS.get(data.get("travel_type", ""), data.get("travel_type", "—"))

        body = (
            f"Nouvelle demande de devis — Honey Group\n"
            f"{'=' * 50}\n\n"
            f"Nom       : {data.get('name')}\n"
            f"Email     : {data.get('email')}\n"
            f"Téléphone : {data.get('phone') or '—'}\n\n"
            f"Type      : {travel_label}\n"
            f"Dates     : {data.get('dates') or '—'}\n"
            f"Durée     : {data.get('duration') or '—'}\n"
            f"Budget    : {data.get('budget') or '—'}\n\n"
            f"Message :\n{data.get('message')}\n"
        )

        contact_email = getattr(settings, "CONTACT_EMAIL", "honeygroup.mg17@gmail.com")

        try:
            resend.api_key = os.environ.get("RESEND_API_KEY")
            resend.Emails.send({
                "from": "Honey Group <onboarding@resend.dev>",
                "to": [contact_email],
                "subject": f"[Devis] {data.get('name')} — {travel_label}",
                "text": body,
            })
        except Exception as exc:
            return Response(
                {"detail": "Erreur lors de l'envoi. Réessayez plus tard."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"detail": "Demande envoyée."}, status=status.HTTP_200_OK)


class VideosBundleView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hero = HeroMedia.objects.first()
        cards = VideoCard.objects.all()

        hero_data = HeroMediaSerializer(hero).data if hero else {
            "mode": "image",
            "poster": "/media/hero/hero.jpg",
            "youtubeId": "",
        }

        return Response({
            "hero": hero_data,
            "cards": VideoCardSerializer(cards, many=True).data,
        })