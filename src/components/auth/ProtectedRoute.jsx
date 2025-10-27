import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { LoadingPage } from '../ui/Loading'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, user, profile } = useAuth()
  const location = useLocation()

  console.log('🛡️ ProtectedRoute: Checking access', {
    loading,
    isAuthenticated,
    isAdmin,
    adminOnly,
    hasUser: !!user,
    hasProfile: !!profile,
    path: location.pathname
  })

  // If we have user data but still loading, something is wrong - force proceed
  if (loading && user && profile) {
    console.log('⚠️ ProtectedRoute: Have user data but still loading, forcing proceed')
  } else if (loading) {
    console.log('⏳ ProtectedRoute: Still loading, showing loading page')
    return <LoadingPage message="Loading..." />
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && !isAdmin) {
    // Redirect to dashboard if not admin
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute