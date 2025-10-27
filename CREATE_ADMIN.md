# Create Admin Account - Step by Step

## Method 1: Using Supabase Dashboard (Recommended)

### Step 1: Sign up a user first
1. Go to your app at `http://localhost:5173`
2. Sign up with Google using the email you want to be admin
3. Complete the signup process

### Step 2: Make that user admin in Supabase Dashboard
1. Go to your **Supabase Dashboard** (https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor** → **profiles** table
4. Find the user you just created
5. Edit the row and set `is_admin` to `true`
6. Save the changes

---

## Method 2: Using SQL Commands

### Step 1: Check existing users
Go to **SQL Editor** in Supabase Dashboard and run:

```sql
-- See all users who have signed up
SELECT 
  au.id,
  au.email,
  au.created_at as signup_date,
  p.full_name,
  p.is_admin
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
ORDER BY au.created_at DESC;
```

### Step 2: Make a user admin
Replace `'your-email@gmail.com'` with your actual email:

```sql
-- Make your user an admin
UPDATE profiles 
SET is_admin = true 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'your-email@gmail.com'
);
```

### Step 3: Verify admin status
```sql
-- Check that you're now an admin
SELECT 
  au.email,
  p.full_name,
  p.is_admin
FROM profiles p
JOIN auth.users au ON au.id = p.id
WHERE p.is_admin = true;
```

---

## Method 3: Create Admin Directly (If no users exist)

If you haven't signed up yet, first sign up through the app, then use Method 1 or 2 above.

---

## Test Admin Access

1. **Logout** from your app if logged in
2. **Login** with your admin email
3. You should be **automatically redirected** to `/admin` instead of `/dashboard`
4. You should see the **Admin Dashboard** with user management features

---

## Troubleshooting

**If admin redirect doesn't work:**
- Check browser console for errors
- Clear browser cache/cookies
- Make sure `is_admin` is set to `true` in the profiles table
- Restart your development server

**If you can't access Supabase Dashboard:**
- Make sure you're logged into the correct Supabase account
- Check that you're in the right project
- Verify your project URL in `.env` matches your Supabase project