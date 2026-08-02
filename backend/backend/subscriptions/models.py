from datetime import timedelta
from django.db import models
from members.models import Member
from plans.models import MembershipPlan


class Subscription(models.Model):

    STATUS_CHOICES = [
        ("Active", "Active"),
        ("Expired", "Expired"),
    ]

    member = models.ForeignKey(
        Member,
        on_delete=models.CASCADE,
        related_name="subscriptions"
    )

    plan = models.ForeignKey(
        MembershipPlan,
        on_delete=models.CASCADE
    )

    start_date = models.DateField()

    end_date = models.DateField(blank=True, null=True)

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Active"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):

        self.amount = self.plan.price

        if self.plan.duration == "Monthly":
            self.end_date = self.start_date + timedelta(days=30)

        elif self.plan.duration == "Quarterly":
            self.end_date = self.start_date + timedelta(days=90)

        elif self.plan.duration == "Yearly":
            self.end_date = self.start_date + timedelta(days=365)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.member} - {self.plan}"