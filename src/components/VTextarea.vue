<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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
  rows: {
    type: Number,
    default: 4
  },
  maxLength: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};

const characterCount = computed(() => {
  return props.modelValue?.length || 0;
});
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <div v-if="label || maxLength" class="flex items-center justify-between mb-2">
      <label v-if="label" class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-1">*</span>
      </label>
      <span v-if="maxLength" class="text-xs text-gray-500">
        {{ characterCount }}/{{ maxLength }}
      </span>
    </div>

    <!-- Textarea Field -->
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxLength"
      :class="[
        'w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none resize-none',
        error 
          ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        disabled 
          ? 'bg-gray-100 cursor-not-allowed text-gray-500' 
          : 'bg-white hover:border-gray-400'
      ]"
      @input="handleInput"
    />

    <!-- Error Message -->
    <p v-if="error" class="mt-1.5 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
textarea::placeholder {
  color: #9ca3af;
}
</style>
