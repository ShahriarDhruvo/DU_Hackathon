# Generated by Django 3.1.2 on 2021-02-07 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='attachments',
            field=models.FileField(blank=True, default='', upload_to=''),
        ),
    ]
