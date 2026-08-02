from rest_framework import serializers
from .models import GymSettings


class GymSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GymSettings
        fields = "__all__"