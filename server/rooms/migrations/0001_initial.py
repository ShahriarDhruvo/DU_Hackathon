# Generated by Django 3.1.2 on 2020-10-23 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(max_length=4)),
                ('title', models.CharField(max_length=50)),
                ('details', models.CharField(max_length=100)),
            ],
        ),
    ]
