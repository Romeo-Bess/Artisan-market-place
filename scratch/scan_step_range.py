import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx >= 920:
            try:
                data = json.loads(line)
            except:
                continue
            
            tc_info = []
            for tc in data.get('tool_calls', []):
                tc_info.append(tc.get('ToolName'))
            print(f"Step {idx} - Type: {data.get('type')}, Status: {data.get('status')}, ContentLen: {len(data.get('content', ''))}, ToolCalls: {tc_info}")
