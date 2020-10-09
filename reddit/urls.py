from django.urls import path, include
from .views import LoginUser, getPostsData
from .api import SubRedditsViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/subreddit', SubRedditsViewset, 'SubRedditsViewset')

urlpatterns = [
    path('api/addsubreddits', LoginUser.as_view()),
    path('api/getPostsData/', getPostsData.as_view()),
]
