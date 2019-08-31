from django.db import models
# Create your models here.
from gql_server.base.models import User


class Chart(models.Model):
    master = models.ForeignKey(User, related_name='own_charts')
    dynamo_id = models.CharField(max_length=200)