with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\cart-helper.js', 'r', encoding='utf-8') as f:
    content = f.read().strip()

# Print last 100 characters to see how it ends
print("Ends with:", repr(content[-100:]))

# Strip outer quotes if present
if content.startswith('"'):
    content = content[1:]
if content.endswith('"'):
    content = content[:-1]

# Decode escape sequences
clean = content.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace("\\'", "'").replace('\\\\', '\\')

# Let's clean up if there is trailing truncated string
idx_trunc = clean.rfind("truncated")
if idx_trunc != -1:
    print("Truncation found at index:", idx_trunc)
    clean = clean[:idx_trunc]
    # Strip any trailing comments or unfinished lines
    clean = clean.split('\n')
    # Remove the last few lines if they contain incomplete code
    while len(clean) > 0 and (clean[-1].strip().startswith('//') or clean[-1].strip().endswith('(') or clean[-1].strip() == '' or 'checkout.html' in clean[-1]):
        clean.pop()
    clean = '\n'.join(clean)

with open(r'C:\Users\USER-PC\Downloads\stitch_artisan_marketplace_hub\js\cart-helper.js', 'w', encoding='utf-8') as out:
    out.write(clean)
print("Wrote clean cart-helper!")
