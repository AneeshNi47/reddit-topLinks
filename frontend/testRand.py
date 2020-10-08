""""
import praw
import requests

reddit = praw.Reddit(username="anee91_hatter",
                     password="metronews1234",
                     client_id="Rc-1RVgBBIF1Ig",
                     client_secret="RHqQkn9VdIIKW8vGLbdIwx0USM4",
                     user_agent="my user agent")

for submission in reddit.user.subreddits(limit=None):
    print(submission.display_name)
    for collection in reddit.subreddit(submission.title).collections:
        print(collection.permalink)
    url = "https://www.reddit.com{}/new/.json?limit=100".format(submission.url)
"""

import requests
import requests.auth

client_auth = requests.auth.HTTPBasicAuth(
    'Rc-1RVgBBIF1Ig', 'RHqQkn9VdIIKW8vGLbdIwx0USM4')
post_data = {"grant_type": "password",
             "username": "anee91_hatter", "password": "metronews1234"}
headers = {"User-Agent": "ChangeMeClient/0.1 by YourUsername"}
response = requests.post("https://www.reddit.com/api/v1/access_token",
                         auth=client_auth, data=post_data, headers=headers)
print(response.json())
