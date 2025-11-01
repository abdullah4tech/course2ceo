<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

// Hide navbar and footer for admin routes, user dashboard, and sign-in pages (they have their own layouts)
const showLayout = computed(() => 
  !route.path.startsWith('/admin') && 
  !route.path.startsWith('/dashboard') &&
  !route.path.startsWith('/signin') &&
  !route.path.startsWith('/login')
);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar v-if="showLayout" />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer v-if="showLayout" />
  </div>
</template>
