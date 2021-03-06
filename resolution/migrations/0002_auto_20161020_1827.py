# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-10-20 18:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resolution', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='resolutions',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('pixel_density', models.DecimalField(decimal_places=6, max_digits=9)),
                ('time_stamp', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
            ],
        ),
        migrations.DeleteModel(
            name='Greeting',
        ),
    ]
