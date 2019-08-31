from django.contrib import admin

# Register your models here.
from gql_server.chart.models import Chart

admin.site.register(Chart)