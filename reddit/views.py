from django.shortcuts import render
from rest_framework.views import APIView
from .models import SubReddits
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
import praw
import json
import random
from datetime import datetime

# Create your views here.


def getColor():
    random_number = random.randint(0, 16777215)
    hex_number = str(hex(random_number))
    hex_number = '#' + hex_number[2:]
    lighter_hex = hex_number  # color_variant(str(hex(random_number)))
    # print('A  Random Hex Color Code is :',hex_number)
    return hex_number, lighter_hex


class LoginUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        reddit = praw.Reddit(client_id='Rc-1RVgBBIF1Ig',
                             client_secret='RHqQkn9VdIIKW8vGLbdIwx0USM4',
                             user_agent='new_reditBot',
                             username=self.request.data['username'],
                             password=self.request.data['password'])

        subscribed = list(reddit.user.subreddits(limit=None))

        subreddit_array = []
        for subreddit in subscribed:
            subreddit_array.append({
                'user_name': self.request.data['username'],
                'community_icon_url': subreddit.community_icon,
                'created_utc': subreddit.created_utc,
                'description': subreddit.description[0:100],
                'subReddit_display_name': subreddit.display_name,
                'subReddit_id': subreddit.id,
                'language': subreddit.lang,
                'subReddit_name': subreddit.submission_type,
                'subReddit_type': subreddit.subreddit_type,
                'subReddit_subscribers': subreddit.subscribers,
                'subReddit_title': subreddit.title,
                'url': subreddit.url,
            })

        objects = [SubReddits(
            user_name=self.request.data['username'],
            community_icon_url=subreddit.community_icon,
            created_utc=datetime.utcfromtimestamp(
                subreddit.created_utc).strftime('%Y-%m-%d'),
            description=subreddit.description[0:100],
            subReddit_display_name=subreddit.display_name,
            subReddit_id=subreddit.id,
            language=subreddit.lang,
            subReddit_name=subreddit.submission_type,
            subReddit_type=subreddit.subreddit_type,
            subReddit_subscribers=subreddit.subscribers,
            subReddit_title=subreddit.title,
            url=subreddit.url,
        )
            for subreddit in subscribed
            if (not SubReddits.objects.filter(user_name=self.request.data['username'], url=subreddit.url).exists())
        ]

        message = SubReddits.objects.bulk_create(
            objects, ignore_conflicts=True)
        return JsonResponse({'subreddit': json.dumps(subreddit_array), 'upload_status': json.dumps(message)})


class getPostsData(APIView):
    def get(self, request, *args, **kwargs):
        reddit = praw.Reddit(client_id='Rc-1RVgBBIF1Ig',
                             client_secret='RHqQkn9VdIIKW8vGLbdIwx0USM4',
                             user_agent='new_reditBot')
        subreddit_posts = reddit.subreddit(
            self.request.query_params.get('subreddit_display_name'))
        main_count = 0
        domains = {}
        users = {}
        colors = getColor()
        pieColor = []
        pieColorlight = []
        domain_name = []
        domain_name_count = []
        for submission in subreddit_posts.top(limit=int(self.request.query_params.get('post_limit'))):
            if (not submission.is_self):
                main_count += 1
                colors = getColor()
                pieColor.append(colors[0])
                pieColorlight.append(colors[1])
                if submission.domain in domains:
                    domains[submission.domain] += 1
                else:
                    domains[submission.domain] = 1
                if submission.author in users:
                    users[submission.author] += 1
                else:
                    users[submission.author] = 1
        top_user = max(users, key=users.get)
        user_name = str(top_user)
        print(type(user_name))
        for domain, count in domains.items():
            if count > 0.02*int(self.request.query_params.get('post_limit')):
                domain_name.append(domain)
                domain_name_count.append(count)
        return JsonResponse({
            "labels": domain_name,
            "datasets": [
                {
                    'data': domain_name_count,
                    'backgroundColor': pieColor,
                    'hoverBackgroundColor': pieColorlight
                }
            ],
            "linkPost_count": main_count,
            "total_postCount": self.request.query_params.get('post_limit'),
            "top_user": user_name
        })
