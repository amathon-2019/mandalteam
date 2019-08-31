from pynamodb.attributes import MapAttribute, NumberAttribute, ListAttribute, UnicodeAttribute
from pynamodb.models import Model


class Data(MapAttribute):
    data_position = NumberAttribute(null=False)
    data = UnicodeAttribute(null=False)


class Cell(MapAttribute):

    cell_position = UnicodeAttribute(null=False)
    main_data = UnicodeAttribute()
    sub_data = ListAttribute(of=UnicodeAttribute)


class ChartData(Model):

    hash_id = UnicodeAttribute(hash_key=True)

    title = UnicodeAttribute()
    cell = ListAttribute(of=Cell)

    class Meta:
        table_name = 'ChartData'
        region = "TODO"

