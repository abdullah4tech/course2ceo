# Admin Credentials Setup Guide

## Method 1: Using SQL (Recommended)

### Step 1: Create your account first
1. Go to your application: `http://localhost:5173`
2. Sign up with Google OAuth using the email you want to be admin
3. Complete the signup process

### Step 2: Get your User ID
After signing up, you can get your user ID in several ways:

**Option A: From Browser Console**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Paste this code:
```javascript
// This will show your current user ID
console.log('Your User ID:', JSON.parse(localStorage.getItem('sb-' + window.location.hostname.replace(/\./g, '-') + '-auth-token'))?.user?.id);
```

**Option B: From Supabase Dashboard**
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Users
3. Find your user and copy the ID

### Step 3: Run SQL Command
In your Supabase SQL Editor, run:
```sql
-- Replace 'YOUR_USER_ID_HERE' with your actual user ID
UPDATE profiles 
SET is_admin = true 
WHERE id = 'YOUR_USER_ID_HERE';
```

### Step 4: Verify Admin Access
1. Refresh your application
2. You should now see admin options in the navigation
3. Try accessing `/admin` route

## Method 2: Using the Admin Setup Page

I'll create a special setup page that you can use during development.

## Method 3: Environment Variable (For Development)

You can also set up a development admin email in your environment variables.

---

## Common Admin User IDs to Update

Once you know your user ID, here are the common SQL commands:

```sql
-- Make a user admin
UPDATE profiles SET is_admin = true WHERE id = 'your-user-id';

-- Remove admin privileges
UPDATE profiles SET is_admin = false WHERE id = 'your-user-id';

-- Check current admins
SELECT id, full_name, email, is_admin FROM profiles WHERE is_admin = true;
```

## Sample Data for Testing

After you have admin access, you can add sample courses:

```sql
-- Insert sample courses (replace 'your-admin-uuid' with your actual admin user ID)
INSERT INTO courses (title, description, price, thumbnail_url, duration, status, created_by) VALUES
('Introduction to React', 'Learn the basics of React development', 99.99, 'https://via.placeholder.com/400x300', '4 hours', 'published', 'your-admin-uuid'),
('Advanced JavaScript', 'Master advanced JavaScript concepts', 149.99, 'https://via.placeholder.com/400x300', '6 hours', 'published', 'your-admin-uuid'),
('Node.js Backend Development', 'Build scalable backend applications', 199.99, 'https://via.placeholder.com/400x300', '8 hours', 'draft', 'your-admin-uuid');
```