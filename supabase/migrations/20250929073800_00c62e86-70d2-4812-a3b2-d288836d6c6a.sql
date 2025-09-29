-- Create new admin user: info@hibera-agency.com
-- This will create the user in auth.users and automatically create a profile via the trigger

-- First, create the user account (this will trigger the handle_new_user function)
-- Note: We're using the admin API to create a confirmed user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  confirmation_token,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'info@hibera-agency.com',
  crypt('Hibera123_', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Hibera Agency Admin"}',
  false,
  'authenticated',
  '',
  '',
  ''
);

-- Wait for the trigger to create the profile, then promote to admin
-- We'll use the promote_to_admin function
SELECT public.promote_to_admin('info@hibera-agency.com');