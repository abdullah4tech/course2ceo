<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import VButton from './VButton.vue';

const router = useRouter();
const route = useRoute();

// Use real authentication
const { currentUser, isLoggedIn, isAdmin, isUser, logout } = useAuth();

const handleSignIn = () => {
  router.push('/signin');
};

const handleSignOut = () => {
  logout();
  router.push('/');
};

const goToDashboard = () => {
  if (isAdmin.value) {
    router.push('/admin');
  } else {
    router.push('/dashboard');
  }
};
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <nav class="legendary-nav mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Global">
      <div class="flex items-center">
        <router-link to="/" class="flex items-center space-x-3 group">
          <span class="sr-only">Creator to CEO</span>
          <div class="logo-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="logo-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <span class="brand-text">Creator2CEO</span>
        </router-link>
      </div>
      
      <div class="hidden md:flex md:gap-x-1 lg:gap-x-2">
        <router-link to="/" class="legendary-link">
          Home
        </router-link>
        <router-link to="/courses" class="legendary-link">
          Courses
        </router-link>
        
        <!-- Show Dashboard link only when logged in -->
        <router-link 
          v-if="isAdmin" 
          to="/admin" 
          class="legendary-link"
        >
          Admin Dashboard
        </router-link>
        <router-link 
          v-else-if="isUser" 
          to="/dashboard" 
          class="legendary-link"
        >
          My Dashboard
        </router-link>
      </div>
      
      <div class="flex items-center gap-x-3">
        <!-- Not Logged In -->
        <template v-if="!isLoggedIn">
          <VButton 
            size="sm"
            variant="ghost"
            @click="router.push('/login')"
          >
            Sign In
          </VButton>
          <VButton 
            size="sm"
            @click="handleSignIn"
          >
            Get Started
          </VButton>
        </template>
        
        <!-- Logged In - User Menu -->
        <template v-else>
          <button
            @click="goToDashboard"
            class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <img 
              :src="currentUser.avatar" 
              :alt="currentUser.name"
              class="w-8 h-8 rounded-full"
            />
            <span class="text-sm font-medium text-gray-700 hidden lg:block">
              {{ currentUser.name }}
            </span>
          </button>
          <VButton 
            size="sm"
            variant="ghost"
            @click="handleSignOut"
          >
            Sign Out
          </VButton>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Legendary Navigation */
.legendary-nav {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

/* Logo Container */
.logo-container {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
  border-radius: 12px;
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.25),
    0 0 0 3px rgba(59, 130, 246, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 12px;
  pointer-events: none;
}

.logo-container:hover {
  transform: translateY(-2px) rotate(-5deg);
  box-shadow: 
    0 8px 20px rgba(59, 130, 246, 0.35),
    0 0 0 3px rgba(59, 130, 246, 0.15);
}

.logo-icon {
  width: 24px;
  height: 24px;
  color: white;
  position: relative;
  z-index: 1;
}

/* Brand Text */
.brand-text {
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1f2937, #374151);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.brand-text:hover {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Legendary Links */
.legendary-link {
  position: relative;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.3s ease;
  color: #374151;
  text-decoration: none;
}

.legendary-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 12px;
  right: 12px;
  height: 2px;
  background: var(--color-primary-600);
  border-radius: 2px;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.legendary-link:hover::after {
  transform: scaleX(1);
}
</style>
