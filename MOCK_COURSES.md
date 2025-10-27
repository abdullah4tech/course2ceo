# Mock Courses Setup

Run these SQL commands in your Supabase SQL Editor to add sample courses:

## Step 1: Set up your admin user first
```sql
-- Check if you have any users
SELECT id, email FROM auth.users LIMIT 5;

-- Check if you have any profiles  
SELECT id, full_name, is_admin FROM profiles LIMIT 5;

-- Make yourself an admin (run this with your actual user ID)
UPDATE profiles SET is_admin = true WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@gmail.com');

-- OR if you know your user ID directly:
-- UPDATE profiles SET is_admin = true WHERE id = 'your-user-id-here';

-- Verify you now have an admin
SELECT id, full_name, is_admin FROM profiles WHERE is_admin = true;
```

## Insert Mock Courses
```sql
-- Insert sample courses (replace 'your-admin-uuid' with your actual admin user ID)
INSERT INTO courses (title, description, price, thumbnail_url, duration, status, created_by) VALUES

-- Course 1: Web Development
('Complete Web Development Bootcamp', 'Master HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.', 199.99, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop', '40 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 2: React Advanced
('Advanced React Development', 'Deep dive into React hooks, context, state management, and advanced patterns. Build scalable applications.', 149.99, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop', '25 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 3: Node.js Backend
('Node.js Backend Development', 'Learn to build robust APIs, work with databases, authentication, and deploy scalable backend applications.', 179.99, 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop', '30 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 4: Database Design
('Database Design & SQL Mastery', 'Master database design principles, SQL queries, and work with PostgreSQL, MongoDB, and more.', 129.99, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop', '20 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 5: JavaScript Fundamentals
('JavaScript Fundamentals', 'Learn JavaScript from scratch. Perfect for beginners who want to master the language step by step.', 99.99, 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop', '15 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 6: Python Programming
('Python Programming Complete Course', 'Learn Python for web development, data science, automation, and more. Includes hands-on projects.', 159.99, 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop', '35 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 7: Mobile Development (Draft)
('Mobile App Development with React Native', 'Build cross-platform mobile apps using React Native. Learn navigation, state management, and deployment.', 189.99, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop', '28 hours', 'draft', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1)),

-- Course 8: DevOps
('DevOps & Cloud Deployment', 'Master Docker, CI/CD, AWS, and modern deployment strategies. Scale your applications like a pro.', 219.99, 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop', '32 hours', 'published', (SELECT id FROM profiles WHERE is_admin = true LIMIT 1));
```

## Add Sample Lessons (Optional)
```sql
-- Add sample lessons for the first course
INSERT INTO course_lessons (course_id, title, description, content_type, duration, order_index, is_published) VALUES
((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1), 'Introduction to Web Development', 'Overview of web development and what you will learn', 'video', '10 minutes', 1, true),
((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1), 'HTML Basics', 'Learn the fundamentals of HTML structure and elements', 'video', '25 minutes', 2, true),
((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1), 'CSS Styling', 'Master CSS for beautiful web design', 'video', '30 minutes', 3, true),
((SELECT id FROM courses WHERE title = 'Complete Web Development Bootcamp' LIMIT 1), 'JavaScript Introduction', 'Get started with JavaScript programming', 'video', '35 minutes', 4, true);
```

## Verify the Data
```sql
-- Check if courses were created
SELECT id, title, price, status, created_at FROM courses ORDER BY created_at DESC;

-- Check course access for users
SELECT ca.*, c.title, p.full_name 
FROM course_access ca 
JOIN courses c ON ca.course_id = c.id 
JOIN profiles p ON ca.user_id = p.id 
LIMIT 10;
```

## Quick Test Data (Run this first if you want to test quickly)
```sql
-- First, make sure you're an admin (replace with your email)
UPDATE profiles SET is_admin = true WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@gmail.com');

-- Quick single course insert for testing
INSERT INTO courses (title, description, price, thumbnail_url, duration, status, created_by) VALUES
('Test Course', 'This is a test course to verify everything works', 29.99, 'https://via.placeholder.com/400x300', '5 hours', 'published', 
(SELECT id FROM profiles WHERE is_admin = true LIMIT 1));

-- Alternative: If the above fails, insert with your specific user ID
-- INSERT INTO courses (title, description, price, thumbnail_url, duration, status, created_by) VALUES
-- ('Test Course', 'This is a test course to verify everything works', 29.99, 'https://via.placeholder.com/400x300', '5 hours', 'published', 'your-user-id-here');
```