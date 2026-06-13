document.addEventListener('DOMContentLoaded', () => {
    // 1. Follow/Unfollow Artist Button Interaction
    const followButtons = document.querySelectorAll('button, a');
    followButtons.forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text === 'follow artist' || text === 'following') {
            btn.classList.add('follow-artist-btn');
            btn.setAttribute('data-following', text === 'following' ? 'true' : 'false');

            // Find companion followers count element if exists
            let followersEl = null;
            const labels = document.querySelectorAll('p, span, div');
            for (let label of labels) {
                if (label.textContent.trim().toLowerCase() === 'followers') {
                    let parent = label.parentElement;
                    if (parent) {
                        followersEl = parent.querySelector('.font-headline-md, p:nth-child(2), span:nth-child(2), .text-headline-lg');
                    }
                    break;
                }
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const isFollowing = btn.getAttribute('data-following') === 'true';
                if (isFollowing) {
                    btn.setAttribute('data-following', 'false');
                    btn.textContent = 'FOLLOW ARTIST';
                    btn.className = btn.className.replace(/\bbg-primary\b/, '').replace(/\btext-on-primary\b/, '').replace(/\btext-white\b/, '');
                    if (!btn.className.includes('border-primary')) {
                        btn.className += ' border border-primary text-primary';
                    }
                    if (followersEl) {
                        followersEl.textContent = '12.4K';
                    }
                } else {
                    btn.setAttribute('data-following', 'true');
                    btn.textContent = 'FOLLOWING';
                    btn.className = btn.className.replace(/\bborder\s+border-primary\s+text-primary\b/, '').replace(/\bborder-primary\b/, '').replace(/\btext-primary\b/, '');
                    if (!btn.className.includes('bg-primary')) {
                        btn.className += ' bg-primary text-on-primary text-white';
                    }
                    if (followersEl) {
                        followersEl.textContent = '12.5K';
                    }
                }
            });
        }
    });

    // 2. Notification Dropdown Panel
    const notifButtons = Array.from(document.querySelectorAll('button, a')).filter(btn => {
        const txt = btn.textContent.toLowerCase();
        return txt.includes('notifications') || btn.classList.contains('notifications-btn') || btn.id === 'notifications-btn';
    });

    if (notifButtons.length > 0) {
        const dropdown = document.createElement('div');
        dropdown.id = 'notif-dropdown';
        dropdown.className = 'absolute hidden bg-white dark:bg-zinc-900 border border-outline-variant dark:border-zinc-700 shadow-xl rounded-sm w-80 transition-all duration-300 z-[100] text-on-surface';
        dropdown.innerHTML = `
            <div class="p-4 border-b border-outline-variant dark:border-zinc-700 bg-surface-container-low dark:bg-zinc-800 flex justify-between items-center">
                <h3 class="font-headline-md text-sm font-semibold text-primary dark:text-white">Notifications</h3>
                <span class="w-2 h-2 bg-secondary rounded-full"></span>
            </div>
            <div class="max-h-80 overflow-y-auto">
                <div class="p-4 border-b border-outline-variant/30 dark:border-zinc-800 hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-colors cursor-pointer" onclick="window.location.href='auction-history.html'">
                    <p class="font-label-md text-xs text-primary dark:text-secondary font-semibold mb-1">Outbid Alert</p>
                    <p class="font-body-md text-[11px] text-on-surface-variant dark:text-zinc-300 leading-normal">You have been outbid on "Silent Monolith II" (Lot #089).</p>
                    <span class="text-[9px] text-outline mt-1 block">10m ago</span>
                </div>
                <div class="p-4 hover:bg-surface-container-low dark:hover:bg-zinc-800 transition-colors cursor-pointer" onclick="window.location.href='collector-dashboard.html'">
                    <p class="font-label-md text-xs text-primary dark:text-secondary font-semibold mb-1">Curation Approved</p>
                    <p class="font-body-md text-[11px] text-on-surface-variant dark:text-zinc-300 leading-normal">Your bidder application for the Elite Curation has been verified.</p>
                    <span class="text-[9px] text-outline mt-1 block">Yesterday</span>
                </div>
            </div>
            <div class="px-4 py-2 border-t border-outline-variant dark:border-zinc-700 text-center bg-surface-container-low dark:bg-zinc-800">
                <button class="text-xs text-primary dark:text-secondary hover:text-secondary font-label-md transition-colors w-full py-1">Mark all as read</button>
            </div>
        `;
        document.body.appendChild(dropdown);

        // Click outside closes dropdown
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !notifButtons.some(b => b.contains(e.target))) {
                dropdown.classList.add('hidden');
            }
        });

        notifButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const rect = btn.getBoundingClientRect();
                dropdown.style.right = `${window.innerWidth - rect.right}px`;
                dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;

                if (dropdown.classList.contains('hidden')) {
                    dropdown.classList.remove('hidden');
                } else {
                    dropdown.classList.add('hidden');
                }
            });
        });
    }

    // 3. Unified Navigation Tabs Active Highlighter
    function highlightActiveNavbar() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const container = document.querySelector('header nav .hidden.md\\:flex, header .hidden.md\\:flex, nav .hidden.md\\:flex');
        if (container) {
            container.innerHTML = `
                <a class="nav-link font-label-md text-label-md text-on-surface-variant dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors duration-200" href="browse-gallery.html">Browse</a>
                <a class="nav-link font-label-md text-label-md text-on-surface-variant dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors duration-200" href="artists.html">Artists</a>
                <a class="nav-link font-label-md text-label-md text-on-surface-variant dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors duration-200" href="live-auctions.html">Auctions</a>
                <a class="nav-link font-label-md text-label-md text-on-surface-variant dark:text-zinc-300 hover:text-primary dark:hover:text-white transition-colors duration-200" href="journal.html">Journal</a>
            `;
            container.classList.remove('gap-12');
            if (!container.classList.contains('gap-8')) {
                container.classList.add('gap-8');
            }

            // Highlight active link index-based
            const links = container.querySelectorAll('.nav-link');
            links.forEach((link, idx) => {
                let isActive = false;

                if (currentPath === 'browse-gallery.html' || currentPath === 'browse-gallery-light.html' || currentPath === 'index.html' || currentPath === 'home-light.html') {
                    if (idx === 0) isActive = true;
                } else if (currentPath === 'artists.html' || currentPath.startsWith('artist')) {
                    if (idx === 1) isActive = true;
                } else if (currentPath === 'live-auctions.html' || currentPath.includes('auction') || currentPath.includes('bidding') || currentPath.includes('preauth') || currentPath.includes('verification')) {
                    if (idx === 2) isActive = true;
                } else if (currentPath === 'journal.html') {
                    if (idx === 3) isActive = true;
                }

                if (isActive) {
                    link.className = link.className.replace(/\btext-on-surface-variant\b/, 'text-primary dark:text-white font-bold');
                    link.classList.add('border-b-2', 'border-primary', 'dark:border-white', 'pb-1');
                }
            });
        }
    }

    // 4. Currency Conversion System (ZAR, USD, EUR, GBP)
    const currencies = ['ZAR', 'USD', 'EUR', 'GBP'];
    const rates = { ZAR: 1, USD: 0.054, EUR: 0.050, GBP: 0.043 };
    const symbols = { ZAR: 'R ', USD: '$', EUR: '€', GBP: '£' };

    let priceElements = [];

    function scanPrices() {
        priceElements = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const priceRegex = /(ZAR\s?|R\s?|\$|€|£)\s?\d+(?:[.,]\d+)*(?:\s?[kK])?/i;
        while (node = walker.nextNode()) {
            const parent = node.parentElement;
            if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
                continue;
            }
            
            // Check if this node has already been parsed and cached
            if (node.baseZar !== undefined) {
                if (node.baseZar !== null && !isNaN(node.baseZar)) {
                    priceElements.push({
                        node: node,
                        originalText: node.originalText,
                        baseZar: node.baseZar
                    });
                }
                continue;
            }

            const text = node.nodeValue;
            if (priceRegex.test(text)) {
                // Parse base ZAR price if it's ZAR
                let zarVal = null;
                const zarMatch = /(?:ZAR|R)\s?(\d+(?:[.,]\d+)*)/i.exec(text);
                if (zarMatch) {
                    zarVal = parseFloat(zarMatch[1].replace(/,/g, ''));
                }
                
                // Cache on the node itself so subsequent scans don't lose it when text node changes
                node.baseZar = zarVal;
                node.originalText = text;

                if (zarVal !== null && !isNaN(zarVal)) {
                    priceElements.push({
                        node: node,
                        originalText: text,
                        baseZar: zarVal
                    });
                }
            } else {
                // Mark as processed but not a price node
                node.baseZar = null;
            }
        }
    }

    function updatePrices(targetCurrency) {
        priceElements.forEach(item => {
            if (item.baseZar !== null && !isNaN(item.baseZar)) {
                const converted = item.baseZar * rates[targetCurrency];
                const symbol = symbols[targetCurrency];
                const formatted = converted.toLocaleString('en-US', {
                    maximumFractionDigits: 0
                });
                item.node.nodeValue = `${symbol}${formatted}`;
            }
        });
    }

    function updateCurrencyToggleDisplays(currency) {
        const triggers = document.querySelectorAll('.currency-toggle-trigger, .currency-selector');
        triggers.forEach(el => {
            const span = el.querySelector('span:not(.material-symbols-outlined)');
            if (span) {
                span.textContent = `${currency} (${symbols[currency].trim()})`;
            } else {
                el.textContent = `${currency} (${symbols[currency].trim()})`;
            }
        });

        // Update active checkmarks inside dropdown
        const options = document.querySelectorAll('.currency-option');
        options.forEach(opt => {
            const optCurrency = opt.getAttribute('data-currency');
            const check = opt.querySelector('.currency-check');
            if (check) {
                if (optCurrency === currency) {
                    check.classList.remove('hidden');
                } else {
                    check.classList.add('hidden');
                }
            }
        });
    }

    function injectCurrencyToggle() {
        const userContainer = document.querySelector('header nav .flex.items-center.gap-4, header .flex.items-center.gap-4, nav .flex.items-center.gap-4');
        if (userContainer && !document.querySelector('.currency-dropdown-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'currency-dropdown-wrapper relative';
            wrapper.innerHTML = `
                <div class="currency-toggle-trigger flex items-center bg-surface-container-low dark:bg-zinc-800 border border-outline-variant dark:border-zinc-700 rounded-lg px-2.5 py-1 gap-2 cursor-pointer hover:bg-surface-container dark:hover:bg-zinc-700 transition-all text-on-surface-variant scale-95 active:scale-90">
                    <span class="font-label-sm text-label-sm">ZAR (R)</span>
                    <span class="material-symbols-outlined text-[16px] pointer-events-none">expand_more</span>
                </div>
                <div class="currency-dropdown-menu absolute hidden right-0 mt-2 top-full w-36 bg-surface dark:bg-zinc-900 border border-outline-variant dark:border-zinc-700 rounded-lg shadow-xl py-1 z-[110] text-on-surface">
                    <div class="currency-option px-4 py-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 cursor-pointer flex justify-between items-center text-xs" data-currency="ZAR">
                        <span>ZAR (R)</span>
                        <span class="currency-check material-symbols-outlined text-[14px] hidden">check</span>
                    </div>
                    <div class="currency-option px-4 py-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 cursor-pointer flex justify-between items-center text-xs" data-currency="USD">
                        <span>USD ($)</span>
                        <span class="currency-check material-symbols-outlined text-[14px] hidden">check</span>
                    </div>
                    <div class="currency-option px-4 py-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 cursor-pointer flex justify-between items-center text-xs" data-currency="EUR">
                        <span>EUR (€)</span>
                        <span class="currency-check material-symbols-outlined text-[14px] hidden">check</span>
                    </div>
                    <div class="currency-option px-4 py-2 hover:bg-surface-container-low dark:hover:bg-zinc-800 cursor-pointer flex justify-between items-center text-xs" data-currency="GBP">
                        <span>GBP (£)</span>
                        <span class="currency-check material-symbols-outlined text-[14px] hidden">check</span>
                    </div>
                </div>
            `;
            userContainer.insertBefore(wrapper, userContainer.firstChild);
        }
    }

    function setupCurrencyToggles() {
        const wrapper = document.querySelector('.currency-dropdown-wrapper');
        if (!wrapper) return;

        const trigger = wrapper.querySelector('.currency-toggle-trigger');
        const menu = wrapper.querySelector('.currency-dropdown-menu');

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });

        // Select currency options
        const options = menu.querySelectorAll('.currency-option');
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const next = opt.getAttribute('data-currency');
                localStorage.setItem('artisane_currency', next);
                updateCurrencyToggleDisplays(next);
                updatePrices(next);
                window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: next } }));
                menu.classList.add('hidden');
            });
        });
    }

    // Initialize Navbar, Prices & Currency Toggles
    highlightActiveNavbar();
    scanPrices();
    injectCurrencyToggle();
    const savedCurrency = localStorage.getItem('artisane_currency') || 'ZAR';
    updateCurrencyToggleDisplays(savedCurrency);
    updatePrices(savedCurrency);
    setupCurrencyToggles();

    // Expose dynamic helper to window for dynamic content (like cart drawer re-renders)
    window.scanAndConvertPrices = () => {
        scanPrices();
        const cur = localStorage.getItem('artisane_currency') || 'ZAR';
        updatePrices(cur);
    };
});