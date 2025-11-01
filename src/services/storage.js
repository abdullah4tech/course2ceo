/**
 * LocalStorage Service
 * Centralized service for managing all application data in localStorage
 */

const STORAGE_KEYS = {
  USERS: 'course_platform_users',
  COURSES: 'course_platform_courses',
  ENROLLMENTS: 'course_platform_enrollments',
  PROGRESS: 'course_platform_progress',
  AUTH: 'course_platform_auth'
};

// Initialize default data
const initializeStorage = () => {
  // Initialize users if not exists
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@course2ceo.com',
        password: 'admin123', // In production, use hashed passwords
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'student@course2ceo.com',
        password: 'student123',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  // Initialize other storage keys if they don't exist
  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify([]));
  }
};

// Generic CRUD operations
const getAll = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return [];
  }
};

const save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    return false;
  }
};

// User Management
export const userService = {
  getAll: () => getAll(STORAGE_KEYS.USERS),
  
  getById: (id) => {
    const users = getAll(STORAGE_KEYS.USERS);
    return users.find(user => user.id === id);
  },
  
  getByEmail: (email) => {
    const users = getAll(STORAGE_KEYS.USERS);
    return users.find(user => user.email === email);
  },
  
  create: (userData) => {
    const users = getAll(STORAGE_KEYS.USERS);
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    save(STORAGE_KEYS.USERS, users);
    return newUser;
  },
  
  update: (id, userData) => {
    const users = getAll(STORAGE_KEYS.USERS);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      save(STORAGE_KEYS.USERS, users);
      return users[index];
    }
    return null;
  },
  
  delete: (id) => {
    const users = getAll(STORAGE_KEYS.USERS);
    const filtered = users.filter(user => user.id !== id);
    save(STORAGE_KEYS.USERS, filtered);
    return true;
  },
  
  authenticate: (email, password) => {
    const user = userService.getByEmail(email);
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
};

// Course Management
export const courseService = {
  getAll: () => getAll(STORAGE_KEYS.COURSES),
  
  getById: (id) => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    return courses.find(course => course.id === parseInt(id));
  },
  
  getPublished: () => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    return courses.filter(course => course.status === 'published');
  },
  
  create: (courseData) => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    const newCourse = {
      id: Date.now(),
      ...courseData,
      students: 0,
      rating: 0,
      reviews: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    courses.push(newCourse);
    save(STORAGE_KEYS.COURSES, courses);
    return newCourse;
  },
  
  update: (id, courseData) => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    const index = courses.findIndex(course => course.id === parseInt(id));
    if (index !== -1) {
      courses[index] = { 
        ...courses[index], 
        ...courseData,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      save(STORAGE_KEYS.COURSES, courses);
      return courses[index];
    }
    return null;
  },
  
  delete: (id) => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    const filtered = courses.filter(course => course.id !== parseInt(id));
    save(STORAGE_KEYS.COURSES, filtered);
    
    // Also remove enrollments for this course
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    const filteredEnrollments = enrollments.filter(e => e.courseId !== parseInt(id));
    save(STORAGE_KEYS.ENROLLMENTS, filteredEnrollments);
    
    return true;
  },
  
  toggleStatus: (id) => {
    const courses = getAll(STORAGE_KEYS.COURSES);
    const index = courses.findIndex(course => course.id === parseInt(id));
    if (index !== -1) {
      courses[index].status = courses[index].status === 'published' ? 'draft' : 'published';
      save(STORAGE_KEYS.COURSES, courses);
      return courses[index];
    }
    return null;
  }
};

