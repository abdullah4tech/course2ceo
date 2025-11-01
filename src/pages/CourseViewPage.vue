<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import { useAuth } from '../composables/useAuth';
import { courseService, enrollmentService } from '../services/storage';

const route = useRoute();
const router = useRouter();
const { currentUser } = useAuth();

const courseId = computed(() => parseInt(route.params.id));

const course = ref(null);
const showPaymentInfo = ref(false);
const isEnrolled = ref(false);

// Load course data
const loadCourse = () => {
  course.value = courseService.getById(courseId.value);
  
  if (!course.value) {
    router.push('/dashboard/courses');
    return;
  }
  
  // Check enrollment status
  if (currentUser.value) {
    isEnrolled.value = enrollmentService.isEnrolled(currentUser.value.id, courseId.value);
  }
};

onMounted(() => {
  loadCourse();
});

const goBack = () => {
  router.push('/dashboard/courses');
};

const requestAccess = () => {
  showPaymentInfo.value = true;
};

const startLearning = () => {
  router.push(`/dashboard/learn/${courseId.value}`);
};
</script>

<template>
  <div v-if="course" class="space-y-6">
    <!-- Back Button -->
    <VButton variant="outline" size="sm" @click="goBack">
      ← Back to Courses
    </VButton>

    <!-- Course Header -->
    <VCard class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Course Info -->
        <div class="lg:col-span-2">
          <div class="flex items-start space-x-4 mb-4">
            <img 
              :src="course.instructorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}`" 
              :alt="course.instructor"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ course.title }}</h1>
              <p class="text-gray-600">by {{ course.instructor }}</p>
            </div>
          </div>

          <p class="text-gray-700 mb-4">{{ course.description }}</p>

          <!-- Stats -->
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="font-medium">{{ course.rating || 0 }}</span>
              <span class="ml-1">({{ (course.reviews || 0).toLocaleString() }} reviews)</span>
            </div>
            <div class="flex items-center">
              <svg class="h-5 w-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {{ (course.students || 0).toLocaleString() }} students
            </div>
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ course.totalHours || 0 }} total hours
            </div>
          </div>

          <div class="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{{ course.level }}</span>
            <span>Updated {{ course.lastUpdated }}</span>
            <span>{{ course.language || 'English' }}</span>
          </div>

          <!-- Description -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <h2 class="text-xl font-bold text-gray-900 mb-3">Description</h2>
            <p class="text-gray-700 leading-relaxed">{{ course.longDescription || course.description }}</p>
          </div>
        </div>

        <!-- Thumbnail & Price -->
        <div class="lg:col-span-1">
          <img 
            :src="course.thumbnail" 
            :alt="course.title"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div class="bg-gray-50 rounded-lg p-4">
            <div v-if="!isEnrolled" class="text-3xl font-bold text-gray-900 mb-4">${{ course.price }}</div>
            <VButton v-if="isEnrolled" class="w-full mb-3" @click="startLearning">
              Start Learning →
            </VButton>
            <VButton v-else class="w-full mb-3" @click="requestAccess">
              Request Access
            </VButton>
            <p v-if="!isEnrolled" class="text-xs text-gray-600 text-center">
              Contact admin for enrollment
            </p>
            <p v-else class="text-xs text-gray-600 text-center">
              You have access to this course
            </p>
          </div>
        </div>
      </div>
    </VCard>

    <!-- Payment Information Alert -->
    <VCard v-if="showPaymentInfo" class="p-6 bg-blue-50 border-l-4 border-blue-500">
      <div class="flex">
        <svg class="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-blue-900 mb-2">How to Enroll</h3>
          <p class="text-blue-800 mb-3">
            To enroll in this course, please contact the administrator for payment processing.
          </p>
          <div class="bg-white rounded-lg p-4 text-sm text-gray-700">
            <p class="font-medium mb-2">Payment Instructions:</p>
            <ol class="list-decimal list-inside space-y-1">
              <li>Contact admin at: <a href="mailto:admin@course2ceo.com" class="text-blue-600 hover:underline">admin@course2ceo.com</a></li>
              <li>Mention the course name: <span class="font-medium">{{ course.title }}</span></li>
              <li>Provide your payment details and wait for confirmation</li>
              <li>Once payment is verified, you will receive access within 24 hours</li>
            </ol>
          </div>
        </div>
      </div>
    </VCard>

    <!-- What You'll Learn -->
    <VCard v-if="course.objectives && course.objectives.length" class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="(item, index) in course.objectives" :key="index" class="flex items-start">
          <svg class="h-6 w-6 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-gray-700">{{ item }}</span>
        </div>
      </div>
    </VCard>

    <!-- Requirements -->
    <VCard v-if="course.requirements && course.requirements.length" class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
      <ul class="space-y-2">
        <li v-for="(item, index) in course.requirements" :key="index" class="flex items-start">
          <svg class="h-6 w-6 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-gray-700">{{ item }}</span>
        </li>
      </ul>
    </VCard>
  </div>
  
  <!-- Loading State -->
  <div v-else class="text-center py-12">
    <p class="text-gray-500">Loading course...</p>
  </div>
</template>
