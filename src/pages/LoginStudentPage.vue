<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import VButton from '../components/VButton.vue';
import VInput from '../components/VInput.vue';
import VCard from '../components/VCard.vue';

const router = useRouter();
const { login } = useAuth();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields';
    return;
  }

  isLoading.value = true;

  const result = await login(email.value, password.value);
  isLoading.value = false;
  
  if (result.success) {
    // Check if user is actually a student (not admin)
    if (result.user.role === 'user') {
      router.push('/dashboard');
    } else {
      error.value = 'Please use the admin login page';
    }
  } else {
    error.value = result.error || 'Invalid credentials';
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Student Sign In</h1>
        <p class="text-gray-600">Welcome back! Continue your learning journey</p>
      </div>

      <!-- Login Form -->
      <VCard>
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <VInput
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              variant="glass"
              required
            >
              <template #icon>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </template>
            </VInput>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <VInput
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              variant="glass"
              required
            >
              <template #icon>
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </template>
            </VInput>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <VButton
            type="submit"
            variant="solid"
            class="w-full"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign In</span>
          </VButton>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>
        </div>

        <!-- Sign Up Link -->
        <div class="mt-6 text-center">
          <router-link to="/signup/student" class="text-blue-600 hover:text-blue-500 font-medium">
            Create a student account
          </router-link>
        </div>
      </VCard>

      <!-- Back Link -->
      <div class="mt-6 text-center">
        <router-link to="/signin" class="text-gray-600 hover:text-blue-600 transition-colors">
          Back to sign-in options
        </router-link>
      </div>
    </div>
  </div>
</template>
