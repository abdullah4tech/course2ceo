<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import VBadge from '../components/VBadge.vue';

const router = useRouter();

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  joinedDate: 'January 2025',
  totalCourses: 3,
  completedCourses: 1,
  hoursLearned: 24
});

const enrolledCourses = ref([
  {
    id: 1,
    title: 'Building Your Creator Business',
    instructor: 'Sarah Johnson',
    progress: 75,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    duration: '8 weeks',
    completedLessons: 18,
    totalLessons: 24,
    nextLesson: 'Creating Your Revenue Model',
    status: 'in-progress'
  },
  {
    id: 2,
    title: 'Social Media Marketing Mastery',
    instructor: 'Mike Chen',
    progress: 30,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    duration: '6 weeks',
    completedLessons: 7,
    totalLessons: 24,
    nextLesson: 'Instagram Growth Strategies',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Brand Design for Creators',
    instructor: 'Emma Davis',
    progress: 100,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    duration: '4 weeks',
    completedLessons: 16,
    totalLessons: 16,
    nextLesson: 'Course Completed!',
    status: 'completed'
  }
]);

const continueLesson = (courseId) => {
  console.log('Continue lesson for course:', courseId);
  // TODO: Navigate to course lesson page
};

const viewCertificate = (courseId) => {
  console.log('View certificate for course:', courseId);
  // TODO: Show certificate
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
          Welcome back, <span class="text-blue-600">{{ user.name }}</span>! 👋
        </h1>
        <p class="mt-2 text-gray-600">
          Continue your learning journey and track your progress
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <VCard variant="shadow" padding="md" class="hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Enrolled Courses</p>
              <p class="text-2xl font-bold text-gray-900">{{ user.totalCourses }}</p>
            </div>
          </div>
        </VCard>

        <VCard variant="shadow" padding="md" class="hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">{{ user.completedCourses }}</p>
            </div>
          </div>
        </VCard>

        <VCard variant="shadow" padding="md" class="hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Hours Learned</p>
              <p class="text-2xl font-bold text-gray-900">{{ user.hoursLearned }}</p>
            </div>
          </div>
        </VCard>

        <VCard variant="shadow" padding="md" class="hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p class="text-sm text-gray-600">Learning Streak</p>
              <p class="text-2xl font-bold text-gray-900">7 days</p>
            </div>
          </div>
        </VCard>
      </div>

      <!-- My Courses Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">My Courses</h2>
          <VButton 
            variant="ghost" 
            size="sm"
            @click="router.push('/courses')"
          >
            Browse More
          </VButton>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VCard 
            v-for="course in enrolledCourses" 
            :key="course.id"
            variant="shadow"
            padding="none"
            class="overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div class="flex flex-col sm:flex-row">
              <!-- Thumbnail -->
              <div class="relative sm:w-48 h-48 sm:h-auto shrink-0">
                <img 
                  :src="course.thumbnail" 
                  :alt="course.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-4 right-4">
                  <VBadge 
                    :variant="course.status === 'completed' ? 'success' : 'primary'" 
                    size="sm"
                    :rounded="true"
                  >
                    {{ course.status === 'completed' ? 'Completed' : 'In Progress' }}
                  </VBadge>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-2">
                  {{ course.title }}
                </h3>
                <p class="text-sm text-gray-600 mb-4">
                  by {{ course.instructor }}
                </p>

                <!-- Progress Bar -->
                <div class="mb-4">
                  <div class="flex items-center justify-between text-sm mb-2">
                    <span class="text-gray-600">Progress</span>
                    <span class="font-semibold text-gray-900">{{ course.progress }}%</span>
                  </div>
                  <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      :style="{ width: `${course.progress}%` }"
                    ></div>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">
                    {{ course.completedLessons }} / {{ course.totalLessons }} lessons completed
                  </p>
                </div>

                <!-- Next Lesson -->
                <div class="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p class="text-xs font-medium text-blue-600 mb-1">
                    {{ course.status === 'completed' ? '🎉 Great job!' : '📚 Next Lesson' }}
                  </p>
                  <p class="text-sm text-gray-900 font-medium">
                    {{ course.nextLesson }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                  <VButton 
                    v-if="course.status !== 'completed'"
                    variant="primary" 
                    size="sm"
                    class="flex-1"
                    @click="continueLesson(course.id)"
                  >
                    Continue Learning
                  </VButton>
                  <VButton 
                    v-else
                    variant="primary" 
                    size="sm"
                    class="flex-1"
                    @click="viewCertificate(course.id)"
                  >
                    View Certificate
                  </VButton>
                  <VButton 
                    variant="ghost" 
                    size="sm"
                    @click="router.push(`/courses/${course.id}`)"
                  >
                    Details
                  </VButton>
                </div>
              </div>
            </div>
          </VCard>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <VCard variant="bordered" padding="md" :hoverable="true" class="cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">Profile Settings</p>
              <p class="text-xs text-gray-600">Update your info</p>
            </div>
          </div>
        </VCard>

        <VCard variant="bordered" padding="md" :hoverable="true" class="cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">Certificates</p>
              <p class="text-xs text-gray-600">View achievements</p>
            </div>
          </div>
        </VCard>

        <VCard variant="bordered" padding="md" :hoverable="true" class="cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="font-semibold text-gray-900">Help & Support</p>
              <p class="text-xs text-gray-600">Get assistance</p>
            </div>
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
