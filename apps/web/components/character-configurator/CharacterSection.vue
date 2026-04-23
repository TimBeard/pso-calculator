<template>
  <PlannerCard kicker="Configuration" title="Personnage">
    <div class="config-grid character-config-grid">
      <SelectField
        field-id="class-select"
        v-model="form.classId"
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

      <SelectField
        field-id="shifta-select"
        v-model="form.shiftaLevel"
        label="Shifta"
        :options="shiftaOptions"
        :get-option-label="formatShiftaLabel"
        coerce="number"
        wrapper-class="config-grid__full"
      />

      <SelectField
        field-id="zalure-select"
        v-model="form.zalureLevel"
        label="Zalure"
        :options="zalureOptions"
        :get-option-label="formatZalureLabel"
        coerce="number"
        wrapper-class="config-grid__full"
      />
    </div>

    <p v-if="errorMessage" class="feedback feedback--error">{{ errorMessage }}</p>
  </PlannerCard>
</template>

<script setup lang="ts">
import type {
  CharacterConfigInput,
  CharacterClassOption,
  CharacterShiftaOption,
  CharacterZalureOption,
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
  shiftaOptions: CharacterShiftaOption[]
  zalureOptions: CharacterZalureOption[]
}>()

function formatShiftaLabel(option: unknown): string {
  const record = option as Record<string, unknown>
  const level = record.level as number
  const label = record.label as string
  const atpIncrease = record.atpIncrease as number
  return `${label}${level === 0 ? '' : ` (+${atpIncrease}% ATP)`}`
}

function formatZalureLabel(option: unknown): string {
  const record = option as Record<string, unknown>
  const level = record.level as number
  const label = record.label as string
  const dfpReduction = record.dfpReduction as number
  return `${label}${level === 0 ? '' : ` (-${dfpReduction}% DFP)`}`
}

function getLevelOptionValue(option: unknown): number {
  return Number(option)
}

function formatLevelLabel(option: unknown): string {
  return String(option)
}
</script>