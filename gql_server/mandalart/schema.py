import base.schema
import chart.schema
import graphene
from graphene import relay


class Query(
    base.schema.Query,
    chart.schema.Query,
    graphene.ObjectType,
):
    node = relay.Node.Field()


class Mutation(
    base.schema.Mutation,
    chart.schema.Mutation,
    graphene.ObjectType
):
    pass


# schema = graphene.Schema(query=Query, mutation=Mutation)
schema = graphene.Schema(query=Query)
