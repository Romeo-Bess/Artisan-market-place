import json
import os

old_log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\84d445e7-b725-4ea9-9216-c33043516152\.system_generated\logs\transcript.jsonl'
if not os.path.exists(old_log_path):
    print("Old transcript does not exist!")
    exit(1)

best_code = None
best_len = 0

with open(old_log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in [24, 54, 539]:
            try:
                data = json.loads(line)
            except:
                continue
            
            # Print info
            content = data.get('content', '')
            print(f"Step {idx} content len: {len(content)}")
            
            # If there's a tool call writing supabase-auth.js
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                args = tc.get('Arguments') or tc.get('args')
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    tf = args.get('TargetFile', '')
                    if "supabase-auth.js" in tf:
                        code = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                        if len(code) > best_len:
                            best_len = len(code)
                            best_code = code
                            print(f"Found code in TC of step {idx} with len: {len(code)}")

            # Also search if the content itself has it (like if it was a file view)
            if "createClient" in content and len(content) > best_len:
                best_len = len(content)
                best_code = content
                print(f"Found code in content of step {idx} with len: {len(content)}")

if best_code:
    # Let's clean and write it
    out_path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\supabase-auth.js'
    
    # Check if there is header/footer view metadata in content
    if "File Path:" in best_code and "Total Lines:" in best_code:
        # Extract lines
        lines = best_code.splitlines()
        reconstructed_lines = []
        import re
        for l in lines:
            m = re.match(r'^\s*(\d+):\s?(.*)', l)
            if m:
                reconstructed_lines.append(m.group(2))
        best_code = '\n'.join(reconstructed_lines)
    
    # clean up JSON string quotes
    if best_code.startswith('"') and best_code.endswith('"'):
        try:
            best_code = json.loads(best_code)
        except:
            pass
            
    # Unescape
    best_code = best_code.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')
    
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write(best_code)
    print("Successfully restored supabase-auth.js to", out_path)
else:
    print("Could not find supabase-auth.js")
