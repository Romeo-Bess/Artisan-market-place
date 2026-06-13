import os
import glob

def clean_labels(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content
    
    # 1. Replace budget label dollar symbol
    content = content.replace("Estimated Budget ($)", "Estimated Budget (R)")
    content = content.replace("Estimated Budget ($ )", "Estimated Budget (R)")
    
    # 2. Replace the span dollar sign
    content = content.replace('<span class="font-label-sm text-on-surface-variant mr-2">$</span>',
                              '<span class="font-label-sm text-on-surface-variant mr-2">R</span>')
    content = content.replace('<span class="font-label-sm text-on-surface-variant mr-2">$ </span>',
                              '<span class="font-label-sm text-on-surface-variant mr-2">R </span>')

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Cleaned labels in: {filepath}")
        return True
    return False

def main():
    html_files = glob.glob("*.html")
    updated_count = 0
    for filepath in sorted(html_files):
        if clean_labels(filepath):
            updated_count += 1
    print(f"\
Cleaned budget labels in {updated_count} files.")

if __name__ == "__main__":
    main()
