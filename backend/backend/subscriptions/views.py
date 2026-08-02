from datetime import date, timedelta

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Subscription
from .serializers import SubscriptionSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all().order_by("-id")
    serializer_class = SubscriptionSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"])
    def expiring(self, request):

        today = date.today()
        next7 = today + timedelta(days=7)

        subscriptions = Subscription.objects.filter(
            end_date__gte=today,
            end_date__lte=next7,
        ).order_by("end_date")

        serializer = self.get_serializer(subscriptions, many=True)

        return Response(serializer.data)