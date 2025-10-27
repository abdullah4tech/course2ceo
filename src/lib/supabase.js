import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Helper functions for Supabase operations

/**
 * Get current user session
 */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Get user profile with admin status
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Create user profile manually (fallback if trigger fails)
 */
export const createUserProfile = async (user) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email,
      avatar_url: user.user_metadata?.avatar_url || null,
      is_admin: false
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  
  if (error) throw error
  return data
}

/**
 * Sign out user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Get all published courses (optimized)
 */
export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, description, price, thumbnail_url, duration, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(20) // Limit for faster loading
  
  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  return data || []
}

/**
 * Get user's course access status (optimized)
 */
export const getUserCourseAccess = async (userId) => {
  const { data, error } = await supabase
    .from('course_access')
    .select('course_id, status, granted_at, expires_at')
    .eq('user_id', userId)
    .limit(50) // Reasonable limit
  
  if (error) {
    console.error('Error fetching user course access:', error)
    return []
  }
  return data || []
}

/**
 * Get course lessons (only for users with active access)
 */
export const getCourseLessons = async (courseId) => {
  const { data, error } = await supabase
    .from('course_lessons')
    .select('*')
    .eq('course_id', courseId)
    .eq('is_published', true)
    .order('order_index', { ascending: true })
  
  if (error) throw error
  return data
}

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}