// Enrollment Management
export const enrollmentService = {
  getAll: () => getAll(STORAGE_KEYS.ENROLLMENTS),
  
  getUserEnrollments: (userId) => {
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    return enrollments.filter(e => e.userId === userId);
  },
  
  isEnrolled: (userId, courseId) => {
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    return enrollments.some(e => e.userId === userId && e.courseId === parseInt(courseId));
  },
  
  enroll: (userId, courseId) => {
    if (enrollmentService.isEnrolled(userId, courseId)) {
      return null; // Already enrolled
    }
    
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    const newEnrollment = {
      id: Date.now(),
      userId,
      courseId: parseInt(courseId),
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false
    };
    enrollments.push(newEnrollment);
    save(STORAGE_KEYS.ENROLLMENTS, enrollments);
    
    // Update course student count
    const courses = getAll(STORAGE_KEYS.COURSES);
    const courseIndex = courses.findIndex(c => c.id === parseInt(courseId));
    if (courseIndex !== -1) {
      courses[courseIndex].students = (courses[courseIndex].students || 0) + 1;
      save(STORAGE_KEYS.COURSES, courses);
    }
    
    return newEnrollment;
  },
  
  unenroll: (userId, courseId) => {
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    const filtered = enrollments.filter(e => !(e.userId === userId && e.courseId === parseInt(courseId)));
    save(STORAGE_KEYS.ENROLLMENTS, filtered);
    
    // Update course student count
    const courses = getAll(STORAGE_KEYS.COURSES);
    const courseIndex = courses.findIndex(c => c.id === parseInt(courseId));
    if (courseIndex !== -1 && courses[courseIndex].students > 0) {
      courses[courseIndex].students -= 1;
      save(STORAGE_KEYS.COURSES, courses);
    }
    
    return true;
  }
};

// Progress Tracking
export const progressService = {
  getAll: () => getAll(STORAGE_KEYS.PROGRESS),
  
  getCourseProgress: (userId, courseId) => {
    const progress = getAll(STORAGE_KEYS.PROGRESS);
    return progress.find(p => p.userId === userId && p.courseId === parseInt(courseId));
  },
  
  getLessonProgress: (userId, courseId, lessonId) => {
    const courseProgress = progressService.getCourseProgress(userId, courseId);
    if (!courseProgress) return null;
    return courseProgress.lessons?.find(l => l.lessonId === lessonId);
  },
  
  markLessonComplete: (userId, courseId, lessonId) => {
    const allProgress = getAll(STORAGE_KEYS.PROGRESS);
    let courseProgress = allProgress.find(p => p.userId === userId && p.courseId === parseInt(courseId));
    
    if (!courseProgress) {
      // Create new progress entry
      courseProgress = {
        id: Date.now(),
        userId,
        courseId: parseInt(courseId),
        lessons: [],
        lastAccessed: new Date().toISOString()
      };
      allProgress.push(courseProgress);
    }
    
    // Mark lesson as complete
    const lessonIndex = courseProgress.lessons.findIndex(l => l.lessonId === lessonId);
    if (lessonIndex !== -1) {
      courseProgress.lessons[lessonIndex].completed = true;
      courseProgress.lessons[lessonIndex].completedAt = new Date().toISOString();
    } else {
      courseProgress.lessons.push({
        lessonId,
        completed: true,
        completedAt: new Date().toISOString()
      });
    }
    
    courseProgress.lastAccessed = new Date().toISOString();
    save(STORAGE_KEYS.PROGRESS, allProgress);
    
    // Update enrollment progress
    progressService.updateEnrollmentProgress(userId, courseId);
    
    return courseProgress;
  },
  
  updateEnrollmentProgress: (userId, courseId) => {
    const course = courseService.getById(courseId);
    if (!course) return;
    
    // Calculate total lessons
    let totalLessons = 0;
    course.modules?.forEach(module => {
      totalLessons += module.lessons?.length || 0;
    });
    
    // Calculate completed lessons
    const courseProgress = progressService.getCourseProgress(userId, courseId);
    const completedLessons = courseProgress?.lessons?.filter(l => l.completed).length || 0;
    
    // Update enrollment
    const enrollments = getAll(STORAGE_KEYS.ENROLLMENTS);
    const enrollmentIndex = enrollments.findIndex(e => e.userId === userId && e.courseId === parseInt(courseId));
    if (enrollmentIndex !== -1) {
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      enrollments[enrollmentIndex].progress = progress;
      enrollments[enrollmentIndex].completed = progress === 100;
      save(STORAGE_KEYS.ENROLLMENTS, enrollments);
    }
  }
};

// Authentication
export const authService = {
  getCurrentUser: () => {
    try {
      const authData = localStorage.getItem(STORAGE_KEYS.AUTH);
      return authData ? JSON.parse(authData) : null;
    } catch (error) {
      console.error('Error reading auth data:', error);
      return null;
    }
  },
  
  login: (email, password) => {
    const user = userService.authenticate(email, password);
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(user));
      return user;
    }
    return null;
  },
  
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },
  
  isAuthenticated: () => {
    return authService.getCurrentUser() !== null;
  },
  
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'admin';
  }
};

// Initialize storage on import
initializeStorage();

export default {
  userService,
  courseService,
  enrollmentService,
  progressService,
  authService
};
