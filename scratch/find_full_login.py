import json
import re
import os

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
if not os.path.exists(log_path):
    print("Transcript log path does not exist!")
    exit(1)

best_content = None
best_len = 0
best_step = -1

with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "Sign In | Artisane" in line:
            # Parse line
            try:
                data = json.loads(line)
            except Exception as e:
                print(f"Failed to parse line {idx}: {e}")
                continue
            
            # Look inside content or tool_calls
            # Find the longest snippet
            content_str = data.get('content', '')
            if len(content_str) > best_len and "html" in content_str.lower() and not "truncated" in content_str.lower():
                best_len = len(content_str)
                best_content = content_str
                best_step = idx
            
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try:
                        args = json.loads(args)
                    except:
                        pass
                if isinstance(args, dict):
                    code = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                    if isinstance(code, str) and "Sign In | Artisane" in code and len(code) > best_len:
                        best_len = len(code)
                        best_content = code
                        best_step = idx

print(f"Best step: {best_step} with length: {best_len}")
if best_content:
    print("Writing best content to login/index.html")
    # Clean up escaping if needed
    if best_content.startswith('"') and best_content.endswith('"'):
        try:
            best_content = json.loads(best_content)
        except:
            pass
    
    os.makedirs(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\login', exist_ok=True)
    out_path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\login\index.html'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(best_content)
    print("Wrote to", out_path)
else:
    print("No non-truncated content found.")
