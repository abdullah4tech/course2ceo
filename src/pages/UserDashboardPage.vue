<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import { useAuth } from '../composables/useAuth';
import { courseService, enrollmentService } from '../services/storage';

const router = useRouter();
const { currentUser } = useAuth();

const enrolledCourses = ref([]);

// Computed stats based on real data
const stats = computed(() => {
  const completed = enrolledCourses.value.filter(c => c.progress === 100).length;
  const totalHours = enrolledCourses.value.reduce((sum, c) => sum + (c.totalHours || 0), 0);
  
  return [
    { label: 'Enrolled Courses', value: enrolledCourses.value.length, color: 'text-blue-600' },
    { label: 'Completed', value: completed, color: 'text-green-600' },
    { label: 'Hours Available', value: Math.round(totalHours), color: 'text-purple-600' }
  ];
});

// Load user's enrolled courses
const loadEnrolledCourses = () => {
  if (!currentUser.value) return;
  
  const enrollments = enrollmentService.getUserEnrollments(currentUser.value.id);
  
  enrolledCourses.value = enrollments.map(enrollment => {
    const course = courseService.getById(enrollment.courseId);
    return {
      ...course,
      progress: enrollment.progress,
      enrolledAt: enrollment.enrolledAt,
      completed: enrollment.completed,
      // For now, use placeholder data for lessons until courses have lesson structure
      totalLessons: 20,
      completedLessons: Math.round((enrollment.progress / 100) * 20),
      nextLesson: enrollment.progress === 100 ? 'Completed' : 'Continue Learning'
    };
  }).filter(course => course.id); // Filter out any invalid courses
};

onMounted(() => {
  loadEnrolledCourses();
});

const continueLearning = (courseId) => {
  router.push(`/dashboard/learn/${courseId}`);
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">My Learning</h2>
      <p class="text-gray-600 mt-2">Track your progress and continue learning</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <VCard v-for="stat in stats" :key="stat.label" class="p-6">
        <div>
          <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
          <p class="text-3xl font-bold mt-2" :class="stat.color">{{ stat.value }}</p>
        </div>
      </VCard>
    </div>

    <!-- My Courses -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900">My Courses</h3>
        <VButton variant="outline" size="sm" @click="router.push('/dashboard/courses')">
          View All Courses
        </VButton>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VCard v-for="course in enrolledCourses" :key="course.id" class="overflow-hidden">
          <!-- Thumbnail -->
          <div class="relative h-48 overflow-hidden cursor-pointer" @click="continueLearning(course.id)">
            <img 
              :src="course.thumbnail" 
              :alt="course.title"
              class="w-full h-full object-cover transition-transform hover:scale-105"
            />
            <div class="absolute top-4 right-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="course.progress === 100 ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'"
              >
                {{ course.progress }}%
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h4 class="font-bold text-lg text-gray-900 mb-2">{{ course.title }}</h4>
            <p class="text-sm text-gray-600 mb-4">by {{ course.instructor }}</p>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">{{ course.completedLessons }}/{{ course.totalLessons }} lessons</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all"
                  :class="course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'"
                  :style="{ width: course.progress + '%' }"
                ></div>
              </div>
            </div>

            <!-- Next Lesson -->
            <div class="text-sm text-gray-600 mb-4">
              <span class="font-medium">Next:</span> {{ course.nextLesson }}
            </div>

            <!-- Action Button -->
            <VButton 
              class="w-full" 
              :variant="course.progress === 100 ? 'outline' : 'primary'"
              size="sm"
              @click="continueLearning(course.id)"
            >
              {{ course.progress === 100 ? 'Review' : 'Continue' }}
            </VButton>
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>
