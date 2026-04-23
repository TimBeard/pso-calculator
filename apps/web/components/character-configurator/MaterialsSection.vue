<template>
  <PlannerCard kicker="Configuration" title="Materials">
    <div class="materials-card__summary-grid config-grid">
      <NumberField field-id="materials-hp" v-model="form.materials.hp" label="HP" :min="0" :max="125" />
      <NumberField field-id="materials-tp" v-model="form.materials.tp" label="TP" :min="0" :max="125" :disabled="isTpMaterialDisabled" />
    </div>

    <div class="materials-card__rows config-grid">
      <NumberField field-id="materials-power" v-model="form.materials.power" label="Power" :min="0" :max="getMaterialMax('power')" :disabled="regularMaterialStatDisabled.power" wrapper-class="config-grid__full" />
      <NumberField field-id="materials-def" v-model="form.materials.def" label="Def" :min="0" :max="getMaterialMax('def')" :disabled="regularMaterialStatDisabled.def" wrapper-class="config-grid__full" />
      <NumberField field-id="materials-mind" v-model="form.materials.mind" label="Mind" :min="0" :max="getMaterialMax('mind')" :disabled="isMindMaterialDisabled || regularMaterialStatDisabled.mind" wrapper-class="config-grid__full" />
      <NumberField field-id="materials-evade" v-model="form.materials.evade" label="Evade" :min="0" :max="getMaterialMax('evade')" :disabled="regularMaterialStatDisabled.evade" wrapper-class="config-grid__full" />
      <NumberField field-id="materials-luck" v-model="form.materials.luck" label="Luck" :min="0" :max="getMaterialMax('luck')" :disabled="regularMaterialStatDisabled.luck" wrapper-class="config-grid__full" />
    </div>

    <p class="materials-card__hint">
      {{ regularMaterialCount }} / {{ regularMaterialLimit }}
    </p>

    <p v-if="materialsErrorMessage" class="feedback feedback--error">{{ materialsErrorMessage }}</p>
  </PlannerCard>
</template>

<script setup lang="ts">
import {
  CHARACTER_REGULAR_MATERIAL_KEYS,
  countRegularMaterials,
  type CharacterConfigInput,
  type CharacterRegularMaterialKey,
} from '@pso/shared'
import { computed } from 'vue'
import NumberField from '~/components/ui/NumberField.vue'
import PlannerCard from '~/components/ui/PlannerCard.vue'

const props = defineProps<{
  form: CharacterConfigInput
  isMindMaterialDisabled: boolean
  isTpMaterialDisabled: boolean
  materialsErrorMessage: string
  regularMaterialLimit: number
  regularMaterialStatDisabled: Record<CharacterRegularMaterialKey, boolean>
  regularMaterialStatMaximums: Record<CharacterRegularMaterialKey, number>
}>()

const regularMaterialCount = computed(() => {
  return countRegularMaterials(props.form.materials)
})

function getMaterialMax(key: CharacterRegularMaterialKey): number {
  const otherMaterialsTotal = CHARACTER_REGULAR_MATERIAL_KEYS.reduce((total, currentKey) => {
    if (currentKey === key) {
      return total
    }

    return total + props.form.materials[currentKey]
  }, 0)

  const currentValue = props.form.materials[key]
  // Allow one extra material beyond the strict cap: blocking only kicks in once the stat actually
  // reaches its maximum (so the user can take that final step that pushes the stat to the cap).
  const statMax = Math.max(currentValue, props.regularMaterialStatMaximums[key] + 1)

  return Math.max(0, Math.min(props.regularMaterialLimit - otherMaterialsTotal, statMax))
}
</script>