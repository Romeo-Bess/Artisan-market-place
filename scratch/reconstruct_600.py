import json
import re

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 600:
            obj = json.loads(line)
            content = obj.get('content', '')
            
            # Print length and lines
            lines = content.splitlines()
            print("Lines:", len(lines))
            
            output = []
            for l in lines:
                # Let's extract line number and value if it matches the format: <num>: <val>
                m = re.match(r'^\s*(\d+):\s?(.*)', l)
                if m:
                    output.append((int(m.group(1)), m.group(2)))
            
            print("Extracted lines count:", len(output))
            # Sort by line number
            output.sort(key=lambda x: x[0])
            
            # Write reconstructed lines
            reconstructed = [x[1] for x in output]
            with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\login\\index.html', 'w', encoding='utf-8') as out:
                out.write('\n'.join(reconstructed))
            print("Wrote login/index.html reconstructed from step 600!")
