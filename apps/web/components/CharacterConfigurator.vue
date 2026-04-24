<template>
  <section class="planner-layout">
    <section class="planner-column">
      <PartySection
        :form="form"
        :difficulty-options="difficultyOptions"
        :is-one-person-mode="isOnePersonMode"
        :shifta-options="shiftaOptions"
        :zalure-options="zalureOptions"
        @update:is-one-person-mode="isOnePersonMode = $event"
      />

      <CharacterSection
        :form="form"
        :error-message="errorMessage"
        :grouped-class-options="groupedClassOptions"
        :level-max="levelMax"
        :level-min="levelMin"
        @update:class-id="setActiveClass"
      />

      <MaterialsSection
        :form="form"
        :is-mind-material-disabled="isMindMaterialDisabled"
        :is-tp-material-disabled="isTpMaterialDisabled"
        :materials-error-message="materialsErrorMessage"
        :regular-material-limit="regularMaterialLimit"
        :regular-material-stat-disabled="regularMaterialStatDisabled"
        :regular-material-stat-maximums="regularMaterialStatMaximums"
      />

      <WeaponSection
        :attribute-max="attributeMax"
        :attribute-min="attributeMin"
        :attribute-step="attributeStep"
        :current-weapon-max-grind="currentWeaponMaxGrind"
        :form="form"
        :grouped-weapon-options="groupedWeaponOptions"
        :is-weapon-option-disabled="isWeaponOptionDisabled"
        :is-weapon-attribute-disabled="isWeaponAttributeDisabled"
        :selected-weapon-has-no-special="selectedWeaponHasNoSpecial"
        :selected-weapon-has-selectable-special="selectedWeaponHasSelectableSpecial"
        :selected-weapon-special-label="selectedWeaponSpecialLabel"
        :special-options="specialOptions"
        :weapon-attribute-error-message="weaponAttributeErrorMessage"
        :weapon-attribute-options="weaponAttributeOptions"
      />

      <ArmorSection
        :armor-options="armorOptions"
        :current-armor-dfp-max="currentArmorDfpMax"
        :current-armor-dfp-min="currentArmorDfpMin"
        :current-armor-evp-max="currentArmorEvpMax"
        :current-armor-evp-min="currentArmorEvpMin"
        :form="form"
        :is-armor-option-disabled="isArmorOptionDisabled"
      />

      <UnitsSection
        :are-unit-slots-disabled="areUnitSlotsDisabled"
        :form="form"
        :grouped-unit-options="groupedUnitOptions"
        :is-unit-option-disabled="isUnitOptionDisabled"
      />

      <ShieldSection
        :current-shield-dfp-max="currentShieldDfpMax"
        :current-shield-dfp-min="currentShieldDfpMin"
        :current-shield-evp-max="currentShieldEvpMax"
        :current-shield-evp-min="currentShieldEvpMin"
        :form="form"
        :is-shield-option-disabled="isShieldOptionDisabled"
        :shield-options="shieldOptions"
      />

      <MagSection :form="form" :limits="magLimits" :mag-error-message="magErrorMessage" />
    </section>

    <section class="planner-column stats-column">
      <div class="planner-actions">
        <button type="button" class="planner-action planner-action--success" @click="optimizeCurrentClass">
          Optimiser
        </button>
        <button type="button" class="planner-action planner-action--danger" @click="resetCurrentClass">
          Reset
        </button>
      </div>

      <DamagePanel
        :average-damage-rows="averageDamageRows"
        :format-intermediate-value="formatIntermediateValue"
        :has-seeded-stats="hasSeededStats"
        :has-stats-for-level="hasStatsForLevel"
        :is-stats-loading="isStatsLoading"
        :level="form.level"
        :selected-class-label="selectedClass?.label"
        :stats-error-message="statsErrorMessage"
      />

      <StatsRadarChart
        :class-id="form.classId"
        :stat-rows="statRows"
      />

      <button type="button" class="planner-action planner-action--brand" @click="isStatsModalOpen = true">
        Plus de détails
      </button>
    </section>
  </section>

  <Modal v-model:open="isStatsModalOpen" kicker="Données calculées" title="Stats">
    <StatsPanel
      :has-seeded-stats="hasSeededStats"
      :has-stats-for-level="hasStatsForLevel"
      :is-stats-loading="isStatsLoading"
      :level="form.level"
      :selected-class-label="selectedClass?.label"
      :stat-rows="statRows"
      :stats-error-message="statsErrorMessage"
    />
  </Modal>
