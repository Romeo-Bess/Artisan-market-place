import json

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx == 164:
            data = json.loads(line)
            # Dump the whole JSON object of step 164 to a text file
            with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\step_164_full.json', 'w', encoding='utf-8') as out:
                json.dump(data, out, indent=2)
            print("Wrote step_164_full.json")
            break
