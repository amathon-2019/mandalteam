import graphene
import graphql_jwt
from django.contrib.auth import authenticate, login

from mandalart.utils import HashIdDjangoObjectType

from .models import User


class SimpleUserNode(HashIdDjangoObjectType):
    class Meta:
        interfaces = (graphene.relay.Node,)
        only_fields = ('date_joined', 'username', 'pk')
        model = User


class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()

    success = graphene.Boolean()
    user = graphene.Field(SimpleUserNode)

    def mutate(self, info, username, password):
        try:
            exist = User.objects.get(username=username)
            return CreateUser(success=False)
        except User.DoesNotExist:
            new_user = User.objects.create_user(username=username, password=password)
            return CreateUser(success=True, user=new_user)


class Query(graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    signup = CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

