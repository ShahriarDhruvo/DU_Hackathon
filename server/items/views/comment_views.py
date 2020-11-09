from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import (
    NotFound,
    APIException,
    PermissionDenied,
)
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView
)

from ..serializers import (
    CommentSerializer,
    CommentCreateSerializer,
    CommentUpdateSerializer
)
from django.db.models import Q
from rooms.models import Room
from sections.models import Section
from ..models import Item, Comment


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Comment already exist.'


class CommentList(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):

        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)
        item_pk = self.kwargs.get('item_pk', None)

        is_authenticated = Room.objects.filter(
            (Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        if not is_authenticated:
            raise PermissionDenied("You are not authorized to view this list!")

        # queryset = Comment.objects.filter(item_id=item_pk, item__section_id=section_pk,
        #     item__section__room_id=room_pk).order_by('id')
        queryset = Comment.objects.filter(
            item_id=item_pk, item__section__room_id=room_pk).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No comment has been posted yet")


class CommentCreate(CreateAPIView):
    serializer_class = CommentCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)
        item_pk = self.kwargs.get('item_pk', None)

        is_authenticated = Room.objects.filter(
            Q(teachers=user_id) | Q(students=user_id), id=room_pk)

        if not is_authenticated:
            raise PermissionDenied("Only a user of this room can comment!")

        # queryset = Item.objects.filter(id=item_pk, section_id=section_pk,
        #     section__room_id=room_pk)
        queryset = Item.objects.filter(id=item_pk, section__room_id=room_pk)

        if not queryset:
            raise NotFound(
                "The item you're trying to add comment to doesn't exist!")

        request.data._mutable = True
        request.data['item'] = item_pk
        request.data['user'] = user_id
        request.data._mutable = False

        return super(CommentCreate, self).create(request, *args, **kwargs)


class CommentDelete(DestroyAPIView):
    lookup_url_kwarg = 'comment_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)
        #item_pk = self.kwargs.get('item_pk', None)

        # queryset = Comment.objects.filter(user_id=user_id,
        #     item_id=item_pk, item__section_id=section_pk,item__section__room_id=room_pk)
        queryset = Comment.objects.filter(
            user_id=user_id, item__section__room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound(
                "Comment not found or this comment was made by someone else!")


class CommentUpdate(UpdateAPIView):
    serializer_class = CommentUpdateSerializer
    lookup_url_kwarg = 'comment_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        room_pk = self.kwargs.get('room_pk', None)
        #section_pk = self.kwargs.get('section_pk', None)
        #item_pk = self.kwargs.get('item_pk', None)

        # queryset = Comment.objects.filter(user_id=user_id,
        #     item_id=item_pk, item__section_id=section_pk,item__section__room_id=room_pk)
        queryset = Comment.objects.filter(
            user_id=user_id, item__section__room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound(
                "Comment not found or this comment was made by someone else!")
