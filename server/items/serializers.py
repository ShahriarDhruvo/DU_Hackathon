from rest_framework import serializers

from .models import (
    Item,
    Comment
)


# All item serializers
class ItemSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()

    class Meta:
        model = Item
        fields = '__all__'


class ItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'


class ItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'content', 'date', 'time']


# All comment serializers
class CommentSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'


class CommentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'


class CommentUpdateSerializer(serializers.ModelSerializer):

    #user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'comment_datetime', 'vote']
