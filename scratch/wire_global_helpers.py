import os
import glob

def wire_helpers(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content
    
    # Scripts to inject in the head
    helper_scripts = """
<!-- Global Site Interaction Helpers -->
<script src="./js/theme-toggle-helper.js"></script>
<script src="./js/cart-helper.js"></script>
<script src="./js/follow-helper.js"></script>
</head>
"""

    # Only inject if they are not already in the file
    if "theme-toggle-helper.js" not in content:
        content = content.replace("</head>", helper_scripts)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Injected interaction helpers in: {filepath}")
        return True
    return False

def main():
    html_files = glob.glob("*.html")
    updated_count = 0
    for filepath in sorted(html_files):
        if wire_helpers(filepath):
            updated_count += 1
    print(f"\
Injected interaction helpers in {updated_count} files.")

if __name__ == "__main__":
    main()
