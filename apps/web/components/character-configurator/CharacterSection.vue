<template>
  <PlannerCard kicker="Configuration" title="Personnage">
    <div class="config-grid character-config-grid">
      <SelectField
        field-id="class-select"
        :model-value="form.classId"
        @update:model-value="(value: string | number) => emit('update:classId', value as CharacterConfigInput['classId'])"
        label="Classe"
        :option-groups="groupedClassOptions"
        wrapper-class=""
      />

      <SelectField
        field-id="level-input"
        v-model="form.level"
        label="Niveau"
        :options="CHARACTER_LEVEL_OPTIONS"
        :get-option-key="getLevelOptionValue"
        :get-option-label="formatLevelLabel"
        :get-option-value="getLevelOptionValue"
        coerce="number"
        wrapper-class=""
      />
    </div>

    <p v-if="errorMessage" class="feedback feedback--error">{{ errorMessage }}</p>
  </PlannerCard>
</template>

<script setup lang="ts">
import type {
  CharacterConfigInput,
  CharacterClassOption,
} from '@pso/shared'
import { CHARACTER_LEVEL_OPTIONS } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import SelectField from '~/components/ui/SelectField.vue'

const props = defineProps<{
  errorMessage: string
  form: CharacterConfigInput
  groupedClassOptions: Array<{ label: string; options: CharacterClassOption[] }>
  levelMax: number
  levelMin: number
}>()

const emit = defineEmits<{
  'update:classId': [value: CharacterConfigInput['classId']]
}>()

function getLevelOptionValue(option: unknown): number {
  return Number(option)
}

function formatLevelLabel(option: unknown): string {
  return String(option)
}
</script>