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

from .serializers import (
    RoomSerializer,
)
from .models import Room
from django.contrib.auth.models import User
from dj_rest_auth.serializers import UserDetailsSerializer
from django.db.models import Q

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomList(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        queryset = Room.objects.filter(Q(teachers=user_id) | Q(students=user_id)).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No room has been created yet!")


class RoomCreate(CreateAPIView):
    serializer_class = RoomSerializer

    # def get_queryset(self):
    #     user_id = self.request.user.id

    #     queryset = request.user.is_staff

    #     if queryset:
    #         return queryset
    #     else:
    #         raise PermissionDenied("You are not authorized to create a room")

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        is_authenticated = request.user.is_staff

        if not is_authenticated:
            raise PermissionDenied("You are not authorized to create a room")

        request.data._mutable = True
        request.data['teachers'] = user_id
        request.data['admin'] = user_id
        request.data._mutable = False

        return super(RoomCreate, self).create(request, *args, kwargs)


class RoomDelete(DestroyAPIView):
    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=pk)

        if not is_teacher:
            raise PermissionDenied(
                "Only the teacher of this room is authorized for deletion")

        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


class RoomUpdate(UpdateAPIView):
    # serializer_class = RoomUpdateSerializer
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        queryset = Room.objects.filter(admin=user_id, id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


class RoomDetails(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        queryset = Room.objects.filter(Q(teachers=user_id) | Q(students=user_id), id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


