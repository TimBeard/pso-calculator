<template>
  <FormField :field-id="fieldId" :label="label" :wrapper-class="wrapperClass">
    <input
      :id="fieldId"
      :value="modelValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      class="level-input"
      @input="onInput"
    >
  </FormField>
</template>

<script setup lang="ts">
import FormField from '~/components/ui/FormField.vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    fieldId: string
    label: string
    max?: number | string
    min?: number | string
    modelValue: number
    step?: number | string
    wrapperClass?: string
  }>(),
  {
    disabled: false,
    max: undefined,
    min: undefined,
    step: undefined,
    wrapperClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function onInput(event: Event): void {
  const rawValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', rawValue === '' ? Number.NaN : Number(rawValue))
}
</script>