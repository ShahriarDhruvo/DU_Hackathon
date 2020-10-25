from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title']


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title', 'details',
                  'owner', 'admins', 'teachers']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title', 'details']


class RoomUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title', 'admins', 'teachers', 'students']
        read_only_fields = ['year', 'title']
        extra_kwargs = {
            'students': {
                'allow_empty': True
            }
        }
