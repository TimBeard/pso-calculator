<template>
  <PlannerCard kicker="Équipement" title="Armure">
    <div class="config-grid armor-grid">
      <SelectField
        field-id="armor-select"
        v-model="form.armorId"
        label="Armure"
        :get-option-disabled="getArmorOptionDisabled"
        :options="armorOptions"
        wrapper-class="config-grid__full"
      />

      <NumberField
        field-id="armor-dfp-input"
        v-model="form.armorDfp"
        label="DFP"
        :min="currentArmorDfpMin"
        :max="currentArmorDfpMax"
        :disabled="currentArmorDfpMax === 0"
      />

      <NumberField
        field-id="armor-evp-input"
        v-model="form.armorEvp"
        label="EVP"
        :min="currentArmorEvpMin"
        :max="currentArmorEvpMax"
        :disabled="currentArmorEvpMax === 0"
      />
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import type { CharacterArmorOption, CharacterConfigInput } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import NumberField from '~/components/ui/NumberField.vue'
import SelectField from '~/components/ui/SelectField.vue'

const props = defineProps<{
  armorOptions: CharacterArmorOption[]
  currentArmorDfpMax: number
  currentArmorDfpMin: number
  currentArmorEvpMax: number
  currentArmorEvpMin: number
  form: CharacterConfigInput
  isArmorOptionDisabled: (option: CharacterArmorOption) => boolean
}>()

function getArmorOptionDisabled(option: unknown): boolean {
  return props.isArmorOptionDisabled(option as CharacterArmorOption)
}
</script>