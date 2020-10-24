from rest_framework import serializers

from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'owner', 'year', 'title']


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title', 'details', 'owner', 'admins', 'teachers']
        read_only_fields = ['students']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'year', 'title', 'details']
        read_only_fields = ['owner', 'admins', 'teachers', 'students']


class RoomUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'admins', 'teachers', 'students']
        read_only_fields = ['owner', 'year', 'title', 'details']
