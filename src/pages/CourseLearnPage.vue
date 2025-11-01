<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import { useAuth } from '../composables/useAuth';
import { courseService, progressService } from '../services/storage';

const route = useRoute();
const router = useRouter();
const { currentUser } = useAuth();

const courseId = computed(() => parseInt(route.params.id));

const course = ref(null);
const progress = ref(null);
const currentLesson = ref(null);

// Temporary mock modules structure - In a real app, courses would have modules/lessons in DB
const mockModules = [
  {
    id: 1,
    title: 'Module 1 - Getting Started',
    lessons: [
      { 
        id: 1, 
        title: 'Introduction', 
        duration: '15:30', 
        videoUrl: '/src/assets/videos/overview.mp4',
        objectives: [
          'Understand course structure',
          'Set up your environment',
          'Get ready to learn'
        ],
        resources: [
          { name: 'Course Overview.pdf', url: '#', type: 'pdf' },
          { name: 'Setup Guide', url: '#', type: 'pdf' }
        ]
      },
      { 
        id: 2, 
        title: 'Fundamentals', 
        duration: '20:45', 
        videoUrl: '/src/assets/videos/overview.mp4',
        objectives: [
          'Master the basics',
          'Practice key concepts',
          'Build your foundation'
        ],
        resources: [
          { name: 'Cheat Sheet.pdf', url: '#', type: 'pdf' }
        ]
      },
      { 
        id: 3, 
        title: 'Advanced Topics', 
        duration: '25:10', 
        videoUrl: '/src/assets/videos/overview.mp4',
        objectives: [
          'Deep dive into advanced concepts',
          'Learn best practices',
          'Build real-world projects'
        ],
        resources: [
          { name: 'Examples.zip', url: '#', type: 'zip' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Module 2 - Intermediate',
    lessons: [
      { 
        id: 4, 
        title: 'Intermediate Concepts', 
        duration: '18:20', 
        videoUrl: '/src/assets/videos/overview.mp4',
        objectives: [
          'Build on your foundation',
          'Explore intermediate techniques',
          'Expand your skillset'
        ],
        resources: [
          { name: 'Reference Guide.pdf', url: '#', type: 'pdf' }
        ]
      },
      { 
        id: 5, 
        title: 'Practical Applications', 
        duration: '22:30', 
        videoUrl: '/src/assets/videos/overview.mp4',
        objectives: [
          'Apply your knowledge',
          'Build real projects',
          'Practice problem-solving'
        ],
        resources: [
          { name: 'Project Templates', url: '#', type: 'zip' }
        ]
      }
    ]
  }
];

// Load course and progress
const loadCourseData = () => {
  if (!currentUser.value) {
    router.push('/signin');
    return;
  }

  course.value = courseService.getById(courseId.value);
  
  if (!course.value) {
    router.push('/dashboard/courses');
    return;
  }

  // Add mock modules to course
  course.value.modules = mockModules;

  // Load progress from localStorage
  progress.value = progressService.getCourseProgress(currentUser.value.id, courseId.value);

  // Mark lessons as completed based on progress
  if (progress.value && progress.value.lessons) {
    course.value.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        const lessonProgress = progress.value.lessons.find(l => l.lessonId === lesson.id);
        lesson.completed = lessonProgress?.completed || false;
      });
    });
  }

  // Calculate overall progress
  const totalLessons = course.value.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.value.modules.reduce((sum, m) => 
    sum + m.lessons.filter(l => l.completed).length, 0);
  course.value.progress = Math.round((completedLessons / totalLessons) * 100);

  // Set first incomplete lesson or first lesson as current
  let firstIncompleteFound = false;
  for (const module of course.value.modules) {
    for (const lesson of module.lessons) {
      if (!lesson.completed && !firstIncompleteFound) {
        currentLesson.value = lesson;
        firstIncompleteFound = true;
        break;
      }
    }
    if (firstIncompleteFound) break;
  }

  // If all completed, show first lesson
  if (!currentLesson.value) {
    currentLesson.value = course.value.modules[0].lessons[0];
  }
};

onMounted(() => {
  loadCourseData();
});

const selectLesson = (lesson) => {
  currentLesson.value = lesson;
};

const markAsComplete = () => {
  if (!currentUser.value || !course.value) return;

  // Mark lesson as complete in localStorage
  progressService.markLessonComplete(currentUser.value.id, courseId.value, currentLesson.value.id);
  
  // Update local state
  currentLesson.value.completed = true;

  // Recalculate progress
  const totalLessons = course.value.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.value.modules.reduce((sum, m) => 
    sum + m.lessons.filter(l => l.completed).length, 0);
  course.value.progress = Math.round((completedLessons / totalLessons) * 100);

  // Update enrollment progress
  progressService.updateEnrollmentProgress(currentUser.value.id, courseId.value);

  // Move to next lesson
  goToNextLesson();
};

