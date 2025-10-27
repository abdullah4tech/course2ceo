# Quick Setup Script

**Run these commands in order in your Supabase SQL Editor:**

## 1. Find Your User ID
```sql
-- Find your user ID by email (replace with your Google email)
SELECT id, email FROM auth.users WHERE email = 'your-email@gmail.com';
```

## 2. Make Yourself Admin
```sql
-- Replace 'your-email@gmail.com' with your actual email
UPDATE profiles SET is_admin = true 
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@gmail.com');

-- Verify you're now admin
SELECT id, full_name, is_admin FROM profiles WHERE is_admin = true;
```

## 3. Add One Test Course
```sql
-- This will work now that you're an admin
INSERT INTO courses (title, description, price, thumbnail_url, duration, status, created_by) VALUES
(
    'Test Course', 
    'This is a test course to verify everything works', 
    29.99, 
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', 
    '5 hours', 
    'published', 
    (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)
);
```

## 4. Verify It Worked
```sql
-- Check if course was created
SELECT id, title, price, created_by FROM courses;

-- Check if course access was created for you
SELECT ca.*, c.title 
FROM course_access ca 
JOIN courses c ON ca.course_id = c.id 
WHERE ca.user_id = (SELECT id FROM profiles WHERE is_admin = true LIMIT 1);
```

---

## If You Don't Know Your Email
```sql
-- List all users to find yours
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- Then use the ID directly:
-- UPDATE profiles SET is_admin = true WHERE id = 'paste-your-user-id-here';
```

## Alternative: Use /setup-admin Page
1. Go to `http://localhost:5173/setup-admin`
2. Click "Make Me Admin" 
3. Then come back and run the course insert SQL