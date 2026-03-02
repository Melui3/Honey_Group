from django.core.management.base import BaseCommand
from content.models import Signature

DATA = [
    {
        "id": "tana-by-night",
        "slug": "tana-by-night",
        "title": "Tanà by Night",
        "duration": "Soirée",
        "description": "Antananarivo autrement : ambiance nocturne, points de vue stratégiques, rues vivantes et immersion locale. Une expérience fluide, encadrée et parfaitement organisée.",
        "bullets": [
            "Bus animé & ambiance musicale",
            "Points de vue panoramiques",
            "Pause gourmande (options locales)",
            "Encadrement professionnel",
        ],
        "cover": "/media/signatures/cover-tana-by-night.jfif",
        "gallery": [
            "/media/signatures/gallery-tana-by-night-1.jpg",
            "/media/signatures/gallery-tana-by-night-2.jpg",
            "/media/signatures/gallery-tana-by-night-3.jpg",
        ],
        "featured": True,
    },
    {
        "id": "escapade-hautes-terres",
        "slug": "escapade-hautes-terres",
        "title": "Escapade Hautes Terres & Nature",
        "duration": "Demi-journée à Journée",
        "description": "Explorez les environs d’Antananarivo à travers des itinéraires sélectionnés : lacs, collines, villages et panoramas volcaniques. Nature, authenticité et rythme maîtrisé.",
        "bullets": [
            "Itinéraires accessibles & sécurisés",
            "Panoramas & paysages volcaniques",
            "Haltes culturelles",
            "Organisation logistique optimisée",
        ],
        "cover": "/media/signatures/cover-moto-velo.jpg",
        "gallery": [
            "/media/signatures/gallery-moto-velo-1.jpg",
            "/media/signatures/gallery-moto-velo-2.jpg",
            "/media/signatures/gallery-moto-velo-3.jpg",
        ],
        "featured": True,
    },
    {
        "id": "circuits-sur-mesure",
        "slug": "circuits-sur-mesure",
        "title": "Circuit Sur Mesure",
        "duration": "Variable",
        "description": "Votre voyage, votre rythme. Nous construisons un itinéraire clair et optimisé selon vos envies, votre budget et votre niveau de confort.",
        "bullets": [
            "Itinéraire 100% personnalisé",
            "Optimisation des trajets & étapes",
            "Options confort / aventure",
            "Accompagnement expert local",
        ],
        "cover": "/media/signatures/cover-sur-mesure.jpg",
        "gallery": [
            "/media/signatures/gallery-sur-mesure-1.jpg",
            "/media/signatures/gallery-sur-mesure-2.jpg",
        ],
        "featured": False,
    },
]


class Command(BaseCommand):
    help = "Seed signatures data"

    def handle(self, *args, **kwargs):
        for item in DATA:
            Signature.objects.update_or_create(
                id=item["id"],
                defaults=item
            )
        self.stdout.write(self.style.SUCCESS("Signatures seeded successfully"))