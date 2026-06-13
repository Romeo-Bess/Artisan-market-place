import re
with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\scratch\\login_step_600.txt', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
all_keys = []
for l in lines:
    m = re.search(r"^\d+\s+['\"](\d+):(.*?)['\"]$", l)
    if m:
        all_keys.append(int(m.group(1)))

print('Collected line numbers:', len(all_keys))
for k in range(1, 189):
    if k not in all_keys:
        print('MISSING:', k)
