<script setup>
import { ref, computed } from 'vue';
import CourseCard from '../components/CourseCard.vue';
import CourseHeader from '../components/CourseHeader.vue';

const selectedCategory = ref('all');
const searchQuery = ref('');

const categories = ref([
  { id: 'all', name: 'All Courses', count: 12 },
  { id: 'business', name: 'Business', count: 4 },
  { id: 'marketing', name: 'Marketing', count: 3 },
  { id: 'design', name: 'Design', count: 3 },
  { id: 'development', name: 'Development', count: 2 }
]);

const courses = ref([
  {
    id: 1,
    title: 'Building Your Creator Business',
    description: 'Learn how to transform your creative passion into a sustainable 6-figure business.',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    category: 'business',
    level: 'Beginner',
    duration: '8 weeks',
    students: 2340,
    rating: 4.9,
    reviews: 892,
    price: 299,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    tags: ['Business Strategy', 'Entrepreneurship', 'Scaling']
  },
  {
    id: 2,
    title: 'Social Media Marketing Mastery',
    description: 'Master Instagram, TikTok, and YouTube to grow your audience and generate revenue.',
    instructor: 'Mike Chen',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    category: 'marketing',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 3120,
    rating: 4.8,
    reviews: 1204,
    price: 249,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    tags: ['Social Media', 'Content Strategy', 'Growth']
  },
  {
    id: 3,
    title: 'Brand Design for Creators',
    description: 'Design a memorable brand identity that attracts your ideal audience.',
    instructor: 'Emma Davis',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    category: 'design',
    level: 'Beginner',
    duration: '4 weeks',
    students: 1890,
    rating: 4.9,
    reviews: 743,
    price: 199,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    tags: ['Branding', 'Visual Identity', 'Design']
  },
  {
    id: 4,
    title: 'Revenue Streams & Monetization',
    description: 'Discover multiple income streams to build a sustainable creator business.',
    instructor: 'David Martinez',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    category: 'business',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 2780,
    rating: 4.8,
    reviews: 956,
    price: 279,
    thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
    tags: ['Monetization', 'Revenue', 'Strategy']
  },
  {
    id: 5,
    title: 'Content Creation Frameworks',
    description: 'Build a content system that consistently engages and converts your audience.',
    instructor: 'Lisa Anderson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    category: 'marketing',
    level: 'Beginner',
    duration: '5 weeks',
    students: 4200,
    rating: 4.9,
    reviews: 1543,
    price: 229,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    tags: ['Content Creation', 'Strategy', 'Frameworks']
  },
  {
    id: 6,
    title: 'Website Development for Creators',
    description: 'Build a professional website to showcase your work and attract clients.',
    instructor: 'Alex Thompson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    category: 'development',
    level: 'Beginner',
    duration: '7 weeks',
    students: 1560,
    rating: 4.7,
    reviews: 634,
    price: 259,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    tags: ['Web Development', 'Portfolio', 'Design']
  },
  {
    id: 7,
    title: 'Email Marketing Blueprint',
    description: 'Build and monetize an engaged email list that drives consistent revenue.',
    instructor: 'Rachel Green',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    category: 'marketing',
    level: 'Intermediate',
    duration: '5 weeks',
    students: 2890,
    rating: 4.8,
    reviews: 1087,
    price: 239,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    tags: ['Email Marketing', 'Automation', 'Conversion']
  },
  {
    id: 8,
    title: 'Product Launch Formula',
    description: 'Launch digital products that generate 5-figure months consistently.',
    instructor: 'James Wilson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    category: 'business',
    level: 'Advanced',
    duration: '8 weeks',
    students: 1940,
    rating: 4.9,
    reviews: 821,
    price: 349,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['Product Launch', 'Sales', 'Strategy']
  },
  {
    id: 9,
    title: 'Visual Storytelling',
    description: 'Create compelling visual narratives that captivate and convert audiences.',
    instructor: 'Sofia Rodriguez',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    category: 'design',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 2210,
    rating: 4.8,
    reviews: 892,
    price: 249,
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop',
    tags: ['Storytelling', 'Visual Design', 'Content']
  },
  {
    id: 10,
    title: 'Community Building Essentials',
    description: 'Build a loyal community that supports your business growth.',
    instructor: 'Marcus Lee',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    category: 'business',
    level: 'Beginner',
    duration: '5 weeks',
    students: 3450,
    rating: 4.9,
    reviews: 1342,
    price: 219,
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    tags: ['Community', 'Engagement', 'Growth']
  },
  {
    id: 11,
    title: 'Advanced Motion Graphics',
    description: 'Create professional animations and motion graphics for your content.',
    instructor: 'Nina Patel',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    category: 'design',
    level: 'Advanced',
    duration: '10 weeks',
    students: 1120,
    rating: 4.9,
    reviews: 487,
    price: 399,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    tags: ['Motion Graphics', 'Animation', 'Video']
  },
  {
    id: 12,
    title: 'No-Code App Development',
    description: 'Build powerful apps without writing code to solve business problems.',
    instructor: 'Tyler Brooks',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tyler',
    category: 'development',
    level: 'Beginner',
    duration: '6 weeks',
    students: 1780,
    rating: 4.7,
    reviews: 623,
    price: 269,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['No-Code', 'App Development', 'Tools']
  }
]);

const filteredCourses = computed(() => {
  let filtered = courses.value;
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(course => course.category === selectedCategory.value);
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return filtered;
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Header -->
    <CourseHeader />
    
    <!-- Hero Section -->
    <div class="relative pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Explore Our <span class="shiny-text">Courses</span>
          </h1>
          <p class="mt-4 text-base leading-7 text-gray-600 sm:text-lg max-w-2xl mx-auto">
            Transform your creative passion into a thriving business with expert-led courses
          </p>
        </div>
        
        <!-- Search Bar -->
        <div class="mt-8 max-w-2xl mx-auto">
          <div class="search-container">
            <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search courses..."
              class="search-input"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <!-- Categories -->
      <div class="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'category-pill',
            selectedCategory === category.id ? 'category-pill-active' : ''
          ]"
        >
          {{ category.name }}
          <span class="category-count">{{ category.count }}</span>
        </button>
      </div>
      
      <!-- Courses Grid -->
      <div class="courses-grid">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
        />
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredCourses.length === 0" class="text-center py-12">
        <div class="empty-state">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">No courses found</h3>
          <p class="mt-2 text-sm text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Shiny Text Effect */
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

@keyframes shine {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Search Container */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  height: 20px;
  width: 20px;
  color: #9ca3af;
  pointer-events: none;
  z-index: 10;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transition: all 0.3s ease;
  color: #1f2937;
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 0 0 1px rgba(59, 130, 246, 0.2) inset;
}

/* Category Pills */
.category-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  color: #4b5563;
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-pill:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  background: rgba(255, 255, 255, 0.85);
}

.category-pill-active {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
  color: white;
  border-color: transparent;
  box-shadow: 
    0 8px 24px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.category-pill-active:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 32px rgba(59, 130, 246, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
}

.category-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1);
}

.category-pill-active .category-count {
  background: rgba(255, 255, 255, 0.25);
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 640px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .courses-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

/* Empty State */
.empty-state {
  padding: 48px 24px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}
</style>