from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response
from .models import SubReddits
from .serializers import SubRedditsSerializer


class SubRedditsViewset(viewsets.ModelViewSet):
    queryset = SubReddits.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SubRedditsSerializer
