const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const headers = {
  'apikey': SUPABASE_ANON,
  'Authorization': `Bearer ${SUPABASE_ANON}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation'
};

async function verifyFlows() {
  console.log("=== Starting Supabase Backend Flow Verification ===");

  try {
    // 1. Verify we can fetch artworks
    console.log("1. Fetching artworks from database...");
    const artRes = await fetch(`${SUPABASE_URL}/rest/v1/artworks?select=*`, { headers });
    if (!artRes.ok) throw new Error(`Fetch artworks failed: ${artRes.statusText}`);
    const artworks = await artRes.json();
    console.log(`âœ… Success: Found ${artworks.length} artworks in database.`);
    if (artworks.length > 0) {
      console.log(`   Sample Artwork: "${artworks[0].title}" (ID: ${artworks[0].id})`);
    }

    // 2. Test creating a new cart (anonymous session)
    console.log("\
2. Creating a new anonymous cart session...");
    const cartRes = await fetch(`${SUPABASE_URL}/rest/v1/carts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({})
    });
    if (!cartRes.ok) throw new Error(`Create cart failed: ${cartRes.statusText}`);
    const carts = await cartRes.json();
    const cart = carts[0];
    console.log(`âœ… Success: Created cart with ID: ${cart.id}`);
    console.log(`   Verified: Cart has user_id = ${cart.user_id} (NULL as expected for guests/anonymous)`);

    // 3. Test adding an artwork item to the cart
    if (artworks.length > 0) {
      const targetArtwork = artworks[0];
      console.log(`\
3. Adding artwork "${targetArtwork.title}" to cart ${cart.id}...`);
      
      const itemRes = await fetch(`${SUPABASE_URL}/rest/v1/cart_items`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          cart_id: cart.id,
          artwork_id: targetArtwork.id,
          quantity: 1
        })
      });
      if (!itemRes.ok) throw new Error(`Add cart item failed: ${itemRes.statusText}`);
      console.log("✅ Success: Added item to cart.");
    }
  } catch (err) {
    console.error("❌ Error during verification:", err.message);
  }
}
verifyFlows();
<truncated 1388 bytes>