import os
import glob
import re

def convert_file(filepath):
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    original = content
    
    # 1. Replace currency selector text
    # e.g., "USD ($)" -> "ZAR (R)", "USD" -> "ZAR"
    content = content.replace("USD ($)", "ZAR (R)")
    content = content.replace("USD", "ZAR")
    content = content.replace("ZAR ($)", "ZAR (R)")
    
    # 2. Replace "$" followed by a number with "R "
    # e.g., $18,400.00 -> R 18,400.00
    content = re.sub(r'\$(\d+)', r'R \1', content)
    
    # 3. Replace "$ " followed by a number with "R "
    content = re.sub(r'\$\s+(\d+)', r'R \1', content)

    # 4. In terms-conditions.html, change increment text:
    # "$0 - $1,000 ($50), $1,000 - $5,000 ($250), $5,000+ ($500)" -> "R0 - R1,000 (R50)..."
    # The regex above will already convert it to R 0 - R 1,000 (R 50) etc., which is perfect!

    # 5. Make sure the currency dropdown displays ZAR or ZAR (R)
    # If the currency widget says something like:
    # <span class="font-label-sm text-label-sm text-on-surface-variant">USD ($)</span>
    # it is now replaced with ZAR (R).
    
    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [+] Converted currency in: {filepath}")
        return True
    return False

def main():
    html_files = glob.glob("*.html")
    updated_count = 0
    for filepath in sorted(html_files):
        if convert_file(filepath):
            updated_count += 1
    print(f"\
Successfully converted currency in {updated_count} files.")

if __name__ == "__main__":
    main()
