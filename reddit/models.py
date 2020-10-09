from django.db import models

# Create your models here.


class SubReddits(models.Model):
    user_name = models.CharField(max_length=100)
    community_icon_url = models.CharField(max_length=200)
    created_utc = models.DateField()
    description = models.CharField(max_length=1100, default="No Description")
    subReddit_display_name = models.CharField(max_length=100)
    subReddit_id = models.CharField(max_length=50)
    language = models.CharField(max_length=50)
    subReddit_name = models.CharField(max_length=50)
    subReddit_submission_type = models.CharField(max_length=100)
    subReddit_type = models.CharField(max_length=100)
    subReddit_subscribers = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    subReddit_title = models.CharField(max_length=100)
    url = models.CharField(max_length=100)

    def __str__(self):
        return "{} {} ".format(self.user_name, self.subReddit_display_name,)
