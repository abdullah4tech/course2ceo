import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider, Navbar, UIProvider } from './components'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CoursePage from './pages/CoursePage'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AdminDashboard from './pages/AdminDashboard'
import CourseManagement from './pages/CourseManagement'
import SystemTest from './pages/SystemTest'
import AdminSetup from './pages/AdminSetup'

function App() {
  return (
    <UIProvider>
      <Router>
        <AuthProvider>
          <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LandingPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Profile />
                  </>
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Settings />
                  </>
                </ProtectedRoute>
              } />

              <Route path="/course/:courseId" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <CoursePage />
                  </>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <>
                    <Navbar />
                    <AdminDashboard />
                  </>
                </ProtectedRoute>
              } />

              <Route path="/admin/courses" element={
                <ProtectedRoute adminOnly>
                  <>
                    <Navbar />
                    <CourseManagement />
                  </>
                </ProtectedRoute>
              } />

              <Route path="/admin/test" element={
                <ProtectedRoute adminOnly>
                  <>
                    <Navbar />
                    <SystemTest />
                  </>
                </ProtectedRoute>
              } />

              {/* Admin Setup Route (Development Only) */}
              <Route path="/setup-admin" element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <AdminSetup />
                  </>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          </ToastProvider>
        </AuthProvider>
      </Router>
    </UIProvider>
  )
}

export default App
