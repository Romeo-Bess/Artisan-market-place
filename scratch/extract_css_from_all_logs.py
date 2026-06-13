import json
import os

convs = [
    "73eb0d29-0380-4a46-8d96-2fc5456717b6",
    "bd3bc312-25da-4997-9ce2-9792cbd24ea0",
    "c26c87ac-b152-4d0e-b5c9-8119745ca4dc",
    "84d445e7-b725-4ea9-9216-c33043516152",
    "3e700066-efd8-471f-8d68-69a84ba776cb",
    "a5fdb0a8-605a-4bb6-a404-7d8146c15eec",
    "62c0a7e1-0c32-4d08-8b03-512e603e4f8e",
    "046d5e87-9f01-4061-84fe-602e7f5119fd",
    "32672e61-beb1-4dcc-a93b-8abf5fe7de03",
    "20eefff2-8ead-468a-9fa9-0dbeb582a37c",
    "23d8fb62-1759-45bf-8c48-9578d9eeb7d3",
    "25c113ed-f334-457c-9391-3ebf0176848d"
]

best_code = None
best_len = 0

for c in convs:
    log_path = f"C:\\Users\\USER-PC\\.gemini\\antigravity-ide\\brain\\{c}\\.system_generated\\logs\\transcript.jsonl"
    if not os.path.exists(log_path):
        continue
    
    with open(log_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if "global.css" in line:
                try:
                    data = json.loads(line)
                except:
                    continue
                
                # Check tool calls
                tool_calls = data.get('tool_calls', [])
                for tc in tool_calls:
                    name = tc.get('name') or tc.get('ToolName')
                    if name in ['write_to_file', 'WRITE_TO_FILE']:
                        args = tc.get('args') or tc.get('Arguments')
                        if isinstance(args, dict):
                            tf = args.get('TargetFile', '')
                            if "global.css" in tf:
                                code = args.get('CodeContent', '')
                                if len(code) > best_len and "truncated" not in code.lower():
                                    best_len = len(code)
                                    best_code = code
                                    print(f"Found code in convo {c} step {idx} with len: {len(code)}")

if best_code:
    out_path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\css\global.css'
    
    if best_code.startswith('"') and best_code.endswith('"'):
        try:
            best_code = json.loads(best_code)
        except:
            pass
            
    best_code = best_code.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\\\', '\\')
    
    with open(out_path, 'w', encoding='utf-8') as out:
        out.write(best_code)
    print("Successfully restored global.css to", out_path)
else:
    print("Could not find global.css in any old transcripts.")
