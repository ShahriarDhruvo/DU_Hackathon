from rest_framework import serializers

from .models import Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class SectionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'title']
