# Generated by Django 3.1.5 on 2021-02-04 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('edu', '0035_auto_20210204_1019'),
    ]

    operations = [
        migrations.RenameField(
            model_name='classes',
            old_name='courseID',
            new_name='course',
        ),
    ]
