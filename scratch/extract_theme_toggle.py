import re

with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\scratch\theme_part_138.txt', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
output = []
for l in lines:
    m = re.match(r'^\s*(\d+):\s?(.*)', l)
    if m:
        output.append((int(m.group(1)), m.group(2)))

output.sort(key=lambda x: x[0])
reconstructed = [x[1] for x in output]

out_path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\theme-toggle-helper.js'
with open(out_path, 'w', encoding='utf-8') as out:
    out.write('\n'.join(reconstructed))
print("Wrote theme-toggle-helper.js successfully to", out_path)
