from rest_framework import serializers
from .models import University, Department, Course

class UniversitySerializer(serializers.ModelSerializer):

    class Meta:
        model = University
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

class CourseUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ['title', 'details']
        