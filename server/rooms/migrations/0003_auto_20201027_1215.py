# Generated by Django 3.1.2 on 2020-10-27 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('universities', '0001_initial'),
        ('rooms', '0002_auto_20201027_1156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='universities.course', unique=True),
        ),
    ]