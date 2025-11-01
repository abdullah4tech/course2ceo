<script setup>
import { ref, computed, onMounted } from 'vue';
import { userService, courseService, enrollmentService } from '../services/storage';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VCheckbox from '../components/VCheckbox.vue';

const searchQuery = ref('');
const selectedFilter = ref('all');
const showAccessModal = ref(false);
const selectedUser = ref(null);
const selectedCourses = ref([]);

const filterOptions = [
  { value: 'all', label: 'All Users' },
  { value: 'admin', label: 'Admins' },
  { value: 'user', label: 'Students' }
];

const users = ref([]);
const availableCourses = ref([]);

// Load data from localStorage
const loadUsers = () => {
  users.value = userService.getAll().map(user => {
    const enrollments = enrollmentService.getUserEnrollments(user.id);
    return {
      ...user,
      enrolledCourses: enrollments.map(e => e.courseId),
      enrollmentCount: enrollments.length
    };
  });
};

const loadCourses = () => {
  availableCourses.value = courseService.getAll().map(course => ({
    id: course.id,
    title: course.title,
    price: course.price
  }));
};

onMounted(() => {
  loadUsers();
  loadCourses();
});

const filteredUsers = computed(() => {
  let filtered = users.value;

  // Apply role filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(user => user.role === selectedFilter.value);
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const openAccessModal = (user) => {
  selectedUser.value = user;
  selectedCourses.value = [...user.enrolledCourses];
  showAccessModal.value = true;
};

const grantAccess = () => {
  if (selectedUser.value) {
    // Remove old enrollments
    selectedUser.value.enrolledCourses.forEach(courseId => {
      if (!selectedCourses.value.includes(courseId)) {
        enrollmentService.unenroll(selectedUser.value.id, courseId);
      }
    });
    
    // Add new enrollments
    selectedCourses.value.forEach(courseId => {
      if (!selectedUser.value.enrolledCourses.includes(courseId)) {
        enrollmentService.enroll(selectedUser.value.id, courseId);
      }
    });
    
    loadUsers();
  }
  closeAccessModal();
};

const closeAccessModal = () => {
  showAccessModal.value = false;
  selectedUser.value = null;
  selectedCourses.value = [];
};

const deleteUser = (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    userService.delete(userId);
    loadUsers();
  }
};

const getCourseTitle = (courseId) => {
  const course = availableCourses.value.find(c => c.id === courseId);
  return course ? course.title : 'Unknown Course';
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
      <p class="mt-1 text-sm text-gray-500">Manage users and grant course access</p>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <VInput
            v-model="searchQuery"
            type="text"
            placeholder="Search users by name or email..."
            variant="solid"
          >
            <template #icon>
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </template>
          </VInput>
        </div>

        <!-- Filter -->
        <div class="flex gap-2">
          <button
            v-for="filter in filterOptions"
            :key="filter.value"
            @click="selectedFilter = filter.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedFilter === filter.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p class="text-sm font-medium text-gray-600">Total Users</p>
        <p class="mt-2 text-2xl font-bold text-gray-900">{{ users.length }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p class="text-sm font-medium text-gray-600">Admins</p>
        <p class="mt-2 text-2xl font-bold text-purple-600">{{ users.filter(u => u.role === 'admin').length }}</p>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <p class="text-sm font-medium text-gray-600">Students</p>
        <p class="mt-2 text-2xl font-bold text-blue-600">{{ users.filter(u => u.role === 'user').length }}</p>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full" />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    user.hasAccess
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ user.hasAccess ? 'Active' : 'Pending' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.enrolledCourses.length }} courses</div>
                <div class="text-xs text-gray-500">
                  {{ user.paymentStatus === 'paid' ? 'Paid' : 'No payment' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${{ user.totalSpent }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(user.joinedDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(user.lastActive).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    @click="openAccessModal(user)"
                    class="text-blue-600 hover:text-blue-900"
                    title="Manage Course Access"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </button>
                  <button
                    @click="toggleUserAccess(user)"
                    :class="[
                      'hover:opacity-80',
                      user.hasAccess ? 'text-yellow-600' : 'text-green-600'
                    ]"
                    :title="user.hasAccess ? 'Revoke Access' : 'Grant Access'"
                  >
                    <svg v-if="user.hasAccess" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete User"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredUsers.length === 0" class="p-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-auto text-gray-400 mb-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        <p class="text-gray-500">No users found matching your criteria</p>
      </div>
    </div>

    <!-- Course Access Modal -->
    <div
      v-if="showAccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeAccessModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Manage Course Access</h2>
              <p class="mt-1 text-sm text-gray-500">{{ selectedUser?.name }}</p>
            </div>
            <button
              @click="closeAccessModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-6">
          <p class="text-sm text-gray-600 mb-4">
            Select courses to grant access. When you manually confirm payment, check the courses the user should have access to.
          </p>
          
          <div class="space-y-3">
            <label
              v-for="course in availableCourses"
              :key="course.id"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <VCheckbox
                :modelValue="selectedCourses.includes(course.id)"
                @update:modelValue="toggleCourseAccess(course.id)"
              />
              <div class="ml-4 flex-1">
                <div class="font-medium text-gray-900">{{ course.title }}</div>
                <div class="text-sm text-gray-500">${{ course.price }}</div>
              </div>
              <span
                v-if="selectedCourses.includes(course.id)"
                class="text-green-600 font-medium text-sm"
              >
                ✓ Granted
              </span>
            </label>
          </div>

          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-900">Total Value:</span>
              <span class="text-lg font-bold text-blue-600">
                ${{ selectedCourses.reduce((total, courseId) => {
                  const course = availableCourses.find(c => c.id === courseId);
                  return total + (course ? course.price : 0);
                }, 0) }}
              </span>
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <VButton
              @click="closeAccessModal"
              variant="outline"
              class="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </VButton>
            <VButton
              @click="saveCourseAccess"
              class="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Access
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>