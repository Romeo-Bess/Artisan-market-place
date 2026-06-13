import os

def clean_index():
    filepath = "index.html"
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Target content to remove: inline theme toggle logic
    target = """    // Theme Toggling Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            themeToggleBtn.textContent = 'dark_mode';
        } else {
            htmlElement.classList.add('dark');
            themeToggleBtn.textContent = 'light_mode';
        }
    });"""

    if target in content:
        content = content.replace(target, "    // Theme Toggling Logic handled by global theme-toggle-helper.js")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print("Cleaned index.html inline theme toggle.")

def clean_home_light():
    filepath = "home-light.html"
    if not os.path.exists(filepath):
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    target = """        // Theme Toggle Logic
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const icon = themeToggle.querySelector('.material-symbols-outlined');

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                icon.textContent = 'light_mode';
                icon.setAttribute('data-icon', 'light_mode');
            } else {
                icon.textContent = 'dark_mode';
                icon.setAttribute('data-icon', 'dark_mode');
            }
        });"""

    if target in content:
        content = content.repl
<truncated 322 bytes>