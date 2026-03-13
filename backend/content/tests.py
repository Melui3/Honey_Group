from datetime import date

from django.test import TestCase
from rest_framework.test import APIClient

from .models import BlogPost, Circuit, Destination, Excursion, Signature


class ContentAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # BlogPost
        self.blog = BlogPost.objects.create(
            id="article-test",
            slug="article-test",
            title="Article test",
            category="Culture",
            date=date(2026, 2, 18),
            author="Honey Group",
            readTime="5 min",
            cover="/media/blog/test.jpg",
            images=["/media/blog/test-1.jpg"],
            excerpt="Extrait de test",
            content=[{"type": "p", "text": "Contenu test"}],
            published=True,
        )

        # Circuit
        self.circuit = Circuit.objects.create(
            id="circuit-test",
            slug="circuit-test",
            title="Circuit Madagascar",
            durationLabel="10 jours / 9 nuits",
            routeLabel="Antananarivo → Nosy Be",
            highlights=["Plages", "Nature"],
            cover="/media/circuits/test.jpg",
            featured=True,
            notes="Note test",
            gallery=["/media/circuits/test-1.jpg"],
        )

        # Destination
        self.destination = Destination.objects.create(
            id="destination-test",
            slug="nosy-be",
            title="Nosy Be",
            zone="Nord Ouest",
            teaser="Île paradisiaque",
            tags=["Plages", "Lagons"],
            cover="/media/destinations/test.jpg",
            featured=True,
            gallery=["/media/destinations/test-1.jpg"],
        )

        # Excursion
        self.excursion = Excursion.objects.create(
            id="excursion-test",
            slug="excursion-foret",
            title="Excursion forêt",
            durationLabel="Journée",
            area="Est",
            highlights=["Nature", "Découverte"],
            cover="/media/excursions/test.jpg",
            featured=True,
            gallery=["/media/excursions/test-1.jpg"],
        )

        # Signature
        self.signature = Signature.objects.create(
            id="signature-test",
            slug="experience-premium",
            title="Expérience premium",
            duration="Soirée",
            description="Description test",
            bullets=["Point fort 1", "Point fort 2"],
            cover="/media/signatures/test.jpg",
            gallery=["/media/signatures/test-1.jpg"],
            featured=True,
        )

    # -----------------------------
    # TESTS MODELS
    # -----------------------------

    def test_blog_post_creation(self):
        self.assertEqual(self.blog.title, "Article test")
        self.assertTrue(self.blog.published)
        self.assertEqual(self.blog.category, "Culture")

    def test_circuit_creation(self):
        self.assertEqual(self.circuit.title, "Circuit Madagascar")
        self.assertTrue(self.circuit.featured)

    def test_destination_creation(self):
        self.assertEqual(self.destination.title, "Nosy Be")
        self.assertEqual(self.destination.zone, "Nord Ouest")

    # -----------------------------
    # TESTS API ENDPOINTS
    # -----------------------------

    def test_blog_posts_endpoint(self):
        response = self.client.get("/api/blog-posts/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_circuits_endpoint(self):
        response = self.client.get("/api/circuits/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_destinations_endpoint(self):
        response = self.client.get("/api/destinations/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_excursions_endpoint(self):
        response = self.client.get("/api/excursions/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_signatures_endpoint(self):
        response = self.client.get("/api/signatures/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    # -----------------------------
    # TEST FILTRAGE BLOG PUBLISHED
    # -----------------------------

    def test_blog_post_filter_published(self):
        BlogPost.objects.create(
            id="draft-test",
            slug="draft-test",
            title="Draft",
            category="Culture",
            date=date(2026, 2, 19),
            author="Honey Group",
            readTime="5 min",
            cover="/media/blog/draft.jpg",
            images=[],
            excerpt="Brouillon",
            content=[{"type": "p", "text": "Contenu brouillon"}],
            published=False,
        )

        response = self.client.get("/api/blog-posts/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], "article-test")