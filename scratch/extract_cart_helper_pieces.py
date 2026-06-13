import json
import os

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in [1079, 1085, 1093, 1097]:
            print(f"--- Step {idx} ---")
            data = json.loads(line)
            for tc in data.get('tool_calls', []):
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    tf = args.get('TargetFile', '')
                    print("TargetFile:", tf)
                    code = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                    if code:
                        print("Code len:", len(code))
                        fn = f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\cart_step_{idx}.txt"
                        with open(fn, 'w', encoding='utf-8') as out:
                            out.write(code)
                        print("Wrote to", fn)
