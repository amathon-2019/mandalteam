from base.models import User
from django.db import models


# Create your models here.


class Chart(models.Model):
    member = models.ManyToManyField(User, )  # Member
    master = models.ForeignKey(User, related_name='own_charts', on_delete=models.CASCADE)
    dynamo_id = models.CharField(max_length=200)
