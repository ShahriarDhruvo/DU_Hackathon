from rest_framework import serializers

from .models import Room

# All Room serializers


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

# class RoomUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Room
#         fields = '__all__'
#         read_only_fields = ['owner', 'collaborators']