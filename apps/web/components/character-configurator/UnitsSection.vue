<template>
  <PlannerCard kicker="Équipement" title="Units">
    <div class="config-grid units-grid">
      <SelectField field-id="unit-slot-1-select" v-model="form.unitSlot1Id" label="Slot 1" :get-option-disabled="getUnitOptionDisabled" :option-groups="groupedUnitOptions" :disabled="areUnitSlotsDisabled" />
      <SelectField field-id="unit-slot-2-select" v-model="form.unitSlot2Id" label="Slot 2" :get-option-disabled="getUnitOptionDisabled" :option-groups="groupedUnitOptions" :disabled="areUnitSlotsDisabled" />
      <SelectField field-id="unit-slot-3-select" v-model="form.unitSlot3Id" label="Slot 3" :get-option-disabled="getUnitOptionDisabled" :option-groups="groupedUnitOptions" :disabled="areUnitSlotsDisabled" />
      <SelectField field-id="unit-slot-4-select" v-model="form.unitSlot4Id" label="Slot 4" :get-option-disabled="getUnitOptionDisabled" :option-groups="groupedUnitOptions" :disabled="areUnitSlotsDisabled" />
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import type { CharacterConfigInput, CharacterUnitOption } from '@pso/shared'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import SelectField from '~/components/ui/SelectField.vue'

const props = defineProps<{
  areUnitSlotsDisabled: boolean
  form: CharacterConfigInput
  groupedUnitOptions: Array<{ label: string; options: CharacterUnitOption[] }>
  isUnitOptionDisabled: (option: CharacterUnitOption) => boolean
}>()

function getUnitOptionDisabled(option: unknown): boolean {
  return props.isUnitOptionDisabled(option as CharacterUnitOption)
}
</script>