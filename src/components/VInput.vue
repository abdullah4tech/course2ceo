<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  variant: {
    type: String,
    default: 'glass', // glass, solid
    validator: (value) => ['glass', 'solid'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3.5 text-base'
  };
  return sizes[props.size];
});

const iconPadding = computed(() => {
  const padding = {
    sm: 'pl-9',
    md: 'pl-10',
    lg: 'pl-12'
  };
  return (props.icon || slots.icon) ? padding[props.size] : '';
});

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative flex items-center">
      <!-- Icon Slot or Text Icon -->
      <div v-if="icon || $slots.icon" class="absolute left-4 flex items-center pointer-events-none z-10">
        <slot name="icon">
          <span v-if="icon && !icon.includes('<')" class="text-lg">{{ icon }}</span>
          <div v-else-if="icon" v-html="icon" class="w-5 h-5 text-gray-400"></div>
        </slot>
      </div>

      <!-- Input Field -->
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-2xl transition-all duration-300 outline-none',
          sizeClasses,
          iconPadding,
          variant === 'glass' ? [
            'border border-white/40 bg-white/70 backdrop-blur-xl',
            'shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.2)_inset]',
            error 
              ? 'border-red-300 focus:border-red-500 focus:shadow-[0_12px_40px_rgba(239,68,68,0.15),0_0_0_1px_rgba(239,68,68,0.2)_inset]'
              : 'focus:border-blue-500 focus:bg-white/85 focus:shadow-[0_12px_40px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.2)_inset]',
          ] : [
            'border border-gray-300 bg-white',
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          ],
          disabled 
            ? 'bg-gray-100 cursor-not-allowed text-gray-500 opacity-60' 
            : 'text-gray-900 hover:border-gray-400'
        ]"
        @input="handleInput"
      />
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #9ca3af;
}

/* Ensure backdrop filter works */
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
  input {
    -webkit-backdrop-filter: blur(20px);
  }
}
</style>
