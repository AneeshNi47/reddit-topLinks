# Generated by Django 3.0.8 on 2020-10-09 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reddit', '0004_remove_subreddits_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='subreddits',
            name='description',
            field=models.CharField(default='No Description', max_length=1100),
        ),
    ]
