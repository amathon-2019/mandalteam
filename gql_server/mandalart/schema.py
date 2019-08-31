import graphene
from graphene import relay

import base.schema


class Query(
    base.schema.Query,
    graphene.ObjectType,
):
    node = relay.Node.Field()


class Mutation(
    base.schema.Mutation,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
