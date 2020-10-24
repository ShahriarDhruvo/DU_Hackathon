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
)
from .models import Section

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

        is_authenticated = request.user.is_staff

        if not is_authenticated:
            raise PermissionDenied("You are not authorized to create a section!")

        request.data._mutable = True
        request.data['room'] = rpk
        request.data._mutable = False

        return super(SectionCreate, self).create(request, *args, **kwargs)


class SectionDelete(DestroyAPIView):
    def get_queryset(self):
        
        pk = self.kwargs.get('pk', None)

        queryset = Section.objects.filter(id=pk)
        
        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")


class SectionUpdate(UpdateAPIView):
    
    serializer_class = SectionSerializer

    def get_queryset(self):

        pk = self.kwargs.get('pk', None)

        queryset = Section.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")


class SectionDetails(ListAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        
        pk = self.kwargs.get('pk', None)

        queryset = Section.objects.filter(id=pk)

        if queryset:
            return queryset
        else:
            raise NotFound("Section not found")



