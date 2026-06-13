import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function testLogins() {
  const accounts = [
    { email: 'elena.rostova@artisane.com', name: 'Elena Rostova (Artist 1)' },
    { email: 'elena.vance@artisane.com', name: 'Elena Vance (Artist 4)' },
    { email: 'test.collector.1780172455903@gmail.com', name: 'Test Collector' }
  ];

  for (let acc of accounts) {
    console.log(`Trying ${acc.name}: ${acc.email}...`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: acc.email,
      password: 'Password123!'
    });
    if (error) {
      console.log(`âŒ Failed: ${error.message}`);
    } else {
      console.log(`âœ… Success! User ID: ${data.user.id}`);
      await supabase.auth.signOut();
    }
  }
}

testLogins();
