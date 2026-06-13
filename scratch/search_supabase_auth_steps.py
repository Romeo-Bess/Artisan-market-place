import json
import os

old_log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\84d445e7-b725-4ea9-9216-c33043516152\.system_generated\logs\transcript.jsonl'
if not os.path.exists(old_log_path):
    print("Old transcript does not exist!")
    exit(1)

with open(old_log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "tab-login" in line.lower() or "btn-signup" in line.lower() or "auth-modal" in line.lower():
            try:
                data = json.loads(line)
            except:
                continue
            
            print(f"Step {idx} matched. Type: {data.get('type')}")
            content = data.get('content', '')
            if len(content) > 100:
                print("  Content Len:", len(content))
            
            tool_calls = data.get('tool_calls', [])
            for i, tc in enumerate(tool_calls):
                args = tc.get('Arguments') or tc.get('args')
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    print(f"  TC {i} args keys: {list(args.keys())}")
                    # If it has CodeContent or ReplacementContent, print length and write it
                    for k in ['CodeContent', 'ReplacementContent']:
                        if k in args:
                            val = args[k]
                            print(f"    {k} len: {len(val)}")
                            fn = f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\auth_match_{idx}_{k}.txt"
                            with open(fn, 'w', encoding='utf-8') as out:
                                out.write(val)
                            print(f"    Wrote {fn}")
