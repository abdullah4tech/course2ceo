<script setup>
import { computed } from 'vue';
import VButton from './VButton.vue';

const props = defineProps({
  course: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['enroll']);

const levelColor = computed(() => {
  const colors = {
    'Beginner': 'bg-green-100 text-green-700',
    'Intermediate': 'bg-blue-100 text-blue-700',
    'Advanced': 'bg-purple-100 text-purple-700'
  };
  return colors[props.course.level] || 'bg-gray-100 text-gray-700';
});
</script>

<template>
  <div class="course-card">
    <!-- Thumbnail -->
    <div class="course-thumbnail">
      <img 
        :src="course.thumbnail" 
        :alt="course.title"
        class="thumbnail-image"
      />
      <div class="thumbnail-overlay">
        <span :class="['level-badge', levelColor]">
          {{ course.level }}
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="course-content">
      <!-- Category & Duration -->
      <div class="course-meta">
        <span class="meta-item">
          <svg class="meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {{ course.category }}
        </span>
        <span class="meta-item">
          <svg class="meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ course.duration }}
        </span>
      </div>
      
      <!-- Title -->
      <h3 class="course-title">{{ course.title }}</h3>
      
      <!-- Description -->
      <p class="course-description">{{ course.description }}</p>
      
      <!-- Instructor -->
      <div class="instructor-info">
        <img 
          :src="course.instructorAvatar" 
          :alt="course.instructor"
          class="instructor-avatar"
        />
        <span class="instructor-name">{{ course.instructor }}</span>
      </div>
      
      <!-- Stats -->
      <div class="course-stats">
        <div class="stat-item">
          <svg class="stat-icon text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="stat-value">{{ course.rating }}</span>
          <span class="stat-label">({{ course.reviews }})</span>
        </div>
        <div class="stat-item">
          <svg class="stat-icon text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span class="stat-value">{{ course.students.toLocaleString() }}</span>
          <span class="stat-label">students</span>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="course-footer">
        <div class="price-container">
          <span class="price">${{ course.price }}</span>
        </div>
        <VButton 
          size="sm"
          @click="emit('enroll', course.id)"
          class="enroll-button"
        >
          Enroll Now
        </VButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  background: rgba(255, 255, 255, 0.85);
}

.course-thumbnail {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-card:hover .thumbnail-image {
  transform: scale(1.05);
}

.thumbnail-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.level-badge {
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.course-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.course-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: capitalize;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

.course-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Instructor */
.instructor-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.instructor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.instructor-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

/* Stats */
.course-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
}

.stat-icon {
  width: 16px;
  height: 16px;
}

.stat-value {
  font-weight: 600;
  color: #111827;
}

.stat-label {
  color: #6b7280;
}

/* Footer */
.course-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.price-container {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.enroll-button {
  flex-shrink: 0;
}
</style>