with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\js\\follow-helper.js', 'r', encoding='utf-8') as f:
    text = f.read()
lines = text.splitlines()
lines[34] = "                    btn.className = btn.className.replace(/\\bbg-primary\\b/, '').replace(/\\btext-on-primary\\b/, '');"
with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\js\\follow-helper.js', 'w', encoding='utf-8') as out:
    out.write('\n'.join(lines))
print('Corrected line 35!')
