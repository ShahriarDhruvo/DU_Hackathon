from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
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
from universities.models import Course
from django.db.models import Q
from django.conf import settings
from django.contrib.auth import get_user_model


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomList(ListAPIView):
    serializer_class = RoomListSerializer

    def get_queryset(self):
        # user_id = self.request.user.id

        # queryset = Room.objects.filter(
        #     Q(teachers=user_id) | Q(students=user_id)).order_by('id')
        queryset = Room.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound('No room has been created yet!')


class RoomCreate(CreateAPIView):
    serializer_class = RoomCreateSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id
        user_department = request.user.department
        selected_course_id = request.POST['course']
        is_authenticated = request.user.is_staff

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to create a room')

        if user_department != Course.objects.filter(department_id=selected_course_id):
            raise PermissionDenied('The course you have selected belong to another department!')

        request.data._mutable = True
        request.data['owner'] = user_id
        request.data['admins'] = user_id
        request.data['teachers'] = user_id
        request.data._mutable = False

        return super(RoomCreate, self).create(request, *args, **kwargs)


class RoomDelete(DestroyAPIView):
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        is_owner = Room.objects.filter(owner=user_id)

        if is_owner:
            return is_owner
        else:
            raise NotAcceptable(
                'Room does not exist or only the owner of this room is authorized for deletion')


class RoomUpdate(UpdateAPIView):
    serializer_class = RoomUpdateSerializer
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id
        queryset = Room.objects.filter(admins=user_id)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action')


class RoomDetails(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        room_pk = self.kwargs.get('room_pk', None)

        queryset = Room.objects.filter(
            Q(teachers=user_id) | Q(students=user_id), id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized!')


class RoomAddUser(UpdateAPIView):
    serializer_class = RoomUpdateUserSerializer
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id
        # room_pk = self.kwargs.get('room_pk', None)
        user = self.kwargs.get('user', None)

        if user not in ('student', 'admin', 'teacher'):
            raise NotFound('Page not Found')

        queryset = Room.objects.filter(admins=user_id)  # , id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action!')

        # if not admin:
        #     raise PermissionDenied(
        #         'Only admin of this room can add users!')

        # queryset = Room.objects.filter(id=room_pk)

        # if queryset:
        #     return queryset
        # else:
        #     raise NotFound('Room does not exist!')

    def patch(self, request, *args, **kwargs):
        user = self.kwargs.get('user', None)
        room_pk = self.kwargs.get('room_pk', None)
        username = self.kwargs.get('username', None)

        try:
            new_user_id = get_user_model().objects.filter(
                username=username).values('id').first()['id']
            is_staff = get_user_model().objects.filter(
                username=username).values('is_staff').first()['is_staff']
        except:
            raise NotFound('User does not exist!')

        if user == 'admin':
            teacher_or_student = Room.objects.filter(
                Q(teachers=new_user_id) | Q(students=new_user_id), id=room_pk)

            if not teacher_or_student:
                raise PermissionDenied(
                    'First, this user has to be a member of this room to be an admin')

        elif user == 'teacher' and not is_staff:
            raise PermissionDenied(
                'This user is not authorized to be added as a teacher')

        elif user == 'student' and is_staff:
            raise PermissionDenied(
                'This user has too much authorization to be added as a student')

        """
        we can get a list of all users in the current room directly by using values_list
        """
        #existing_users_ids = Room.objects.filter(id=room_pk).values_list('user', flat=True)
        existing_users_ids = list(
            Room.objects.filter(id=room_pk).values(user + 's'))

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
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id
        # room_pk = self.kwargs.get('room_pk', None)
        user = self.kwargs.get('user', None)

        if user not in ('student', 'admin', 'teacher'):
            raise NotFound('Page not Found')

        queryset = Room.objects.filter(admins=user_id)  # , id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action!')

        # if not admin:
        #     raise PermissionDenied(
        #         'Only admins of this room can remove users!')

        # queryset = Room.objects.filter(id=room_pk)

        # if queryset:
        #     return queryset
        # else:
        #     raise NotFound('Room does not exist!')

    def patch(self, request, *args, **kwargs):
        user = self.kwargs.get('user', None)
        room_pk = self.kwargs.get('room_pk', None)
        username = self.kwargs.get('username', None)

        try:
            user_id = get_user_model().objects.filter(
                username=username).values('id').first()['id']
        except:
            raise NotFound('User does not exist!')

        is_owner = Room.objects.filter(owner=user_id, id=room_pk)

        if is_owner:
            raise PermissionDenied(
                "The owner cannot be removed from the member's list of a room")

        existing_users_ids = list(
            Room.objects.filter(id=room_pk).values(user + 's'))

        users = []
        user_existance = False

        for i in range(len(existing_users_ids)):
            if user_id == existing_users_ids[i][user + 's']:
                user_existance = True
                continue

            elif existing_users_ids[i][user + 's']:
                users.append(existing_users_ids[i][user + 's'])

        if not user_existance:
            raise NotFound("This user doesn't exist in %s list" % (user + 's'))

        request.data[user + 's'] = users

        return self.partial_update(request, *args, **kwargs)
