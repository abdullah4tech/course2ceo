<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';

const router = useRouter();

const signInAsStudent = () => {
  // TODO: Navigate to student login page
  router.push('/login/student');
};

const signInAsAdmin = () => {
  // TODO: Navigate to admin login page
  router.push('/login/admin');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h1>
        <p class="text-lg text-gray-600">Choose how you'd like to sign in</p>
      </div>

      <!-- Sign In Options -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Student Sign In -->
        <VCard class="hover:shadow-2xl transition-all duration-300 cursor-pointer group" @click="signInAsStudent">
          <div class="text-center p-8">
            <!-- Icon -->
            <div class="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Content -->
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Sign in as Student</h2>
            <p class="text-gray-600 mb-6">Access your courses, track progress, and continue learning</p>

            <!-- Features -->
            <ul class="text-left space-y-2 mb-8 text-sm text-gray-700">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Access enrolled courses
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Track learning progress
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Download resources
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                View certificates
              </li>
            </ul>

            <!-- Button -->
            <VButton 
              variant="solid" 
              class="w-full"
              @click.stop="signInAsStudent"
            >
              Continue as Student
            </VButton>
          </div>
        </VCard>

        <!-- Admin Sign In -->
        <VCard class="hover:shadow-2xl transition-all duration-300 cursor-pointer group" @click="signInAsAdmin">
          <div class="text-center p-8">
            <!-- Icon -->
            <div class="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
              <svg class="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>

            <!-- Content -->
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Sign in as Admin</h2>
            <p class="text-gray-600 mb-6">Manage courses, users, and platform settings</p>

            <!-- Features -->
            <ul class="text-left space-y-2 mb-8 text-sm text-gray-700">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Manage courses
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                User management
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Analytics dashboard
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Platform settings
              </li>
            </ul>

            <!-- Button -->
            <VButton 
              variant="solid" 
              class="w-full bg-purple-600 hover:bg-purple-700"
              @click.stop="signInAsAdmin"
            >
              Continue as Admin
            </VButton>
          </div>
        </VCard>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-8">
        <router-link to="/" class="text-gray-600 hover:text-blue-600 transition-colors">
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
