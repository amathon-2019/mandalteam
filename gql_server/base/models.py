from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    @property
    def user_id(self):
        if self.is_anonymous:
            pass  # TODO: session or uuid
        else:
            return self.pk
