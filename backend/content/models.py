from django.db import models

class Timestamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class BlogPost(Timestamped):
    id = models.CharField(max_length=80, primary_key=True)
    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=220)
    category = models.CharField(max_length=80)
    date = models.DateField()
    author = models.CharField(max_length=120, default="Honey Group")
    readTime = models.CharField(max_length=20, blank=True, default="")
    cover = models.CharField(max_length=255)
    images = models.JSONField(default=list, blank=True)
    excerpt = models.TextField(blank=True, default="")
    content = models.JSONField(default=list, blank=True)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return self.title


class Circuit(Timestamped):
    id = models.CharField(max_length=80, primary_key=True)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=220)
    durationLabel = models.CharField(max_length=60, blank=True, default="")
    routeLabel = models.CharField(max_length=140, blank=True, default="")
    highlights = models.JSONField(default=list, blank=True)
    cover = models.CharField(max_length=255)
    featured = models.BooleanField(default=False)
    notes = models.TextField(blank=True, default="")
    gallery = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-featured", "title"]

    def __str__(self):
        return self.title


class Destination(Timestamped):
    id = models.CharField(max_length=80, primary_key=True)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=160)
    zone = models.CharField(max_length=80, blank=True, default="")
    teaser = models.TextField(blank=True, default="")
    tags = models.JSONField(default=list, blank=True)
    cover = models.CharField(max_length=255)
    featured = models.BooleanField(default=False)
    gallery = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-featured", "title"]

    def __str__(self):
        return self.title


class Excursion(Timestamped):
    id = models.CharField(max_length=80, primary_key=True)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=160)
    durationLabel = models.CharField(max_length=60, blank=True, default="")
    area = models.CharField(max_length=120, blank=True, default="")
    highlights = models.JSONField(default=list, blank=True)
    cover = models.CharField(max_length=255)
    featured = models.BooleanField(default=False)
    gallery = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-featured", "title"]

    def __str__(self):
        return self.title


class Signature(Timestamped):
    id = models.CharField(max_length=80, primary_key=True)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=160)
    duration = models.CharField(max_length=60, blank=True, default="")
    description = models.TextField(blank=True, default="")
    bullets = models.JSONField(default=list, blank=True)
    cover = models.CharField(max_length=255)
    gallery = models.JSONField(default=list, blank=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ["-featured", "title"]

    def __str__(self):
        return self.title


class HeroMedia(models.Model):
    id = models.CharField(max_length=64, primary_key=True, default="hero")
    mode = models.CharField(max_length=32, default="youtube")  # youtube | image | none
    poster = models.CharField(max_length=255, blank=True, default="")
    youtubeId = models.CharField(max_length=64, blank=True, default="")

    def __str__(self):
        return "HeroMedia"


class VideoCard(models.Model):
    id = models.CharField(max_length=64, primary_key=True)
    title = models.CharField(max_length=140)
    platform = models.CharField(max_length=40, blank=True, default="YouTube")
    url = models.URLField(blank=True, default="")
    thumbnail = models.URLField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-featured", "title"]

    def __str__(self):
        return self.title