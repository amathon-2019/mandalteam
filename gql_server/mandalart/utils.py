import graphene
from django.db import models
from graphene_django import DjangoObjectType
from hashids import Hashids


class HashIdDjangoObjectType(DjangoObjectType):
    class Meta:
        abstract = True

    hashid = graphene.Field(graphene.String, description="hashid")

    def resolve_id(self, info):
        return self.hashid

    def resolve_hashid(self, info):
        return self.hashid

    @classmethod
    def get_node(cls, info, id):
        try:
            return cls._meta.model.objects.get(hashid=id)
        except cls._meta.model.DoesNotExist:
            return None


class BaseHashIdsMixin():
    @classmethod
    def salt(cls):
        """
        startbtn<서버 스테이지>-<리소스명> 형식으로된 salt 생성
        hashid를 인,디코딩할때 사용될 salt값을 생성
        """
        resource = cls.__name__
        return f'{settings.STAGE}-{resource}'

    @classmethod
    def hashids(cls):
        """
        소문자 및 숫자로만 hashid생성
        :return:
        """
        return Hashids(salt=cls.salt(), min_length=4,
                       alphabet='abcdefghijklmnopqrstuvwxyz1234567890')

    @property
    def _hashid(self):
        return self.__class__.hashids().encode(self.pk) if self.pk else None

    @classmethod
    def hashid_decode(cls, hashid):
        return cls.hashids().decode(hashid)[0]


class HashidModel(models.Model, BaseHashIdsMixin):
    """
    add hashid field for track item in all service
    """

    class Meta:
        abstract = True

    hashid = models.CharField(db_index=True, null=True, blank=True, max_length=20, editable=False, unique=True)

    def save(self, *args, **kwargs):
        new = False if self.id else True

        super().save(*args, **kwargs)
        if new or not self.hashid:
            self.set_hashid()

    def set_hashid(self):
        self.hashid = self._hashid
        self.save()
