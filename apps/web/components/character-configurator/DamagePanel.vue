<template>
  <PlannerCard kicker="Données calculées" title="Dégats moyens" panel-class="damage-panel">
    <ul v-if="hasStatsForLevel" class="intermediate-list" aria-label="Dégats moyens">
      <li v-for="row in averageDamageRows" :key="row.label" class="intermediate-row">
        <div>
          <p class="intermediate-row__label">{{ row.label }}</p>
        </div>

        <div class="intermediate-row__value">
          <OdometerNumber :value="formatIntermediateValue(row.value)" />
        </div>
      </li>
    </ul>

    <div v-else-if="isStatsLoading" class="stats-empty">
      Chargement des stats de progression…
    </div>

    <div v-else-if="statsErrorMessage" class="stats-empty stats-empty--error">
      {{ statsErrorMessage }}
    </div>

    <div v-else-if="hasSeededStats" class="stats-empty">
      Aucune stat n'est seedée pour {{ selectedClassLabel ?? 'cette classe' }} au niveau {{ level }}.
    </div>

    <div v-else class="stats-empty">
      Aucune progression n'est encore disponible en base pour cette classe.
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import OdometerNumber from '~/components/ui/OdometerNumber.vue'
import PlannerCard from '~/components/ui/PlannerCard.vue'

defineProps<{
  averageDamageRows: Array<{ label: string; value: number | string }>
  formatIntermediateValue: (value: number | string) => string
  hasSeededStats: boolean
  hasStatsForLevel: boolean
  isStatsLoading: boolean
  level: number
  selectedClassLabel?: string
  statsErrorMessage: string
}>()
</script>