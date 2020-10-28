from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'course']


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id','course', 'year', 'owner', 'admins', 'teachers']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year']


class RoomUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'course', 'admins', 'teachers', 'students']
        read_only_fields = ['year', 'course']
        extra_kwargs = {
            'students': {
                'allow_empty': True
            }
        }
