<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default', // default, bordered, shadow, flat
    validator: (value) => ['default', 'bordered', 'shadow', 'flat'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'md', // sm, md, lg, none
    validator: (value) => ['sm', 'md', 'lg', 'none'].includes(value)
  }
});

const variantClasses = {
  default: 'bg-white border border-gray-200',
  bordered: 'bg-white border-2 border-gray-300',
  shadow: 'bg-white shadow-lg',
  flat: 'bg-gray-50'
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};
</script>

<template>
  <div 
    :class="[
      'rounded-xl transition-all duration-200',
      variantClasses[variant],
      paddingClasses[padding],
      hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
    ]"
  >
    <slot />
  </div>
</template>
