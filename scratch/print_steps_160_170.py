import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in [163, 164, 165]:
            print(f"--- Step {idx} ---")
            data = json.loads(line)
            print("Type:", data.get('type'))
            print("Content:")
            print(data.get('content', '')[:1000])
            for tc in data.get('tool_calls', []):
                print("Tool:", tc.get('ToolName'))
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    print("Keys:", list(args.keys()))
                    for k, v in args.items():
                        if isinstance(v, str):
                            print(f"Arg {k} (len {len(v)}):")
                            print(v[:500])
