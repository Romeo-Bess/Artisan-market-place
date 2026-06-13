import os
import glob
import re

def check_html_files():
    html_files = glob.glob("*.html")
    out_lines = []
    out_lines.append(f"Found {len(html_files)} HTML files in root directory.")
    
    for filepath in sorted(html_files):
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        hash_hrefs = re.findall(r'href\s*=\s*["\']#["\']', content)
        empty_hrefs = re.findall(r'href\s*=\s*["\']["\']', content)
        hash_onclick = re.findall(r'onclick\s*=\s*["\']#["\']', content)
        
        if hash_hrefs or empty_hrefs or hash_onclick:
            out_lines.append(f"\
File: {filepath}")
            if hash_hrefs:
                out_lines.append(f"  - href=\"#\": {len(hash_hrefs)} occurrences")
                lines = content.splitlines()
                for idx, line in enumerate(lines):
                    if 'href="#"' in line or "href='#'" in line:
                        out_lines.append(f"    Line {idx+1}: {line.strip()[:150]}")
            if empty_hrefs:
                out_lines.append(f"  - href=\"\": {len(empty_hrefs)} occurrences")
            if hash_onclick:
                out_lines.append(f"  - onclick=\"#\": {len(hash_onclick)} occurrences")
                
    with open("scratch/href_analysis.txt", "w", encoding="utf-8") as out_f:
        out_f.write("\
".join(out_lines))
    print("Report written to scratch/href_analysis.txt")

if __name__ == "__main__":
    check_html_files()
