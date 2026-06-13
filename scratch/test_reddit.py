import urllib.request
import json
import sys

def get_top_posts(subreddit):
    url = f"https://www.reddit.com/r/{subreddit}/top.json?limit=3&t=month"
    req = urllib.request.Request(
        url, 
        data=None, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            posts = data['data']['children']
            for i, post in enumerate(posts):
                p = post['data']
                print(f"{i+1}. {p['title']}")
                print(f"   Score: {p['score']} | Author: {p['author']}")
                print(f"   URL: https://www.reddit.com{p['permalink']}\
")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_top_posts(sys.argv[1] if len(sys.argv) > 1 else "n8n")