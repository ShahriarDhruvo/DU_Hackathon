from dj_rest_auth.serializers import PasswordResetSerializer, UserDetailsSerializer
from rest_framework import serializers
from django.conf import settings

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from dj_rest_auth.registration.serializers import RegisterSerializer


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
    reg_no = serializers.CharField(max_length=10)
    is_staff = serializers.BooleanField(default=False)
    department = serializers.CharField(required=True, max_length=5)
    university = serializers.CharField(required=True, max_length=100)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['reg_no'] = self.validated_data.get('reg_no', '')
        data_dict['is_staff'] = self.validated_data.get('is_staff', '')
        data_dict['department'] = self.validated_data.get('department', '')
        data_dict['university'] = self.validated_data.get('university', '')
        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = ('pk', 'username', 'is_staff', 'email',
                  'reg_no', 'department', 'university', )
        read_only_fields = ('email', )
