import { supabase } from './supabase-auth.js';

// Fallback registry to ensure metadata (especially prices) resolves correctly even if DB relation is null
const artworksLookup = {
    '744216cb-a9ed-4a6a-a06c-ad0973650506': {
        title: 'Ethereal Silence No. 4',
        artist: 'Elena Vance',
        price: 845000,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb4dpSpQ_SvKnuz0Oe1p3-eiFwdOZc86sdiUb7GMkwyG7u5qKhUB97GMgj7favOctuPAaZtOOpTptw-7ycJOy9MgaZQLsa3Xgs4T5cxVFpqIdY5XNcOnAJvKZtZ7PmLNl4mOqk_AFj_xh9Dv2hHWjg5dFTvdDKJTYUGMZ1p_31KS0eYtVZZM-XeKLh2QwVvi6Gr_3ukrnPfg7v56biiUmOglUithSCXWEmpkMJxGsuas3t7pQDlPmV8v7WQ_CVOO9SIGvYjut1-xf8'
    },
    '44444444-aaaa-1111-bbbb-000000000001': {
        title: 'Fluidity II',
        artist: 'Julian Thorne',
        price: 120000,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3_2s_4P7SXlwnBoH1LlVaLNytiIhZC3Cv5u97lfSqzfLWO5uftOjn9c0Ecxg3G9P6H0R2OpS5ZlDnj0y0rVXGkUkKAxGhYrfxBBmu9Ap9zVjOUmumjSX6vodvWwpOCx4m1x9iaMrnGYSGAPc9vOTHj5hn18QDR3G5ZFCte1IdM0Yd4Zk2L89qIXu3MJ_4apUzyoqNJY78k-cmNikGlse90UaHbPciAVQPC-S73Rm6OQz2Z2x0xxNTpIjGF1Aa99RdzhLy3dW3GitJ'
    },
    '44444444-aaaa-1111-bbbb-000000000002': {
        title: 'Monolith Alpha',
        artist: 'Marcus Reed',
        price: 45000,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqrjSYBblVtUP_vyIoyqVlxjuTmVXIN0RNHCnugcm3Ty8akN_kPyMA06IfgzETolRcI8DfMIG7y0MyOG6ZhaJRssfMG4jbpfiU5tft_MbK8MzYEanrtKtdTWqiD5flMakk8lnqElreKQkTjcS05Uz86gG7X5l01F6AHn5O1v8r8bhd2q2RA4cu706yrISIKMundK_BD0UA9FwueJpjoxN5Su6GcPq7ZIeb3S8ZumTzv9brrHwyvhnKCfNLoZnJ4Mij6Nfju1WWX3w3O'
    },
    '44444444-aaaa-1111-bbbb-000000000003': {
        title: 'The Void',
        artist: 'Sarah K.',
        price: 32500,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXrrUH0uWXLx39-NweIcyLiYdovkGHihdsn2jK0045EjYMbYWHT_V50VFMtrAvmlIHp0sF8ZFWoetYQvXKD70eJ1wC6nPfvNdUrmcwswP_2zCiczdR6OGOQZbuWwIGkopMSakdZ9rk5WKk38Fj3LgO1K07Tn4_mG43PmWBkBmevp1Rfk5a8tt7E1aEOy-3PSYJaXMpsdL5wv8_oDMX2HsafG_-8PQfVJ8aLAFmf_D5UeU45B6Knz1QHV_z71DCzSDWwaFMxF6wmafB'
    },
    'e4cbb8ab-ccde-4da5-a6c5-bbbc2b3a606d': {
        title: 'Textural Echo',
        artist: 'Amina Chen',
        price: 195000,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjNPjdubFMgLTvvjT8qm92g2nB86HsPPtzmAiXPjgwLhjGZxArBTHaWUP0oLmpirYKT5DRJMZThvClD6iZ0eKMXEaavNhDSFMWHBjZColBRDstKkqs-hXLvpG_dxCVE5OXDfXDhrRPAHqsKmwjh1F1jF2VcZe5RdRRL_LHeCqqSIAGc6Va9_sMUJnq3S3250xbR20vO3wQmME0EyglAy7CM0ozslwVed_VqkwrWCZqIUNy0hrRgx8EV4N6Ax4j2GoiMXV5oLxo79qA'
    }
};

// Setup cart session ID
async function getOrCreateCartId() {
    let cartId = localStorage.getItem('artisane_cart_id');
    if (!cartId || cartId === 'undefined') {
        try {
            const { data, error } = await supabase
                .from('carts')
                .insert([{}])
                .select('id')
                .single();
            if (error) throw error;
            cartId = data.id;
            localStorage.setItem('artisane_cart_id', cartId);
        } catch (e) {
            console.warn('Error creating cart session on server, using local ID:', e);
            cartId = crypto.randomUUID();
            localStorage.setItem('artisane_cart_id', cartId);
        }
    }
    return cartId;
}

// Local storage fallback helpers
function getLocalCartItems() {
    try {
        const items = localStorage.getItem('artisane_local_cart');
        return items ? JSON.parse(items) : [];
    } catch (e) {
        return [];
    }
}

function saveLocalCartItems(items) {
    try {
        localStorage.setItem('artisane_local_cart', JSON.stringify(items));
    } catch (e) {
        console.error('Error saving local cart:', e);
    }
}

// Function to update cart badge from database
export async function syncCartBadge() {
    let totalItems = 0;
    
    // Instant badge update using LocalStorage
    const localItems = getLocalCartItems();
    totalItems = localItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    renderBadgeHTML(totalItems);

    // Fetch database badge in background
    try {
        const cartId = await getOrCreateCartId();
        const { error, data } = await supabase
            .from('cart_items')
            .select('quantity')
            .eq('cart_id', cartId);

        if (!error && data) {
            const dbTotalItems = data.reduce((sum, item) => sum + (item.quantity || 1), 0);
            if (dbTotalItems !== totalItems) {
                renderBadgeHTML(dbTotalItems);
            }
        }
    } catch (err) {
        console.warn('Database error syncing badge count:', err);
    }
}

