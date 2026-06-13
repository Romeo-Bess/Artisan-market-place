import os

def main():
    test_dir = "testsprite_tests"
    files = [f for f in os.listdir(test_dir) if f.startswith("TC") and f.endswith(".py")]
    
    target_block = """        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )"""
        
    replacement_block = """        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720"
            ],
        )"""

    count = 0
    for f in files:
        path = os.path.join(test_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if target_block in content:
            content = content.replace(target_block, replacement_block)
            with open(path, 'w', encoding='utf-8') as file:
                file.write(content)
            count += 1
        else:
            # Try a slightly different whitespace match if needed
            # let's just do string replacement of individual bad flags to be safe
            modified = False
            for flag in ['"--disable-dev-shm-usage",', '"--ipc=host",', '"--single-process"']:
                if flag in content:
                    content = content.replace(flag, "")
                    modified = True
            if modified:
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                count += 1

    print(f"Modified {count} test files.")

if __name__ == "__main__":
    main()
