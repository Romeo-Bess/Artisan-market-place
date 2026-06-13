import json
import os

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx >= 705:
            break
        if "login/index.html" in line or "Sign In | Artisane" in line:
            # Parse line
            try:
                data = json.loads(line)
            except:
                continue
            
            content = data.get('content', '')
            tool_calls = data.get('tool_calls', [])
            
            tc_info = []
            for tc in tool_calls:
                args = tc.get('Arguments', {})
                if isinstance(args, str):
                    try: args = json.loads(args)
                    except: pass
                if isinstance(args, dict):
                    keys = list(args.keys())
                    tc_info.append(f"Tool: {tc.get('ToolName')}, Keys: {keys}, CodeLen: {len(str(args.get('CodeContent', '') or args.get('ReplacementContent', '')))}")
            
            print(f"Step {idx} - Type: {data.get('type')}, Status: {data.get('status')}, ContentLen: {len(content)}, ToolCalls: {tc_info}")
