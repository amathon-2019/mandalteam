from django.contrib import admin

# Register your models here.
from gql_server.base.models import User

admin.site.register(User)