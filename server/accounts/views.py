from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView, VerifyEmailView
from dj_rest_auth.social_serializers import TwitterLoginSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from rest_framework.exceptions import (
    NotFound,
    PermissionDenied,
)


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
