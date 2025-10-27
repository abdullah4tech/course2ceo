# Fixed Database Schema Setup Instructions

This file contains the corrected SQL commands to fix the user creation issues.

## Run these SQL commands in your Supabase SQL Editor to fix the issues:

### 1. First, drop existing problematic triggers and functions
```sql
-- Drop existing triggers that might be causing issues
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_profile_created ON profiles;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS create_default_course_access();
```

### 2. Create improved user handling function
```sql
-- Improved function to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles with proper error handling
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Create course access records for all published courses
  INSERT INTO public.course_access (user_id, course_id, status)
  SELECT NEW.id, courses.id, 'not_purchased'
  FROM public.courses
  WHERE courses.status = 'published'
  ON CONFLICT (user_id, course_id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. Recreate the trigger
```sql
-- Trigger to create profile and course access on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 4. Fix RLS policies for profiles table
```sql
-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Recreate policies with proper permissions
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow the trigger function to insert profiles
CREATE POLICY "System can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);
```

### 5. Fix course_access policies
```sql
-- Drop and recreate course_access policies
DROP POLICY IF EXISTS "Users can view their own course access" ON course_access;
DROP POLICY IF EXISTS "Admins can manage all course access" ON course_access;

-- Recreate with proper permissions
CREATE POLICY "Users can view their own course access" ON course_access
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert course access" ON course_access
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all course access" ON course_access
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );
```

### 6. Alternative: Disable RLS temporarily during user creation
If you're still having issues, you can temporarily disable RLS on the profiles table:
```sql
-- Temporary fix: disable RLS on profiles during development
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable it later when everything is working:
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### 7. Test user creation
After running the above fixes, try creating a new user account and check if the error persists.

### 8. Debug queries
If you still have issues, run these queries to check what's happening:
```sql
-- Check if profiles table exists and has correct structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles';

-- Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Check if there are any existing profiles
SELECT count(*) FROM profiles;
```