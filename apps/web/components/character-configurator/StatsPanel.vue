<template>
  <PlannerCard kicker="Données calculées" title="Stats" panel-class="stats-panel" header-class="stats-panel__head">
    <div v-if="hasStatsForLevel" class="stats-block">
      <ul class="stats-list">
        <li v-for="row in statRows" :key="row.label" class="stats-row">
          <div class="stats-row__label">
            <span>{{ row.label }}</span>
            <span>:</span>
          </div>

          <div class="stats-row__value">{{ row.equipped + (row.showBase ? ` (` : '  ') }}</div>

          <div class="stats-row__base">
            <template v-if="row.showBase">
              <span :class="{ 'stats-row__base-value--maxed': row.max !== null && row.base >= row.max }">{{ row.base }}</span>)
            </template>
          </div>
        </li>
      </ul>
    </div>

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
import PlannerCard from '~/components/ui/PlannerCard.vue'

defineProps<{
  hasSeededStats: boolean
  hasStatsForLevel: boolean
  isStatsLoading: boolean
  level: number
  selectedClassLabel?: string
  statRows: Array<{ label: string; base: number; equipped: number; showBase: boolean; isMaxed: boolean; max: number | null }>
  statsErrorMessage: string
}>()
</script>