function renderBadgeHTML(totalItems) {
    const cartIcons = document.querySelectorAll('.material-symbols-outlined');
    let cartLink = null;
    for (let icon of cartIcons) {
        const text = icon.textContent.trim();
        if (text === 'shopping_cart' || text === 'shopping_bag') {
            if (icon.tagName === 'A') {
                cartLink = icon;
            } else if (icon.parentElement && icon.parentElement.tagName === 'A') {
                cartLink = icon.parentElement;
            } else {
                cartLink = icon;
            }
            break;
        }
    }

    if (cartLink) {
        cartLink.style.position = 'relative';
        let badge = cartLink.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge absolute -top-2 -right-2 bg-secondary text-white font-label-sm text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-surface';
            badge.style.width = '18px';
            badge.style.height = '18px';
            badge.style.borderRadius = '50%';
            badge.style.fontSize = '10px';
            badge.style.lineHeight = '18px';
            badge.style.textAlign = 'center';
            cartLink.appendChild(badge);
        }
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Inject Cart Drawer HTML dynamically if not present
function injectCartDrawerHTML() {
    if (document.getElementById('cart-drawer-overlay')) return;

    const drawerHTML = `
        <div id="cart-drawer-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 opacity-0 hidden">
            <div id="cart-drawer-close-backdrop" class="absolute inset-0"></div>
            <div id="cart-drawer" class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface dark:bg-zinc-900 border-l border-outline-variant dark:border-zinc-700 shadow-2xl flex flex-col transition-transform duration-300 translate-x-full">
                <!-- Header -->
                <div class="p-6 border-b border-outline-variant dark:border-zinc-700 flex justify-between items-center bg-surface-container-low dark:bg-zinc-800">
                    <h3 class="font-headline-md text-lg font-bold text-primary dark:text-white">Your Bag</h3>
                    <button id="cart-drawer-close" class="material-symbols-outlined text-on-surface-variant hover:text-primary dark:hover:text-white transition-colors">close</button>
                </div>
                
                <!-- Items list -->
                <div id="cart-drawer-items" class="flex-grow p-6 overflow-y-auto space-y-6">
                    <!-- Dynamic Items -->
                </div>

                <!-- Footer Summary -->
                <div class="p-6 border-t border-outline-variant dark:border-zinc-700 bg-surface-container-low dark:bg-zinc-800 space-y-4">
                    <div class="space-y-2 font-body-md text-sm text-on-surface-variant dark:text-zinc-300">
                        <div class="flex justify-between">
                            <span>Subtotal</span>
                            <span id="cart-drawer-subtotal">R 0.00</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Tax (8%)</span>
                            <span id="cart-drawer-tax">R 0.00</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Shipping</span>
                            <span id="cart-drawer-shipping">R 120.00</span>
                        </div>
                        <div class="flex justify-between font-headline-md text-[18px] text-primary dark:text-white pt-2 border-t border-outline-variant/30 dark:border-zinc-700">
                            <span>Total</span>
                            <span id="cart-drawer-total">R 0.00</span>
                        </div>
                    </div>
                    
                    <a href="checkout.html" id="cart-drawer-checkout-btn" class="w-full bg-primary text-white font-label-md text-label-md py-4 rounded-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                        <span>Proceed to Checkout</span>
                        <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHTML);

    // Wire close buttons
    document.getElementById('cart-drawer-close').addEventListener('click', closeCartDrawer);
    document.getElementById('cart-drawer-close-backdrop').addEventListener('click', closeCartDrawer);
}

// Open / Close actions
export async function openCartDrawer() {
    injectCartDrawerHTML();
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');

    overlay.classList.remove('hidden');
    // Force reflow
    void overlay.offsetWidth;

    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');

    await loadCartDrawerItems();
}

// Close cart drawer
export function closeCartDrawer() {
    const overlay = document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer');

    if (!overlay || !drawer) return;

    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');

    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

// Render dynamic item list
function renderItemsHTML(items, container, subtotalEl, taxEl, totalEl) {
    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-on-surface-variant text-center font-body-md py-8">Your bag is empty.</p>';
        if (subtotalEl) subtotalEl.textContent = 'R 0.00';
        if (taxEl) taxEl.textContent = 'R 0.00';
        if (totalEl) totalEl.textContent = 'R 0.00';
        return;
    }

    let subtotal = 0;

    items.forEach(item => {
        const art = item.artworks || artworksLookup[item.artwork_id] || { title: 'Artwork', price: 0, image_url: '', artist: 'Unknown Artist' };
        const itemPrice = art.price || 0;
        const itemTotal = itemPrice * (item.quantity || 1);
        subtotal += itemTotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'flex gap-4 p-3 border border-outline-variant/30 rounded-sm dark:border-zinc-800 bg-surface-container-low dark:bg-zinc-800/50';
        itemEl.innerHTML = `
            <div class="w-16 h-20 bg-surface-container dark:bg-zinc-700 overflow-hidden flex-shrink-0">
                <img src="${art.image_url || 'https://via.placeholder.com/150'}" alt="${art.title}" class="w-full h-full object-cover"/>
            </div>
            <div class="flex-grow flex flex-col justify-between">
                <div>
                    <h4 class="font-headline-md text-sm font-semibold text-primary dark:text-white leading-tight mb-1">${art.title}</h4>
                    <p class="font-body-md text-xs text-on-surface-variant dark:text-zinc-400">${art.artist || ''}</p>
                </div>
                <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center border border-outline-variant/60 dark:border-zinc-700 rounded-sm">
                        <button class="dec-qty-btn px-2 py-0.5 text-xs text-on-surface-variant hover:text-primary dark:hover:text-white" data-item-id="${item.id}" data-qty="${item.quantity || 1}">-</button>
                        <span class="px-2 text-xs font-semibold text-on-surface dark:text-white">${item.quantity || 1}</span>
                        <button class="inc-qty-btn px-2 py-0.5 text-xs text-on-surface-variant hover:text-primary dark:hover:text-white" data-item-id="${item.id}" data-qty="${item.quantity || 1}">+</button>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="font-label-md text-sm text-on-surface dark:text-white">R ${(itemPrice * (item.quantity || 1)).toLocaleString()}</span>
                        <button class="delete-item-btn material-symbols-outlined text-on-surface-variant hover:text-error dark:text-zinc-400 scale-75 transition-colors" data-item-id="${item.id}">delete</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(itemEl);
    });

    const shipping = 120.00;
    const tax = Math.round(subtotal * 0.08);
    const grandTotal = subtotal + shipping + tax;

    if (subtotalEl) subtotalEl.textContent = `R ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    if (taxEl) taxEl.textContent = `R ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    if (totalEl) totalEl.textContent = `R ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    // Wire Qty and Delete buttons
    container.querySelectorAll('.inc-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = btn.getAttribute('data-item-id');
            const currentQty = parseInt(btn.getAttribute('data-qty'));
            updateItemQuantity(itemId, currentQty + 1);
        });
    });

    container.querySelectorAll('.dec-qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = btn.getAttribute('data-item-id');
            const currentQty = parseInt(btn.getAttribute('data-qty'));
            if (currentQty <= 1) {
                deleteCartItem(itemId);
            } else {
                updateItemQuantity(itemId, currentQty - 1);
            }
        });
    });

    container.querySelectorAll('.delete-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = btn.getAttribute('data-item-id');
            deleteCartItem(itemId);
        });
    });

    // Invoke the currency converter dynamically so cart amounts reflect active currency selection
    if (window.scanAndConvertPrices) {
        window.scanAndConvertPrices();
    }
}

// Load items from database and render (reads locally first, then updates from DB asynchronously)
export async function loadCartDrawerItems() {
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const taxEl = document.getElementById('cart-drawer-tax');
    const totalEl = document.getElementById('cart-drawer-total');

    if (!container) return;

    // 1. Initial Instant Render using LocalStorage
    const localItems = getLocalCartItems();
    renderItemsHTML(localItems, container, subtotalEl, taxEl, totalEl);

    // 2. Background Database Refresh
    try {
        const cartId = await getOrCreateCartId();
        const { data, error } = await supabase
            .from('cart_items')
            .select('*, artworks(*)')
            .eq('cart_id', cartId);

        if (!error && data) {
            const dbItems = data.map(item => {
                const artworkDetails = item.artworks || artworksLookup[item.artwork_id] || getLocalCartItems().find(local => local.artwork_id === item.artwork_id)?.artworks || { title: 'Artwork', price: 0, image_url: '', artist: 'Unknown Artist' };
                return {
                    id: item.id,
                    artwork_id: item.artwork_id,
                    quantity: item.quantity,
                    artworks: artworkDetails
                };
            });

            // Save and re-render only if there are differences to avoid redundant flashing
            const currentLocalStr = JSON.stringify(localItems);
            const newDbStr = JSON.stringify(dbItems);
            if (currentLocalStr !== newDbStr) {
                saveLocalCartItems(dbItems);
                renderItemsHTML(dbItems, container, subtotalEl, taxEl, totalEl);
            }
        }
    } catch (e) {
        console.warn('Background cart DB sync failed, relying on local storage state:', e);
    }
}

// Database helper functions - Optimistic updates
export async function updateItemQuantity(itemId, quantity) {
    // 1. Optimistic LocalStorage Update
    const localItems = getLocalCartItems();
    const item = localItems.find(i => i.id === itemId);
    if (item) {
        item.quantity = quantity;
        saveLocalCartItems(localItems);
    }

    // Instant redraw
    syncCartBadge();
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const taxEl = document.getElementById('cart-drawer-tax');
    const totalEl = document.getElementById('cart-drawer-total');
    if (container) {
        renderItemsHTML(localItems, container, subtotalEl, taxEl, totalEl);
    }

    // 2. Background Database Mutation
    try {
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: quantity })
            .eq('id', itemId);
        if (error) throw error;
    } catch (error) {
        console.warn('Background quantity sync failed:', error);
    }
}

export async function deleteCartItem(itemId) {
    // 1. Optimistic LocalStorage Update
    let localItems = getLocalCartItems();
    localItems = localItems.filter(i => i.id !== itemId);
    saveLocalCartItems(localItems);

    // Instant redraw
    syncCartBadge();
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const taxEl = document.getElementById('cart-drawer-tax');
    const totalEl = document.getElementById('cart-drawer-total');
    if (container) {
        renderItemsHTML(localItems, container, subtotalEl, taxEl, totalEl);
    }

    // 2. Background Database Mutation
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId);
        if (error) throw error;
    } catch (error) {
        console.warn('Background item deletion sync failed:', error);
    }
}

// Function to add item to database cart (prioritizing data attributes)
export async function addArtworkToCart(artworkId, btn) {
    // 1. Resolve Metadata directly from lookup or DOM attributes to prevent currency-conversion errors
    let title = artworksLookup[artworkId]?.title || 'Artwork';
    let artist = artworksLookup[artworkId]?.artist || 'Unknown Artist';
    let price = artworksLookup[artworkId]?.price || 0;
    let image_url = artworksLookup[artworkId]?.image_url || '';

    const card = btn 
        ? (btn.closest('.art-card') || btn.closest('article') || btn.closest('.group') || document.querySelector(`[data-artwork-id="${artworkId}"]`))
        : document.querySelector(`[data-artwork-id="${artworkId}"]`);

    if (card && (!price || title === 'Artwork')) {
        title = card.getAttribute('data-title') || card.querySelector('h3, h2, h4')?.textContent?.trim() || title;
        
        artist = card.getAttribute('data-artist') || artist;
        if (artist === 'Unknown Artist') {
            const pText = card.querySelector('p')?.textContent?.trim() || '';
            artist = pText.split('|')[0].trim() || artist;
        }
        
        image_url = card.getAttribute('data-image') || card.querySelector('img')?.src || '';

        const dataPrice = card.getAttribute('data-price');
        if (dataPrice) {
            price = parseFloat(dataPrice);
        } else {
            const priceEl = card.querySelector('.font-headline-lg, .font-body-lg, span, .text-secondary, .price');
            if (priceEl) {
                const match = priceEl.textContent.match(/\d+([.,]\d+)*/);
                if (match) {
                    price = parseFloat(match[0].replace(/,/g, ''));
                }
            }
        }
    }

    // 2. Optimistic LocalStorage Update
    const localItems = getLocalCartItems();
    const existingLocal = localItems.find(item => item.artwork_id === artworkId);

    if (existingLocal) {
        existingLocal.quantity = (existingLocal.quantity || 1) + 1;
    } else {
        localItems.push({
            id: artworkId, // Temporary ID matches artworkId for optimistic display
            artwork_id: artworkId,
            quantity: 1,
            artworks: {
                title: title,
                artist: artist,
                price: price,
                image_url: image_url
            }
        });
    }
    saveLocalCartItems(localItems);

    // Instant redraw and open drawer
    syncCartBadge();
    openCartDrawer();

    // 3. Background Database Mutation
    try {
        const cartId = await getOrCreateCartId();
        const { data: existing, error: selectError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cartId)
            .eq('artwork_id', artworkId);

        if (selectError) throw selectError;

        if (existing && existing.length > 0) {
            const currentQty = existing[0].quantity || 1;
            const { error: updateError } = await supabase
                .from('cart_items')
                .update({ quantity: currentQty + 1 })
                .eq('id', existing[0].id);
            if (updateError) throw updateError;
        } else {
            const { error: insertError } = await supabase
                .from('cart_items')
                .insert([{ cart_id: cartId, artwork_id: artworkId, quantity: 1 }]);
            if (insertError) throw insertError;
        }
    } catch (err) {
        console.warn('Background add-to-cart sync failed:', err);
    }
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sync badge on load
    syncCartBadge();

    // 2. Wire up the header shopping cart triggers to open the drawer
    const cartIcons = document.querySelectorAll('.material-symbols-outlined');
    cartIcons.forEach(icon => {
        const text = icon.textContent.trim();
        if (text === 'shopping_cart' || text === 'shopping_bag') {
            let cartLink = null;
            if (icon.tagName === 'A') {
                cartLink = icon;
            } else if (icon.parentElement && icon.parentElement.tagName === 'A') {
                cartLink = icon.parentElement;
            } else {
                cartLink = icon;
            }
            if (cartLink) {
                cartLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openCartDrawer();
                });
            }
        }
    });

    // 3. Wire add to bag buttons
    const addButtons = document.querySelectorAll('button, a');
    addButtons.forEach(btn => {
        const innerText = btn.textContent.trim();
        const hasCartIcon = btn.innerHTML.includes('add_shopping_cart') || btn.innerHTML.includes('add_shopping_bag') || btn.innerHTML.includes('shopping_cart');
        const isCartBtn = innerText.toLowerCase().includes('add to bag') || innerText.toLowerCase().includes('add to cart') || (hasCartIcon && (btn.tagName === 'BUTTON' || btn.classList.contains('material-symbols-outlined')));
        
        if (isCartBtn) {
            const artworkId = btn.getAttribute('data-artwork-id') || btn.closest('[data-artwork-id]')?.getAttribute('data-artwork-id');
            if (artworkId) {
                if (btn.hasAttribute('onclick') && btn.getAttribute('onclick').includes('checkout.html')) {
                    btn.removeAttribute('onclick');
                }
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addArtworkToCart(artworkId, btn);
                });
            }
        }
    });
});

// Bind to window for absolute reliability in inline handlers
window.addArtworkToCart = addArtworkToCart;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;