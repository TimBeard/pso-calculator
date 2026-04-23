<template>
  <FormField :field-id="fieldId" :label="label" :wrapper-class="wrapperClass">
    <select :id="fieldId" :value="modelValue" class="class-select" :disabled="disabled" @change="onChange">
      <template v-if="optionGroups.length > 0">
        <optgroup v-for="group in optionGroups" :key="group.label" :label="group.label">
          <option
            v-for="option in group.options"
            :key="getOptionKey(option)"
            :value="getOptionValue(option)"
            :disabled="isOptionDisabled(option)"
          >
            {{ getOptionLabel(option) }}
          </option>
        </optgroup>
      </template>

      <template v-else>
        <option
          v-for="option in options"
          :key="getOptionKey(option)"
          :value="getOptionValue(option)"
          :disabled="isOptionDisabled(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </template>
    </select>
  </FormField>
</template>

<script setup lang="ts">
import FormField from '~/components/ui/FormField.vue'

type SelectOption = unknown

interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

const props = withDefaults(
  defineProps<{
    coerce?: 'number' | 'string'
    disabled?: boolean
    fieldId: string
    getOptionDisabled?: (option: SelectOption) => boolean
    getOptionKey?: (option: SelectOption) => string | number
    getOptionLabel?: (option: SelectOption) => string
    getOptionValue?: (option: SelectOption) => string | number
    label: string
    modelValue: number | string
    optionGroups?: SelectOptionGroup[]
    options?: SelectOption[]
    wrapperClass?: string
  }>(),
  {
    coerce: 'string',
    disabled: false,
    getOptionDisabled: undefined,
    getOptionKey: undefined,
    getOptionLabel: undefined,
    getOptionValue: undefined,
    optionGroups: () => [],
    options: () => [],
    wrapperClass: '',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
}>()

function fallbackGetOptionKey(option: SelectOption): string | number {
  const record = option as Record<string, unknown>
  return (record.id as string | number | undefined)
    ?? (record.value as string | number | undefined)
    ?? (record.level as string | number | undefined)
    ?? JSON.stringify(option)
}

function fallbackGetOptionValue(option: SelectOption): string | number {
  const record = option as Record<string, unknown>
  return (record.id as string | number | undefined)
    ?? (record.value as string | number | undefined)
    ?? (record.level as string | number | undefined)
    ?? ''
}

function fallbackGetOptionLabel(option: SelectOption): string {
  const record = option as Record<string, unknown>
  return String(record.label ?? record.name ?? record.id ?? record.value ?? '')
}

function getOptionKey(option: SelectOption): string | number {
  return props.getOptionKey ? props.getOptionKey(option) : fallbackGetOptionKey(option)
}

function getOptionValue(option: SelectOption): string | number {
  return props.getOptionValue ? props.getOptionValue(option) : fallbackGetOptionValue(option)
}

function getOptionLabel(option: SelectOption): string {
  return props.getOptionLabel ? props.getOptionLabel(option) : fallbackGetOptionLabel(option)
}

function isOptionDisabled(option: SelectOption): boolean {
  return props.getOptionDisabled ? props.getOptionDisabled(option) : false
}

function onChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', props.coerce === 'number' ? Number(value) : value)
}
</script>