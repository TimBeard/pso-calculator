<template>
  <PlannerCard panel-class="stats-radar-card" header-class="stats-radar-card__head" title="">
    <div class="stats-radar">
      <svg
        :viewBox="`0 0 ${size} ${size}`"
        class="stats-radar__svg"
        role="img"
        aria-label="Graphique radar des stats"
      >
        <g v-for="(ring, ringIndex) in gridRings" :key="`ring-${ringIndex}`">
          <polygon
            class="stats-radar__grid"
            :points="ring"
          />
        </g>

        <line
          v-for="(axis, axisIndex) in axisLines"
          :key="`axis-${axisIndex}`"
          class="stats-radar__axis"
          :x1="center"
          :y1="center"
          :x2="axis.x"
          :y2="axis.y"
        />

        <polygon
          v-if="maxPolygonPoints"
          class="stats-radar__polygon stats-radar__polygon--max"
          :points="maxPolygonPoints"
        />

        <polygon
          v-if="basePolygonPoints"
          class="stats-radar__polygon stats-radar__polygon--base"
          :points="basePolygonPoints"
        />

        <text
          v-for="(label, labelIndex) in labelPositions"
          :key="`label-${labelIndex}`"
          class="stats-radar__label"
          :x="label.x"
          :y="label.y"
          :text-anchor="label.anchor"
          dominant-baseline="middle"
        >
          {{ label.text }}
        </text>
      </svg>
    </div>
  </PlannerCard>
</template>

<script setup lang="ts">
import {
  CLASS_MAX_STATS as SHARED_CLASS_MAX_STATS,
  INITIAL_CLASS_LEVEL_STATS,
  type CharacterClassId,
} from '@pso/shared'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import PlannerCard from '~/components/ui/PlannerCard.vue'

interface StatRow {
  label: string
  base: number
  equipped: number
  showBase: boolean
}

const props = defineProps<{
  classId: string
  statRows: StatRow[]
}>()

const STATS = ['HP', 'TP', 'ATP', 'DFP', 'MST', 'ATA', 'EVP'] as const
type StatKey = typeof STATS[number]

const size = 320
const center = size / 2
const radius = 110
const ringCount = 4

const CLASS_LEVEL_200_STATS: Partial<Record<CharacterClassId, { hp: number; tp: number }>> = INITIAL_CLASS_LEVEL_STATS
  .filter((entry) => entry.level === 200)
  .reduce(
    (acc, entry) => {
      acc[entry.classId] = { hp: entry.hp, tp: entry.tp }
      return acc
    },
    {} as Partial<Record<CharacterClassId, { hp: number; tp: number }>>,
  )

// HP/TP "max" only counts the lvl 200 base stat plus the 250 points from 125 Materials.
// Units that boost HP/TP are intentionally excluded so the green polygon (with all
// Materials taken) reaches the red one without requiring HP/TP units to be equipped.
const MATERIAL_HP_TP_BONUS = 250

const CLASS_MAX_STATS: Record<CharacterClassId, Record<StatKey, number>> = SHARED_CLASS_MAX_STATS.reduce(
  (acc, entry) => {
    const levelStats = CLASS_LEVEL_200_STATS[entry.classId]
    acc[entry.classId] = {
      HP: levelStats ? levelStats.hp + MATERIAL_HP_TP_BONUS : entry.hp,
      TP: levelStats && entry.tp > 0 ? levelStats.tp + MATERIAL_HP_TP_BONUS : entry.tp,
      ATP: entry.atp,
      DFP: entry.dfp,
      MST: entry.mst,
      ATA: entry.ata,
      EVP: entry.evp,
    }
    return acc
  },
  {} as Record<CharacterClassId, Record<StatKey, number>>,
)

const AXIS_LIMITS: Record<StatKey, number> = STATS.reduce((acc, stat) => {
  acc[stat] = (Object.values(CLASS_MAX_STATS) as Record<StatKey, number>[])
    .reduce((max, entry) => Math.max(max, entry[stat]), 0)
  return acc
}, {} as Record<StatKey, number>)

const axisLimits = computed<Record<StatKey, number>>(() => AXIS_LIMITS)

const selectedClassMax = computed<Partial<Record<StatKey, number>>>(() => {
  return CLASS_MAX_STATS[props.classId as CharacterClassId] ?? {}
})

const baseValues = computed<Partial<Record<StatKey, number>>>(() => {
  const result: Partial<Record<StatKey, number>> = {}

  for (const stat of STATS) {
    const row = props.statRows.find((entry) => entry.label === stat)

    if (row) {
      result[stat] = row.base
    }
  }

  return result
})

const ROTATION_OFFSET = (-26 * Math.PI) / 180

const angles = computed(() => STATS.map((_, index) => -Math.PI / 2 + ROTATION_OFFSET + (index * 2 * Math.PI) / STATS.length))

const axisLines = computed(() => angles.value.map((angle) => ({
  x: center + radius * Math.cos(angle),
  y: center + radius * Math.sin(angle),
})))

