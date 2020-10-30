from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.exceptions import (
    NotFound
)
from rest_framework.generics import (
    ListAPIView,
    UpdateAPIView
)

from ..serializers import (
    UniversitySerializer
)
from ..models import University
from django.conf import settings
from django.contrib.auth import get_user_model


class UniversityDetails(ListAPIView):
    serializer_class = UniversitySerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):

        queryset = University.objects.all()

        if queryset:
            return queryset
        else:
            raise NotFound('University has not been set yet!')
