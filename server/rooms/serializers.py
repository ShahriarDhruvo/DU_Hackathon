from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'course', 'group', 'year']


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'course', 'group', 'year', 'owner', 'teachers']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'group', 'year']


class RoomUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'course', 'group', 
                'class_representatives', 'teachers', 'students']
        read_only_fields = ['year', 'group', 'course']
        extra_kwargs = {
            'class_representatives': {
                'allow_empty': True
            },
            'students': {
                'allow_empty': True
            }
        }
