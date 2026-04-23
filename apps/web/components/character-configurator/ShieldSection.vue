<template>
  <PlannerCard kicker="Équipement" title="Bouclier">
    <div class="config-grid armor-grid">
      <SelectField
        field-id="shield-select"
        v-model="form.shieldId"
        label="Bouclier"
        :get-option-disabled="getShieldOptionDisabled"
        :options="shieldOptions"
        wrapper-class="config-grid__full"
      />

      <NumberField
        field-id="shield-dfp-input"
        v-model="form.shieldDfp"
        label="DFP"
        :min="currentShieldDfpMin"
        :max="currentShieldDfpMax"
        :disabled="currentShieldDfpMax === 0"
      />

      <NumberField
        field-id="shield-evp-input"
        v-model="form.shieldEvp"
        label="EVP"
        :min="currentShieldEvpMin"
        :max="currentShieldEvpMax"
        :disabled="currentShieldEvpMax === 0"
      />
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import type { CharacterConfigInput, CharacterShieldOption } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import NumberField from '~/components/ui/NumberField.vue'
import SelectField from '~/components/ui/SelectField.vue'

const props = defineProps<{
  currentShieldDfpMax: number
  currentShieldDfpMin: number
  currentShieldEvpMax: number
  currentShieldEvpMin: number
  form: CharacterConfigInput
  isShieldOptionDisabled: (option: CharacterShieldOption) => boolean
  shieldOptions: CharacterShieldOption[]
}>()

function getShieldOptionDisabled(option: unknown): boolean {
  return props.isShieldOptionDisabled(option as CharacterShieldOption)
}
</script>