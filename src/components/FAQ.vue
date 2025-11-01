<script setup>
import { ref } from 'vue';

const faqs = ref([
  {
    id: 1,
    question: "What makes C2CEO different from other online courses?",
    answer: "C2CEO focuses on transforming creators into CEOs, not just teaching skills. You get proven business frameworks, expert mentorship from successful entrepreneurs, and a supportive community of fellow creator-CEOs. Our courses emphasize real-world application with immediate implementation strategies.",
    isOpen: false
  },
  {
    id: 2,
    question: "Do I need prior business experience to start?",
    answer: "No prior business experience is required! Our courses are designed for creators at all levels. Whether you're just starting or looking to scale your existing creative work, we provide step-by-step guidance tailored to your journey from creator to CEO.",
    isOpen: false
  },
  {
    id: 3,
    question: "How long does it take to see results?",
    answer: "Many of our students start seeing results within the first few weeks of applying the strategies. However, building a sustainable business typically takes 3-6 months of consistent effort. We focus on helping you implement as you learn, so you can start generating revenue while still in the program.",
    isOpen: false
  },
  {
    id: 4,
    question: "What kind of support do I get?",
    answer: "You'll receive comprehensive support including access to expert mentors, a private community of creator-CEOs, live Q&A sessions, personalized feedback on your business strategy, and lifetime access to course updates. You're never alone on your journey.",
    isOpen: false
  },
  {
    id: 5,
    question: "Can I access courses on mobile devices?",
    answer: "Absolutely! Our platform is fully responsive and optimized for all devices. Learn on your schedule, whether you're on your phone, tablet, or desktop. All course materials, videos, and resources are accessible anywhere, anytime.",
    isOpen: false
  },
  {
    id: 6,
    question: "What if I'm not satisfied with a course?",
    answer: "We offer a 30-day money-back guarantee on all our courses. If you're not completely satisfied within the first 30 days, simply contact our support team for a full refund. Your success and satisfaction are our top priorities.",
    isOpen: false
  }
]);

const toggleFAQ = (id) => {
  faqs.value = faqs.value.map(faq => ({
    ...faq,
    isOpen: faq.id === id ? !faq.isOpen : faq.isOpen
  }));
};
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-lg text-gray-600">
          Everything you need to know about C2CEO
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="mx-auto max-w-3xl">
        <div class="divide-y divide-gray-200">
          <div 
            v-for="faq in faqs" 
            :key="faq.id"
            class="faq-item"
          >
            <button
              @click="toggleFAQ(faq.id)"
              class="w-full py-5 flex items-center justify-between gap-4 text-left group"
            >
              <span class="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                {{ faq.question }}
              </span>
              <span class="shrink-0">
                <svg 
                  class="w-5 h-5 text-gray-500 transition-all duration-200 group-hover:text-blue-600"
                  :class="{ 'rotate-180': faq.isOpen }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            
            <div 
              class="overflow-hidden transition-all duration-300 ease-in-out"
              :style="{ 
                maxHeight: faq.isOpen ? '400px' : '0'
              }"
            >
              <div class="pb-5 pr-12">
                <p class="text-base leading-7 text-gray-600">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-item {
  transition: all 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
