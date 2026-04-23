<template>
  <PlannerCard kicker="Équipement" title="Arme">
    <div class="config-grid">
      <SelectField
        field-id="weapon-select"
        v-model="form.weaponId"
        label="Arme"
        :get-option-disabled="getWeaponOptionDisabled"
        :option-groups="groupedWeaponOptions"
      />

      <NumberField
        field-id="grind-input"
        v-model="form.grind"
        label="Grind"
        :min="0"
        :max="currentWeaponMaxGrind"
        :disabled="currentWeaponMaxGrind === 0"
      />

      <SelectField
        v-if="selectedWeaponHasSelectableSpecial"
        field-id="special-select"
        v-model="form.specialId"
        label="Special"
        :option-groups="variableSpecialOptionGroups"
        wrapper-class="config-grid__full"
      />

      <SelectField
        v-else-if="selectedWeaponHasNoSpecial"
        field-id="special-select"
        :model-value="'none'"
        label="Special"
        :options="specialNoneOption"
        :disabled="true"
        wrapper-class="config-grid__full"
      />

      <FormField v-else field-id="special-display" label="Special" wrapper-class="config-grid__full">
        <div id="special-display" class="level-input field-readonly">{{ selectedWeaponSpecialLabel }}</div>
      </FormField>
    </div>

    <div class="config-grid weapon-attributes-inline">
      <NumberField
        v-for="attribute in weaponAttributeOptions"
        :key="attribute.key"
        :field-id="`${attribute.key}-input`"
        v-model="form.weaponAttributes[attribute.key]"
        :label="attribute.label"
        :min="attributeMin"
        :max="attributeMax"
        :step="attributeStep"
          :disabled="isWeaponAttributeDisabled(attribute.key)"
      />
    </div>

    <p v-if="weaponAttributeErrorMessage" class="feedback feedback--error">{{ weaponAttributeErrorMessage }}</p>
  </PlannerCard>
</template>

<script setup lang="ts">
import type {
  CharacterConfigInput,
  CharacterSpecialId,
  CharacterSpecialOption,
  CharacterWeaponAttributeKey,
  CharacterWeaponAttributeOption,
  CharacterWeaponOption,
} from '@pso/shared'
import { computed } from 'vue'
import FormField from '~/components/ui/FormField.vue'
import PlannerCard from '~/components/ui/PlannerCard.vue'
import NumberField from '~/components/ui/NumberField.vue'
import SelectField from '~/components/ui/SelectField.vue'

const props = defineProps<{
  attributeMax: number
  attributeMin: number
  attributeStep: number
  currentWeaponMaxGrind: number
  form: CharacterConfigInput
  groupedWeaponOptions: Array<{ label: string; options: CharacterWeaponOption[] }>
  isWeaponOptionDisabled: (option: CharacterWeaponOption) => boolean
  isWeaponAttributeDisabled: (key: CharacterWeaponAttributeKey) => boolean
  selectedWeaponHasNoSpecial: boolean
  selectedWeaponHasSelectableSpecial: boolean
  selectedWeaponSpecialLabel: string
  specialOptions: CharacterSpecialOption[]
  weaponAttributeErrorMessage: string
  weaponAttributeOptions: CharacterWeaponAttributeOption[]
}>()

const specialNoneOption: CharacterSpecialOption[] = [{ id: 'none', label: 'Aucun' }]

const SPECIAL_CATEGORIES: Array<{ label: string; ids: CharacterSpecialId[] }> = [
  { label: 'Aucun', ids: ['none'] },
  { label: 'Fire damage', ids: ['heat', 'fire', 'flame', 'burning'] },
  { label: 'Freezing', ids: ['ice', 'frost', 'freeze', 'blizzard'] },
  { label: 'Lightning damage', ids: ['shock', 'thunder', 'storm', 'tempest'] },
  { label: 'Paralysis', ids: ['bind', 'hold', 'seize', 'arrest'] },
  { label: 'Confusion', ids: ['panic', 'riot', 'havoc', 'chaos'] },
  { label: 'Instant kill', ids: ['dim', 'shadow', 'dark', 'hell'] },
  { label: 'HP drain', ids: ['draw', 'drain', 'fill', 'gush'] },
  { label: 'TP drain', ids: ['heart', 'mind', 'soul', 'geist'] },
  { label: 'EXP steal', ids: ['masters', 'lords', 'kings'] },
  { label: 'HP cut', ids: ['devils', 'demons'] },
  { label: 'Sacrificial', ids: ['charge', 'spirit', 'berserk'] },
]

const variableSpecialOptionGroups = computed(() => {
  const optionsById = new Map(props.specialOptions.map((option) => [option.id, option]))
  return SPECIAL_CATEGORIES
    .map((category) => ({
      label: category.label,
      options: category.ids
        .map((id) => optionsById.get(id))
        .filter((option): option is CharacterSpecialOption => option !== undefined),
    }))
    .filter((group) => group.options.length > 0)
})

function getWeaponOptionDisabled(option: unknown): boolean {
  return props.isWeaponOptionDisabled(option as CharacterWeaponOption)
}
</script>