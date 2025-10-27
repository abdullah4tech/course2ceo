import { useEffect, useState } from 'react'
import { supabase, getCurrentUser, getUserProfile, createUserProfile } from '../lib/supabase'
import { AuthContext } from './AuthContextProvider'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      console.log('🔄 AuthContext: Starting auth initialization')
      
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ AuthContext: Session error:', error)
          if (mounted) {
            setLoading(false)
          }
          return
        }

        console.log('📋 AuthContext: Session found:', !!session)

        if (session?.user && mounted) {
          console.log('👤 AuthContext: Setting user:', session.user.email)
          setUser(session.user)

          // Get or create profile
          try {
            const userProfile = await getUserProfile(session.user.id)
            console.log('✅ AuthContext: Profile loaded:', userProfile.full_name)
            if (mounted) {
              setProfile(userProfile)
            }
          } catch (profileError) {
            console.log('🔧 AuthContext: Creating profile for new user')
            try {
              await createUserProfile(session.user)
              const newProfile = await getUserProfile(session.user.id)
              console.log('✅ AuthContext: Profile created:', newProfile.full_name)
              if (mounted) {
                setProfile(newProfile)
              }
            } catch (createError) {
              console.error('❌ AuthContext: Profile creation failed:', createError)
              if (mounted) {
                setProfile(null)
              }
            }
          }
        } else {
          console.log('🚫 AuthContext: No session found')
          if (mounted) {
            setUser(null)
            setProfile(null)
          }
        }
      } catch (error) {
        console.error('❌ AuthContext: Initialization error:', error)
      } finally {
        console.log('🏁 AuthContext: Initialization complete')
        if (mounted) {
          setLoading(false)
        }
      }
    }

    // Initialize auth
    initAuth()

    // Listen for auth changes (but don't set loading again)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 AuthContext: Auth event:', event)
        
        if (event === 'SIGNED_OUT') {
          console.log('👋 AuthContext: User signed out')
          if (mounted) {
            setUser(null)
            setProfile(null)
          }
        } else if (event === 'SIGNED_IN' && session?.user && mounted) {
          console.log('👤 AuthContext: User signed in:', session.user.email)
          setUser(session.user)
          
          // Only fetch profile if we don't have one
          if (!profile) {
            try {
              const userProfile = await getUserProfile(session.user.id)
              console.log('✅ AuthContext: Profile loaded on signin:', userProfile.full_name)
              setProfile(userProfile)
            } catch (error) {
              console.error('❌ AuthContext: Profile fetch failed on signin:', error)
            }
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    profile,
    loading,
    signOut: handleSignOut,
    isAdmin: profile?.is_admin || false,
    isAuthenticated: !!user,
  }

  console.log('📊 AuthContext: Current state:', {
    hasUser: !!user,
    hasProfile: !!profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin || false,
    userEmail: user?.email
  })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}