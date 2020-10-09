from django.contrib import admin
from django.urls import path
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls'), name='frontend'),
    path('', include('reddit.urls'), name='reddit')
]
