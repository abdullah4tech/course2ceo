-- ADMIN SETUP SQL SCRIPT
-- Run these commands in Supabase SQL Editor

-- 1. First, check if you have any users
SELECT 
  'Current Users:' as info,
  au.id,
  au.email,
  au.created_at as signup_date,
  p.full_name,
  p.is_admin
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
ORDER BY au.created_at DESC
LIMIT 10;

-- 2. If you see your user above, copy this and replace the email:
-- UPDATE profiles 
-- SET is_admin = true 
-- WHERE id = (
--   SELECT id FROM auth.users 
--   WHERE email = 'REPLACE-WITH-YOUR-EMAIL@gmail.com'
-- );

-- 3. After running the UPDATE, verify with this:
-- SELECT 
--   'Admin Users:' as info,
--   au.email,
--   p.full_name,
--   p.is_admin
-- FROM profiles p
-- JOIN auth.users au ON au.id = p.id
-- WHERE p.is_admin = true;

-- 4. Test that RLS policies work for admin:
-- SELECT 
--   'Admin can see all profiles:' as test,
--   count(*) as total_profiles
-- FROM profiles;