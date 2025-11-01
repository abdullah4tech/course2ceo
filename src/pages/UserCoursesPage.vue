<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VSelect from '../components/VSelect.vue';
import CourseCard from '../components/CourseCard.vue';
import { courseService } from '../services/storage';

const router = useRouter();

const filterCategory = ref('all');
const searchQuery = ref('');
const allCourses = ref([]);

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'personal growth', label: 'Personal Growth' }
];

// Load all published courses
const loadCourses = () => {
  allCourses.value = courseService.getPublished();
};

onMounted(() => {
  loadCourses();
});

const filteredCourses = computed(() => {
  let filtered = allCourses.value;

  // Filter by category
  if (filterCategory.value !== 'all') {
    filtered = filtered.filter(course => 
      course.category.toLowerCase() === filterCategory.value.toLowerCase()
    );
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const viewCourseDetails = (courseId) => {
  router.push(`/dashboard/course/${courseId}`);
};

const viewCertificate = () => {
  router.push('/dashboard/certificates');
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Browse Courses</h2>
      <p class="text-gray-600 mt-2">Explore and enroll in courses to start learning</p>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <VInput
          v-model="searchQuery"
          placeholder="Search courses..."
          variant="glass"
        >
          <template #icon>
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </VInput>
      </div>
      <div class="sm:w-64">
        <VSelect v-model="filterCategory" :options="categoryOptions" variant="glass" />
      </div>
    </div>

    <!-- Course Count -->
    <div class="text-sm text-gray-600">
      Showing {{ filteredCourses.length }} course{{ filteredCourses.length !== 1 ? 's' : '' }}
    </div>

    <!-- Courses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard
        v-for="course in filteredCourses"
        :key="course.id"
        :course="course"
        @enroll="viewCourseDetails"
      />
    </div>

    <!-- Empty State -->
    <div v-if="filteredCourses.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter</p>
    </div>
  </div>
</template>
