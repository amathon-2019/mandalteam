import graphene
from django.contrib.auth import get_user_model

from graphene_django import DjangoConnectionField

User = get_user_model()

from base.schema import SimpleUserNode
from mandalart.utils import HashIdDjangoObjectType
from .models import Chart


class Data(graphene.ObjectType):
    pos = graphene.Field(graphene.Int)
    text = graphene.Field(graphene.String)


class SubChart(graphene.ObjectType):
    pos = graphene.Field(graphene.String)
    data = graphene.Field(graphene.List(Data))


class ChartNode(HashIdDjangoObjectType):
    class Meta:
        interfaces = (graphene.relay.Node,)
        model = Chart
        only_fields = ('master',)

    master = graphene.Field(SimpleUserNode, description="작성자")
    name = graphene.Field(graphene.String, description="차트 이름")
    data = graphene.Field(graphene.List(SubChart))

    def resolve_name(self, info):
        return self.data.name

    def resolve_data(self, info):
        def raw_to_data(data):
            return [Data(pos=d.pos, text=d.text) for d in data]

        return [SubChart(pos=raw_sub.pos, data=raw_to_data(raw_sub.data)) for raw_sub in self.data.chart]


AllChartConnectionField = DjangoConnectionField(
    ChartNode,
    description='차트 목록',
    enforce_first_or_last=True,
    max_limit=20,
)


# 차트 추가하는 뮤테이션
class ChartCreate(graphene.Mutation):
    class Arguments:
        name = graphene.Argument(graphene.String, description="차트 이름")
        pass

    chart = graphene.Field(ChartNode)

    def mutate(self, info, name):
        user,_ = User.objects.get_or_create(username="test")
        new_chart = Chart.new_chart(user, name)
        return ChartCreate(chart=new_chart)


class Query(graphene.ObjectType):
    chart = graphene.Field(ChartNode, description='만다라 차트', question_gid=graphene.ID())
    all_charts = AllChartConnectionField

    def resolve_all_charts(self, info, *args, **kwargs):
        return Chart.objects.all()


class Mutation(graphene.ObjectType):
    make_chart = ChartCreate.Field()
