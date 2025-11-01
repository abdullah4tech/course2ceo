<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import VBadge from '../components/VBadge.vue';
import VInput from '../components/VInput.vue';
import VSelect from '../components/VSelect.vue';

const router = useRouter();

const searchQuery = ref('');
const categoryFilter = ref('all');
const levelFilter = ref('all');

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'business', label: 'Business' }
];

const levelOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const availableCourses = ref([
  {
    id: 5,
    title: 'Python for Data Science',
    instructor: 'Dr. Lisa Wang',
    thumbnail: '🐍',
    description: 'Learn Python programming and data analysis with pandas, numpy, and matplotlib',
    rating: 4.8,
    students: 15420,
    duration: '12 weeks',
    lessons: 45,
    level: 'intermediate',
    category: 'web-development',
    price: 99.99,
    enrolled: false
  },
  {
    id: 6,
    title: 'Figma UI Design',
    instructor: 'Alex Martinez',
    thumbnail: '🎨',
    description: 'Master Figma and create stunning user interfaces from scratch',
    rating: 4.9,
    students: 8930,
    duration: '6 weeks',
    lessons: 28,
    level: 'beginner',
    category: 'design',
    price: 79.99,
    enrolled: false
  },
  {
    id: 7,
    title: 'Node.js Backend Development',
    instructor: 'James Wilson',
    thumbnail: '🟢',
    description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
    rating: 4.7,
    students: 12580,
    duration: '10 weeks',
    lessons: 38,
    level: 'intermediate',
    category: 'web-development',
    price: 89.99,
    enrolled: false
  },
  {
    id: 8,
    title: 'Digital Marketing Fundamentals',
    instructor: 'Maria Garcia',
    thumbnail: '📱',
    description: 'Learn SEO, social media marketing, email campaigns, and analytics',
    rating: 4.6,
    students: 19200,
    duration: '8 weeks',
    lessons: 32,
    level: 'beginner',
    category: 'marketing',
    price: 69.99,
    enrolled: false
  },
  {
    id: 9,
    title: 'iOS App Development with Swift',
    instructor: 'Ryan Thompson',
    thumbnail: '📲',
    description: 'Create native iOS applications using SwiftUI and Swift programming',
    rating: 4.8,
    students: 7650,
    duration: '14 weeks',
    lessons: 52,
    level: 'advanced',
    category: 'mobile-development',
    price: 129.99,
    enrolled: false
  },
  {
    id: 10,
    title: 'Business Strategy & Planning',
    instructor: 'Jennifer Lee',
    thumbnail: '💼',
    description: 'Develop effective business strategies and create actionable business plans',
    rating: 4.5,
    students: 5420,
    duration: '6 weeks',
    lessons: 24,
    level: 'beginner',
    category: 'business',
    price: 59.99,
    enrolled: false
  }
]);

const filteredCourses = computed(() => {
  let filtered = availableCourses.value;

  // Filter by category
  if (categoryFilter.value !== 'all') {
    filtered = filtered.filter(course => course.category === categoryFilter.value);
  }

  // Filter by level
  if (levelFilter.value !== 'all') {
    filtered = filtered.filter(course => course.level === levelFilter.value);
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

const enrollCourse = (course) => {
  // TODO: Implement actual enrollment logic
  course.enrolled = true;
  alert(`Successfully enrolled in ${course.title}!`);
  // Navigate to the course
  setTimeout(() => {
    router.push(`/dashboard/course/${course.id}`);
  }, 500);
};

const previewCourse = (course) => {
  router.push(`/dashboard/course/${course.id}`);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Browse Courses</h2>
      <p class="text-gray-600 mt-2">Discover and enroll in new courses</p>
    </div>

    <!-- Filters -->
    <VCard class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <VInput
            v-model="searchQuery"
            placeholder="Search courses..."
            icon="🔍"
          />
        </div>
        <div>
          <VSelect
            v-model="categoryFilter"
            :options="categoryOptions"
            label="Category"
          />
        </div>
        <div>
          <VSelect
            v-model="levelFilter"
            :options="levelOptions"
            label="Level"
          />
        </div>
      </div>
    </VCard>

    <!-- Results Count -->
    <div class="flex items-center justify-between">
      <p class="text-gray-600">
        {{ filteredCourses.length }} {{ filteredCourses.length === 1 ? 'course' : 'courses' }} found
      </p>
    </div>

    <!-- Courses Grid -->
    <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <VCard
        v-for="course in filteredCourses"
        :key="course.id"
        class="overflow-hidden hover:shadow-xl transition-shadow"
      >
        <div class="p-6">
          <!-- Course Thumbnail -->
          <div class="text-center mb-4">
            <div class="text-6xl mb-3">{{ course.thumbnail }}</div>
            <VBadge
              :variant="course.level === 'beginner' ? 'success' : course.level === 'intermediate' ? 'primary' : 'warning'"
              size="sm"
            >
              {{ course.level }}
            </VBadge>
          </div>

          <!-- Course Title -->
          <h3 class="font-bold text-lg text-gray-900 mb-2 text-center">{{ course.title }}</h3>
          <p class="text-sm text-gray-600 text-center mb-4">by {{ course.instructor }}</p>

          <!-- Description -->
          <p class="text-sm text-gray-700 mb-4 line-clamp-2">{{ course.description }}</p>

          <!-- Course Stats -->
          <div class="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b">
            <div class="flex items-center space-x-1">
              <span>⭐</span>
              <span class="font-medium">{{ course.rating }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <span>👥</span>
              <span>{{ course.students.toLocaleString() }}</span>
            </div>
          </div>

          <!-- Course Details -->
          <div class="space-y-2 mb-4 text-sm text-gray-600">
            <div class="flex items-center justify-between">
              <span>⏱️ Duration:</span>
              <span class="font-medium">{{ course.duration }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>📝 Lessons:</span>
              <span class="font-medium">{{ course.lessons }} lessons</span>
            </div>
            <div class="flex items-center justify-between">
              <span>💰 Price:</span>
              <span class="font-bold text-blue-600">${{ course.price }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <VButton
              class="flex-1"
              @click="enrollCourse(course)"
            >
              Enroll Now
            </VButton>
            <VButton
              variant="outline"
              @click="previewCourse(course)"
            >
              Preview
            </VButton>
          </div>
        </div>
      </VCard>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
      <p class="text-gray-600 mb-6">Try adjusting your filters or search query</p>
      <VButton @click="categoryFilter = 'all'; levelFilter = 'all'; searchQuery = ''">
        Clear Filters
      </VButton>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'BrowseCoursesPage'
};
</script>
