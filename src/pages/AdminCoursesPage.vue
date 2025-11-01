<script setup>
import { ref, computed, onMounted } from 'vue';
import { courseService } from '../services/storage';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VTextarea from '../components/VTextarea.vue';
import VSelect from '../components/VSelect.vue';

const showUploadForm = ref(false);
const editingCourse = ref(null);

// Form data
const courseForm = ref({
  title: '',
  description: '',
  longDescription: '',
  category: '',
  level: '',
  duration: '',
  totalHours: '',
  price: '',
  instructor: '',
  thumbnail: '',
  tags: '',
  language: 'English',
  objectives: '',
  requirements: ''
});

const categories = ['Business', 'Marketing', 'Design', 'Development', 'Personal Growth'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const courses = ref([]);

// Load courses from localStorage
const loadCourses = () => {
  courses.value = courseService.getAll();
};

onMounted(() => {
  loadCourses();
});

const openUploadForm = () => {
  editingCourse.value = null;
  courseForm.value = {
    title: '',
    description: '',
    longDescription: '',
    category: '',
    level: '',
    duration: '',
    totalHours: '',
    price: '',
    instructor: '',
    thumbnail: '',
    tags: '',
    language: 'English',
    objectives: '',
    requirements: ''
  };
  showUploadForm.value = true;
};

const editCourse = (course) => {
  editingCourse.value = course.id;
  courseForm.value = {
    title: course.title,
    description: course.description,
    longDescription: course.longDescription || course.description,
    category: course.category,
    level: course.level,
    duration: course.duration,
    totalHours: course.totalHours || '',
    price: course.price,
    instructor: course.instructor,
    thumbnail: course.thumbnail,
    tags: course.tags || '',
    language: course.language || 'English',
    objectives: course.objectives ? course.objectives.join('\n') : '',
    requirements: course.requirements ? course.requirements.join('\n') : ''
  };
  showUploadForm.value = true;
};

const saveCourse = () => {
  // Process objectives and requirements from textarea to array
  const processedData = {
    ...courseForm.value,
    price: parseFloat(courseForm.value.price),
    totalHours: courseForm.value.totalHours ? parseInt(courseForm.value.totalHours) : null,
    objectives: courseForm.value.objectives 
      ? courseForm.value.objectives.split('\n').filter(item => item.trim()) 
      : [],
    requirements: courseForm.value.requirements 
      ? courseForm.value.requirements.split('\n').filter(item => item.trim()) 
      : []
  };

  if (editingCourse.value) {
    // Update existing course
    courseService.update(editingCourse.value, processedData);
  } else {
    // Add new course
    courseService.create(processedData);
  }
  
  loadCourses();
  showUploadForm.value = false;
};

const deleteCourse = (courseId) => {
  if (confirm('Are you sure you want to delete this course?')) {
    courseService.delete(courseId);
    loadCourses();
  }
};

const toggleCourseStatus = (course) => {
  courseService.toggleStatus(course.id);
  loadCourses();
};

const cancelForm = () => {
  showUploadForm.value = false;
  editingCourse.value = null;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Course Management</h1>
        <p class="mt-1 text-sm text-gray-500">Upload and manage your courses</p>
      </div>
      <VButton
        @click="openUploadForm"
        class="bg-blue-600 text-white hover:bg-blue-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Upload New Course
      </VButton>
    </div>

    <!-- Upload/Edit Form Modal -->
    <div
      v-if="showUploadForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="cancelForm"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingCourse ? 'Edit Course' : 'Upload New Course' }}
            </h2>
            <button
              @click="cancelForm"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form @submit.prevent="saveCourse" class="p-6 space-y-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Course Title -->
            <div class="md:col-span-2">
              <VInput
                v-model="courseForm.title"
                type="text"
                label="Course Title"
                placeholder="e.g., Building Your Creator Business"
                required
              />
            </div>

            <!-- Description -->
            <div class="md:col-span-2">
              <VTextarea
                v-model="courseForm.description"
                label="Short Description"
                placeholder="Brief overview of the course (shown in cards)"
                :rows="2"
                required
              />
            </div>

            <!-- Long Description -->
            <div class="md:col-span-2">
              <VTextarea
                v-model="courseForm.longDescription"
                label="Full Description"
                placeholder="Detailed course description (shown on course page)"
                :rows="4"
                required
              />
            </div>

            <!-- Instructor -->
            <div>
              <VInput
                v-model="courseForm.instructor"
                type="text"
                label="Instructor Name"
                placeholder="e.g., Sarah Johnson"
                required
              />
            </div>

            <!-- Category -->
            <div>
              <VSelect
                v-model="courseForm.category"
                label="Category"
                :options="categories"
                placeholder="Select category"
                required
              />
            </div>

            <!-- Level -->
            <div>
              <VSelect
                v-model="courseForm.level"
                label="Level"
                :options="levels"
                placeholder="Select level"
                required
              />
            </div>

            <!-- Duration -->
            <div>
              <VInput
                v-model="courseForm.duration"
                type="text"
                label="Duration"
                placeholder="e.g., 8 weeks"
                required
              />
            </div>

            <!-- Total Hours -->
            <div>
              <VInput
                v-model="courseForm.totalHours"
                type="number"
                label="Total Hours"
                placeholder="e.g., 65"
                required
              />
            </div>

            <!-- Price -->
            <div>
              <VInput
                v-model="courseForm.price"
                type="number"
                label="Price ($)"
                placeholder="299"
                required
              />
            </div>

            <!-- Language -->
            <div>
              <VInput
                v-model="courseForm.language"
                type="text"
                label="Language"
                placeholder="English"
                required
              />
            </div>

            <!-- Thumbnail URL -->
            <div>
              <VInput
                v-model="courseForm.thumbnail"
                type="url"
                label="Thumbnail URL"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            <!-- Tags -->
            <div class="md:col-span-2">
              <VInput
                v-model="courseForm.tags"
                type="text"
                label="Tags (comma-separated)"
                placeholder="e.g., Business, Marketing, Strategy"
              />
            </div>

            <!-- Learning Objectives -->
            <div class="md:col-span-2">
              <VTextarea
                v-model="courseForm.objectives"
                label="Learning Objectives (one per line)"
                placeholder="Build 16 web development projects&#10;Master frontend and backend development&#10;Learn React, Node.js, and Web3"
                :rows="4"
              />
              <p class="mt-1 text-xs text-gray-500">Enter each objective on a new line</p>
            </div>

            <!-- Requirements -->
            <div class="md:col-span-2">
              <VTextarea
                v-model="courseForm.requirements"
                label="Course Requirements (one per line)"
                placeholder="No programming experience needed&#10;A computer with internet access&#10;No paid software required"
                :rows="3"
              />
              <p class="mt-1 text-xs text-gray-500">Enter each requirement on a new line</p>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <VButton
              type="button"
              @click="cancelForm"
              variant="outline"
              class="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </VButton>
            <VButton
              type="submit"
              class="bg-blue-600 text-white hover:bg-blue-700"
            >
              {{ editingCourse ? 'Update Course' : 'Create Course' }}
            </VButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Courses List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-bold text-gray-900">All Courses ({{ courses.length }})</h2>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div
          v-for="course in courses"
          :key="course.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start space-x-4">
            <!-- Thumbnail -->
            <img
              :src="course.thumbnail"
              :alt="course.title"
              class="w-32 h-24 object-cover rounded-lg shrink-0"
            />
            
            <!-- Course Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <h3 class="text-lg font-bold text-gray-900">{{ course.title }}</h3>
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        course.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      {{ course.status }}
                    </span>
                  </div>
                  <p class="mt-1 text-sm text-gray-600 line-clamp-2">{{ course.description }}</p>
                  
                  <div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      {{ course.instructor }}
                    </span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                      {{ course.students }} students
                    </span>
                    <span class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ course.duration }}
                    </span>
                    <span class="flex items-center font-semibold text-blue-600">
                      ${{ course.price }}
                    </span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click="toggleCourseStatus(course)"
                    :class="[
                      'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                      course.status === 'published'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    ]"
                  >
                    {{ course.status === 'published' ? 'Unpublish' : 'Publish' }}
                  </button>
                  <button
                    @click="editCourse(course)"
                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button
                    @click="deleteCourse(course.id)"
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="courses.length === 0" class="p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto text-gray-400 mb-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <p class="text-gray-500">No courses yet. Upload your first course to get started!</p>
        </div>
      </div>
    </div>
  </div>
</template>