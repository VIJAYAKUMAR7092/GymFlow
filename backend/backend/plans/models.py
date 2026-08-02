from django.db import models


class MembershipPlan(models.Model):
    DURATION_CHOICES = [
        ("Monthly", "Monthly"),
        ("Quarterly", "Quarterly"),
        ("Yearly", "Yearly"),
    ]

    name = models.CharField(max_length=50, unique=True)

    duration = models.CharField(
        max_length=20,
        choices=DURATION_CHOICES,
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"