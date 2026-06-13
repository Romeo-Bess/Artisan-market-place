import os

def main():
    filepath = "index.html"
    if not os.path.exists(filepath):
        print(f"Error: {filepath} not found.")
        return
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update logo link
    content = content.replace(
        '<a class="flex items-center gap-2" href="#">\
<img alt="Artisane"',
        '<a class="flex items-center gap-2" href="index.html">\
<img alt="Artisane"'
    )

    # 2. Update navbar links
    content = content.replace(
        '<a class="font-label-md text-label-md text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="#">Browse</a>',
        '<a class="font-label-md text-label-md text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="browse-gallery.html">Browse</a>'
    )
    content = content.replace(
        '<a class="font-label-md text-label-md text-on-surface-variant dark:text-inverse-on-surface/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="#">Artists</a>',
        '<a class="font-label-md text-label-md text-on-surface-variant dark:text-inverse-on-surface/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="artists.html">Artists</a>'
    )
    content = content.replace(
        '<a class="font-label-md text-label-md text-on-surface-variant dark:text-inverse-on-surface/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="#">Collections</a>',
        '<a class="font-label-md text-label-md text-on-surface-variant dark:text-inverse-on-surface/70 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200" href="live-auctions.html"
<truncated 13367 bytes>