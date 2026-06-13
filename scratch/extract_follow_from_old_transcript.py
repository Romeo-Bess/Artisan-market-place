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
        if "follow-helper.js" in line:
            try:
                data = json.loads(line)
            except:
                continue
            
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                # The name in the tool call might be write_to_file
                name = tc.get('name') or tc.get('ToolName')
                if name in ['write_to_file', 'WRITE_TO_FILE']:
                    args = tc.get('args') or tc.get('Arguments')
                    if isinstance(args, dict):
                        target = args.get('TargetFile', '')
                        if "follow-helper.js" in target:
                            code = args.get('CodeContent', '')
                            if len(code) > best_len:
                                best_len = len(code)
                                best_code = code

if best_code:
    print(f"Found follow-helper.js in old transcript with length {best_len}")
    out_path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\follow-helper.js'
    
    # clean up escaping
    if best_code.startswith('"') and best_code.endswith('"'):
        try:
            best_code = json.loads(best_code)
        except:
            pass
            
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write(best_code)
    print("Successfully restored to", out_path)
else:
    print("Could not find follow-helper.js in old transcript.")
