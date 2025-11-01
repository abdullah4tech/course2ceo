<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true,
    // Array of { value, label } or simple strings
  },
  placeholder: {
    type: String,
    default: 'Select an option'
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
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  return sizes[props.size];
});

const normalizedOptions = computed(() => {
  return props.options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: opt };
    }
    return opt;
  });
});

const handleChange = (event) => {
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

    <!-- Select Field -->
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg border transition-all duration-200 outline-none appearance-none cursor-pointer',
          sizeClasses,
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          disabled 
            ? 'bg-gray-100 cursor-not-allowed text-gray-500' 
            : 'bg-white hover:border-gray-400'
        ]"
        @change="handleChange"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in normalizedOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Dropdown Icon -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
