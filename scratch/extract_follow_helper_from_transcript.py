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
            tc_names = [tc.get('type') or tc.get('ToolName') for tc in data.get('tool_calls', [])]
            print(f"Step {idx} - Type: {data.get('type')}, ToolCalls: {tc_names}")
            
            # Let's inspect the first tool call
            tool_calls = data.get('tool_calls', [])
            for i, tc in enumerate(tool_calls):
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    # Print all keys
                    print(f"  TC {i} - Args keys: {list(args.keys())}")
                    # If it has CodeContent or ReplacementContent, write it out
                    for key in ['CodeContent', 'ReplacementContent']:
                        if key in args:
                            val = args[key]
                            print(f"    Writing {key} of step {idx} (len {len(val)})")
                            fn = f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\follow_extract_{idx}_{key}.txt"
                            with open(fn, 'w', encoding='utf-8') as out:
                                out.write(val)
