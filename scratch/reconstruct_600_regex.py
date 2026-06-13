import json
import re

with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\login_step_600.txt', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
output = []
for l in lines:
    # We want to find strings that match pattern like: <idx> '<line_no>: <content>' or <idx> "<line_no>: <content>"
    # Let's match: <idx> '(\d+: .*)' or <idx> "(\d+: .*)"
    m = re.search(r"^\d+\s+['\"](\d+:.*?)['\"]$", l)
    if m:
        val = m.group(1)
        # Find line number and text
        m2 = re.match(r'^(\d+):\s?(.*)', val)
        if m2:
            output.append((int(m2.group(1)), m2.group(2)))
            
print("Collected lines:", len(output))
output.sort(key=lambda x: x[0])
reconstructed = [x[1] for x in output]

with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\login\\index.html', 'w', encoding='utf-8') as out:
    out.write('\n'.join(reconstructed))
print("Wrote login/index.html reconstructed!")
