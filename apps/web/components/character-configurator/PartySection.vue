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
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import type { CharacterConfigInput, CharacterDifficultyOption } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import SelectField from '~/components/ui/SelectField.vue'
import ToggleField from '~/components/ui/ToggleField.vue'

defineProps<{
  difficultyOptions: CharacterDifficultyOption[]
  form: CharacterConfigInput
  isOnePersonMode: boolean
}>()

const emit = defineEmits<{
  'update:isOnePersonMode': [value: boolean]
}>()
</script>