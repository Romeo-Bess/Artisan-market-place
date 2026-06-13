import os

root_dir = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub'
for root, dirs, files in os.walk(root_dir):
    for f in files:
        if f == "follow-helper.js":
            path = os.path.join(root, f)
            print(f"Found follow-helper.js: {os.path.relpath(path, root_dir)} (size: {os.path.getsize(path)})")
