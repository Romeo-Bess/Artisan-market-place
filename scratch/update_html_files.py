import os
import glob
import re

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Remove old font links
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=EB\+Garamond[^>]+>\s*', '', content)
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=Hanken\+Grotesk[^>]+>\s*', '', content)
    
    # Remove script id="tailwind-config"
    content = re.sub(r'<script id="tailwind-config">.*?</script>\s*', '', content, flags=re.DOTALL)
    
    # Remove style block
    content = re.sub(r'<style>.*?</style>\s*', '', content, flags=re.DOTALL)
    
    # Add our global css and config before </head> if not already there
    injection = '<link rel="stylesheet" href="./css/global.css"/>\
<script src="./js/tailwind-config.js"></script>\
</head>'
    if './css/global.css' not in content:
        content = content.replace('</head>', injection)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
        
print(f"Updated {len(html_files)} HTML files.")