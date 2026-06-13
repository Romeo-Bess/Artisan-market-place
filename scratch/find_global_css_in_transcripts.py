import json
import os

logs = [
    r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl',
    r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\84d445e7-b725-4ea9-9216-c33043516152\.system_generated\logs\transcript.jsonl'
]

for log_path in logs:
    if not os.path.exists(log_path):
        continue
    print("Scanning:", os.path.basename(os.path.dirname(os.path.dirname(log_path))))
    with open(log_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if "global.css" in line:
                try:
                    data = json.loads(line)
                except:
                    continue
                content = data.get('content', '')
                tool_calls = data.get('tool_calls', [])
                
                if len(content) > 100:
                    print(f"  Step {idx} content len: {len(content)}")
                
                for i, tc in enumerate(tool_calls):
                    args = tc.get('Arguments', {}) or tc.get('args', {})
                    if isinstance(args, str):
                        try: args = json.loads(args)
                        except: pass
                    if isinstance(args, dict):
                        for k, v in args.items():
                            if isinstance(v, str) and len(v) > 100:
                                print(f"  Step {idx} TC {i} {k} len: {len(v)}")
                                if "material-symbols-outlined" in v and "truncated" not in v.lower():
                                    print("    (Found clean code of len:", len(v), ")")
