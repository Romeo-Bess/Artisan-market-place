import json

path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\follow-helper.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read().strip()

# If it starts and ends with double quotes, parse it as JSON to get the real string
if content.startswith('"') and content.endswith('"'):
    clean = json.loads(content)
else:
    # Try parsing it by wrapping it in JSON loads
    try:
        clean = json.loads('"' + content + '"')
    except Exception as e:
        # Fallback: manually replace
        clean = content.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"')

with open(path, 'w', encoding='utf-8') as out:
    out.write(clean)
print("Cleaned up follow-helper.js!")
