import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx == 959:
            data = json.loads(line)
            print("Step 959 Type:", data.get('type'))
            print("Keys:", data.keys())
            content = data.get('content', '')
            print("Content Len:", len(content))
            with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\scratch\step_959_raw.txt', 'w', encoding='utf-8') as out:
                out.write(content)
            
            tool_calls = data.get('tool_calls', [])
            for i, tc in enumerate(tool_calls):
                print(f"Tool call {i}: {tc.get('ToolName')}")
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    print("Args keys:", args.keys())
                    for k, v in args.items():
                        if isinstance(v, str) and len(v) > 200:
                            print(f"Arg {k} (len {len(v)}):")
                            print(v[:200])
                            with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\step_959_{k}.txt", 'w', encoding='utf-8') as arg_out:
                                arg_out.write(v)
            break
