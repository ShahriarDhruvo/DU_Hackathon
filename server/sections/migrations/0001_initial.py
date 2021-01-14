# Generated by Django 3.1.2 on 2020-11-14 14:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rooms', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('room', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='rooms.room')),
            ],
        ),
    ]
