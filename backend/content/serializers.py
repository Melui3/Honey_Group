from rest_framework import serializers
from .models import BlogPost, Circuit, Destination, Excursion, Signature, VideoCard, HeroMedia

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"

class CircuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circuit
        fields = "__all__"

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = "__all__"

class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = "__all__"

class SignatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signature
        fields = "__all__"

class VideoCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoCard
        fields = "__all__"

class HeroMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroMedia
        fields = "__all__"