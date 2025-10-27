import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getCourseLessons, getUserCourseAccess } from '../lib/supabase'
import { Card, LoadingPage, useToast, Button } from '../components'
import { 
  PlayCircleIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

const CoursePage = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [lessons, setLessons] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [courseAccess, setCourseAccess] = useState(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState({})
  const toast = useToast()

  const loadCourseData = useCallback(async () => {
    if (!user || !courseId) return

    try {
      setLoading(true)
      
      // Check if user has access to this course
      const accessData = await getUserCourseAccess(user.id)
      const courseAccessRecord = accessData.find(access => access.course_id === courseId)
      
      if (!courseAccessRecord || courseAccessRecord.status !== 'active') {
        toast.error('You do not have access to this course.')
        navigate('/dashboard')
        return
      }

      setCourseAccess(courseAccessRecord)
      
      // Load course lessons
      const lessonsData = await getCourseLessons(courseId)
      setLessons(lessonsData || [])
      
      // Set first lesson as current if none selected
      if (lessonsData && lessonsData.length > 0 && !currentLesson) {
        setCurrentLesson(lessonsData[0])
      }
      
    } catch (error) {
      console.error('Error loading course data:', error)
      toast.error('Failed to load course content.')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }, [user, courseId, currentLesson, navigate, toast])

  useEffect(() => {
    loadCourseData()
  }, [loadCourseData])

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson)
  }

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id)
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1])
    }
  }

  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id)
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1])
    }
  }

  const markLessonComplete = () => {
    // This would update progress in the database
    setProgress(prev => ({
      ...prev,
      [currentLesson.id]: true
    }))
    toast.success('Lesson marked as complete!')
  }

  const renderContentArea = () => {
    if (!currentLesson) return null

    switch (currentLesson.content_type) {
      case 'video':
        return (
          <div className="space-y-4">
            {currentLesson.content_url ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  controls
                  poster="/api/placeholder/800/450"
                >
                  <source src={currentLesson.content_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PlayCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Video content will be available soon</p>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'text':
        return (
          <div className="prose max-w-none">
            {currentLesson.content_text ? (
              <div dangerouslySetInnerHTML={{ __html: currentLesson.content_text }} />
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Text content will be available soon</p>
              </div>
            )}
          </div>
        )
      
      case 'pdf':
        return (
          <div className="w-full h-96">
            {currentLesson.content_url ? (
              <iframe
                src={currentLesson.content_url}
                className="w-full h-full rounded-lg border"
                title={currentLesson.title}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">PDF content will be available soon</p>
                </div>
              </div>
            )}
          </div>
        )
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Content type not supported yet</p>
          </div>
        )
    }
  }

  if (loading) {
    return <LoadingPage message="Loading course content..." />
  }

  if (!courseAccess || !lessons.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No Course Content Available
          </h2>
          <p className="text-gray-600 mb-6">
            This course doesn't have any lessons yet, or you don't have access to view them.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson?.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center hover:text-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Dashboard
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {courseAccess.courses?.title || 'Course'}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold text-gray-900">
                  Course Lessons
                </h2>
                <p className="text-sm text-gray-600">
                  {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
                </p>
              </Card.Header>
              <Card.Content className="p-0">
                <div className="space-y-1">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson)}
                      className={`w-full text-left p-4 border-l-4 transition-colors ${
                        currentLesson?.id === lesson.id
                          ? 'border-primary-500 bg-primary-50 text-primary-900'
                          : 'border-transparent hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-gray-500">
                              {index + 1}.
                            </span>
                            {progress[lesson.id] && (
                              <CheckCircleIcon className="h-4 w-4 text-success-500" />
                            )}
                          </div>
                          <p className="text-sm font-medium truncate">
                            {lesson.title}
                          </p>
                          {lesson.duration && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {lesson.duration}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentLesson && (
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {currentLesson.title}
                      </h1>
                      {currentLesson.description && (
                        <p className="text-gray-600 mt-2">
                          {currentLesson.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {currentLesson.duration && (
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {currentLesson.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </Card.Header>
                
                <Card.Content>
                  {renderContentArea()}
                </Card.Content>

                <Card.Footer>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={handlePreviousLesson}
                        disabled={currentIndex === 0}
                      >
                        <ChevronLeftIcon className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleNextLesson}
                        disabled={currentIndex === lessons.length - 1}
                      >
                        Next
                        <ChevronRightIcon className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    
                    <Button
                      variant={progress[currentLesson.id] ? "success" : "primary"}
                      onClick={markLessonComplete}
                    >
                      {progress[currentLesson.id] ? (
                        <>
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Completed
                        </>
                      ) : (
                        'Mark Complete'
                      )}
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage