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

from ..serializers import (
    CourseSerializer
)
from ..models import Course
from django.db.models import Q
from django.conf import settings
from django.contrib.auth import get_user_model


class Conflict(APIException):
    status_code = 409
    default_code = 'conflit'
    default_detail = 'Item already exist.'


class CourseList(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        # user_id = self.request.user.id

        # queryset = Department.objects.filter(
        #     Q(teachers=user_id) | Q(students=user_id)).order_by('id')

        department_pk = self.kwargs.get('department_pk', None)

        is_authenticated = self.request.user.is_superuser

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to view course list!')

        queryset = Course.objects.filter(department_id=department_pk).order_by('id')

        if queryset:
            return queryset
        else:
            raise NotFound('No course has been created yet!')


class CourseCreate(CreateAPIView):
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):

        department_pk = self.kwargs.get('department_pk', None)

        is_authenticated = request.user.is_superuser

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to create a course!')

        request.data._mutable = True
        request.data['department'] = department_pk
        request.data._mutable = False

        return super(CourseCreate, self).create(request, *args, **kwargs)


class CourseDelete(DestroyAPIView):
    lookup_url_kwarg = 'course_pk'

    def get_queryset(self):

        department_pk = self.kwargs.get('department_pk', None)

        is_authenticated = self.request.user.is_superuser

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to delete courses!')

        queryset = Course.objects.filter(department_id=department_pk)

        if is_authenticated:
            return queryset
        else:
            raise NotFound(
                'Course does not exist!')


class CourseUpdate(UpdateAPIView):
    serializer_class = CourseSerializer
    lookup_url_kwarg = 'course_pk'

    def get_queryset(self):
        
        department_pk = self.kwargs.get('department_pk', None)

        is_authenticated = self.request.user.is_superuser

        if not is_authenticated:
            raise PermissionDenied('You are not authorized to update courses!')

        queryset = Course.objects.filter(department_id=department_pk)

        if queryset:
            return queryset
        else:
            raise NotFound(
                'Course does not exist!')


class CourseDetails(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        
        department_pk = self.kwargs.get('department_pk', None)
        course_pk = self.kwargs.get('course_pk', None)

        is_authenticated = self.request.user.is_superuser

        if not is_authenticated:
            raise NotAcceptable('You are not authoraised to view this!')

        queryset = Course.objects.filter(id=course_pk, department_id=department_pk)

        if queryset:
            return queryset
        else:
            raise NotAcceptable(
                'Course does not exist!')
