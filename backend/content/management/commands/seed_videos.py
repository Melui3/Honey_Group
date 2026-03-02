from django.core.management.base import BaseCommand
from content.models import HeroMedia, VideoCard

HERO_MEDIA = {
    "id": "hero",
    "mode": "youtube",
    "poster": "/media/hero/hero-poster.jpg",
    "youtubeId": "GTkIlFmJtmg",
}

VIDEO_CARDS = [
    {
        "id": "immersion-nature",
        "title": "Vohimana : immersion nature",
        "platform": "YouTube",
        "url": "https://www.youtube.com/watch?v=GTkIlFmJtmg",
        "thumbnail": "https://img.youtube.com/vi/GTkIlFmJtmg/hqdefault.jpg",
        "featured": True,
        "order": 1,
    },
    {
        "id": "culture-rencontres",
        "title": "Morondava : culture & rencontres",
        "platform": "YouTube",
        "url": "https://www.youtube.com/watch?v=Mqa4C9ybkRE",
        "thumbnail": "https://img.youtube.com/vi/Mqa4C9ybkRE/hqdefault.jpg",
        "featured": False,
        "order": 2,
    },
    {
        "id": "experiences-signature",
        "title": "Ambatokely : expériences signature",
        "platform": "YouTube",
        "url": "https://www.youtube.com/watch?v=GEv5FMJ4WDw",
        "thumbnail": "https://img.youtube.com/vi/GEv5FMJ4WDw/hqdefault.jpg",
        "featured": False,
        "order": 3,
    },
]

class Command(BaseCommand):
    help = "Seed hero media + video cards"

    def handle(self, *args, **kwargs):
        HeroMedia.objects.update_or_create(id="hero", defaults=HERO_MEDIA)

        for v in VIDEO_CARDS:
            VideoCard.objects.update_or_create(id=v["id"], defaults=v)

        self.stdout.write(self.style.SUCCESS("Videos seeded successfully"))