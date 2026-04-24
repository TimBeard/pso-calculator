<template>
  <PlannerCard kicker="Configuration" title="Partie">
    <div class="config-grid character-config-grid">
      <SelectField v-model="form.difficulty" label="Difficulte" :options="difficultyOptions" field-id="difficulty-select" />

      <ToggleField
        field-id="game-mode-toggle"
        :model-value="isOnePersonMode"
        label="Mode de jeu"
        true-label="Solo"
        false-label="Multi"
        @update:model-value="emit('update:isOnePersonMode', $event)"
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
  </PlannerCard>
</template>

<script setup lang="ts">
import type {
  CharacterConfigInput,
  CharacterDifficultyOption,
  CharacterShiftaOption,
  CharacterZalureOption,
} from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import SelectField from '~/components/ui/SelectField.vue'
import ToggleField from '~/components/ui/ToggleField.vue'

defineProps<{
  difficultyOptions: CharacterDifficultyOption[]
  form: CharacterConfigInput
  isOnePersonMode: boolean
  shiftaOptions: CharacterShiftaOption[]
  zalureOptions: CharacterZalureOption[]
}>()

const emit = defineEmits<{
  'update:isOnePersonMode': [value: boolean]
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
</script>