import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx == 984:
            data = json.loads(line)
            content = data.get('content', '')
            print("Step 984 Content Length:", len(content))
            with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\scratch\step_984_raw.txt', 'w', encoding='utf-8') as out:
                out.write(content)
            break
