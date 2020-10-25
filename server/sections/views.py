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

class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class SectionList(ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):

        rpk = self.kwargs.get('rpk', None)

        queryset = Section.objects.filter(room_id=rpk).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound("No section has been created yet!")


class SectionCreate(CreateAPIView):
    serializer_class = SectionSerializer

    def create(self, request, *args, **kwargs):
        user_id = request.user.id

        rpk = self.kwargs.get('rpk', None)

        #is_authenticated = request.user.is_staff
        is_teacher = Room.objects.filter(teachers=user_id, id=rpk)

        #if not is_authenticated:
        if not is_teacher:
            raise PermissionDenied("You are not authorized to create this section!")

        request.data._mutable = True
        request.data['room'] = rpk
        request.data._mutable = False

        return super(SectionCreate, self).create(request, *args, **kwargs)


class SectionDelete(DestroyAPIView):
    def get_queryset(self):

        user_id = self.request.user.id
        
        pk = self.kwargs.get('pk', None)
        rpk = self.kwargs.get('rpk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=rpk)

        if not is_teacher:
            raise PermissionDenied("You are not authorized to delete this section!")

        queryset = Section.objects.filter(id=pk)
        
        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")

        

class SectionUpdate(UpdateAPIView):
    
    serializer_class = SectionUpdateSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        
        pk = self.kwargs.get('pk', None)
        rpk = self.kwargs.get('rpk', None)

        is_teacher = Room.objects.filter(teachers=user_id, id=rpk)

        if not is_teacher:
            raise PermissionDenied("You are not authorized to edit this section!")

        queryset = Section.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")





class SectionDetails(ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        
        user_id = self.request.user.id
        
        pk = self.kwargs.get('pk', None)
        rpk = self.kwargs.get('rpk', None)

        is_teacher = Room.objects.filter((Q(teachers=user_id) | Q(students=user_id)), id=rpk)

        if not is_teacher:
            raise PermissionDenied("You are not authorized to view this section!")

        queryset = Section.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")
