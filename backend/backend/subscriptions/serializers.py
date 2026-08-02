from datetime import date

from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):

    member_name = serializers.SerializerMethodField()
    plan_name = serializers.SerializerMethodField()
    days_left = serializers.SerializerMethodField()

    class Meta:
        model = Subscription
        fields = [
            "id",
            "member",
            "plan",
            "member_name",
            "plan_name",
            "start_date",
            "end_date",
            "amount",
            "status",
            "created_at",
            "days_left",
        ]

    def get_member_name(self, obj):
        return f"{obj.member.first_name} {obj.member.last_name}"

    def get_plan_name(self, obj):
        return obj.plan.name

    def get_days_left(self, obj):
        return (obj.end_date - date.today()).days