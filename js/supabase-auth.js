import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL  = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ─── Modal HTML Injection ─── */
function injectModal() {
  if (document.getElementById('auth-modal')) return;

  const modalHTML = `
    <!-- Auth Modal -->
    <div id="auth-modal" class="fixed inset-0 z-[200] hidden items-center justify-center p-4">
      <!-- Backdrop -->
      <div id="auth-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <!-- Card -->
      <div class="relative bg-surface dark:bg-zinc-900 border border-outline-variant dark:border-zinc-700 rounded-xl shadow-2xl w-full max-w-md p-8 z-10 text-on-surface">
        <!-- Close -->
        <button id="auth-close" class="absolute top-4 right-4 material-symbols-outlined text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-white transition-colors">close</button>

        <!-- Logo -->
        <div class="flex items-center gap-2 mb-8">
          <span class="font-headline-md text-2xl font-bold text-primary dark:text-white tracking-tight">Artisane</span>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-outline-variant dark:border-zinc-700 mb-7">
          <button id="tab-login" class="flex-1 pb-3 text-sm font-semibold border-b-2 border-primary dark:border-white text-primary dark:text-white">Sign In</button>
          <button id="tab-signup" class="flex-1 pb-3 text-sm font-semibold border-b-2 border-transparent text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-white">Sign Up</button>
        </div>

        <!-- Error / Success Alert -->
        <div id="auth-alert" class="hidden mb-6 p-4 text-sm rounded-sm"></div>

        <!-- Login Form -->
        <form id="modal-form-login" class="space-y-5">
          <div>
            <label for="modal-login-email" class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400 mb-2">Email Address</label>
            <input type="email" id="modal-login-email" required class="w-full px-4 py-3 border border-outline-variant/60 dark:border-zinc-700 rounded-sm bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"/>
          </div>
          <div>
            <label for="modal-login-password" class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400 mb-2">Password</label>
            <input type="password" id="modal-login-password" required class="w-full px-4 py-3 border border-outline-variant/60 dark:border-zinc-700 rounded-sm bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"/>
          </div>
          <button type="submit" id="btn-login-submit" class="w-full bg-primary dark:bg-white dark:text-zinc-900 text-white py-3 rounded-sm font-medium hover:bg-opacity-90 transition-opacity">Sign In</button>
        </form>

        <!-- Signup Form -->
        <form id="modal-form-signup" class="space-y-5 hidden">
          <div>
            <label for="signup-name" class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400 mb-2">Full Name</label>
            <input type="text" id="signup-name" required class="w-full px-4 py-3 border border-outline-variant/60 dark:border-zinc-700 rounded-sm bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"/>
          </div>
          <div>
            <label for="signup-email" class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400 mb-2">Email Address</label>
            <input type="email" id="signup-email" required class="w-full px-4 py-3 border border-outline-variant/60 dark:border-zinc-700 rounded-sm bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"/>
          </div>
          <div>
            <label for="signup-password" class="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant dark:text-zinc-400 mb-2">Password (min 8 chars)</label>
            <input type="password" id="signup-password" required class="w-full px-4 py-3 border border-outline-variant/60 dark:border-zinc-700 rounded-sm bg-surface-container-low dark:bg-zinc-800 text-on-surface dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"/>
          </div>
          <div class="flex items-center gap-3">
            <input type="checkbox" id="signup-role-artist" class="h-4 w-4 rounded border-outline-variant/60 dark:border-zinc-700 text-primary focus:ring-primary"/>
            <label for="signup-role-artist" class="text-sm text-on-surface-variant dark:text-zinc-300">I am registering as an Artist</label>
          </div>
          <button type="submit" id="btn-signup" class="w-full bg-primary dark:bg-white dark:text-zinc-900 text-white py-3 rounded-sm font-medium hover:bg-opacity-90 transition-opacity">Create Account</button>
        </form>
      </div>
    </div>

    <!-- User Menu Dropdown -->
    <div id="user-menu" class="absolute hidden right-10 top-16 bg-surface dark:bg-zinc-900 border border-outline-variant dark:border-zinc-700 shadow-xl rounded-sm w-48 py-2 z-[100] text-on-surface">
      <a href="collector-dashboard.html" class="block px-4 py-2 hover:bg-surface-container dark:hover:bg-zinc-800 text-sm font-medium transition-colors">Dashboard</a>
      <button id="btn-signout" class="w-full text-left px-4 py-2 hover:bg-surface-container dark:hover:bg-zinc-800 text-sm font-medium text-red-600 transition-colors">Sign Out</button>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  setupModalEvents();
}

function setupModalEvents() {
  const modal = document.getElementById('auth-modal');
  const backdrop = document.getElementById('auth-backdrop');
  const closeBtn = document.getElementById('auth-close');
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('modal-form-login');
  const formSignup = document.getElementById('modal-form-signup');
  const alertEl = document.getElementById('auth-alert');

  const showTab = (isLogin) => {
    alertEl.className = 'hidden';
    if (isLogin) {
      tabLogin.className = 'flex-1 pb-3 text-sm font-semibold border-b-2 border-primary dark:border-white text-primary dark:text-white';
      tabSignup.className = 'flex-1 pb-3 text-sm font-semibold border-b-2 border-transparent text-on-surface-variant dark:text-zinc-400';
      formLogin.classList.remove('hidden');
      formSignup.classList.add('hidden');
    } else {
      tabSignup.className = 'flex-1 pb-3 text-sm font-semibold border-b-2 border-primary dark:border-white text-primary dark:text-white';
      tabLogin.className = 'flex-1 pb-3 text-sm font-semibold border-b-2 border-transparent text-on-surface-variant dark:text-zinc-400';
      formSignup.classList.remove('hidden');
      formLogin.classList.add('hidden');
    }
  };

  tabLogin.addEventListener('click', () => showTab(true));
  tabSignup.addEventListener('click', () => showTab(false));

  const closeModal = () => modal.classList.replace('flex', 'hidden');
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // Forms submit logic
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertEl.className = 'hidden';
    const email = document.getElementById('modal-login-email').value.trim();
    const password = document.getElementById('modal-login-password').value;

    const btn = document.getElementById('btn-login-submit');
    btn.disabled = true;
    btn.textContent = 'Signing In...';

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    btn.disabled = false;
    btn.textContent = 'Sign In';

    if (error) {
      alertEl.textContent = error.message;
      alertEl.className = 'mb-6 p-4 text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm';
    } else {
      closeModal();
      window.location.reload();
    }
  });

  formSignup.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertEl.className = 'hidden';
    const fullName = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const isArtist = document.getElementById('signup-role-artist').checked;

    if (password.length < 8) {
      alertEl.textContent = 'Password must be at least 8 characters.';
      alertEl.className = 'mb-6 p-4 text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm';
      return;
    }

    const btn = document.getElementById('btn-signup');
    btn.disabled = true;
    btn.textContent = 'Registering...';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: isArtist ? 'artist' : 'collector'
        }
      }
    });
    btn.disabled = false;
    btn.textContent = 'Create Account';

    if (error) {
      alertEl.textContent = error.message;
      alertEl.className = 'mb-6 p-4 text-sm bg-red-50 text-red-700 border border-red-200 rounded-sm';
    } else {
      alertEl.textContent = 'Account created! Please check your email to confirm your address.';
      alertEl.className = 'mb-6 p-4 text-sm bg-green-50 text-green-700 border border-green-200 rounded-sm';
    }
  });
}

function updateAuthButton(user) {
  // Find person/avatar trigger button in navbar
  let authBtn = document.getElementById('auth-person-btn');
  if (!authBtn) {
    // Fallback: look for button or anchor containing person icon
    const icons = document.querySelectorAll('.material-symbols-outlined');
    for (let icon of icons) {
      if (icon.textContent.trim() === 'person') {
        authBtn = icon.tagName === 'BUTTON' ? icon : icon.parentElement;
        break;
      }
    }
  }

  if (!authBtn) return;

  // Clone to remove old click handlers and prevent duplicates
  const newAuthBtn = authBtn.cloneNode(true);
  authBtn.parentNode.replaceChild(newAuthBtn, authBtn);

  newAuthBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (user) {
      // Toggle dropdown menu
      const userMenu = document.getElementById('user-menu');
      if (userMenu) {
        if (userMenu.classList.contains('hidden')) {
          const rect = newAuthBtn.getBoundingClientRect();
          userMenu.style.right = `${window.innerWidth - rect.right}px`;
          userMenu.style.top = `${rect.bottom + window.scrollY + 8}px`;
          userMenu.classList.remove('hidden');
        } else {
          userMenu.classList.add('hidden');
        }
      }
    } else {
      // Open modal
      injectModal();
      const modal = document.getElementById('auth-modal');
      modal.classList.replace('hidden', 'flex');
    }
  });
}

// Global initialization
document.addEventListener('DOMContentLoaded', async () => {
  injectModal();

  // Sign out event listener
  document.getElementById('btn-signout').addEventListener('click', async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    document.getElementById('user-menu').classList.add('hidden');
    window.location.reload();
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    const userMenu = document.getElementById('user-menu');
    const authBtn = document.getElementById('auth-person-btn');
    if (userMenu && !userMenu.contains(e.target) && (!authBtn || !authBtn.contains(e.target))) {
      userMenu.classList.add('hidden');
    }
  });

  // Set up auth state change listener
  supabase.auth.onAuthStateChange((_event, session) => {
    updateAuthButton(session?.user ?? null);
  });

  // Check current session
  const { data: { session } } = await supabase.auth.getSession();
  updateAuthButton(session?.user ?? null);
});
