import graphene
from django.contrib.auth import get_user_model

from base.schema import SimpleUserNode
from graphene_django import DjangoConnectionField
from mandalart.utils import HashIdDjangoObjectType
User = get_user_model()

from .models import Chart


class ChartNode(HashIdDjangoObjectType):
    class Meta:
        interfaces = (graphene.relay.Node,)
        model = Chart
        only_fields = ('name', 'master',)

    master = graphene.Field(SimpleUserNode, description="작성자")


AllChartConnectionField = DjangoConnectionField(
    ChartNode,
    description='차트 목록',
    enforce_first_or_last=True,
    max_limit=20,
)


# 차트 추가하는 뮤테이션
class ChartCreate(graphene.Mutation):
    class Arguments:
        name = graphene.Argument(graphene.String,description="차트 이름")
        pass

    chart = graphene.Field(ChartNode)

    def mutate(self, info, name):
        user = User.objects.get_or_create(username="test")
        new_chart = Chart.objects.create(master=user)

        return ChartCreate(chart=new_chart)


class Query(graphene.ObjectType):
    chart = graphene.Field(ChartNode, description='만다라 차트', question_gid=graphene.ID())
    all_charts = AllChartConnectionField

    def resolve_all_charts(self, info, *args, **kwargs):
        return Chart.objects.all()


class Mutation(graphene.ObjectType):
    make_chart = ChartCreate.Field()

