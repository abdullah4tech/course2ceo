import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/useAuth'
import { getCourses, getUserCourseAccess } from '../lib/supabase'
import { Card, Badge, Button, Modal, LoadingPage, useToast } from '../components'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

// Demo courses for when database is empty or slow
const getDemoCourses = () => [
  {
    id: 'demo-1',
    title: 'Complete Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.',
    price: 199.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    duration: '40 hours'
  },
  {
    id: 'demo-2', 
    title: 'Advanced React Development',
    description: 'Deep dive into React hooks, context, state management, and advanced patterns. Build scalable applications.',
    price: 149.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    duration: '25 hours'
  },
  {
    id: 'demo-3',
    title: 'Node.js Backend Development', 
    description: 'Learn to build robust APIs, work with databases, authentication, and deploy scalable backend applications.',
    price: 179.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    duration: '30 hours'
  },
  {
    id: 'demo-4',
    title: 'JavaScript Fundamentals',
    description: 'Learn JavaScript from scratch. Perfect for beginners who want to master the language step by step.',
    price: 99.99,
    thumbnail_url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
    duration: '15 hours'
  }
]

const Dashboard = () => {
  const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth()
  
  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      console.log('🔄 Dashboard: Admin user detected, redirecting to admin dashboard')
      window.location.href = '/admin'
      return
    }
  }, [isAuthenticated, isAdmin])
  const [courses, setCourses] = useState([])
  const [userAccess, setUserAccess] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const toast = useToast()

  const [hasLoaded, setHasLoaded] = useState(false)
  
  const loadData = useCallback(async () => {
    if (!user?.id || hasLoaded) return
    
    try {
      console.log('📚 Dashboard: Starting to load courses data')
      setLoading(true)
      setHasLoaded(true)
      
      console.log('🔍 Dashboard: Fetching courses and user access for:', user.id)
      
      // Load with timeout for better UX
      const loadWithTimeout = Promise.race([
        Promise.all([
          getCourses(),
          getUserCourseAccess(user.id)
        ]),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
      ])
      
      const [coursesData, accessData] = await loadWithTimeout
      
      console.log('✅ Dashboard: Courses loaded:', coursesData?.length || 0)
      console.log('✅ Dashboard: User access loaded:', accessData?.length || 0)
      
      // If no courses, add some mock data for demo
      if (!coursesData || coursesData.length === 0) {
        console.log('📝 Dashboard: No courses found, using demo data')
        setCourses(getDemoCourses())
        setUserAccess([])
      } else {
        setCourses(coursesData)
        setUserAccess(accessData || [])
      }
    } catch (error) {
      console.error('❌ Dashboard: Error loading data:', error)
      if (error.message === 'Timeout') {
        toast.error('Loading is taking too long. Showing demo courses.')
      } else {
        toast.error('Failed to load courses. Showing demo courses.')
      }
      // Set demo courses so we can still show the dashboard
      setCourses(getDemoCourses())
      setUserAccess([])
    } finally {
      console.log('🏁 Dashboard: Data loading complete')
      setLoading(false)
    }
  }, [user?.id, hasLoaded, toast])

  useEffect(() => {
    if (isAuthenticated && user?.id && !hasLoaded) {
      console.log('🎯 Dashboard: User authenticated, loading data for user:', user.id)
      
      // Set demo courses immediately to prevent white screen
      setCourses(getDemoCourses())
      
      loadData()
      
      // Failsafe: Stop loading after 2 seconds
      const dashboardFailsafe = setTimeout(() => {
        console.log('⚠️ Dashboard: Failsafe triggered - stopping loading')
        setLoading(false)
        setCourses(prev => prev.length === 0 ? getDemoCourses() : prev)
      }, 2000)
      
      return () => clearTimeout(dashboardFailsafe)
    }
  }, [isAuthenticated, user?.id, hasLoaded, loadData])

  const getAccessStatus = (courseId) => {
    const access = userAccess.find(a => a.course_id === courseId)
    return access?.status || 'not_purchased'
  }

  const handleCourseClick = (course) => {
    const status = getAccessStatus(course.id)
    
    if (status === 'active') {
      // Navigate to course content
      window.location.href = `/course/${course.id}`
    } else {
      // Show payment modal
      setSelectedCourse(course)
      setShowPaymentModal(true)
    }
  }

  const handleWhatsAppContact = () => {
    const phone = import.meta.env.VITE_ADMIN_WHATSAPP || '+123456789'
    const message = `Hi! I'd like to purchase access to the course: ${selectedCourse?.title}`
    const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    
    const status = getAccessStatus(course.id)
    return matchesSearch && status === filterStatus
  })

  if (authLoading || loading) {
    return <LoadingPage message="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here are your available courses.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-80"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Courses</option>
                <option value="active">Active</option>
                <option value="not_purchased">Not Purchased</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const status = getAccessStatus(course.id)
              return (
                <Card 
                  key={course.id}
                  hover
                  onClick={() => handleCourseClick(course)}
                  className="cursor-pointer"
                >
                  {course.thumbnail_url && (
                    <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <Card.Content>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <Badge variant={status}>
                        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ${course.price}
                      </span>
                      {course.duration && (
                        <span className="text-sm text-gray-500">
                          {course.duration}
                        </span>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'No courses are available at the moment.'}
            </p>
          </div>
        )}

        {/* Payment Modal */}
        <Modal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          title="Purchase Course Access"
          size="lg"
        >
          {selectedCourse && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedCourse.title}
                </h3>
                <div className="text-3xl font-bold text-primary-600 mb-4">
                  ${selectedCourse.price}
                </div>
                <p className="text-gray-600">
                  Contact our admin team to complete your payment and get instant access to this course.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Payment Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Contact our admin team using the options below</li>
                  <li>Mention the course name: "{selectedCourse.title}"</li>
                  <li>Complete the payment using your preferred method</li>
                  <li>Send payment confirmation to admin</li>
                  <li>Access will be granted within 24 hours</li>
                </ol>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Contact Admin:</h4>
                
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">
                        {import.meta.env.VITE_ADMIN_EMAIL || 'admin@platform.com'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${import.meta.env.VITE_ADMIN_EMAIL || 'admin@platform.com'}`)}
                  >
                    Send Email
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">
                        {import.meta.env.VITE_ADMIN_WHATSAPP || '+123456789'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWhatsAppContact}
                  >
                    Open WhatsApp
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleWhatsAppContact}>
                  Contact via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default Dashboard