from dj_rest_auth.serializers import PasswordResetSerializer, UserDetailsSerializer
from rest_framework import serializers
from django.conf import settings

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from dj_rest_auth.registration.serializers import RegisterSerializer

from universities.models import University, Department


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def save(self):
        request = self.context.get('request')

        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
            'email_template_name': 'password_reset_email.html'
        }

        opts.update(self.get_email_options())
        self.reset_form.save(**opts)


class CustomRegisterSerializer(RegisterSerializer):

    Admin = 0
    Teacher = 1
    Student = 2

    STATUS_CHOICES = [
        (Admin, 'Admin'),
        (Teacher, 'Teacher'),
        (Student, 'Student')
    ]

    department = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects, allow_null=True)
    university = serializers.PrimaryKeyRelatedField(
        queryset=University.objects, required=True)
    reg_no = serializers.IntegerField(min_value=0, allow_null=True)
    status = serializers.ChoiceField(choices=STATUS_CHOICES)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['status'] = self.validated_data.get('status', None)
        data_dict['reg_no'] = self.validated_data.get('reg_no', None)
        data_dict['department'] = self.validated_data.get('department', None)
        data_dict['university'] = self.validated_data.get('university', None)
        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = ('pk', 'username', 'status', 'email',
                  'reg_no', 'department', 'university', )
        read_only_fields = ('email', )
