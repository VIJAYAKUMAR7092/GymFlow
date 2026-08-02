from django.db import models
from subscriptions.models import Subscription


class Payment(models.Model):

    PAYMENT_METHODS = [
        ("Cash", "Cash"),
        ("Online", "Online"),
    ]

    STATUS_CHOICES = [
        ("Paid", "Paid"),
        ("Pending", "Pending"),
        ("Failed", "Failed"),
    ]

    subscription = models.ForeignKey(
        Subscription,
        on_delete=models.CASCADE,
        related_name="payments"
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS
    )

    payment_date = models.DateField(auto_now_add=True)

    transaction_id = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Paid"
    )

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.amount = self.subscription.amount
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.subscription.member} - ₹{self.amount}"