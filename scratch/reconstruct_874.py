import re

with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\login_step_874.txt', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
output = []
for l in lines:
    # Match any pattern like "123: <something>" or just "123: <something>" but without quotes if it was unescaped
    m = re.match(r'^\s*(\d+):\s?(.*)', l)
    if m:
        output.append((int(m.group(1)), m.group(2)))

# Check unique line numbers collected
unique_lines = {}
for line_no, content in output:
    unique_lines[line_no] = content

print("Total unique lines collected:", len(unique_lines))
sorted_keys = sorted(unique_lines.keys())
print("Range:", sorted_keys[0], "to", sorted_keys[-1])

for k in range(sorted_keys[0], sorted_keys[-1]+1):
    if k not in unique_lines:
        print("MISSING LINE:", k)

reconstructed = [unique_lines[k] for k in sorted_keys]
with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\login\\index.html', 'w', encoding='utf-8') as out:
    out.write('\n'.join(reconstructed))
print("Wrote login/index.html reconstructed from step 874!")