</template>

<script setup lang="ts">
import { CHARACTER_MAG_LIMITS, CHARACTER_WEAPON_ATTRIBUTE_LIMITS } from '@pso/shared'
import { ref } from 'vue'
import ArmorSection from '~/components/character-configurator/ArmorSection.vue'
import CharacterSection from '~/components/character-configurator/CharacterSection.vue'
import DamagePanel from '~/components/character-configurator/DamagePanel.vue'
import MagSection from '~/components/character-configurator/MagSection.vue'
import MaterialsSection from '~/components/character-configurator/MaterialsSection.vue'
import PartySection from '~/components/character-configurator/PartySection.vue'
import ShieldSection from '~/components/character-configurator/ShieldSection.vue'
import StatsPanel from '~/components/character-configurator/StatsPanel.vue'
import StatsRadarChart from '~/components/character-configurator/StatsRadarChart.vue'
import UnitsSection from '~/components/character-configurator/UnitsSection.vue'
import WeaponSection from '~/components/character-configurator/WeaponSection.vue'
import Modal from '~/components/ui/Modal.vue'
import { useCharacterConfiguratorState } from '~/composables/useCharacterConfiguratorState'
import { useCharacterPlannerCalculations } from '~/composables/useCharacterPlannerCalculations'
import { usePlannerFormatting } from '~/composables/usePlannerFormatting'

const state = useCharacterConfiguratorState()
const calculations = useCharacterPlannerCalculations(state)
const { formatIntermediateValue } = usePlannerFormatting()
const {
  areUnitSlotsDisabled,
  armorOptions,
  currentArmorDfpMax,
  currentArmorDfpMin,
  currentArmorEvpMax,
  currentArmorEvpMin,
  currentShieldDfpMax,
  currentShieldDfpMin,
  currentShieldEvpMax,
  currentShieldEvpMin,
  currentWeaponMaxGrind,
  difficultyOptions,
  errorMessage,
  form,
  groupedClassOptions,
  groupedUnitOptions,
  groupedWeaponOptions,
  hasSeededStats,
  hasStatsForLevel,
  isArmorOptionDisabled,
  isOnePersonMode,
  isShieldOptionDisabled,
  isUnitOptionDisabled,
  isMindMaterialDisabled,
  isStatsLoading,
  isTpMaterialDisabled,
  isWeaponOptionDisabled,
  isWeaponAttributeDisabled,
  levelMax,
  levelMin,
  magErrorMessage,
  materialsErrorMessage,
  regularMaterialLimit,
  regularMaterialStatDisabled,
  regularMaterialStatMaximums,
  selectedClass,
  selectedWeaponHasNoSpecial,
  selectedWeaponHasSelectableSpecial,
  selectedWeaponSpecialLabel,
  setActiveClass,
  resetCurrentClass,
  optimizeCurrentClass,
  shieldOptions,
  shiftaOptions,
  specialOptions,
  statsErrorMessage,
  weaponAttributeErrorMessage,
  weaponAttributeOptions,
  zalureOptions,
} = state
const { averageDamageRows, statRows } = calculations

const attributeMin = CHARACTER_WEAPON_ATTRIBUTE_LIMITS.min
const attributeMax = CHARACTER_WEAPON_ATTRIBUTE_LIMITS.max
const attributeStep = CHARACTER_WEAPON_ATTRIBUTE_LIMITS.step
const magLimits = CHARACTER_MAG_LIMITS

const isStatsModalOpen = ref(false)
</script>
