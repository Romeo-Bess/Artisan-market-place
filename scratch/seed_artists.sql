-- 1. Re-create trigger function to capture user metadata role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'collector')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Clear old profiles and users to avoid conflict
DELETE FROM public.profiles WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

DELETE FROM auth.users WHERE id IN (
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555'
);

-- 3. Insert the 5 actual artists in auth.users
-- Password is 'Password123!'
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, is_anonymous) VALUES
('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'elena.rostova@artisane.com', crypt('Password123!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}'::jsonb, '{"full_name": "Elena Rostova", "role": "artist"}'::jsonb, now(), now(), false),
('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'julian.thorne@artisane.com', crypt('Password123!', gen_salt('bf')), now(), '{"provider": "email", "providers": ["email"]}'::jsonb, '{"full_name": "Julian Thorne", "role": "artist"}'::jsonb, now(), now(), false),
('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'aut
<truncated 3341 bytes>