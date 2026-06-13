import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function listArtworks() {
  const { data, error } = await supabase
    .from('artworks')
    .select('id, title, price, artist_id, medium');
  
  if (error) {
    console.error('Error fetching artworks:', error);
  } else {
    console.log('ARTWORKS IN DATABASE:');
    console.log(JSON.stringify(data, null, 2));
  }

  const { data: artists, error: artistError } = await supabase
    .from('profiles')
    .select('id, full_name, email, role');
  
  if (artistError) {
    console.error('Error fetching profiles:', artistError);
  } else {
    console.log('ARTISTS/PROFILES IN DATABASE:');
    console.log(JSON.stringify(artists, null, 2));
  }
}

listArtworks();
