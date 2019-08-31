from django.contrib.auth.models import AbstractUser
from django.db import models
from mandalart.utils import HashidModel


class User(AbstractUser, HashidModel):
    pass