const goToNextLesson = () => {
  let found = false;
  for (const module of course.value.modules) {
    for (const lesson of module.lessons) {
      if (found && !lesson.completed) {
        currentLesson.value = lesson;
        return;
      }
      if (lesson.id === currentLesson.value.id) {
        found = true;
      }
    }
  }
};

const downloadResource = (resource) => {
  if (resource.type === 'link') {
    window.open(resource.url, '_blank');
  } else {
    alert(`Downloading: ${resource.name}\nIn a real app, this would download from: ${resource.url}`);
  }
};

const getResourceIcon = (type) => {
  switch(type) {
    case 'pdf':
      return '📄';
    case 'zip':
      return '📦';
    case 'link':
      return '🔗';
    default:
      return '📎';
  }
};

const goBack = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div v-if="course && currentLesson" class="h-full flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <VButton variant="outline" size="sm" @click="goBack">
            ← Back
          </VButton>
          <div>
            <h1 class="text-xl font-bold text-gray-900">{{ course.title }}</h1>
            <p class="text-sm text-gray-600">by {{ course.instructor }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-600">
            Progress: <span class="font-bold text-blue-600">{{ course.progress }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
      <!-- Left Side - Video Player & Content -->
      <div class="space-y-6 overflow-y-auto">
        <!-- Video Player -->
        <VCard class="overflow-hidden">
          <video 
            :key="currentLesson.id"
            controls 
            class="w-full aspect-video bg-black"
            :src="currentLesson.videoUrl"
          >
            Your browser does not support the video tag.
          </video>
        </VCard>

        <!-- Lesson Title -->
        <VCard class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ currentLesson.title }}</h2>
              <p class="text-gray-600 mt-1">Duration: {{ currentLesson.duration }}</p>
            </div>
            <span 
              v-if="currentLesson.completed"
              class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
            >
              ✓ Completed
            </span>
          </div>

          <VButton 
            v-if="!currentLesson.completed" 
            @click="markAsComplete"
            class="w-full"
          >
            Mark as Complete & Continue
          </VButton>
        </VCard>

        <!-- Learning Objectives -->
        <VCard class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Learning Objectives</h3>
          <ul class="space-y-3">
            <li 
              v-for="(objective, index) in currentLesson.objectives" 
              :key="index"
              class="flex items-start"
            >
              <svg class="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">{{ objective }}</span>
            </li>
          </ul>
        </VCard>

        <!-- Additional Resources -->
        <VCard class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Additional Resources</h3>
          <div class="space-y-3">
            <div 
              v-for="(resource, index) in currentLesson.resources" 
              :key="index"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center space-x-3">
                <span class="text-2xl">{{ getResourceIcon(resource.type) }}</span>
                <div>
                  <p class="font-medium text-gray-900">{{ resource.name }}</p>
                  <p class="text-xs text-gray-500 uppercase">{{ resource.type }}</p>
                </div>
              </div>
              <VButton 
                variant="outline" 
                size="sm"
                @click="downloadResource(resource)"
              >
                <span v-if="resource.type === 'link'">Visit</span>
                <span v-else>Download</span>
              </VButton>
            </div>
          </div>
        </VCard>
      </div>

      <!-- Right Side - Course Content/Lessons List -->
      <div class="overflow-y-auto">
        <VCard class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Course Content</h3>
          
          <div class="space-y-4">
            <div v-for="module in course.modules" :key="module.id">
              <h4 class="font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                {{ module.title }}
              </h4>
              <div class="space-y-2">
                <button
                  v-for="lesson in module.lessons"
                  :key="lesson.id"
                  @click="selectLesson(lesson)"
                  :class="[
                    'w-full text-left p-4 rounded-lg transition-colors',
                    currentLesson.id === lesson.id 
                      ? 'bg-blue-50 border-2 border-blue-500' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  ]"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3 flex-1">
                      <!-- Play Icon or Checkmark -->
                      <div class="flex-shrink-0">
                        <svg 
                          v-if="lesson.completed" 
                          class="w-6 h-6 text-green-500" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <svg 
                          v-else
                          class="w-6 h-6 text-gray-400" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      
                      <div class="flex-1 min-w-0">
                        <p 
                          :class="[
                            'font-medium truncate',
                            currentLesson.id === lesson.id ? 'text-blue-600' : 'text-gray-900'
                          ]"
                        >
                          {{ lesson.title }}
                        </p>
                        <p class="text-sm text-gray-500">{{ lesson.duration }}</p>
                      </div>
                    </div>
                    
                    <!-- Current Indicator -->
                    <div v-if="currentLesson.id === lesson.id" class="ml-2">
                      <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </VCard>
      </div>
    </div>
  </div>
  
  <!-- Loading State -->
  <div v-else class="h-full flex items-center justify-center">
    <p class="text-gray-500">Loading course...</p>
  </div>
</template>
