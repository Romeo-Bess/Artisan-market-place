import { supabase } from './supabase-auth.js';

// Setup cart session ID
async function getOrCreateCartId() {
    let cartId = localStorage.getItem('artisane_cart_id');
    if (!cartId || cartId === 'undefined') {
        const { data, error } = await supabase
            .from('carts')
            .insert([{}])
            .select('id')
            .single();
        if (error) {
            console.error('Error creating cart session:', error);
            cartId = crypto.randomUUID();
            localStorage.setItem('artisane_cart_id', cartId);
        } else {
            cartId = data.id;
            localStorage.setItem('artisane_cart_id', cartId);
        }
    }
    return cartId;
}

// Function to update cart badge from database
export async function syncCartBadge() {
    const cartId = await getOrCreateCartId();
    const { error, data } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('cart_id', cartId);

    if (error) {
        console.error('Error fetching cart items count:', error);
        return;
    }

    const totalItems = data ? data.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;

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

// Load items from database and render
async function loadCartDrawerItems() {
    const cartId = await getOrCreateCartId();
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const taxEl = document.getElementById('cart-drawer-tax');
    const totalEl = document.getElementById('cart-drawer-total');

    if (!container) return;

    container.innerHTML = '<p class="text-on-surface-variant text-center font-body-md py-8">Loading your items...</p>';

    const { data: items, error } = await supabase
        .from('cart_items')
        .select('*, artworks(*)')
        .eq('cart_id', cartId);

    if (error) {
        console.error('Error loading cart items:', error);
        container.innerHTML = '<p class="text-error text-center font-body-md py-8">Error loading items.</p>';
        return;
    }

    container.innerHTML = '';

    if (!items || items.length === 0) {
        container.innerHTML = '<p class="text-on-surface-variant text-center font-body-md py-8">Your bag is empty.</p>';
        subtotalEl.textContent = 'R 0.00';
        taxEl.textContent = 'R 0.00';
        totalEl.textContent = 'R 0.00';
        return;
    }

    let subtotal = 0;

    items.forEach(item => {
        const art = item.artworks || { title: 'Artwork', price: 0, image_url: '', artist: 'Unknown Artist' };
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

    subtotalEl.textContent = `R ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    taxEl.textContent = `R ${tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    totalEl.textContent = `R ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    // Wire Qty and Delete buttons
    container.querySelectorAll('.inc-qty-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const itemId = btn.getAttribute('data-item-id');
            const currentQty = parseInt(btn.getAttribute('data-qty'));
            await updateItemQuantity(itemId, currentQty + 1);
        });
    });

    container.querySelectorAll('.dec-qty-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const itemId = btn.getAttribute('data-item-id');
            const currentQty = parseInt(btn.getAttribute('data-qty'));
            if (currentQty <= 1) {
                await deleteCartItem(itemId);
            } else {
                await updateItemQuantity(itemId, currentQty - 1);
            }
        });
    });

    container.querySelectorAll('.delete-item-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const itemId = btn.getAttribute('data-item-id');
            await deleteCartItem(itemId);
        });
    });
}

// Database helper functions
async function updateItemQuantity(itemId, quantity) {
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: quantity })
        .eq('id', itemId);

    if (error) {
        console.error('Error updating quantity:', error);
    } else {
        await syncCartBadge();
        await loadCartDrawerItems();
    }
}

async function deleteCartItem(itemId) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error('Error deleting cart item:', error);
    } else {
        await syncCartBadge();
        await loadCartDrawerItems();
    }
}

// Function to add item to database cart
export async function addArtworkToCart(artworkId) {
    const cartId = await getOrCreateCartId();
    
    // Check if item already exists in cart, if so increment quantity
    const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cartId)
        .eq('artwork_id', artworkId);

    if (existing && existing.length > 0) {
        const currentQty = existing[0].quantity || 1;
        await supabase
            .from('cart_items')
            .update({ quantity: currentQty + 1 })
            .eq('id', existing[0].id);
    } else {
        await supabase
            .from('cart_items')
            .insert([{ cart_id: cartId, artwork_id: artworkId, quantity: 1 }]);
    }

    await syncCartBadge();
    await openCartDrawer();
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
                    addArtworkToCart(artworkId);
                });
            }
        }
    });
});