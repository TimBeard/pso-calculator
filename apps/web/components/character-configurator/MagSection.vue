<template>
  <PlannerCard kicker="Équipement" title="MAG">
    <div class="config-grid mag-grid">
      <NumberField field-id="mag-def-input" v-model="form.magDef" label="DEF" :min="limits.defMin" :max="getMagMax('def')" />
      <NumberField field-id="mag-pow-input" v-model="form.magPow" label="POW" :min="limits.powMin" :max="getMagMax('pow')" />
      <NumberField field-id="mag-dex-input" v-model="form.magDex" label="DEX" :min="limits.dexMin" :max="getMagMax('dex')" />
      <NumberField field-id="mag-mind-input" v-model="form.magMind" label="MIND" :min="limits.mindMin" :max="getMagMax('mind')" />
    </div>

    <p class="materials-card__hint">
      {{ magTotal }} / {{ limits.totalMax }}
    </p>

    <p v-if="magErrorMessage" class="feedback feedback--error">{{ magErrorMessage }}</p>
  </PlannerCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CharacterConfigInput } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import NumberField from '~/components/ui/NumberField.vue'

const props = defineProps<{
  form: CharacterConfigInput
  limits: {
    defMin: number
    defMax: number
    powMin: number
    powMax: number
    dexMin: number
    dexMax: number
    mindMin: number
    mindMax: number
    totalMax: number
  }
  magErrorMessage: string
}>()

const magStats = computed(() => {
  return {
    def: props.form.magDef,
    pow: props.form.magPow,
    dex: props.form.magDex,
    mind: props.form.magMind,
  }
})

const magTotal = computed(() => {
  return Object.values(magStats.value).reduce((total, value) => total + value, 0)
})

function getMagMax(key: 'def' | 'pow' | 'dex' | 'mind'): number {
  const otherStatsTotal = Object.entries(magStats.value).reduce((total, [currentKey, value]) => {
    if (currentKey === key) {
      return total
    }

    return total + value
  }, 0)

  const minimum = key === 'def' ? props.limits.defMin : 0

  return Math.max(minimum, props.limits.totalMax - otherStatsTotal)
}
</script>