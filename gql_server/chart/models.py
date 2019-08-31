from django.db import models

from base.models import User
from mandalart.utils import HashidModel
from chartdata import ChartData

class Chart(HashidModel, models.Model):
    member = models.ManyToManyField(User, null=True, blank=True)  # Member
    master = models.ForeignKey(User, related_name='own_charts', on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        new = False
        if self.id is None:
            new = True
        super().save(*args, **kwargs)
        if new:

