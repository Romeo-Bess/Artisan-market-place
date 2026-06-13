import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "isFollowing = btn.getAttribute" in line:
            try:
                data = json.loads(line)
            except:
                continue
            print(f"Step {idx} has match.")
            # Let's extract this line's content or tool call arguments
            content = data.get('content', '')
            if content:
                print("Content Len:", len(content))
                with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\follow_match_{idx}.txt", 'w', encoding='utf-8') as out:
                    out.write(content)
            for i, tc in enumerate(data.get('tool_calls', [])):
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    code = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                    if code:
                        print(f"Tool call {i} Code Len: {len(code)}")
                        with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\follow_match_{idx}_tool_{i}.txt", 'w', encoding='utf-8') as out:
                            out.write(code)
