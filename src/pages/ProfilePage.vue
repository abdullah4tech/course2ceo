<script setup>
import { ref } from 'vue';
import VButton from '../components/VButton.vue';
import VCard from '../components/VCard.vue';
import VInput from '../components/VInput.vue';
import VTextarea from '../components/VTextarea.vue';

const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Passionate learner and developer',
  phone: '+1 234 567 8900',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com',
  avatar: '👤'
});

const saveProfile = () => {
  alert('Profile updated successfully!');
};

const changePassword = () => {
  alert('Change password functionality coming soon!');
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-3xl font-bold text-gray-900">Profile Settings</h2>
      <p class="text-gray-600 mt-2">Manage your account information</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Picture -->
      <VCard class="p-6">
        <div class="text-center">
          <div class="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
            {{ user.avatar }}
          </div>
          <VButton variant="outline" size="sm" class="mb-2">
            📷 Change Photo
          </VButton>
          <p class="text-xs text-gray-500">JPG, PNG or GIF. Max 2MB</p>
        </div>
      </VCard>

      <!-- Profile Information -->
      <div class="lg:col-span-2 space-y-6">
        <VCard class="p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-4">Personal Information</h3>
          
          <div class="space-y-4">
            <VInput
              v-model="user.name"
              label="Full Name"
              placeholder="Enter your name"
            />

            <VInput
              v-model="user.email"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
            />

            <VInput
              v-model="user.phone"
              label="Phone Number"
              placeholder="+1 234 567 8900"
            />

            <VInput
              v-model="user.location"
              label="Location"
              placeholder="City, Country"
            />

            <VInput
              v-model="user.website"
              label="Website"
              placeholder="https://yourwebsite.com"
            />

            <VTextarea
              v-model="user.bio"
              label="Bio"
              placeholder="Tell us about yourself..."
              :rows="4"
            />
          </div>

          <div class="flex gap-3 mt-6">
            <VButton @click="saveProfile">
              💾 Save Changes
            </VButton>
            <VButton variant="outline">
              Cancel
            </VButton>
          </div>
        </VCard>

        <!-- Security Settings -->
        <VCard class="p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-4">Security</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Password</p>
                <p class="text-sm text-gray-600">Last changed 30 days ago</p>
              </div>
              <VButton variant="outline" size="sm" @click="changePassword">
                Change
              </VButton>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">Two-Factor Authentication</p>
                <p class="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <VButton variant="outline" size="sm">
                Enable
              </VButton>
            </div>
          </div>
        </VCard>

        <!-- Email Preferences -->
        <VCard class="p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-4">Email Preferences</h3>
          
          <div class="space-y-3">
            <label class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600">
              <div>
                <p class="font-medium text-gray-900">Course Updates</p>
                <p class="text-sm text-gray-600">Notifications about your enrolled courses</p>
              </div>
            </label>

            <label class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" checked class="w-4 h-4 text-blue-600">
              <div>
                <p class="font-medium text-gray-900">New Courses</p>
                <p class="text-sm text-gray-600">Get notified about new courses</p>
              </div>
            </label>

            <label class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-blue-600">
              <div>
                <p class="font-medium text-gray-900">Marketing</p>
                <p class="text-sm text-gray-600">Promotional emails and offers</p>
              </div>
            </label>
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>
