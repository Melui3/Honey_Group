from django.core.management.base import BaseCommand
from content.models import Circuit

DATA = [
    {
        "id": "le-sud",
        "slug": "le-sud-rn7-isalo-toliary",
        "title": "Le Sud – RN7, Isalo & Tuléar",
        "durationLabel": "11 jours / 10 nuits",
        "routeLabel": "Antananarivo → Tuléar (RN7)",
        "highlights": ["RN7", "Isalo", "Tuléar", "Nature & culture"],
        "cover": "/media/circuits/cover-circuit-sud.jpg",
        "featured": True,
        "notes": "",
        "gallery": [
            "/media/circuits/circuit-sud-1.jpg",
            "/media/circuits/circuit-sud-2.jpg",
            "/media/circuits/circuit-sud-3.jpg",
        ],
    },
    {
        "id": "l-ouest",
        "slug": "l-ouest-baobabs-tsingy",
        "title": "L’Ouest – Allée des Baobabs & Tsingy",
        "durationLabel": "12 jours / 11 nuits",
        "routeLabel": "Antananarivo → Morondava → Bekopaka",
        "highlights": ["Allée des Baobabs", "Tsingy", "Kirindy", "Couchers de soleil"],
        "cover": "/media/circuits/cover-circuit-ouest.jpg",
        "featured": True,
        "notes": "",
        "gallery": [
            "/media/circuits/circuit-ouest-1.jpg",
            "/media/circuits/circuit-ouest-2.jpg",
            "/media/circuits/circuit-ouest-3.jpg",
        ],
    },
    {
        "id": "le-nord",
        "slug": "le-nord-diego-nosy-be",
        "title": "Le Nord — Diego & Nosy Be",
        "durationLabel": "8 à 12 jours",
        "routeLabel": "Nosy Be (détails) + Diego (aperçu)",
        "highlights": ["Nosy Be", "Plages & nautique", "Séjours détente", "Diego (aperçu)"],
        "cover": "/media/circuits/cover-circuit-nord.jpeg",
        "featured": True,
        "notes": "Fiche Diego manquante — on affiche un aperçu destination uniquement.",
        "gallery": [
            "/media/circuits/circuit-nord-1.jpg",
            "/media/circuits/circuit-nord-2.jpg",
            "/media/circuits/circuit-nord-3.jpg",
        ],
    },
    {
        "id": "l-est",
        "slug": "l-est-sainte-marie-pangalanes",
        "title": "L’Est – Sainte-Marie & Canal des Pangalanes",
        "durationLabel": "8 jours / 7 nuits + Pangalanes",
        "routeLabel": "Sainte-Marie + Manambato / Pangalanes",
        "highlights": ["Sainte-Marie", "Baleines (saison)", "Pangalanes", "Immersion nature"],
        "cover": "/media/circuits/cover-circuit-est.jpg",
        "featured": True,
        "notes": "",
        "gallery": [
            "/media/circuits/circuit-est-1.jpg",
            "/media/circuits/circuit-est-2.jpg",
            "/media/circuits/circuit-est-3.jpg",
        ],
    },
    {
        "id": "nord-ouest-majunga",
        "slug": "nord-ouest-majunga",
        "title": "Nord-Ouest – Majunga",
        "durationLabel": "À définir",
        "routeLabel": "Antananarivo → Majunga",
        "highlights": ["Plages", "Côte Nord-Ouest", "Découverte"],
        "cover": "/media/circuits/cover-circuit-majunga.jpg",
        "featured": False,
        "notes": "À compléter avec la fiche PDF quand elle est prête.",
        "gallery": [
            "/media/circuits/circuit-majunga-1.jpg",
            "/media/circuits/circuit-majunga-2.jpg",
            "/media/circuits/circuit-majunga-3.webp",
        ],
    },
    {
        "id": "est-manambato",
        "slug": "est-manambato-pangalanes",
        "title": "Est – Manambato & Pangalanes",
        "durationLabel": "À définir",
        "routeLabel": "Antananarivo → Manambato → Pangalanes",
        "highlights": ["Canal des Pangalanes", "Immersion", "Nature"],
        "cover": "/media/circuits/cover-circuit-manambato.jpg",
        "featured": False,
        "notes": "À compléter avec la fiche PDF quand elle est prête.",
        "gallery": [
            "/media/circuits/circuit-manambato-1.webp",
            "/media/circuits/circuit-manambato-2.jpg",
            "/media/circuits/circuit-manambato-3.jpg",
        ],
    },
    {
        "id": "sud-makay",
        "slug": "sud-makay",
        "title": "Sud – Makay",
        "durationLabel": "À définir",
        "routeLabel": "Antananarivo → Makay",
        "highlights": ["Aventure", "Paysages", "Expédition"],
        "cover": "/media/circuits/cover-circuit-makay.jfif",
        "featured": False,
        "notes": "Circuit cité dans le Livre (Sud : Tuléar, Makay).",
        "gallery": [
            "/media/circuits/circuit-makay-1.jpg",
            "/media/circuits/circuit-makay-2.jpg",
            "/media/circuits/circuit-makay-3.jpg",
        ],
    },
]

class Command(BaseCommand):
    help = "Seed circuits data"

    def handle(self, *args, **kwargs):
        for item in DATA:
            Circuit.objects.update_or_create(id=item["id"], defaults=item)
        self.stdout.write(self.style.SUCCESS("Circuits seeded successfully"))