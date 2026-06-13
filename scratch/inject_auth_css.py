import glob
import os

def inject_auth_css(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content
    head_inject = ""

    # Inject global CSS if not already present
    if "css/global.css" not in content:
        head_inject += '<link rel="stylesheet" href="./css/global.css">\n'

    # Inject supabase auth if not already present
    if "supabase-auth.js" not in content:
        head_inject += '<script type="module" src="./js/supabase-auth.js"></script>\n'

    if head_inject:
        content = content.replace("</head>", head_inject + "</head>")

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Injected auth/CSS in: {filepath}")
        return True
    return False

def main():
    html_files = glob.glob("*.html")
    updated = 0
    for f in sorted(html_files):
        if inject_auth_css(f):
            updated += 1
    print(f"\nInjected in {updated} of {len(html_files)} files.")

if __name__ == "__main__":
    main()
