import json

file_path = r"C:\Users\USER-PC\.gemini\antigravity-ide\brain\20eefff2-8ead-468a-9fa9-0dbeb582a37c\.system_generated\steps\150\content.md"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    
# The JSON data is on line 9
json_str = lines[8].strip()

data = json.loads(json_str)
posts = data['data']['children']

for i, post in enumerate(posts):
    p = post['data']
    print(f"{i+1}. **{p['title']}**")
    print(f"   * Score: {p['score']} | Author: {p['author']}")
    print(f"   * Link: https://reddit.com{p['permalink']}\
")
