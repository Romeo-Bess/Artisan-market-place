import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in [180, 204]:
            print(f"--- Step {idx} ---")
            data = json.loads(line)
            content = data.get('content', '')
            print("Type:", data.get('type'))
            print("Content snippet:")
            print(content[:500])
            for tc in data.get('tool_calls', []):
                args = tc.get('args', {}) or tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    print("ToolArgs keys:", list(args.keys()))
                    for k, v in args.items():
                        if isinstance(v, str):
                            print(f"  Arg {k} len: {len(v)}")
                            with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\css_extract_{idx}_{k}.txt", 'w', encoding='utf-8') as out:
                                out.write(v)
                            print(f"  Wrote css_extract_{idx}_{k}.txt")
            print()
