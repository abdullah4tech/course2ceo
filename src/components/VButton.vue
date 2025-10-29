<template>
  <button
    :class="buttonClasses"
    :disabled="isDisabled"
    :type="type"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- Glossy overlay effect -->
    <div class="button-shine"></div>
    
    <!-- Button Content Wrapper -->
    <span class="relative z-10 inline-flex items-center gap-2">
      <!-- Loading Spinner -->
      <svg
        v-if="loading"
        class="w-4 h-4 animate-spin"
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
      
      <!-- Slot Content -->
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

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

const emit = defineEmits(['click']);

const attrs = useAttrs();

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit('click', event);
  }
};

const buttonVariants = {
  base: 'premium-button inline-flex items-center justify-center cursor-pointer font-semibold transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:pointer-events-none relative overflow-hidden',
  variants: {
    primary: 'btn-primary text-white shadow-2xl',
    secondary: 'btn-glass text-gray-800 hover:scale-[1.02] active:scale-[0.98]',
    success: 'btn-success text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]',
    warning: 'btn-warning text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]',
    danger: 'btn-danger text-white shadow-2xl hover:scale-[1.02] active:scale-[0.98]',
    outline: 'btn-outline text-gray-700 hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'btn-ghost text-gray-700 hover:scale-[1.02] active:scale-[0.98]',
  },
  sizes: {
    sm: 'h-9 px-5 text-sm rounded-xl',
    md: 'h-11 px-6 text-base rounded-2xl',
    lg: 'h-14 px-8 text-lg rounded-2xl',
    xl: 'h-16 px-10 text-xl rounded-3xl',
  }
};

const buttonClasses = computed(() => {
  const classes = [
    buttonVariants.base,
    buttonVariants.variants[props.variant],
    buttonVariants.sizes[props.size]
  ];
  
  if (attrs.class) {
    classes.push(attrs.class);
  }
  
  return classes.join(' ');
});

const isDisabled = computed(() => props.loading || props.disabled);
</script>

<style scoped>
.premium-button {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  letter-spacing: 0.01em;
  font-weight: 600;
}

.button-shine {
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
  z-index: 1;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-700) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 10px 40px -10px color-mix(in srgb, var(--color-primary-600) 60%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.4) inset;
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.6) inset;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 
    0 12px 40px 0 rgba(31, 38, 135, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.4) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.7) inset;
}

.btn-success {
  background: linear-gradient(135deg, var(--color-success-500) 0%, var(--color-success-700) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 10px 40px -10px color-mix(in srgb, var(--color-success-600) 60%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.4) inset;
}

.btn-success:hover {
  box-shadow: 
    0 15px 50px -10px color-mix(in srgb, var(--color-success-600) 70%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.5) inset;
}

.btn-warning {
  background: linear-gradient(135deg, var(--color-warning-500) 0%, var(--color-warning-700) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 10px 40px -10px color-mix(in srgb, var(--color-warning-600) 60%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.4) inset;
}

.btn-warning:hover {
  box-shadow: 
    0 15px 50px -10px color-mix(in srgb, var(--color-warning-600) 70%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.5) inset;
}

.btn-danger {
  background: linear-gradient(135deg, var(--color-danger-500) 0%, var(--color-danger-700) 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 10px 40px -10px color-mix(in srgb, var(--color-danger-600) 60%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.4) inset;
}

.btn-danger:hover {
  box-shadow: 
    0 15px 50px -10px color-mix(in srgb, var(--color-danger-600) 70%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset,
    0 1px 2px 0 rgba(255, 255, 255, 0.5) inset;
}

.btn-outline {
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(100, 100, 100, 0.3);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(100, 100, 100, 0.4);
  box-shadow: 
    0 12px 40px 0 rgba(31, 38, 135, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
}

.btn-ghost {
  background: transparent;
  border: 1px solid transparent;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px 0 rgba(31, 38, 135, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.premium-button:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 4px color-mix(in srgb, var(--color-primary-500) 20%, transparent),
    0 10px 40px -10px color-mix(in srgb, var(--color-primary-600) 60%, transparent),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.premium-button:disabled {
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.premium-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>