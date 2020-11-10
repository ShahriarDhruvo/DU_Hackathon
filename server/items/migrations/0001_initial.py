# Generated by Django 3.1.2 on 2020-11-09 11:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sections', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('content', models.TextField(null=True)),
                ('post_datetime', models.DateTimeField(auto_now=True)),
                ('section', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='sections.section')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(null=True)),
                ('comment_datetime', models.DateTimeField(auto_now=True)),
                ('vote', models.IntegerField(blank=True, default=0)),
                ('item', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='items.item')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
