# Generated by Django 3.1.2 on 2020-10-26 06:47

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import rooms.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('details', models.CharField(max_length=100)),
                ('year', models.PositiveIntegerField(default=2020, validators=[django.core.validators.MinValueValidator(2015), rooms.models.max_value_current_year])),
                ('admins', models.ManyToManyField(related_name='room_admins', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='room_owner', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(related_name='room_students', to=settings.AUTH_USER_MODEL)),
                ('teachers', models.ManyToManyField(related_name='room_teachers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
