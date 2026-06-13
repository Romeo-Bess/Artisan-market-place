import os

root_dir = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub'
for root, dirs, files in os.walk(root_dir):
    # Exclude node_modules and .git
    if 'node_modules' in root or '.git' in root:
        continue
    for f in files:
        if 'login' in f.lower() or 'index.html' in f.lower():
            path = os.path.join(root, f)
            print(f"Found: {os.path.relpath(path, root_dir)} (size: {os.path.getsize(path)})")
