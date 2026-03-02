from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import BlogPost, Circuit, Destination, Excursion, Signature, VideoCard, HeroMedia
from .serializers import (
    BlogPostSerializer, CircuitSerializer, DestinationSerializer, ExcursionSerializer,
    SignatureSerializer, VideoCardSerializer, HeroMediaSerializer
)

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