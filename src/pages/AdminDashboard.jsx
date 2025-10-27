import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { Card, LoadingPage, Button, Badge, Modal, useToast } from '../components'
import { 
  UsersIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeEnrollments: 0,
    recentRegistrations: []
  })
  const [users, setUsers] = useState([])
  const [_courses, setCourses] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userAccess, setUserAccess] = useState([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const loadAdminData = useCallback(async () => {
    if (!user || !isAdmin) return

    try {
      setLoading(true)

      // Load statistics
      const [usersResult, coursesResult, enrollmentsResult] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('courses').select('*', { count: 'exact' }),
        supabase.from('course_access').select('*', { count: 'exact' }).eq('status', 'active')
      ])

      // Load recent registrations
      const recentUsers = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setStats({
        totalUsers: usersResult.count || 0,
        totalCourses: coursesResult.count || 0,
        activeEnrollments: enrollmentsResult.count || 0,
        recentRegistrations: recentUsers.data || []
      })

      setUsers(usersResult.data || [])
      setCourses(coursesResult.data || [])

    } catch (error) {
      console.error('Error loading admin data:', error)
      toast.error('Failed to load admin data.')
    } finally {
      setLoading(false)
    }
  }, [user, isAdmin, toast])

  const loadUserAccess = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('course_access')
        .select(`
          *,
          courses (
            id,
            title,
            price
          )
        `)
        .eq('user_id', userId)

      if (error) throw error
      setUserAccess(data || [])
    } catch (error) {
      console.error('Error loading user access:', error)
      toast.error('Failed to load user access data.')
    }
  }

  const handleUserClick = async (clickedUser) => {
    setSelectedUser(clickedUser)
    await loadUserAccess(clickedUser.id)
    setShowUserModal(true)
  }

  const toggleUserAccess = async (courseId, currentStatus) => {
    if (!selectedUser) return

    try {
      const newStatus = currentStatus === 'active' ? 'not_purchased' : 'active'
      
      const { error } = await supabase
        .from('course_access')
        .update({
          status: newStatus,
          granted_by: newStatus === 'active' ? user.id : null,
          granted_at: newStatus === 'active' ? new Date().toISOString() : null
        })
        .eq('user_id', selectedUser.id)
        .eq('course_id', courseId)

      if (error) throw error

      // Reload user access
      await loadUserAccess(selectedUser.id)
      toast.success(`Course access ${newStatus === 'active' ? 'granted' : 'revoked'} successfully!`)
      
    } catch (error) {
      console.error('Error updating user access:', error)
      toast.error('Failed to update course access.')
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [loadAdminData])

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingPage message="Loading admin dashboard..." />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access the admin dashboard.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, courses, and access permissions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <Card.Content className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <UsersIcon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg">
                <AcademicCapIcon className="h-8 w-8 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex items-center">
              <div className="p-3 bg-warning-100 rounded-lg">
                <CheckCircleIcon className="h-8 w-8 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Enrollments</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeEnrollments}</p>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Recent Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Registrations
              </h2>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {stats.recentRegistrations.map((recentUser) => (
                  <div key={recentUser.id} className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">
                        {recentUser.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {recentUser.full_name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(recentUser.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h2>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create New Course
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Bulk User Management
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AcademicCapIcon className="h-4 w-4 mr-2" />
                  Course Analytics
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* User Management */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                User Management
              </h2>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-80"
                />
              </div>
            </div>
          </Card.Header>
          <Card.Content className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((tableUser) => (
                    <tr key={tableUser.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {tableUser.full_name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {tableUser.full_name || 'Unknown User'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {tableUser.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={tableUser.is_admin ? 'active' : 'not-purchased'}>
                          {tableUser.is_admin ? 'Admin' : 'User'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(tableUser.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUserClick(tableUser)}
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Manage Access
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>

        {/* User Access Management Modal */}
        <Modal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          title="Manage Course Access"
          size="lg"
        >
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-primary-600">
                    {selectedUser.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedUser.full_name || 'Unknown User'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedUser.id}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Course Access</h4>
                {userAccess.length > 0 ? (
                  <div className="space-y-3">
                    {userAccess.map((access) => (
                      <div
                        key={access.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {access.courses?.title || 'Unknown Course'}
                          </h5>
                          <p className="text-sm text-gray-500">
                            ${access.courses?.price || 0}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={access.status}>
                            {access.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <Button
                            size="sm"
                            variant={access.status === 'active' ? 'danger' : 'success'}
                            onClick={() => toggleUserAccess(access.course_id, access.status)}
                          >
                            {access.status === 'active' ? 'Revoke' : 'Grant'} Access
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No course access found for this user.
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowUserModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default AdminDashboard