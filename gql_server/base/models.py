from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from gql_server.chart.models import Chart


class User(AbstractUser):
    chart = models.ManyToManyField(Chart) # Member

    @property
    def user_id(self):
        if self.is_anonymous:
            pass # TODO: session or uuid
        else:
            return self.pk
