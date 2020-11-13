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
    SectionSerializer,
    SectionUpdateSerializer
)
from .models import Section
from rooms.models import Room
from django.db.models import Q


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class SectionList(ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):

        room_pk = self.kwargs.get('room_pk', None)

        queryset = Section.objects.filter(room_id=room_pk).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No section has been created yet")


class SectionCreate(CreateAPIView):
    serializer_class = SectionSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        room_pk = self.kwargs.get('room_pk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        # if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied(
                "You are not authorized to create this section!")

        request.data._mutable = True
        request.data['room'] = room_pk
        request.data._mutable = False

        return super(SectionCreate, self).create(request, *args, **kwargs)


class SectionDelete(DestroyAPIView):
    lookup_url_kwarg = 'section_pk'

    def get_queryset(self):

        user_id = self.request.user.id

        #section_pk = self.kwargs.get('section_pk', None)
        room_pk = self.kwargs.get('room_pk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        if not is_teacher:
            raise PermissionDenied(
                "You are not authorized to delete this section!")

        queryset = Section.objects.filter(room_id=room_pk)#id=section_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")


class SectionUpdate(UpdateAPIView):
    serializer_class = SectionUpdateSerializer
    lookup_url_kwarg = 'section_pk'

    def get_queryset(self):
        user_id = self.request.user.id

        #section_pk = self.kwargs.get('section_pk', None)
        room_pk = self.kwargs.get('room_pk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=room_pk)

        if not is_teacher:
            raise PermissionDenied(
                "You are not authorized to edit this section!")

        queryset = Section.objects.filter(room_id=room_pk)#id=section_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")


class SectionDetails(ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):

        user_id = self.request.user.id

        section_pk = self.kwargs.get('section_pk', None)
        room_pk = self.kwargs.get('room_pk', None)

        is_teacher = Room.objects.filter(
            (Q(teachers=user_id) | Q(students=user_id)), id=room_pk)

        if not is_teacher:
            raise PermissionDenied(
                "You are not authorized to view this section!")

        queryset = Section.objects.filter(id=section_pk, room_id=room_pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")
