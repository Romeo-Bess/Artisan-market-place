import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function checkSchema() {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('Error fetching artworks:', error);
  } else {
    console.log('ARTWORK RECORD:');
    console.log(data[0]);
  }
}

checkSchema();
