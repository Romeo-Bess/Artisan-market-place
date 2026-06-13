path = r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\css\global.css'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find "truncated" or similar
import re
idx = content.find("truncated")
if idx == -1:
    idx = content.find("<truncated")

if idx != -1:
    content = content[:idx]
    # Clean up any trailing text
    content = content.split('\n')
    while len(content) > 0 and ('<' in content[-1] or 'truncated' in content[-1] or content[-1].strip() == ''):
        content.pop()
    content = '\n'.join(content)
    
    # Close the brace if it was open
    if ".material-symbols-outlined {" in content and not content.endswith('}'):
        content += "\n}"

with open(path, 'w', encoding='utf-8') as out:
    out.write(content)
print("Cleaned up global.css successfully!")
