import json
import re

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'

collected_lines = {} # line_number -> content

with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "login/index.html" in line:
            # Let's search for line patterns in the raw line text to be simple and robust
            # Pattern: "123: content" or '123: content' or \n123: content\n
            # Let's look for "(\d+): (.*?)(?:\\r)?\\n" or similar
            matches = re.findall(r'(?:^|\\n|\r|\n)(\d+):\s?(.*?)(?=\\r|\\n|\r|\n|$)', line)
            for num_str, content in matches:
                num = int(num_str)
                # Filter out obvious false positives (e.g. if content is just a number or empty, or part of a timestamp)
                if len(content.strip()) > 0:
                    # Keep the longest content for this line number
                    if num not in collected_lines or len(content) > len(collected_lines[num]):
                        collected_lines[num] = content

print("Total unique line numbers collected:", len(collected_lines))
sorted_keys = sorted(collected_lines.keys())
if sorted_keys:
    print("Range:", sorted_keys[0], "to", sorted_keys[-1])
    for k in range(sorted_keys[0], sorted_keys[-1]+1):
        if k not in collected_lines:
            print("Missing line:", k)
        else:
            # Let's clean up escape sequences
            val = collected_lines[k]
            # If it's escaped quotes, unescape them
            val = val.replace('\\"', '"').replace("\\'", "'").replace('\\\\', '\\')
            collected_lines[k] = val

    # Let's print or save them
    with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\scratch\recovered_login_lines.html', 'w', encoding='utf-8') as out:
        for k in sorted_keys:
            out.write(f"{k}: {collected_lines[k]}\n")
    print("Wrote recovered_login_lines.html")
else:
    print("No lines collected")
