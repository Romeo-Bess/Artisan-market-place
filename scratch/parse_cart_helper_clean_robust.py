path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\cart-helper.js'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read().strip()

# Strip outer quotes if present
if content.startswith('"') and content.endswith('"'):
    content = content[1:-1]
elif content.startswith("'") and content.endswith("'"):
    content = content[1:-1]

# Decode escape sequences manually
clean = content.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace("\\'", "'").replace('\\\\', '\\')

# Remove truncation text if it ended up in the string
if "truncated" in clean:
    clean = clean.split("//")[0] # Or handle it cleanly

with open(path, 'w', encoding='utf-8') as out:
    out.write(clean)
print("Cleaned up cart-helper.js robustly!")
