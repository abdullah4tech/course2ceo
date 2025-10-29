<script setup>
import { ref } from 'vue';
import VButton from './VButton.vue';

const handleSignIn = () => {
  console.log('Sign in clicked');
};

const handleNavigate = (path) => {
  console.log('Navigate to:', path);
};
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 nav-header">
    <nav class="nav-glass mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8" aria-label="Global">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2 group">
          <span class="sr-only">Creator to CEO</span>
          <div class="icon-glass">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-blue-600 sm:h-7 sm:w-7 transition-transform group-hover:scale-110 duration-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <span class="text-base font-bold text-gray-900 sm:text-lg">Creator2CEO</span>
        </a>
      </div>
      
      <div class="hidden md:flex md:gap-x-6 lg:gap-x-8">
        <a href="/" class="nav-link text-sm font-medium text-gray-700">
          Home
        </a>
        <a href="/courses" class="nav-link text-sm font-medium text-gray-700">
          Courses
        </a>
        <a href="#about" class="nav-link text-sm font-medium text-gray-700">
          About
        </a>
        <a href="#contact" class="nav-link text-sm font-medium text-gray-700">
          Contact
        </a>
      </div>
      
      <div class="flex items-center gap-x-2 sm:gap-x-3">
        <VButton 
          variant="outline"
          size="sm"
          @click="handleSignIn"
          class="hidden sm:inline-flex items-center justify-center text-sm font-medium"
        >
          Sign In
        </VButton>
        <VButton 
          size="sm"
          @click="handleSignIn"
          class="inline-flex items-center justify-center text-sm font-medium"
        >
          Start
        </VButton>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Navigation Glass Effect */
.nav-header {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.icon-glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  border-radius: 14px;
  padding: 10px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.6) inset,
    0 1px 2px rgba(255, 255, 255, 0.8) inset;
  transition: all 0.3s ease;
}

.icon-glass:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 6px 16px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.7) inset,
    0 1px 2px rgba(255, 255, 255, 0.9) inset;
}

.nav-link {
  position: relative;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-primary-600);
  background: rgba(59, 130, 246, 0.08);
}

.nav-link::after {
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

.nav-link:hover::after {
  transform: scaleX(1);
}
</style>