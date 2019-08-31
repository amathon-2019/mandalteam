from django.db import models

from base.models import User
from chartdata import ChartData
from mandalart.utils import HashidModel


class Chart(HashidModel, models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._ddb = None

    member = models.ManyToManyField(User, null=True, blank=True)  # Member
    master = models.ForeignKey(User, related_name='own_charts', on_delete=models.CASCADE)

    @property
    def data(self):
        if not self._ddb:
            try:
                self._ddb = ChartData.get(self.hashid)
            except ChartData.DoesNotExist:
                self._ddb = None
        return self._ddb

    @classmethod
    def new_chart(cls, user, name):
        chart = cls(master=user)
        chart.save()
        chart._ddb = ChartData.default_chart(chart.hashid, name)
        return chart

    @classmethod
    def get_index(cls, location):
        x, y = location
        return (ChartData.subs.index(x), int(y))

    def delete(self, using=None, keep_parents=False):
        data = self.data
        result = super().delete(using, keep_parents)
        try:
            data.delete()
        except Exception:
            pass
        return result

