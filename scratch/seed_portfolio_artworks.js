import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yakfjagdluabbpkbwkmy.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlha2ZqYWdkbHVhYmJwa2J3a215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDM4NTQsImV4cCI6MjA5NTQ3OTg1NH0.4t5lqtXuoKSpwU3wUyG-9X5TZLw8M6mELAQU9ohvtCk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

const artworksToSeed = [
  {
    id: '44444444-aaaa-1111-bbbb-000000000001',
    title: 'Silent Echoes No. 4',
    description: 'Contemporary abstract painting by Elena Vance featuring layered textures of Gallery Blue and earthy ochre.',
    price: 84500,
    medium: 'Oil on Belgian Linen',
    artist_id: '44444444-4444-4444-4444-444444444444',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6JBSpcX7OIgejm5xxfLDb4lDH2B1Gp15bsyyxnfvDCoTgoYD8DbcSGxMKCkn7KzYxwWhqkS2qcFx0EP8DlkFEX3c7182MkV2r1FDwEqu_GoxMYVvfXbtT1Rg2Stiy5aN10XsxF4BOUbcirx5NUFDUEEsoNdVG0xJGqqR3r7zmelavFO5UivbRcLr4evYzpT77ORpkeuu1RM7yuCoEeUHjcrgRMWstcfLXtWfu7BxYvHZ00mpO8k6yZIYxPVEpi4FPlETtmHA1bn8_'
  },
  {
    id: '44444444-aaaa-1111-bbbb-000000000002',
    title: 'Fluid Form I',
    description: 'Minimalist marble sculpture with smooth, organic curves.',
    price: 128000,
    medium: 'Carrara Marble',
    artist_id: '44444444-4444-4444-4444-444444444444',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnKukAi5skE0tzHTwF9_BGSrR6ZmW6xG1Kxr1wtBvkrJZJGDavj-G57Bvzo9-F3YnhGtithOsNDv-iDpS3c6uAyt8lfjJ8RgjxgpYn7fREo4CFmLMTZrLzlqiFn8jBuWuMYbg8gvNMADGjkW0L1P3DWTUHVLIXIQTO2QluB0EppzCApLZjlz-i6l6-XRstyMYGzbhNvHMk8OAuR6sHhax0wF1ADWekFLo_Kw1SLw2SaxkTWiPPoNR9_aF8mrnrssL-9zKNOYOXsAtp'
  },
  {
    id: '44444444-aaaa-1111-bbbb-000000000003',
    title: 'Tectonic Study (Series of 4)',
    description: 'Set of four small-scale ceramic pieces with a crackled turquoise glaze.',
    price: 22000,
    medium: 'Ceramics',
    artist_id: '44444444-4444-4444-4444-444444444444',
    image_url: 'h
<truncated 5026 bytes>