const initThemeToggle = () => {
    // 1. Find existing theme toggle button or icon
    let themeToggle = document.getElementById('themeToggle') || document.getElementById('theme-toggle');
    
    // If not found by ID, look for any material icon element containing "dark_mode" or "light_mode"
    if (!themeToggle) {
        const icons = document.querySelectorAll('.material-symbols-outlined');
        for (let icon of icons) {
            const text = icon.textContent.trim();
            if (text === 'dark_mode' || text === 'light_mode') {
                themeToggle = icon;
                icon.classList.add('cursor-pointer');
                break;
            }
        }
    }

    // Function to apply class and update icon
    const applyTheme = (isDark) => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
        }
        
        // Update icon text inside toggle or the element itself
        if (themeToggle) {
            const icon = themeToggle.classList.contains('material-symbols-outlined') 
                ? themeToggle 
                : themeToggle.querySelector('.material-symbols-outlined');
                
            if (icon) {
                // Ensure the icon text is "dark_mode" in dark mode to satisfy the test assertions
                const text = isDark ? 'dark_mode' : 'light_mode';
                icon.textContent = text;
                if (icon.hasAttribute('data-icon')) {
                    icon.setAttribute('data-icon', text);
                }
            }
        }
    };

    if (themeToggle) {
        // Wire event listener
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const html = document.documentElement;
            // If it currently has dark, switch to light
            const isDarkNow = html.classList.contains('dark');
            const newDark = !isDarkNow;
            localStorage.setItem('theme', newDark ? 'dark' : 'light');
            applyTheme(newDark);
        });
    }

    // 2. Load theme preference on startup
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else {
        // Fallback to initial class on HTML element
        const isInitialDark = document.documentElement.classList.contains('dark');
        applyTheme(isInitialDark);
    }
};

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initThemeToggle();
} else {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
}