const gridRings = computed(() => {
  const rings: string[] = []

  for (let ring = 1; ring <= ringCount; ring += 1) {
    const ratio = ring / ringCount
    const points = angles.value.map((angle) => {
      const x = center + radius * ratio * Math.cos(angle)
      const y = center + radius * ratio * Math.sin(angle)

      return `${x.toFixed(2)},${y.toFixed(2)}`
    })

    rings.push(points.join(' '))
  }

  return rings
})

function computeRatios(values: Partial<Record<StatKey, number>>): number[] | null {
  const limits = axisLimits.value
  const ratios: number[] = []

  for (let i = 0; i < STATS.length; i += 1) {
    const stat = STATS[i]
    const limit = limits[stat]
    const value = values[stat]

    if (limit === undefined || value === undefined || limit <= 0) {
      return null
    }

    ratios.push(Math.max(0, Math.min(1, value / limit)))
  }

  return ratios
}

function ratiosToPolygon(ratios: number[]): string {
  const points: string[] = []

  for (let i = 0; i < STATS.length; i += 1) {
    const ratio = ratios[i]
    const angle = angles.value[i]
    const x = center + radius * ratio * Math.cos(angle)
    const y = center + radius * ratio * Math.sin(angle)

    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }

  return points.join(' ')
}

const targetMaxRatios = computed(() => computeRatios(selectedClassMax.value))
const targetBaseRatios = computed(() => computeRatios(baseValues.value))

const displayedMaxRatios = ref<number[] | null>(targetMaxRatios.value ? [...targetMaxRatios.value] : null)
const displayedBaseRatios = ref<number[] | null>(targetBaseRatios.value ? [...targetBaseRatios.value] : null)

const ANIMATION_DURATION_MS = 350

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateRatios(
  displayedRef: typeof displayedMaxRatios,
  target: number[],
  rafHolder: { id: number | null },
) {
  if (rafHolder.id !== null) {
    cancelAnimationFrame(rafHolder.id)
    rafHolder.id = null
  }

  const start = displayedRef.value && displayedRef.value.length === target.length
    ? [...displayedRef.value]
    : target.map(() => 0)
  const startTime = performance.now()

  const step = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / ANIMATION_DURATION_MS)
    const eased = easeInOutCubic(progress)

    displayedRef.value = start.map((from, i) => from + (target[i] - from) * eased)

    if (progress < 1) {
      rafHolder.id = requestAnimationFrame(step)
    }
    else {
      rafHolder.id = null
    }
  }

  rafHolder.id = requestAnimationFrame(step)
}

const maxRaf = { id: null as number | null }
const baseRaf = { id: null as number | null }

watch(targetMaxRatios, (next) => {
  if (next) {
    animateRatios(displayedMaxRatios, next, maxRaf)
  }
  else {
    if (maxRaf.id !== null) {
      cancelAnimationFrame(maxRaf.id)
      maxRaf.id = null
    }
    displayedMaxRatios.value = null
  }
})

watch(targetBaseRatios, (next) => {
  if (next) {
    animateRatios(displayedBaseRatios, next, baseRaf)
  }
  else {
    if (baseRaf.id !== null) {
      cancelAnimationFrame(baseRaf.id)
      baseRaf.id = null
    }
    displayedBaseRatios.value = null
  }
})

onBeforeUnmount(() => {
  if (maxRaf.id !== null) {
    cancelAnimationFrame(maxRaf.id)
  }
  if (baseRaf.id !== null) {
    cancelAnimationFrame(baseRaf.id)
  }
})

const maxPolygonPoints = computed(() => (displayedMaxRatios.value ? ratiosToPolygon(displayedMaxRatios.value) : null))
const basePolygonPoints = computed(() => (displayedBaseRatios.value ? ratiosToPolygon(displayedBaseRatios.value) : null))

const labelPositions = computed(() => {
  const labelRadius = radius + 18

  return STATS.map((stat, index) => {
    const angle = angles.value[index]
    const x = center + labelRadius * Math.cos(angle)
    const y = center + labelRadius * Math.sin(angle)
    const cos = Math.cos(angle)

    let anchor: 'start' | 'middle' | 'end' = 'middle'

    if (cos > 0.2) {
      anchor = 'start'
    }
    else if (cos < -0.2) {
      anchor = 'end'
    }

    return { text: stat, x, y, anchor }
  })
})
</script>

<style scoped>
.stats-radar-card__head {
  display: none;
}

.stats-radar {
  display: flex;
  justify-content: center;
}

.stats-radar__svg {
  width: 100%;
  max-width: 360px;
  height: auto;
}

.stats-radar__grid {
  fill: none;
  stroke: rgba(60, 42, 20, 0.15);
  stroke-width: 1;
}

.stats-radar__axis {
  stroke: rgba(60, 42, 20, 0.2);
  stroke-width: 1;
}

.stats-radar__polygon {
  stroke-width: 2;
  stroke-linejoin: round;
}

.stats-radar__polygon--max {
  fill: none;
  stroke: var(--danger);
}

.stats-radar__polygon--base {
  fill: color-mix(in srgb, var(--success) 35%, transparent);
  stroke: var(--success);
}

.stats-radar__label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  fill: var(--ink, #3c2a14);
}
</style>
