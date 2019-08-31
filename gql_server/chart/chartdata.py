from pynamodb.models import Model


class ChartData(Model):

    class Meta:
        table_name = 'chartdata'
        region = "TODO"
