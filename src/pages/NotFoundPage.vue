<script setup>
import { useRouter } from 'vue-router';
import VButton from '../components/VButton.vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goToCourses = () => {
  router.push('/courses');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Animated 404 -->
      <div class="error-container">
        <div class="error-number">
          <span class="digit">4</span>
          <span class="digit middle">0</span>
          <span class="digit">4</span>
        </div>
        
        <!-- Floating Icons -->
        <div class="floating-icons">
          <div class="icon-wrapper icon-1">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="icon-wrapper icon-2">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="icon-wrapper icon-3">
            <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Content Card -->
      <div class="content-card">
        <div class="card-shine"></div>
        
        <h1 class="error-title">
          Oops! Page Not <span class="shiny-text">Found</span>
        </h1>
        
        <p class="error-description">
          The page you're looking for seems to have wandered off. Don't worry though, 
          we'll help you get back on track!
        </p>
        
        <!-- Suggestions -->
        <div class="suggestions">
          <h3 class="suggestions-title">Here's what you can do:</h3>
          <ul class="suggestions-list">
            <li class="suggestion-item">
              <svg class="suggestion-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Check the URL for typos</span>
            </li>
            <li class="suggestion-item">
              <svg class="suggestion-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Go back to the homepage</span>
            </li>
            <li class="suggestion-item">
              <svg class="suggestion-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Browse our courses</span>
            </li>
          </ul>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <VButton 
            @click="goHome"
            size="lg"
            class="flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </VButton>
          
          <VButton 
            variant="outline"
            @click="goToCourses"
            size="lg"
            class="flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            View Courses
          </VButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Error Number Container */
.error-container {
  position: relative;
  margin-bottom: 48px;
}

.error-number {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.digit {
  font-size: 8rem;
  font-weight: 900;
  background: linear-gradient(
    135deg,
    var(--color-primary-700) 0%,
    var(--color-primary-500) 50%,
    #60a5fa 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
  animation: float 3s ease-in-out infinite;
  line-height: 1;
}

.digit.middle {
  animation-delay: 0.2s;
  transform: scale(1.1);
}

.digit:last-child {
  animation-delay: 0.4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 640px) {
  .digit {
    font-size: 5rem;
  }
}

/* Floating Icons */
.floating-icons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  pointer-events: none;
}

.icon-wrapper {
  position: absolute;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.icon {
  width: 32px;
  height: 32px;
  color: var(--color-primary-600);
}

.icon-1 {
  top: 20%;
  left: 10%;
  animation: floatIcon 4s ease-in-out infinite;
}

.icon-2 {
  top: 30%;
  right: 15%;
  animation: floatIcon 5s ease-in-out infinite;
  animation-delay: 1s;
}

.icon-3 {
  bottom: 30%;
  left: 15%;
  animation: floatIcon 4.5s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes floatIcon {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@media (max-width: 768px) {
  .icon-wrapper {
    display: none;
  }
}

/* Content Card */
.content-card {
  position: relative;
  padding: 48px 32px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  overflow: hidden;
}

.card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}

.error-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .error-title {
    font-size: 2.5rem;
  }
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
  display: inline-block;
}

@keyframes shine {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.error-description {
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

/* Suggestions */
.suggestions {
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.suggestions-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}

.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  font-size: 0.875rem;
  color: #4b5563;
  text-align: left;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.suggestion-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary-600);
  flex-shrink: 0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
    max-width: none;
  }
}
</style>