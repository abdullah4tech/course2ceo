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
    // Check if user is actually an admin
    if (result.user.role === 'admin') {
      router.push('/admin');
    } else {
      error.value = 'Access denied. Admin credentials required.';
    }
  } else {
    error.value = result.error || 'Invalid credentials';
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Sign In</h1>
        <p class="text-gray-600">Access the admin dashboard</p>
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
              Admin Email
            </label>
            <VInput
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
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
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <a href="#" class="text-sm text-purple-600 hover:text-purple-500">
              Forgot password?
            </a>
          </div>

          <!-- Submit Button -->
          <VButton
            type="submit"
            variant="solid"
            class="w-full bg-purple-600 hover:bg-purple-700"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign In as Admin</span>
          </VButton>

          <!-- Security Notice -->
          <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs text-yellow-700">
                Admin access is restricted. All login attempts are logged.
              </p>
            </div>
          </div>
        </form>
      </VCard>

      <!-- Back Link -->
      <div class="mt-6 text-center">
        <router-link to="/signin" class="text-gray-600 hover:text-purple-600 transition-colors">
          Back to sign-in options
        </router-link>
      </div>
    </div>
  </div>
</template>
