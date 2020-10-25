# Generated by Django 3.1.2 on 2020-10-25 16:28

import django.core.validators
from django.db import migrations, models
import rooms.models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0002_auto_20201024_1946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='year',
            field=models.PositiveIntegerField(default=2020, validators=[django.core.validators.MinValueValidator(2015), rooms.models.max_value_current_year]),
        ),
    ]
