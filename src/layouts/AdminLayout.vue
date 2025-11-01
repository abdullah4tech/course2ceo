<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const sidebarOpen = ref(true);
const showNotifications = ref(false);
const showProfileMenu = ref(false);

const navigationItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    badge: null
  },
  {
    name: 'Courses',
    path: '/admin/courses',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    badge: '12'
  },
  {
    name: 'Users',
    path: '/admin/users',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    badge: '3'
  }
];

const notifications = ref([
  { id: 1, title: 'New user registered', message: 'John Doe just signed up', time: '2 min ago', unread: true },
  { id: 2, title: 'Payment received', message: 'Jane Smith paid $299', time: '1 hour ago', unread: true },
  { id: 3, title: 'Course completed', message: 'Bob completed "Marketing 101"', time: '3 hours ago', unread: false }
]);

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length);

const isActive = (path) => {
  return route.path === path;
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showProfileMenu.value = false;
};

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
  showNotifications.value = false;
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.unread = false);
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white shadow-xl',
        sidebarOpen ? 'w-72' : 'w-20'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-between h-20 px-5 border-b border-gray-100 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div v-if="sidebarOpen" class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <div>
            <span class="text-lg font-bold text-white">Admin Panel</span>
            <p class="text-xs text-purple-100">Creator2CEO</p>
          </div>
        </div>
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1.5">
        <p v-if="sidebarOpen" class="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group',
            isActive(item.path)
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
              : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
          ]"
        >
          <div class="flex items-center min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <span v-if="sidebarOpen" class="ml-3 font-medium text-sm truncate">{{ item.name }}</span>
          </div>
          <span 
            v-if="sidebarOpen && item.badge" 
            :class="[
              'px-2 py-0.5 text-xs font-bold rounded-full',
              isActive(item.path) 
                ? 'bg-white/20 text-white' 
                : 'bg-purple-100 text-purple-600'
            ]"
          >
            {{ item.badge }}
          </span>
        </router-link>
      </nav>

      <!-- Admin Info Card -->
      <div v-if="sidebarOpen" class="absolute bottom-24 left-0 right-0 mx-4">
        <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                A
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 truncate">Admin User</p>
              <p class="text-xs text-gray-500 truncate">admin@c2ceo.com</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50/50">
        <button
          @click="router.push('/')"
          :class="[
            'flex items-center w-full px-4 py-3 rounded-xl text-gray-600 hover:bg-white hover:text-purple-600 transition-all duration-200 font-medium text-sm',
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          <span v-if="sidebarOpen" class="ml-3">Back to Site</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div 
      :class="[
        'transition-all duration-300',
        sidebarOpen ? 'ml-72' : 'ml-20'
      ]"
    >
      <!-- Header -->
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div class="px-6 py-5">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {{ route.meta.title || 'Admin Dashboard' }}
              </h1>
              <p class="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            
            <div class="flex items-center space-x-3">
              <!-- Search -->
              <div class="hidden md:block">
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    class="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>

              <!-- Notifications -->
              <div class="relative">
                <button
                  @click="toggleNotifications"
                  class="relative p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <span v-if="unreadCount > 0" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{{ unreadCount }}</span>
                </button>

                <!-- Notifications Dropdown -->
                <div
                  v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-down"
                >
                  <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="font-semibold text-gray-900">Notifications</h3>
                    <button @click="markAllAsRead" class="text-xs text-purple-600 hover:text-purple-700 font-medium">Mark all read</button>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    <div
                      v-for="notif in notifications"
                      :key="notif.id"
                      :class="[
                        'p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0',
                        notif.unread ? 'bg-purple-50/30' : ''
                      ]"
                    >
                      <div class="flex items-start space-x-3">
                        <div class="w-2 h-2 mt-2 rounded-full bg-purple-600" v-if="notif.unread"></div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900">{{ notif.title }}</p>
                          <p class="text-xs text-gray-500 mt-0.5">{{ notif.message }}</p>
                          <p class="text-xs text-gray-400 mt-1">{{ notif.time }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Profile -->
              <div class="relative">
                <button
                  @click="toggleProfileMenu"
                  class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <div class="relative">
                    <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      A
                    </div>
                    <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div class="hidden lg:block text-left">
                    <p class="text-sm font-semibold text-gray-900">Admin User</p>
                    <p class="text-xs text-gray-500">Administrator</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                <!-- Profile Dropdown -->
                <div
                  v-if="showProfileMenu"
                  class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-slide-down"
                >
                  <div class="p-4 border-b border-gray-100">
                    <p class="text-sm font-semibold text-gray-900">Admin User</p>
                    <p class="text-xs text-gray-500">admin@c2ceo.com</p>
                  </div>
                  <div class="p-2">
                    <button class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Profile Settings</button>
                    <button class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Preferences</button>
                    <button @click="router.push('/')" class="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">Sign Out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles here */
</style>