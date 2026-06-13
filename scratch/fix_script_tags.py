import os
import glob
import re

def fix_script_tags(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content
    
    # Replace normal script tags for helpers with type="module" script tags
    content = content.replace('<script src="./js/theme-toggle-helper.js"></script>', '<script type="module" src="./js/theme-toggle-helper.js"></script>')
    content = content.replace('<script src="./js/cart-helper.js"></script>', '<script type="module" src="./js/cart-helper.js"></script>')
    content = content.replace('<script src="./js/follow-helper.js"></script>', '<script type="module" src="./js/follow-helper.js"></script>')
    
    # Let's also do a regex search for any helper scripts without type="module"
    content = re.sub(r'<script\s+src="\./js/theme-toggle-helper\.js"\s*></script>', '<script type="module" src="./js/theme-toggle-helper.js"></script>', content)
    content = re.sub(r'<script\s+src="\./js/cart-helper\.js"\s*></script>', '<script type="module" src="./js/cart-helper.js"></script>', content)
    content = re.sub(r'<script\s+src="\./js/follow-helper\.js"\s*></script>', '<script type="module" src="./js/follow-helper.js"></script>', content)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed: {filepath}")

def main():
    for f in glob.glob("*.html"):
        fix_script_tags(f)

if __name__ == "__main__":
    main()
