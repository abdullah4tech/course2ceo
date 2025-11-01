<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked);
};
</script>

<template>
  <div class="w-full">
    <label class="flex items-start gap-3 cursor-pointer group">
      <!-- Checkbox Input -->
      <div class="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          type="checkbox"
          :checked="modelValue"
          :disabled="disabled"
          :class="[
            'w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer',
            error
              ? 'border-red-300 focus:ring-red-200'
              : 'border-gray-300 focus:ring-blue-100',
            disabled
              ? 'bg-gray-100 cursor-not-allowed'
              : 'bg-white checked:bg-blue-600 checked:border-blue-600 hover:border-blue-400',
            'focus:ring-2 focus:outline-none'
          ]"
          @change="handleChange"
        />
        
        <!-- Custom Checkmark -->
        <svg
          v-if="modelValue"
          class="absolute w-3 h-3 text-white pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- Label -->
      <span 
        v-if="label"
        :class="[
          'text-sm transition-colors duration-200',
          disabled ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'
        ]"
      >
        {{ label }}
      </span>
    </label>

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 ml-8 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>
