from rest_framework import serializers

from .models import Section

# All Section serializers


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'
