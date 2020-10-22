from rest_framework import serializers

from .models import Room

# All Room serializers


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
