from base.models import User
from django.db import models
from mandalart.utils import HashidModel


class Chart(HashidModel, models.Model):
    name = models.CharField(default='mandalart chart', max_length=200)
    member = models.ManyToManyField(User, null=True, blank=True)  # Member
    master = models.ForeignKey(User, related_name='own_charts', on_delete=models.CASCADE)
