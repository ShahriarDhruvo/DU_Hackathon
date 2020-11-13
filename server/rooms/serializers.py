from rest_framework import serializers

from .models import Room, PendingRequests


class RoomSerializer(serializers.ModelSerializer):

    course = serializers.StringRelatedField()

    class Meta:
        model = Room
        #fields = ['id', 'course', 'group', 'teachers', 'students', 'class_representatives', 'owner', 'courses']
        fields = '__all__'


class RoomListSerializer(serializers.ModelSerializer):

    course = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = ['id', 'course', 'group', 'year']

class UserPendingRequestRoomListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ['id']


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'course', 'group', 'year', 'owner', 'teachers']


class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'group', 'year']

class RoomMemberListSerializer(serializers.ModelSerializer):

    owner = serializers.StringRelatedField()
    students = serializers.StringRelatedField(many=True)
    teachers = serializers.StringRelatedField(many=True)
    class_representatives = serializers.StringRelatedField(many=True)

    class Meta:
        model = Room
        fields = ['owner', 'students', 'teachers', 'class_representatives']

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

class PendingRequestListSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()
    class Meta:
        model = PendingRequests
        fields = '__all__'


class PendingRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PendingRequests
        fields = '__all__'
