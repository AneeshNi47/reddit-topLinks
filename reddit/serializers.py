from rest_framework import serializers
from .models import SubReddits


class SubRedditsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubReddits
        fields = '__all__'
