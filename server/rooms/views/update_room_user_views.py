from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import (
    NotFound,
    APIException,
    NotAcceptable,
    PermissionDenied,
)
from rest_framework.generics import (
    UpdateAPIView
)

from ..serializers import (
    RoomUpdateUserSerializer
)
from ..models import Room
from django.db.models import Q
from django.contrib.auth import get_user_model


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class RoomAddUser(UpdateAPIView):
    serializer_class = RoomUpdateUserSerializer
    lookup_url_kwarg = 'room_pk'

    def get_queryset(self):
        user_id = self.request.user.id
        user = self.kwargs.get('user', None)

        if user not in ('student', 'class_representative', 'teacher'):
            raise NotFound('Page not Found')

        queryset = Room.objects.filter(Q(teachers=user_id) | Q(
            class_representatives=user_id))
        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action!')

    def patch(self, request, *args, **kwargs):
        user = self.kwargs.get('user', None)
        room_pk = self.kwargs.get('room_pk', None)
        username = self.kwargs.get('username', None)

        try:
            new_user_id = get_user_model().objects.filter(
                username=username).values_list('id', flat=True).first()

            is_teacher = (get_user_model().objects.filter(
                username=username).values_list('status', flat=True).first() == 1)
        except:
            raise NotFound('User does not exist!')

        if user == 'class_representative':
            is_student = Room.objects.filter(students=new_user_id, id=room_pk)

            if not is_student:
                raise PermissionDenied(
                    'First, this user has to be a student of this room to be a CR(Class Representative)')

        elif user == 'teacher' and not is_teacher:
            raise PermissionDenied(
                'This user is not authorized to be added as a teacher')

        elif user == 'student' and is_teacher:
            raise PermissionDenied(
                'This user has too much authorization to be added as a student')

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
        user = self.kwargs.get('user', None)

        if user not in ('student', 'class_representative', 'teacher'):
            raise NotFound('Page not Found')

        queryset = Room.objects.filter(Q(teachers=user_id) | Q(
            class_representatives=user_id))

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Room does not exist or you are not authorized for this action!')

    def patch(self, request, *args, **kwargs):
        user = self.kwargs.get('user', None)
        room_pk = self.kwargs.get('room_pk', None)
        username = self.kwargs.get('username', None)

        try:
            user_id = get_user_model().objects.filter(
                username=username).values_list('id', flat=True).first()
        except:
            raise NotFound('User does not exist!')

        if user in ('teacher', 'class_representative') and self.request.user.status == 2:
            raise PermissionDenied(
                'Only a Teacher can remove other Teachers or Class Representatives')

        is_owner = Room.objects.filter(owner=user_id, id=room_pk)

        if is_owner:
            raise PermissionDenied(
                "The owner cannot be removed from the member's list of a room")

        # Check if this is user is a CR or not (Because you have to remove him from CR's List first then remove him from student's list)
        if user == 'student':
            existing_cr_ids = list(
                Room.objects.filter(id=room_pk).values("class_representatives"))

            for i in range(len(existing_cr_ids)):
                if user_id == existing_cr_ids[i]["class_representatives"]:
                    raise NotAcceptable("First remove him from CR's list")

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
