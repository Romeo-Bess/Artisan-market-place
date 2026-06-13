import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function registerArtists() {
  const artists = [
    { email: 'elena.rostova@artisane.com', name: 'Elena Rostova' },
    { email: 'julian.thorne@artisane.com', name: 'Julian Thorne' },
    { email: 'amara.okafor@artisane.com', name: 'Amara Okafor' },
    { email: 'elena.vance@artisane.com', name: 'Elena Vance' },
    { email: 'marcus.thorne@artisane.com', name: 'Marcus Thorne' }
  ];

  for (let artist of artists) {
    console.log(`Registering ${artist.name} (${artist.email})...`);
    
    // First try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: artist.email,
      password: 'Password123!'
    });

    if (!signInError) {
      console.log(`   Already exists and working. User ID: ${signInData.user.id}`);
      await supabase.auth.signOut();
      continue;
    }

    // Otherwise sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: artist.email,
      password: 'Password123!',
      options: {
        data: {
          full_name: artist.name,
          role: 'artist'
        }
      }
    });

    if (signUpError) {
      console.log(`   âŒ Sign up failed: ${signUpError.message}`);
    } else {
      console.log(`   âœ… Signed up successfully! User ID: ${signUpData.user.id}`);
    }
  }
}

registerArtists();
