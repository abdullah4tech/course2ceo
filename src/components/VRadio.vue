<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};
</script>

<template>
  <label class="flex items-start gap-3 cursor-pointer group">
    <!-- Radio Input -->
    <div class="relative flex items-center justify-center shrink-0 mt-0.5">
      <input
        type="radio"
        :name="name"
        :value="value"
        :checked="modelValue === value"
        :disabled="disabled"
        :class="[
          'w-5 h-5 border-2 transition-all duration-200 cursor-pointer',
          disabled
            ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
            : 'bg-white border-gray-300 hover:border-blue-400 checked:border-blue-600',
          'focus:ring-2 focus:ring-blue-100 focus:outline-none'
        ]"
        @change="handleChange"
      />
      
      <!-- Custom Dot -->
      <div
        v-if="modelValue === value"
        class="absolute w-2.5 h-2.5 rounded-full bg-blue-600 pointer-events-none"
      />
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
</template>
