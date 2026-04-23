<template>
  <label class="class-select-wrap" :class="wrapperClass" :for="fieldId">
    <span class="field-label">{{ label }}</span>
    <slot />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    fieldId: string
    label: string
    wrapperClass?: string
  }>(),
  {
    wrapperClass: '',
  },
)
</script>