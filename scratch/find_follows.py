import glob
import re

def search_follows():
    html_files = glob.glob("*.html")
    for filepath in sorted(html_files):
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        # Find all occurrences of the word "follow" case insensitively
        matches = re.finditer(r'[^<\
]*follow[^<\
]*', content, re.IGNORECASE)
        found = list(matches)
        if found:
            print(f"\
File: {filepath}")
            for m in found:
                # print matching snippet
                line_snippet = m.group(0).strip()
                if len(line_snippet) > 120:
                    line_snippet = line_snippet[:120] + "..."
                print(f"  - {line_snippet}")

if __name__ == "__main__":
    search_follows()
