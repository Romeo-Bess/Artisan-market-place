import json
import os

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "tailwind-config" in line and "tailwind.config" in line:
            print(f"Match on line {idx}")
            try:
                data = json.loads(line)
            except:
                continue
            
            # Print parts containing tailwind config
            content = data.get('content', '')
            if content:
                print(f"Content length: {len(content)}")
                idx_tw = content.find("tailwind-config")
                if idx_tw != -1:
                    print(content[idx_tw-100:idx_tw+400])
                    
            for tc in data.get('tool_calls', []):
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    code = args.get('CodeContent', '')
                    if code:
                        idx_tw = code.find("tailwind-config")
                        if idx_tw != -1:
                            print("In CodeContent:")
                            print(code[idx_tw-100:idx_tw+600])
