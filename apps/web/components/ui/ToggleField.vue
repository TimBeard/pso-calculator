<template>
  <FormField :field-id="fieldId" :label="label" :wrapper-class="wrapperClass">
    <button :id="fieldId" type="button" class="mode-toggle" :aria-pressed="modelValue" @click="emit('update:modelValue', !modelValue)">
      <span class="mode-toggle__label" :class="{ 'mode-toggle__label--active': modelValue }">{{ trueLabel }}</span>
      <span class="mode-toggle__track" aria-hidden="true">
        <span class="mode-toggle__thumb" :class="{ 'mode-toggle__thumb--active': modelValue }" />
      </span>
      <span class="mode-toggle__label" :class="{ 'mode-toggle__label--active': !modelValue }">{{ falseLabel }}</span>
    </button>
  </FormField>
</template>

<script setup lang="ts">
import FormField from '~/components/ui/FormField.vue'

withDefaults(
  defineProps<{
    falseLabel?: string
    fieldId: string
    label: string
    modelValue: boolean
    trueLabel?: string
    wrapperClass?: string
  }>(),
  {
    falseLabel: 'Non',
    trueLabel: 'Oui',
    wrapperClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>