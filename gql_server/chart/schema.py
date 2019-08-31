import graphene
from graphene_django import DjangoConnectionField

from base.schema import SimpleUserNode
from mandalart.utils import HashIdDjangoObjectType
from .models import Chart


class ChartNode(HashIdDjangoObjectType):
    class Meta:
        interfaces = (graphene.relay.Node,)
        model = Chart
        only_fields = ('master',)

    master = graphene.Field(SimpleUserNode, description="작성자")


AllChartConnectionField = DjangoConnectionField(
    ChartNode,
    description='차트 목록',
    enforce_first_or_last=True,
    max_limit=20,
)


class Query(graphene.ObjectType):
    chart = graphene.Field(ChartNode, description='만다라 차트', question_gid=graphene.ID())
    all_charts = AllChartConnectionField

    def resolve_all_charts(self, info, *args, **kwargs):
        return Chart.objects.all()


class Mutation(graphene.ObjectType):
    pass
