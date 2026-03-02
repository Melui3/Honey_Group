from django.contrib import admin
from .models import BlogPost, Circuit, Destination, Excursion, Signature, VideoCard, HeroMedia

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date", "published")
    list_filter = ("category", "published")
    search_fields = ("title", "excerpt", "author")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Circuit)
class CircuitAdmin(admin.ModelAdmin):
    list_display = ("title", "featured")
    list_filter = ("featured",)
    search_fields = ("title", "notes")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ("title", "zone", "featured")
    list_filter = ("zone", "featured")
    search_fields = ("title", "teaser")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Excursion)
class ExcursionAdmin(admin.ModelAdmin):
    list_display = ("title", "area", "featured")
    list_filter = ("area", "featured")
    search_fields = ("title", "area")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Signature)
class SignatureAdmin(admin.ModelAdmin):
    list_display = ("title", "duration", "featured")
    list_filter = ("featured",)
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(HeroMedia)
class HeroMediaAdmin(admin.ModelAdmin):
    list_display = ("id", "mode", "youtubeId", "poster")

@admin.register(VideoCard)
class VideoCardAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "platform", "featured", "order")
    list_editable = ("featured", "order")
    search_fields = ("title", "platform")