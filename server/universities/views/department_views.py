from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
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

from ..serializers import (
    DepartmentSerializer
)
from ..models import Department
from django.db.models import Q
from django.conf import settings
from django.contrib.auth import get_user_model


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class DepartmentList(ListAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):

        # user_university = self.request.user.university

        #is_authenticated = self.request.user.status == 0

        # if not is_authenticated:
        #     raise PermissionDenied('You are not authorized to view department list!')

        #queryset = Department.objects.all().order_by('id')
        # queryset = Department.objects.filter(
        #     university_id=user_university).order_by('id')
        queryset = Department.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound('No department has been created yet!')


class DepartmentCreate(CreateAPIView):
    serializer_class = DepartmentSerializer

    def create(self, request, *args, **kwargs):

        is_authenticated = request.user.status == 0

        if not is_authenticated:
            raise PermissionDenied(
                'You are not authorized to create a department!')

        return super(DepartmentCreate, self).create(request, *args, **kwargs)


class DepartmentDelete(DestroyAPIView):
    lookup_url_kwarg = 'department_pk'

    def get_queryset(self):
        is_authenticated = self.request.user.status == 0

        if is_authenticated:
            return Department.objects.all()
        else:
            raise NotAcceptable(
                'Department does not exist or only the admin is authorized for deletion')


class DepartmentUpdate(UpdateAPIView):
    serializer_class = DepartmentSerializer
    lookup_url_kwarg = 'department_pk'

    def get_queryset(self):
        is_authenticated = self.request.user.status == 0

        if is_authenticated:
            return Department.objects.all()
        else:
            raise NotAcceptable(
                'Department does not exist or only the owner of this Department is authorized for deletion')


class DepartmentDetails(ListAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        department_pk = self.kwargs.get('department_pk', None)

        # is_authenticated = self.request.user.status == 0

        # if not is_authenticated:
        #     raise NotAcceptable('You are not authoraised to view this!')

        queryset = Department.objects.filter(id=department_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Department does not exist!')
