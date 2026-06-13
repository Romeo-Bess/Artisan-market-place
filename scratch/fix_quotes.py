with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\follow-helper.js', 'r', encoding='utf-8') as f:
    content = f.read()

print("Length:", len(content))
print("First 20 chars:", repr(content[:20]))
print("Last 20 chars:", repr(content[-20:]))

# Strip quote if it exists
if content.startswith('"'):
    content = content[1:]
if content.endswith('"'):
    content = content[:-1]

# Unescape newlines and quotes
content = content.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')

with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\follow-helper.js', 'w', encoding='utf-8') as out:
    out.write(content)
print("Finished manual strip!")
