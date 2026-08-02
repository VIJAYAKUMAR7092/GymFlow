from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        "subscription",
        "amount",
        "payment_method",
        "payment_date",
        "status",
    )

    readonly_fields = (
        "amount",
    )

    list_filter = (
        "payment_method",
        "status",
    )

    search_fields = (
        "subscription__member__first_name",
        "subscription__member__phone",
        "transaction_id",
    )