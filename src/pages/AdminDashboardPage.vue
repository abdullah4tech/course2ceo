<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = ref([
  {
    name: 'Total Courses',
    value: '12',
    change: '+2',
    trend: '+16.7%',
    changeType: 'positive',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    bgGradient: 'from-purple-500 to-indigo-500',
    iconBg: 'bg-purple-500'
  },
  {
    name: 'Total Users',
    value: '2,543',
    change: '+124',
    trend: '+5.1%',
    changeType: 'positive',
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    bgGradient: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500'
  },
  {
    name: 'Active Enrollments',
    value: '8,234',
    change: '+512',
    trend: '+6.6%',
    changeType: 'positive',
    icon: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    bgGradient: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-500'
  },
  {
    name: 'Revenue',
    value: '$45,231',
    change: '+$3,721',
    trend: '+8.2%',
    changeType: 'positive',
    icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bgGradient: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500'
  }
]);

const topCourses = ref([
  { id: 1, name: 'Building Your Creator Business', students: 2340, revenue: '$699,660', growth: '+12%' },
  { id: 2, name: 'Social Media Marketing Mastery', students: 3120, revenue: '$777,480', growth: '+18%' },
  { id: 3, name: 'Content Creation Blueprint', students: 1890, revenue: '$376,110', growth: '+8%' }
]);

const recentUsers = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    enrolledCourses: 3,
    hasAccess: true,
    joinedDate: '2025-10-28',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    enrolledCourses: 2,
    hasAccess: true,
    joinedDate: '2025-10-27',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    status: 'active'
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    enrolledCourses: 0,
    hasAccess: false,
    joinedDate: '2025-10-26',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    status: 'pending'
  },
  {
    id: 4,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    enrolledCourses: 5,
    hasAccess: true,
    joinedDate: '2025-10-25',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    status: 'active'
  },
  {
    id: 5,
    name: 'Mike Brown',
    email: 'mike@example.com',
    enrolledCourses: 1,
    hasAccess: true,
    joinedDate: '2025-10-24',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    status: 'active'
  }
]);

const recentActivity = ref([
  {
    id: 1,
    type: 'user',
    message: 'New user registered: John Doe',
    time: '2 hours ago',
    icon: 'user-plus'
  },
  {
    id: 2,
    type: 'course',
    message: 'Course "Social Media Marketing" was updated',
    time: '5 hours ago',
    icon: 'book'
  },
  {
    id: 3,
    type: 'payment',
    message: 'Payment received from Jane Smith - $299',
    time: '1 day ago',
    icon: 'dollar'
  },
  {
    id: 4,
    type: 'enrollment',
    message: 'Alice Johnson enrolled in "Building Your Creator Business"',
    time: '2 days ago',
    icon: 'academic'
  },
  {
    id: 5,
    type: 'user',
    message: 'New user registered: Mike Brown',
    time: '3 days ago',
    icon: 'user-plus'
  }
]);
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600">{{ stat.name }}</p>
            <p class="mt-2 text-3xl font-bold text-gray-900">{{ stat.value }}</p>
            <p class="mt-2 text-sm text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-1">
                <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clip-rule="evenodd" />
              </svg>
              {{ stat.change }} this month
            </p>
          </div>
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-purple-600">
                <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          @click="router.push('/admin/courses')"
          class="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Upload New Course
        </button>
        <button
          @click="router.push('/admin/users')"
          class="flex items-center justify-center px-6 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          Manage Users
        </button>
        <button
          @click="router.push('/courses')"
          class="flex items-center justify-center px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View Site
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Users -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-900">Recent Users</h2>
          <button
            @click="router.push('/admin/users')"
            class="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            View all
          </button>
        </div>
        <div class="space-y-4">
          <div
            v-for="user in recentUsers"
            :key="user.id"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center space-x-3">
              <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full" />
              <div>
                <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-xs text-gray-500">{{ user.email }}</p>
              </div>
            </div>
            <div class="text-right">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  user.hasAccess
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ user.hasAccess ? 'Active' : 'Pending' }}
              </span>
              <p class="text-xs text-gray-500 mt-1">{{ user.enrolledCourses }} courses</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              :class="[
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                activity.type === 'user' ? 'bg-blue-100' : '',
                activity.type === 'course' ? 'bg-purple-100' : '',
                activity.type === 'payment' ? 'bg-green-100' : '',
                activity.type === 'enrollment' ? 'bg-orange-100' : ''
              ]"
            >
              <svg
                v-if="activity.type === 'user'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-blue-600"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <svg
                v-if="activity.type === 'course'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-purple-600"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <svg
                v-if="activity.type === 'payment'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-green-600"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg
                v-if="activity.type === 'enrollment'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-orange-600"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">{{ activity.message }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>