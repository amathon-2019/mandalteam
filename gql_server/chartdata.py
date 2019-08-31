import os

from pynamodb.attributes import ListAttribute, MapAttribute, NumberAttribute, UnicodeAttribute
from pynamodb.models import Model

STAGE = os.environ.get('STAGE', 'local')
is_local = STAGE == 'local'


class Data(MapAttribute):
    pos = NumberAttribute()
    text = UnicodeAttribute(null=True)


class SubChart(MapAttribute):
    pos = UnicodeAttribute()
    data = ListAttribute(of=Data)


class ChartData(Model):
    subs = ["A", "B", "C", "D", "E", "F", "G", "H"]

    class Meta:
        table_name = f"{STAGE}_chart_db"
        region = os.environ.get("AWS_REGION", 'ap-northeast-2')
        if is_local:
            host = "http://localhost:8888"

    hashid = UnicodeAttribute(hash_key=True)
    name = UnicodeAttribute(default="mandalart chart")
    chart = ListAttribute(of=SubChart)

    @classmethod
    def default_chart(cls, hashid, name):
        data = [Data(pos=n) for n in range(9)]
        chart = [SubChart(pos=s, data=data) for s in cls.subs]
        c = cls(hash_key=hashid, name=name, chart=chart)
        c.save()
        return c


try:
    if is_local:
        ChartData.create_table(wait=True, read_capacity_units=10, write_capacity_units=10)
except Exception:
    pass
