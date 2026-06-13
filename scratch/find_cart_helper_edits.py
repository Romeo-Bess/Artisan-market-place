import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\84d445e7-b725-4ea9-9216-c33043516152\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "cart-helper" in line.lower():
            try:
                data = json.loads(line)
            except:
                continue
            
            tool_calls = data.get('tool_calls', [])
            for tc_idx, tc in enumerate(tool_calls):
                args = tc.get('args', {}) or tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    match = False
                    for k, v in args.items():
                        if isinstance(v, str) and "cart-helper" in v.lower():
                            match = True
                    if match:
                        print(f"Step {idx} TC {tc_idx} matched! Name: {tc.get('name') or tc.get('ToolName')}")
                        for k, v in args.items():
                            if k in ['CodeContent', 'ReplacementContent']:
                                print(f"  {k} len: {len(v)}")
                                with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\cart_old_extract_{idx}_{k}.txt", 'w', encoding='utf-8') as out:
                                    out.write(v)
                                print(f"  Wrote scratch\\cart_old_extract_{idx}_{k}.txt")
