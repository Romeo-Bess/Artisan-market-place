import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function runTests() {
    console.log('--- STARTING BACKEND INTEGRATION TESTS ---');
    let testCartId = null;
    let testCommissionId = null;
    let userId = null;
    const testEmail = 'test.collector.1780172455903@gmail.com';
    const testPassword = 'Password123!';

    try {
        // 0. Sign in dynamically using previously registered user
        console.log(`[TEST 0] Signing in user: ${testEmail}...`);
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
        });

        if (authError) throw new Error(`Sign in failed: ${authError.message}`);
        userId = authData.user.id;
        console.log(`âœ… Authenticated successfully. User ID: ${userId}`);

        // 1. Create a new cart session
        console.log('\
[TEST 1] Creating a new cart session...');
        const { data: cart, error: cartError } = await supabase
            .from('carts')
            .insert([{ user_id: userId }])
            .select('id')
            .single();

        if (cartError) throw new Error(`Failed to create cart: ${cartError.message}`);
        testCartId = cart.id;
        console.log(`âœ… Cart created successfully. ID: ${testCartId}`);

        // 2. Add an item to the cart
        console.log('\
[TEST 2] Adding artwork to cart...');
        const testArtworkId = '744216cb-a9ed-4a6a-a06c-ad0973650506'; // Ethereal Silence No. 4
        const { data: addedItem, error: addError } = await supabase
            .from('cart_it
<truncated 4106 bytes>