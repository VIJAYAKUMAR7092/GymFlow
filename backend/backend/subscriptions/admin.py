from django.contrib import admin
from .models import Subscription


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):

    list_display = (
        "member",
        "plan",
        "amount",
        "start_date",
        "end_date",
        "status",
    )

    readonly_fields = (
        "amount",
        "end_date",
    )

    list_filter = (
        "status",
        "plan",
    )

    search_fields = (
        "member__first_name",
        "member__phone",
    )