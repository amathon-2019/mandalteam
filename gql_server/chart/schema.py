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


def can_user_edit_chart(user, target_chart):
    available_users = target_chart.member + [target_chart.master]
    if user in available_users:
        return True
    else:
        return False


class ChartCellModify(graphene.Mutation):
    class Arguments:
        chart_id = graphene.ID()
        location = graphene.String()
        text = graphene.String()

    success = graphene.Boolean()
    chart = graphene.Field(ChartNode)

    def mutate(self, info, chart_id, location, text):
        # target_chart = Chart.objects.select_related('master').prefetch_related('member').get(id=chart_id)
        _type, hashid = graphene.relay.Node.from_global_id(chart_id)
        raw = Chart.objects.get(hashid=hashid)
        x, y = Chart.get_index(location)
        data = raw.data
        data.chart[x].data[y].text = text
        data.save()
        # raw._ddb = Noneß
        return ChartCellModify(success=True, chart=raw)
        #
        # if can_user_edit_chart(info.request.user, target_chart):
        #     x, y = location
        #     # JSON 내용이 있어야 함
        #     return ChartCellModify(result="{} cell is modified".format(location), success=True, chart=target_chart)
        # else:
        #     return ChartCellModify(result="Not allowed", success=True, chart=target_chart)


class ChartNameModify(graphene.Mutation):
    class Arguments:
        chart_id = graphene.ID()
        name = graphene.Argument(graphene.String, description="차트 이름")

    success = graphene.Boolean()
    chart = graphene.Field(ChartNode)  # 타이틀 수정 => 타이틀만 보내주는 걸로 수정?

    def mutate(self, info, chart_id, name):
        # target_chart = Chart.objects.select_related('master').prefetch_related('member').get(id=chart_id)

        _type, hashid = graphene.relay.Node.from_global_id(chart_id)
        raw = Chart.objects.get(hashid=hashid)
        chart = raw.data
        chart.name = name
        chart.save()
        return ChartNameModify(success=True, chart=raw)


class ChartDelete(graphene.Mutation):
    class Arguments:
        chart_id = graphene.ID()

    result = graphene.String()
    success = graphene.Boolean()

    def mutate(self, info, chart_id):
        target_chart = Chart.objects.select_related('master').get(id=chart_id)
        if info.context.user == target_chart.master:
            target_chart.delete()
            return ChartDelete(result="Target is deleted", success=True)
        else:
            return ChartDelete(result="Not allowed", success=False)


class ChartCreate(graphene.Mutation):
    class Arguments:
        name = graphene.Argument(graphene.String, description="차트 이름")

    chart = graphene.Field(ChartNode)

    def mutate(self, info, name):
        user, _ = User.objects.get_or_create(username="test")
        new_chart = Chart.new_chart(user, name)

        return ChartCreate(chart=new_chart)


class Query(graphene.ObjectType):
    chart = graphene.Field(ChartNode, description='만다라 차트', id=graphene.ID())
    all_charts = AllChartConnectionField

    def resolve_all_charts(self, info, *args, **kwargs):
        return Chart.objects.all()

    def resolve_chart(self, info, id):
        _type, hashid = graphene.relay.Node.from_global_id(id)
        return Chart.objects.filter(hashid=hashid).first()


class Mutation(graphene.ObjectType):
    make_chart = ChartCreate.Field()
    delete_chart = ChartDelete.Field()
    modify_chart_cell = ChartCellModify.Field()
    modify_chart_name = ChartNameModify.Field()
