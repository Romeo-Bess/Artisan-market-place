import json
import re

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 772:
            obj = json.loads(line)
            content_str = obj.get('content', '')
            
            # Let's search with regex
            m = re.search(r"'CodeContent': '\"(.*?)\"', 'Description'", content_str)
            if m:
                print("Found match!")
                code = m.group(1)
                # Decode python escape characters
                code_decoded = code.encode().decode('unicode-escape')
                print("Decoded length:", len(code_decoded))
                
                # Replace backslash quotes
                code_decoded = code_decoded.replace('\\"', '"').replace('\\n', '\n')
                with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\login\\index.html', 'w', encoding='utf-8') as out:
                    out.write(code_decoded)
                print("Wrote login/index.html")
