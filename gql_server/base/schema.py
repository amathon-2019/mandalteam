import graphene

from .models import User


class SimpleUserNode():
    class Meta:
        interfaces = (graphene.relay.Node,)
        only_fields = ('date_joined', 'username')
        model = User


class Query(graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    pass
