# Generated by Django 3.0.8 on 2020-10-09 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SubReddits',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=100)),
                ('community_icon_url', models.CharField(max_length=200)),
                ('created_utc', models.DateField()),
                ('description', models.CharField(max_length=500)),
                ('subReddit_display_name', models.CharField(max_length=100)),
                ('subReddit_id', models.CharField(max_length=50)),
                ('language', models.CharField(max_length=50)),
                ('subReddit_name', models.CharField(max_length=50)),
                ('subReddit_submission_type', models.CharField(max_length=100)),
                ('subReddit_type', models.CharField(max_length=100)),
                ('subReddit_subscribers', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('subReddit_title', models.CharField(max_length=100)),
                ('url', models.CharField(max_length=100)),
            ],
        ),
    ]
