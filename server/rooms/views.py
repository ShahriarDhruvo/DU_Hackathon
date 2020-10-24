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
    RoomListSerializer,
    RoomCreateSerializer,
    RoomUpdateSerializer,
    RoomUpdateUserSerializer
)
from .models import Room
from django.conf import settings
from accounts.models import CustomUser
from django.db.models import Q


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomList(ListAPIView):
    serializer_class = RoomListSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        queryset = Room.objects.filter(
            Q(teachers=user_id) | Q(students=user_id)).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound('No room has been created yet!')


class RoomCreate(CreateAPIView):
    serializer_class = RoomCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        is_authenticated = request.user.is_staff

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to create a room')

        request.data._mutable = True
        request.data['owner'] = user_id
        request.data['admins'] = user_id
        request.data['teachers'] = user_id
        request.data._mutable = False

        return super(RoomCreate, self).create(request, *args, **kwargs)


class RoomDelete(DestroyAPIView):

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        is_owner = Room.objects.filter(owner=user_id, id=pk)

        if not is_owner:
            raise PermissionDenied(
                'Only the owner of this room is authorized for deletion')

        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound('Room does not exist!')


class RoomUpdate(UpdateAPIView):
    serializer_class = RoomUpdateSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        queryset = Room.objects.filter(admins=user_id, id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound(
                'Room does not exist or you are not authorized for this action')


class RoomDetails(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        queryset = Room.objects.filter(
            Q(teachers=user_id) | Q(students=user_id), id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound('Room does not exist!')


class RoomAddUser(UpdateAPIView):
    serializer_class = RoomUpdateUserSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        admin = Room.objects.filter(admins=user_id, id=pk)

        if not admin:
            raise PermissionDenied(
                'Only the admin of this room can add userss!')

        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound('Room does not exist!')

    def patch(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk', None)
        user = self.kwargs.get('user', None)

        if user in ('student', 'admin', 'teacher'):
            username = self.kwargs.get('username', None)
        else:
            raise NotFound('Page not Found')

        try:
            new_user_id = CustomUser.objects.filter(
                username=username).values('id').first()['id']
        except:
            raise NotFound('User does not exist!')

        existing_users_ids = list(
            Room.objects.filter(id=pk).values(user + 's'))

        users = []

        for i in range(len(existing_users_ids)):
            if new_user_id == existing_users_ids[i][user + 's']:
                raise Conflict(
                    'This user is already registered to this room!')
            elif existing_users_ids[i][user + 's']:
                users.append(existing_users_ids[i][user + 's'])

        users.append(new_user_id)

        request.data[user + 's'] = users

        return self.partial_update(request, *args, **kwargs)


class RoomRemoveUser(UpdateAPIView):
    serializer_class = RoomUpdateUserSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        pk = self.kwargs.get('pk', None)

        admin = Room.objects.filter(admins=user_id, id=pk)

        if not admin:
            raise PermissionDenied(
                'Only the admin of this room can remove users!')

        queryset = Room.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound('Room does not exist!')

    def patch(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk', None)
        user = self.kwargs.get('user', None)

        if user in ('student', 'admin', 'teacher'):
            username = self.kwargs.get('username', None)
        else:
            raise NotFound('Page not Found')

        try:
            user_id = CustomUser.objects.filter(
                username=username).values('id').first()['id']
        except:
            raise NotFound('User does not exist!')

        is_owner = Room.objects.filter(owner=user_id, id=pk)

        if is_owner:
            raise PermissionDenied(
                "The owner cannot be removed from the member's list of a room")

        existing_users_ids = list(
            Room.objects.filter(id=pk).values(user + 's'))

        users = []
        user_existance = False

        for i in range(len(existing_users_ids)):
            if user_id == existing_users_ids[i][user + 's']:
                user_existance = True
                continue
            elif existing_users_ids[i][user + 's']:
                users.append(existing_users_ids[i][user + 's'])

        if not user_existance:
            raise NotFound("This user is not a member of this room")

        request.data[user + 's'] = users

        return self.partial_update(request, *args, **kwargs)
