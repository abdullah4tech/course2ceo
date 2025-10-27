import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/useAuth'
import { supabase } from '../lib/supabase'
import { Card, LoadingPage, Button, Badge, Modal, useToast } from '../components'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  duration: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft')
})

const CourseManagement = () => {
  const { user, isAdmin } = useAuth()
  const [courses, setCourses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      thumbnail_url: '',
      duration: '',
      status: 'draft'
    }
  })

  const loadCourses = useCallback(async () => {
    if (!user || !isAdmin) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error loading courses:', error)
      toast.error('Failed to load courses.')
    } finally {
      setLoading(false)
    }
  }, [user, isAdmin, toast])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  const handleCreateCourse = () => {
    setEditingCourse(null)
    reset({
      title: '',
      description: '',
      price: 0,
      thumbnail_url: '',
      duration: '',
      status: 'draft'
    })
    setShowModal(true)
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setValue('title', course.title)
    setValue('description', course.description || '')
    setValue('price', course.price)
    setValue('thumbnail_url', course.thumbnail_url || '')
    setValue('duration', course.duration || '')
    setValue('status', course.status)
    setShowModal(true)
  }

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

      if (error) throw error

      toast.success('Course deleted successfully!')
      await loadCourses()
    } catch (error) {
      console.error('Error deleting course:', error)
      toast.error('Failed to delete course.')
    }
  }

  const toggleCourseStatus = async (courseId, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: newStatus })
        .eq('id', courseId)

      if (error) throw error

      toast.success(`Course ${newStatus === 'published' ? 'published' : 'unpublished'} successfully!`)
      await loadCourses()
    } catch (error) {
      console.error('Error updating course status:', error)
      toast.error('Failed to update course status.')
    }
  }

  const onSubmit = async (data) => {
    try {
      if (editingCourse) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingCourse.id)

        if (error) throw error
        toast.success('Course updated successfully!')
      } else {
        // Create new course
        const { error } = await supabase
          .from('courses')
          .insert([{
            ...data,
            created_by: user.id
          }])

        if (error) throw error
        toast.success('Course created successfully!')
      }

      setShowModal(false)
      reset()
      await loadCourses()
    } catch (error) {
      console.error('Error saving course:', error)
      toast.error('Failed to save course.')
    }
  }

  if (loading) {
    return <LoadingPage message="Loading course management..." />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            You don't have permission to access course management.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">
              Create and manage your courses.
            </p>
          </div>
          <Button onClick={handleCreateCourse}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
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
                    <Badge variant={course.status === 'published' ? 'active' : 'draft'}>
                      {course.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description || 'No description provided.'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${course.price}
                    </span>
                    {course.duration && (
                      <span className="text-sm text-gray-500">
                        {course.duration}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCourse(course)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleCourseStatus(course.id, course.status)}
                      >
                        {course.status === 'published' ? (
                          <EyeSlashIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first course.
            </p>
            <Button onClick={handleCreateCourse}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Course
            </Button>
          </div>
        )}

        {/* Course Form Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingCourse ? 'Edit Course' : 'Create New Course'}
          size="lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter course title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter course description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  {...register('duration')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., 2 hours"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                {...register('thumbnail_url')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com/image.jpg"
              />
              {errors.thumbnail_url && (
                <p className="text-red-600 text-sm mt-1">{errors.thumbnail_url.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default CourseManagement