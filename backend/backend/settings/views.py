from rest_framework import viewsets
from .models import GymSettings
from .serializers import GymSettingsSerializer


class GymSettingsViewSet(viewsets.ModelViewSet):
    queryset = GymSettings.objects.all()
    serializer_class = GymSettingsSerializer