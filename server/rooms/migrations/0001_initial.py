from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import rooms.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('universities', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.PositiveIntegerField(default=2020, validators=[django.core.validators.MinValueValidator(2015), rooms.models.max_value_current_year])),
                ('class_representatives', models.ManyToManyField(related_name='room_class_representatives', to=settings.AUTH_USER_MODEL)),
                ('course', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='universities.course')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='room_owner', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(related_name='room_students', to=settings.AUTH_USER_MODEL)),
                ('teachers', models.ManyToManyField(related_name='room_teachers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
