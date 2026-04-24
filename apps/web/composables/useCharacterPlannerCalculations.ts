import {
  clampCharacterCappedStat,
  getCharacterMaxStat,
  calculateBaseAtp,
  calculateDamage,
  calculateEffectiveAtp,
  calculateEffectiveEnemyDfp,
  calculateEquipmentAtp,
  CHARACTER_SPECIAL_OPTIONS,
  getAttackModifier,
  getCharacterProfession,
  getMaxProfessionVariance,
  isCharacterWeaponSpecialSelectable,
  getProfessionVarianceRange,
  mergeResolvedConditionalEffects,
  resolveConditionalEffects,
  ZERO_RESOLVED_CHARACTER_CONDITIONAL_EFFECTS,
  ZERO_CHARACTER_STAT_BONUSES,
  type CharacterStatBonuses,
} from '@pso/shared'
import { computed } from 'vue'
import type { CharacterConfiguratorState } from './useCharacterConfiguratorState'

interface PlannerDisplayRow {
  label: string
  value: number | string
}

interface PlannerStatRow {
  label: string
  base: number
  equipped: number
  showBase: boolean
  isMaxed: boolean
  max: number | null
}

export function useCharacterPlannerCalculations(state: CharacterConfiguratorState) {
  const zeroBonuses: CharacterStatBonuses = { ...ZERO_CHARACTER_STAT_BONUSES }

  function sumBonuses(...entries: Array<Partial<CharacterStatBonuses> | undefined>): CharacterStatBonuses {
    return entries.reduce<CharacterStatBonuses>(
      (totals, entry) => {
        const current: CharacterStatBonuses = { ...zeroBonuses, ...(entry ?? {}) }

        return {
          hp: totals.hp + current.hp,
          tp: totals.tp + current.tp,
          atp: totals.atp + current.atp,
          dfp: totals.dfp + current.dfp,
          mst: totals.mst + current.mst,
          ata: totals.ata + current.ata,
          evp: totals.evp + current.evp,
          lck: totals.lck + current.lck,
          efr: totals.efr + current.efr,
          eic: totals.eic + current.eic,
          eth: totals.eth + current.eth,
          edk: totals.edk + current.edk,
          elt: totals.elt + current.elt,
        }
      },
      { ...zeroBonuses },
    )
  }

  const materialBonuses = computed(() => {
    return {
      hp: state.form.materials.hp * 2,
      tp: state.form.materials.tp * 2,
      atp: state.form.materials.power * 2,
      dfp: state.form.materials.def * 2,
      mst: state.form.materials.mind * 2,
      evp: state.form.materials.evade * 2,
      lck: state.form.materials.luck * 2,
    }
  })

  const conditionalContext = computed(() => {
    return {
      weaponLabel: state.selectedWeapon.value?.label,
      weaponType: state.selectedWeapon.value?.type,
      weaponSpecial: state.selectedWeapon.value?.special,
      armorLabel: state.selectedArmor.value?.label,
      shieldLabel: state.selectedShield.value?.label,
      unitLabels: state.selectedUnits.value.map((unit) => unit.label),
      magLabel: undefined,
    }
  })

  const selectedWeaponConditionalEffects = computed(() => {
    return resolveConditionalEffects(state.selectedWeapon.value?.conditionalEffects ?? [], conditionalContext.value)
  })

  const selectedArmorConditionalEffects = computed(() => {
    return resolveConditionalEffects(state.selectedArmor.value?.conditionalEffects ?? [], conditionalContext.value)
  })

  const selectedShieldConditionalEffects = computed(() => {
    return resolveConditionalEffects(state.selectedShield.value?.conditionalEffects ?? [], conditionalContext.value)
  })

  const selectedArmorBonuses = computed(() => {
    if (!state.selectedArmor.value || state.selectedArmor.value.id === 'none') {
      return { ...zeroBonuses }
    }

    return sumBonuses(state.selectedArmor.value.bonuses, selectedArmorConditionalEffects.value.bonuses, {
      dfp: state.selectedArmor.value.dfpMin + state.form.armorDfp,
      evp: state.selectedArmor.value.evpMin + state.form.armorEvp,
    })
  })
  const selectedShieldBonuses = computed(() => {
    if (!state.selectedShield.value || state.selectedShield.value.id === 'none') {
      return { ...zeroBonuses }
    }

    return sumBonuses(state.selectedShield.value.bonuses, selectedShieldConditionalEffects.value.bonuses, {
      dfp: state.selectedShield.value.dfpMin + state.form.shieldDfp,
      evp: state.selectedShield.value.evpMin + state.form.shieldEvp,
    })
  })
  const magBonuses = computed(() => {
    return {
      atp: state.form.magPow * 2,
      dfp: state.form.magDef,
      mst: state.form.magMind,
      ata: Math.floor(state.form.magDex / 2),
    }
  })
  const selectedWeaponStats = computed(() => {
    const grind = Math.min(state.currentWeaponMaxGrind.value, Math.max(0, state.form.grind))
    const hit = state.form.weaponAttributes.hit
    const weaponAtpMultiplierPercent = selectedWeaponConditionalEffects.value.weaponAtpMultiplierPercent
    const bonuses = sumBonuses(state.selectedWeapon.value?.bonuses, selectedWeaponConditionalEffects.value.bonuses)
    const weaponAtpMultiplier = 1 + (weaponAtpMultiplierPercent * 0.01)

    return {
      atpMin: ((state.selectedWeapon.value?.atpMin ?? 0) + (grind * 2)) * weaponAtpMultiplier,
      atpMax: ((state.selectedWeapon.value?.atpMax ?? 0) + (grind * 2)) * weaponAtpMultiplier,
      ata: (state.selectedWeapon.value?.ata ?? 0) + hit,
      bonuses,
      weaponAtpMultiplierPercent,
    }
  })
  const selectedUnitConditionalEffects = computed(() => {
    return state.selectedUnits.value.reduce(
      (resolved, unit) => mergeResolvedConditionalEffects(
        resolved,
        resolveConditionalEffects(unit.conditionalEffects, conditionalContext.value),
      ),
      { ...ZERO_RESOLVED_CHARACTER_CONDITIONAL_EFFECTS, bonuses: { ...zeroBonuses } },
    )
  })
  const unitBonuses = computed(() => {
    return state.selectedUnits.value.reduce(
      (totals, unit) => {
        return sumBonuses(
          totals,
          unit.bonuses,
          resolveConditionalEffects(unit.conditionalEffects, conditionalContext.value).bonuses,
        )
      },
      { ...zeroBonuses },
    )
  })
  const selectedEquipmentResistances = computed(() => {
    return sumBonuses(
      selectedWeaponStats.value.bonuses,
      selectedArmorBonuses.value,
      selectedShieldBonuses.value,
      unitBonuses.value,
    )
  })
  const baseCharacterStats = computed(() => {
    return {
      hp: (state.currentLevelStats.value?.hp ?? 0) + materialBonuses.value.hp + unitBonuses.value.hp,
      tp: (state.currentLevelStats.value?.tp ?? 0) + materialBonuses.value.tp + unitBonuses.value.tp,
      atp: clampCharacterCappedStat(
        state.form.classId,
        'atp',
        (state.currentLevelStats.value?.atp ?? 0) + magBonuses.value.atp + materialBonuses.value.atp + unitBonuses.value.atp,
      ),
      dfp: clampCharacterCappedStat(
        state.form.classId,
        'dfp',
        (state.currentLevelStats.value?.dfp ?? 0) + magBonuses.value.dfp + materialBonuses.value.dfp + unitBonuses.value.dfp,
      ),
      mst: clampCharacterCappedStat(
        state.form.classId,
        'mst',
        (state.currentLevelStats.value?.mst ?? 0) + magBonuses.value.mst + materialBonuses.value.mst + unitBonuses.value.mst,
      ),
      ata: clampCharacterCappedStat(
        state.form.classId,
        'ata',
        (state.currentLevelStats.value?.ata ?? 0) + magBonuses.value.ata + unitBonuses.value.ata,
      ),
      evp: clampCharacterCappedStat(
        state.form.classId,
        'evp',
        (state.currentLevelStats.value?.evp ?? 0) + materialBonuses.value.evp + unitBonuses.value.evp,
      ),
      lck: clampCharacterCappedStat(
        state.form.classId,
        'lck',
        (state.currentLevelStats.value?.lck ?? 0) + materialBonuses.value.lck + unitBonuses.value.lck,
      ),
    }
  })
  const externalEquipmentBonuses = computed(() => {
    return sumBonuses(
      selectedWeaponStats.value.bonuses,
      selectedArmorBonuses.value,
      selectedShieldBonuses.value,
      {
        atp: selectedWeaponStats.value.atpMax,
        ata: selectedWeaponStats.value.ata,
      },
    )
  })
  const equipmentAtp = computed(() => {
    return calculateEquipmentAtp({
      weaponMinAtp: state.selectedWeapon.value?.atpMin ?? 0,
      grind: Math.min(state.currentWeaponMaxGrind.value, Math.max(0, state.form.grind)),
      weaponAtpMultiplierPercent: selectedWeaponStats.value.weaponAtpMultiplierPercent,
      frameAtp: state.selectedArmor.value?.id === 'none' ? 0 : selectedArmorBonuses.value.atp,
      barrierAtp: selectedShieldBonuses.value.atp,
      unitAtp: 0,
      weaponAttributePercent: state.form.weaponAttributes.enemy,
    })
  })
  const professionVarianceRange = computed(() => getProfessionVarianceRange(state.form.classId))
  const baseAtp = computed(() => {
    return calculateBaseAtp({
      baseAtpMax: baseCharacterStats.value.atp,
      professionVarianceMax: getMaxProfessionVariance(state.form.classId),
    })
  })
  const weaponSpread = computed(() => {
    return Math.max(0, selectedWeaponStats.value.atpMax - selectedWeaponStats.value.atpMin)
  })
  const effectiveEnemyDfpAverage = computed(() => {
    return calculateEffectiveEnemyDfp({
      baseDfp: state.selectedEnemyDfpSummary.value.average,
      zalureReduction: state.zalureOptions.value.find((entry) => entry.level === state.form.zalureLevel)?.dfpReduction ?? 0,
    })
  })
  const effectiveAtpAverage = computed(() => {
    return calculateEffectiveAtp({
      baseAtp: baseAtp.value,
      weaponVariance: 0.5,
      weaponSpread: weaponSpread.value,
      shiftaAtpIncrease: state.shiftaOptions.value.find((entry) => entry.level === state.form.shiftaLevel)?.atpIncrease ?? 0,
      eqAtp: equipmentAtp.value,
      professionVariance: professionVarianceRange.value.average,
    })
  })
  const averageDamageRows = computed<PlannerDisplayRow[]>(() => {
    if (!state.currentLevelStats.value) {
      return []
    }

    const weapon = state.selectedWeapon.value
    const effectiveSpecialLabel = weapon && isCharacterWeaponSpecialSelectable(weapon.special)
      ? CHARACTER_SPECIAL_OPTIONS.find((option) => option.id === state.form.specialId)?.label
      : undefined

    return [
      {
        label: 'Normal',
        value: Math.max(Math.floor(calculateDamage({
          effectiveAtp: effectiveAtpAverage.value,
          effectiveDfp: effectiveEnemyDfpAverage.value,
          modifier: getAttackModifier('normal', weapon),
        })), 0),
      },
      {
        label: 'Heavy',
        value: Math.max(Math.floor(calculateDamage({
          effectiveAtp: effectiveAtpAverage.value,
          effectiveDfp: effectiveEnemyDfpAverage.value,
          modifier: getAttackModifier('heavy', weapon),
        })), 0),
      },
      {
        label: 'Special',
        value: Math.max(Math.floor(calculateDamage({
          effectiveAtp: effectiveAtpAverage.value,
          effectiveDfp: effectiveEnemyDfpAverage.value,
          modifier: getAttackModifier('special', weapon, effectiveSpecialLabel),
        })), 0),
      },
    ]
  })
  const statRows = computed<PlannerStatRow[]>(() => {
    if (!state.currentLevelStats.value) {
      return []
    }

    const classId = state.form.classId
    const cap = (stat: 'atp' | 'dfp' | 'mst' | 'ata' | 'evp' | 'lck'): number | null => {
      const max = getCharacterMaxStat(classId, stat)
      return max === undefined ? null : max
    }
    const isCappedAt = (stat: 'atp' | 'dfp' | 'mst' | 'ata' | 'evp' | 'lck', value: number): boolean => {
      const max = cap(stat)
      return max !== null && value >= max
    }

    const atpMax = cap('atp')
    const dfpMax = cap('dfp')
    const mstMax = cap('mst')
    const ataMax = cap('ata')
    const evpMax = cap('evp')
    const lckMax = cap('lck')

    return [
      {
        label: 'HP',
        base: baseCharacterStats.value.hp,
        equipped: baseCharacterStats.value.hp + externalEquipmentBonuses.value.hp,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'TP',
        base: baseCharacterStats.value.tp,
        equipped: baseCharacterStats.value.tp + externalEquipmentBonuses.value.tp,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'ATP',
        base: baseCharacterStats.value.atp,
        equipped: baseCharacterStats.value.atp + externalEquipmentBonuses.value.atp,
        showBase: true,
        isMaxed: isCappedAt('atp', baseCharacterStats.value.atp),
        max: atpMax,
      },
      {
        label: 'DFP',
        base: baseCharacterStats.value.dfp,
        equipped: baseCharacterStats.value.dfp + externalEquipmentBonuses.value.dfp,
        showBase: true,
        isMaxed: isCappedAt('dfp', baseCharacterStats.value.dfp),
        max: dfpMax,
      },
      {
        label: 'MST',
        base: baseCharacterStats.value.mst,
        equipped: baseCharacterStats.value.mst + externalEquipmentBonuses.value.mst,
        showBase: true,
        isMaxed: isCappedAt('mst', baseCharacterStats.value.mst),
        max: mstMax,
      },
      {
        label: 'ATA',
        base: baseCharacterStats.value.ata,
        equipped: baseCharacterStats.value.ata + externalEquipmentBonuses.value.ata,
        showBase: true,
        isMaxed: isCappedAt('ata', baseCharacterStats.value.ata),
        max: ataMax,
      },
      {
        label: 'EVP',
        base: baseCharacterStats.value.evp,
        equipped: baseCharacterStats.value.evp + externalEquipmentBonuses.value.evp,
        showBase: true,
        isMaxed: isCappedAt('evp', baseCharacterStats.value.evp),
        max: evpMax,
      },
      {
        label: 'LCK',
        base: baseCharacterStats.value.lck,
        equipped: Math.min(baseCharacterStats.value.lck + externalEquipmentBonuses.value.lck, 100),
        showBase: true,
        isMaxed: isCappedAt('lck', baseCharacterStats.value.lck),
        max: lckMax,
      },
      {
        label: 'EFR',
        base: 0,
        equipped: selectedEquipmentResistances.value.efr,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'EIC',
        base: 0,
        equipped: selectedEquipmentResistances.value.eic,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'ETH',
        base: 0,
        equipped: selectedEquipmentResistances.value.eth,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'EDK',
        base: 0,
        equipped: selectedEquipmentResistances.value.edk,
        showBase: false,
        isMaxed: false,
        max: null,
      },
      {
        label: 'ELT',
        base: 0,
        equipped: selectedEquipmentResistances.value.elt,
        showBase: false,
        isMaxed: false,
        max: null,
      },
    ]
  })
  const professionLabel = computed(() => {
    const profession = getCharacterProfession(state.form.classId)

    if (profession === 'hunter') {
      return 'Hunter'
    }

    if (profession === 'ranger') {
      return 'Ranger'
    }

    return 'Force'
  })

  return {
    averageDamageRows,
    professionLabel,
    statRows,
  }
}