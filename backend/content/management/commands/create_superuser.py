from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(username=os.environ.get('DJANGO_SU_NAME')).exists():
            User.objects.create_superuser(
                username=os.environ.get('DJANGO_SU_NAME'),
                password=os.environ.get('DJANGO_SU_PASSWORD'),
                email=os.environ.get('DJANGO_SU_EMAIL'),
            )
