import json

with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\follow_replace_594.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    
repl = data.get('ReplacementContent', '')
print("ReplacementContent Length:", len(repl))
with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\extracted_follow_repl.js', 'w', encoding='utf-8') as out:
    out.write(repl)
print("Wrote extracted_follow_repl.js")
