import json
import os

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "follow-helper" in line.lower():
            try:
                data = json.loads(line)
            except:
                continue
            
            # Print basic info
            print(f"Step {idx} - Type: {data.get('type')}, Status: {data.get('status')}")
            
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    # check all values for follow-helper
                    match = False
                    for k, v in args.items():
                        if isinstance(v, str) and "follow-helper" in v.lower():
                            match = True
                    if match:
                        print("  Tool call targetting follow-helper.js")
                        for key in ['CodeContent', 'ReplacementContent']:
                            if key in args:
                                val = args[key]
                                print(f"    {key} len: {len(val)}")
                                filename = f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\follow_extract_{idx}_{key}.txt"
                                with open(filename, 'w', encoding='utf-8') as out:
                                    out.write(val)
                                print(f"    Wrote {filename}")
