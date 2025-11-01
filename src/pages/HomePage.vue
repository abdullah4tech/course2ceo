<script setup>
import { ref, h, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';
import FAQ from '../components/FAQ.vue';

const videoPlayer = ref(null);
const showVideo = ref(false);
const showBanner = ref(true);
const showOverlay = ref(true);
const router = useRouter();

// Icon components as render functions
const ShieldIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
    ])
};

const BookIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
    ])
};

const ClockIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
};

const PlayIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
};

const UsersIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
    ])
};

const CheckIcon = {
    render: () => h('svg', { class: 'h-5 w-5', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
};

const features = shallowRef([
    {
        title: 'Business Strategy',
        description: 'Proven frameworks to scale creative work into profitable businesses.',
        icon: ShieldIcon
    },
    {
        title: 'Expert Mentorship',
        description: 'Learn from successful entrepreneurs who built million-dollar businesses.',
        icon: BookIcon
    },
    {
        title: 'Apply Immediately',
        description: 'Learn and implement simultaneously. See real results as you progress.',
        icon: ClockIcon
    },
    {
        title: 'Real Case Studies',
        description: 'Study actual business transformations and revenue strategies.',
        icon: PlayIcon
    },
    {
        title: 'CEO Network',
        description: 'Connect with successful creator-entrepreneurs and industry leaders.',
        icon: UsersIcon
    },
    {
        title: 'Proven Results',
        description: 'Join creators with 6-figure businesses and entrepreneurial freedom.',
        icon: CheckIcon
    }
]);

const stats = ref([
    { label: 'Businesses', value: '1,200+' },
    { label: 'Revenue', value: '$50M+' },
    { label: 'CEOs', value: '500+' },
    { label: 'Income', value: '340%' }
])

const handleSignIn = () => {
  console.log('Sign in clicked');
  router.push('/courses')
};

const toggleVideo = () => {
  if (videoPlayer.value) {
    if (showVideo.value && !videoPlayer.value.paused) {
      videoPlayer.value.pause();
      showOverlay.value = true;
    } else {
      showBanner.value = false;
      showVideo.value = true;
      videoPlayer.value.play();
      showOverlay.value = false;
    }
  }
};

const handleVideoEnd = () => {
  showOverlay.value = true;
};
</script>

<template>
  <div class="bg-linear-to-br from-slate-50 via-white to-blue-50">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <!-- Premium background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-radial from-blue-100/40 via-transparent to-transparent"></div>
        <div class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-200/20 to-transparent blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-purple-200/20 to-transparent blur-3xl"></div>
      </div>
      
      <div class="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:pt-32 sm:pb-24 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            From Creator to <span class="shiny-text">CEO</span>
          </h1>
          <p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8 max-w-2xl mx-auto">
            Transform your creative skills into a profitable business with expert-led courses.
          </p>
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <VButton 
              @click="handleSignIn"
              size="lg"
              class="w-full sm:w-auto flex flex-row items-center justify-center text-white font-semibold shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clip-rule="evenodd" />
              </svg>
              Courses
            </VButton>
            <VButton 
              variant="outline"
              @click="handleSignIn"
              size="lg"
              class="w-full sm:w-auto inline-flex items-center justify-center font-semibold"
            >
              Sign In
            </VButton>
          </div>
        </div>
        
        <!-- Hero Video -->
        <div class="mt-12 flow-root sm:mt-16 lg:mt-24">
          <div class="video-container">
            <div class="aspect-video rounded-2xl sm:rounded-3xl bg-white shadow-premium ring-1 ring-gray-900/10 overflow-hidden relative group">
              <!-- Banner Image -->
              <img 
                src="../assets/images/banner.jpg"
                alt="Video Banner"
                class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                :style="{ opacity: showBanner ? 1 : 0 }"
              />
              
              <video 
                ref="videoPlayer"
                class="w-full h-full object-cover absolute inset-0 transition-opacity duration-300"
                :style="{ opacity: showVideo ? 1 : 0 }"
                preload="metadata"
                @ended="handleVideoEnd"
              >
                <source src="../assets/videos/overview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <!-- Play Button Overlay -->
              <div 
                v-show="showOverlay"
                @click="toggleVideo"
                class="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5 flex items-center justify-center group-hover:from-black/10 group-hover:to-transparent transition-all duration-500 cursor-pointer z-10"
              >
                <div class="play-button">
                  <svg class="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Why Creator2CEO Works
          </h2>
          <p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg">
            Master business skills designed specifically for creators
          </p>
        </div>
        <div class="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            <div v-for="feature in features" :key="feature.title" class="feature-card">
              <dt class="flex items-center justify-center lg:justify-start gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <div class="feature-icon">
                  <component :is="feature.icon" class="h-5 w-5 flex-none text-blue-600" />
                </div>
                {{ feature.title }}
              </dt>
              <dd class="mt-3 text-sm leading-6 text-gray-600">
                <p>{{ feature.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div id="stats" class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-3xl lg:max-w-none">
          <div class="text-center">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Real Creator Success
            </h2>
            <p class="mt-3 text-base leading-7 text-gray-600 sm:mt-4 sm:text-lg">
              Proven results from our community
            </p>
          </div>
          <dl class="mt-12 grid grid-cols-2 gap-0.5 overflow-hidden rounded-xl text-center sm:mt-16 sm:grid-cols-4 lg:rounded-2xl">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col bg-gray-400/5 p-4 sm:p-6 lg:p-8">
              <dt class="text-xs font-semibold leading-5 text-gray-600 sm:text-sm">{{ stat.label }}</dt>
              <dd class="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <FAQ />

    <!-- CTA Section -->
    <div id="pricing" class="cta-section mt-auto">
      <div class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Ready to become a Creator-CEO?
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:mt-6 sm:text-lg">
            Transform your creative passion into a thriving business.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <VButton 
              variant="secondary"
              @click="handleSignIn"
              size="lg"
              class="cta-button"
            >
              <svg class="w-5 h-5 mr-2 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Get Started Today
            </VButton>
          </div>
          <p class="mt-6 text-sm text-blue-100">
            Secure authentication • Manual access verification • No credit card required
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-with-icon {
  position: relative;
  overflow: hidden;
}

.btn-text {
  display: inline-block;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-with-icon:hover .btn-text {
  opacity: 0;
  transform: translateX(10px);
}

.btn-with-icon:hover .btn-icon {
  opacity: 1;
  transform: translateX(0);
}

.shiny-text {
  background: linear-gradient(
    135deg,
    var(--color-primary-700) 0%,
    var(--color-primary-500) 25%,
    #60a5fa 50%,
    var(--color-primary-500) 75%,
    var(--color-primary-700) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shine 3s linear infinite;
  position: relative;
  display: inline-block;
}

.shiny-text::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, var(--color-primary-500), #60a5fa, var(--color-primary-600));
  filter: blur(20px);
  opacity: 0.3;
  z-index: -1;
  animation: glow 3s ease-in-out infinite;
}

@keyframes shine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.2;
    filter: blur(20px);
  }
  50% {
    opacity: 0.4;
    filter: blur(30px);
  }
}

.video-container {
  position: relative;
  padding: 8px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  box-shadow: 
    0 20px 60px -10px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
}

.shadow-premium {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.4) inset;
}

.play-button {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 50%;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 20px 60px -10px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.6) inset;
}

.play-button:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 
    0 25px 70px -10px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.7) inset;
}

.feature-card {
  position: relative;
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  background: rgba(255, 255, 255, 0.85);
}

@media (min-width: 1024px) {
  .feature-card {
    text-align: left;
  }
}

.feature-icon {
  display: inline-flex;
  padding: 12px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.15),
    0 0 0 1px rgba(59, 130, 246, 0.1) inset;
  transition: all 0.3s;
}

.feature-card:hover .feature-icon {
  background: rgba(59, 130, 246, 0.15);
  transform: scale(1.05);
  box-shadow: 
    0 6px 16px rgba(59, 130, 246, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.2) inset;
}

.stat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  background: rgba(255, 255, 255, 0.85);
}

.cta-section {
  background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%);
  border-radius: 48px 48px 0 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  pointer-events: none;
}

.cta-button {
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;
}

html {
  scroll-behavior: smooth;
}
</style>