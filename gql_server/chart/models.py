from django.db import models
# Create your models here.
from pynamodb.models import Model

from gql_server.base.models import User


class Chart(models.Model):
    member = models.ManyToManyField(User)  # Member
    master = models.ForeignKey(User, related_name='own_charts')
    dynamo_id = models.CharField(max_length=200)

