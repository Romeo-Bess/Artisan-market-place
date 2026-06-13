import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if "restoring" in line.lower() and "follow-helper" in line.lower():
            print(f"Step {idx} contains Restoring and follow-helper")
            try:
                data = json.loads(line)
            except:
                continue
            content = data.get('content', '')
            print("Type:", data.get('type'))
            print("Content snippet:")
            print(content[:1000])
            
            # Let's write the whole content of this step if it's a RUN_COMMAND or other type
            with open(f"C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\restore_step_{idx}.txt", 'w', encoding='utf-8') as out:
                out.write(content)
            print(f"Wrote restore_step_{idx}.txt")
