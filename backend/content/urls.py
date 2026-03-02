from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    BlogPostViewSet, CircuitViewSet, DestinationViewSet, ExcursionViewSet,
    SignatureViewSet, VideoCardViewSet, HeroMediaViewSet,
    VideosBundleView,   # ← on ajoute ça
)

router = DefaultRouter()
router.register("blog-posts", BlogPostViewSet, basename="blog-posts")
router.register("circuits", CircuitViewSet, basename="circuits")
router.register("destinations", DestinationViewSet, basename="destinations")
router.register("excursions", ExcursionViewSet, basename="excursions")
router.register("signatures", SignatureViewSet, basename="signatures")
router.register("video-cards", VideoCardViewSet, basename="video-cards")
router.register("hero-media", HeroMediaViewSet, basename="hero-media")

urlpatterns = [
    path("videos/", VideosBundleView.as_view(), name="videos-bundle"),
] + router.urls