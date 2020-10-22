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
# from django.contrib.auth.models import User
# from dj_rest_auth.serializers import UserDetailsSerializer


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomList(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        # user_id = self.request.user.id

        # queryset = Room.objects.filter(collaborators=user_id).order_by('-id')
        queryset = Room.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound("No room has been created yet!")


class RoomCreate(CreateAPIView):
    serializer_class = RoomSerializer

    # def create(self, request, *args, **kwargs):
    #     user_id = request.user.id

    #     request.data._mutable = True
    #     request.data['owner'] = user_id
    #     request.data['collaborators'] = user_id
    #     request.data._mutable = False

    #     return super(RoomCreate, self).create(request, *args, **kwargs)


class RoomDelete(DestroyAPIView):
    def get_queryset(self):
        # user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        queryset = Room.objects.filter(id=pk)
        # is_owner = Work.objects.filter(owner=user_id, id=pk)

        # if not is_owner:
        #     raise PermissionDenied(
        #         "Only the owner of this work is authorized for deletion. If you wish to remove this work from your list, then contact the owner to remove you from collaborator's list")

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


class RoomUpdate(UpdateAPIView):
    # serializer_class = RoomUpdateSerializer
    serializer_class = RoomSerializer

    def get_queryset(self):
        # user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        # queryset = Room.objects.filter(collaborators=user_id, id=pk)
        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


class RoomDetails(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        # user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        # queryset = Room.objects.filter(collaborators=user_id, id=pk)
        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Room not found")


