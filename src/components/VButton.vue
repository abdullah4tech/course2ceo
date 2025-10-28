<template>
  <button
    :class="buttonClasses"
    :disabled="isDisabled"
    :type="type"
    v-bind="$attrs"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="w-4 h-4 mr-2 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    
    <!-- Button Content -->
    <slot></slot>
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

// Define props
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  }
});

// Define emits (optional, for better IDE support)
defineEmits(['click']);

// Get attrs for additional class handling
const attrs = useAttrs();

// Button variant configurations (similar to CVA)
const buttonVariants = {
  base: 'inline-flex items-center justify-center cursor-pointer rounded-lg font-medium transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  variants: {
    primary: 'bg-primary-600 hover:bg-red-500 text-white focus:ring-slate-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-slate-300',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-slate-300',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus:ring-slate-300',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-slate-300',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-slate-300',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-slate-300',
  },
  sizes: {
    sm: 'h-8 px-4 text-sm',
    md: 'h-10 px-5 text-sm',
    lg: 'h-12 px-8 text-base',
    xl: 'h-14 px-10 text-lg',
  }
};

// Computed property for button classes
const buttonClasses = computed(() => {
  const classes = [
    buttonVariants.base,
    buttonVariants.variants[props.variant],
    buttonVariants.sizes[props.size]
  ];
  
  // Add any additional classes passed via class attribute
  if (attrs.class) {
    classes.push(attrs.class);
  }
  
  return classes.join(' ');
});

// Computed property for disabled state
const isDisabled = computed(() => props.loading || props.disabled);
</script>


<style scoped>
/* Apply custom colors if not using Tailwind's default palette */
.bg-primary-600 { background-color: var(--color-primary-600); }
.bg-primary-700 { background-color: var(--color-primary-700); }
.focus\:ring-primary-500:focus { --tw-ring-color: var(--color-primary-500); }

.bg-success-600 { background-color: var(--color-success-600); }
.bg-success-700 { background-color: var(--color-success-700); }
.focus\:ring-success-500:focus { --tw-ring-color: var(--color-success-500); }

.bg-warning-600 { background-color: var(--color-warning-600); }
.bg-warning-700 { background-color: var(--color-warning-700); }
.focus\:ring-warning-500:focus { --tw-ring-color: var(--color-warning-500); }

.bg-danger-600 { background-color: var(--color-danger-600); }
.bg-danger-700 { background-color: var(--color-danger-700); }
.focus\:ring-danger-500:focus { --tw-ring-color: var(--color-danger-500); }
</style>