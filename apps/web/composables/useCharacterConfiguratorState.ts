import {
  CHARACTER_ARMOR_LIMITS,
  CHARACTER_ARMOR_OPTIONS,
  CHARACTER_DIFFICULTY_OPTIONS,
  CHARACTER_GAME_MODE_OPTIONS,
  CHARACTER_LEVEL_LIMITS,
  CHARACTER_MATERIAL_LIMITS,
  CHARACTER_MAG_LIMITS,
  CHARACTER_REGULAR_MATERIAL_KEYS,
  CHARACTER_SHIELD_LIMITS,
  CHARACTER_SHIELD_OPTIONS,
  CHARACTER_SPECIAL_OPTIONS,
  CHARACTER_SHIFTA_OPTIONS,
  CHARACTER_SPECIAL_IDS,
  CHARACTER_UNIT_GROUP_IDS,
  CHARACTER_UNIT_GROUP_LABELS,
  CHARACTER_UNIT_OPTIONS,
  CHARACTER_WEAPON_ATTRIBUTE_KEYS,
  CHARACTER_WEAPON_ATTRIBUTE_LIMITS,
  CHARACTER_WEAPON_ATTRIBUTE_OPTIONS,
  CHARACTER_WEAPON_OPTIONS,
  CHARACTER_ZALURE_OPTIONS,
  CHARACTER_CLASS_OPTIONS,
  DEFAULT_CHARACTER_CONFIG,
  DEFAULT_CHARACTER_WEAPON_ATTRIBUTES,
  INITIAL_CLASS_LEVEL_STATS,
  createBaseCharacterConfigForClass,
  createCharacterOptionsResponse,
  clampCharacterLevel,
  clampCharacterCappedStat,
  clampWeaponAttributeValue,
  countRegularMaterials,
  doesCharacterMeetRequirement,
  countModifiedWeaponAttributes,
  getCharacterSpecialIdFromWeaponSpecialLabel,
  getCharacterMaxStat,
  getEnemyDfpSummary,
  getCharacterUnitGroupId,
  getRegularMaterialLimit,
  isCharacterWeaponSpecialNone,
  isCharacterWeaponSpecialSelectable,
  isCharacterOptionCompatibleWithClass,
  isAndroidClassId,
  resolveConditionalEffects,
  sortCharacterWeaponOptions,
  snapWeaponAttributeValue,
  type CharacterArmorOption,
  type CharacterClassOption,
  type CharacterConfigInput,
  type CharacterDifficultyOption,
  type CharacterOptionsResponse,
  type CharacterRegularMaterialKey,
  type CharacterShieldOption,
  type CharacterShiftaOption,
  type CharacterSpecialOption,
  type CharacterUnitOption,
  type CharacterWeaponAttributeKey,
  type CharacterWeaponAttributeOption,
  type CharacterWeaponOption,
  type CharacterZalureOption,
  type ClassLevelStats,
} from '@pso/shared'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import {
  CHARACTER_CONFIG_URL_PARAM,
  createDefaultPerClassConfigs,
  decodeCharacterConfigState,
  encodeCharacterConfigState,
  pickClassConfig,
  type CharacterClassConfig,
  type CharacterPerClassConfigs,
} from './useCharacterConfigUrlCodec'

const fallbackOptions: CharacterOptionsResponse = {
  classes: [...CHARACTER_CLASS_OPTIONS],
  selectableClassIds: CHARACTER_CLASS_OPTIONS.map((entry) => entry.id),
  difficulties: [...CHARACTER_DIFFICULTY_OPTIONS],
  gameModes: [...CHARACTER_GAME_MODE_OPTIONS],
  attackTypes: [],
  specials: [...CHARACTER_SPECIAL_OPTIONS],
  shiftaLevels: [...CHARACTER_SHIFTA_OPTIONS],
  zalureLevels: [...CHARACTER_ZALURE_OPTIONS],
  weapons: sortCharacterWeaponOptions(CHARACTER_WEAPON_OPTIONS),
  armors: [...CHARACTER_ARMOR_OPTIONS],
  shields: [...CHARACTER_SHIELD_OPTIONS],
  units: [...CHARACTER_UNIT_OPTIONS],
  level: {
    min: CHARACTER_LEVEL_LIMITS.min,
    max: CHARACTER_LEVEL_LIMITS.max,
  },
}

export function useCharacterConfiguratorState() {
  const form = reactive<CharacterConfigInput>({
    ...DEFAULT_CHARACTER_CONFIG,
    materials: { ...DEFAULT_CHARACTER_CONFIG.materials },
    weaponAttributes: { ...DEFAULT_CHARACTER_CONFIG.weaponAttributes },
  })
  const options = ref<CharacterOptionsResponse>(fallbackOptions)
  const classLevelStats = ref<ClassLevelStats[]>([])
  const isLoading = ref(true)
  const isStatsLoading = ref(false)
  const errorMessage = ref('')
  const statsErrorMessage = ref('')
  const weaponAttributeErrorMessage = ref('')
  const magErrorMessage = ref('')
  const materialsErrorMessage = ref('')

  const classOptions = computed(() => options.value.classes)
  const difficultyOptions = computed<CharacterDifficultyOption[]>(() => options.value.difficulties ?? CHARACTER_DIFFICULTY_OPTIONS)
  const specialOptions = computed<CharacterSpecialOption[]>(() => options.value.specials ?? CHARACTER_SPECIAL_OPTIONS)
  const shiftaOptions = computed<CharacterShiftaOption[]>(() => options.value.shiftaLevels ?? CHARACTER_SHIFTA_OPTIONS)
  const zalureOptions = computed<CharacterZalureOption[]>(() => options.value.zalureLevels ?? CHARACTER_ZALURE_OPTIONS)
  const weaponOptions = computed(() => sortCharacterWeaponOptions(options.value.weapons ?? CHARACTER_WEAPON_OPTIONS))
  const groupedWeaponOptions = computed(() => {
    const groups: Array<{ label: string; options: CharacterWeaponOption[] }> = []

    for (const weapon of weaponOptions.value) {
      const lastGroup = groups.at(-1)

      if (!lastGroup || lastGroup.label !== weapon.type) {
        groups.push({
          label: weapon.type,
          options: [weapon],
        })
        continue
      }

      lastGroup.options.push(weapon)
    }

    return groups
  })
  const armorOptions = computed(() => options.value.armors ?? CHARACTER_ARMOR_OPTIONS)
  const shieldOptions = computed(() => options.value.shields ?? CHARACTER_SHIELD_OPTIONS)
  const unitOptions = computed<CharacterUnitOption[]>(() => options.value.units ?? CHARACTER_UNIT_OPTIONS)
  const groupedUnitOptions = computed(() => {
    return CHARACTER_UNIT_GROUP_IDS
      .map((groupId) => {
        const groupedOptions = unitOptions.value.filter((entry) => getCharacterUnitGroupId(entry) === groupId)

        return {
          label: CHARACTER_UNIT_GROUP_LABELS[groupId],
          options: groupedOptions,
        }
      })
      .filter((group) => group.options.length > 0)
  })
  const levelMin = computed(() => options.value.level.min)
  const levelMax = computed(() => options.value.level.max)
  const currentLevelStats = computed(() => classLevelStats.value.find((entry) => entry.level === form.level))
  const selectedClass = computed<CharacterClassOption | undefined>(() => {
    return classOptions.value.find((entry) => entry.id === form.classId)
  })
  const selectedWeapon = computed<CharacterWeaponOption | undefined>(() => {
    return weaponOptions.value.find((entry) => entry.id === form.weaponId)
  })
  const selectedArmor = computed<CharacterArmorOption | undefined>(() => {
    return armorOptions.value.find((entry) => entry.id === form.armorId)
  })
  const selectedShield = computed<CharacterShieldOption | undefined>(() => {
    return shieldOptions.value.find((entry) => entry.id === form.shieldId)
  })
  const selectedUnits = computed<CharacterUnitOption[]>(() => {
    const selectedUnitIds = [form.unitSlot1Id, form.unitSlot2Id, form.unitSlot3Id, form.unitSlot4Id]

    return selectedUnitIds
      .map((unitId) => unitOptions.value.find((entry) => entry.id === unitId))
      .filter((unit): unit is CharacterUnitOption => Boolean(unit && unit.id !== 'none'))
  })
  const groupedClassOptions = computed(() => {
    return [
      {
        label: 'Hunter',
        options: classOptions.value.filter((entry) => entry.label.startsWith('HU')),
      },
      {
        label: 'Ranger',
        options: classOptions.value.filter((entry) => entry.label.startsWith('RA')),
      },
      {
        label: 'Force',
        options: classOptions.value.filter((entry) => entry.label.startsWith('FO')),
      },
    ]
  })
  const selectedEnemyDfpSummary = computed(() => getEnemyDfpSummary(form.difficulty, form.gameMode))
  const selectedWeaponSpecialLabel = computed(() => selectedWeapon.value?.special ?? 'None')
  const selectedWeaponHasSelectableSpecial = computed(() => isCharacterWeaponSpecialSelectable(selectedWeaponSpecialLabel.value))
  const selectedWeaponHasNoSpecial = computed(() => isCharacterWeaponSpecialNone(selectedWeaponSpecialLabel.value))
  const currentWeaponMaxGrind = computed(() => selectedWeapon.value?.maxGrind ?? 0)
  const currentArmorDfpMin = computed(() => 0)
  const currentArmorDfpMax = computed(() => {
    const armor = selectedArmor.value
    if (!armor) return CHARACTER_ARMOR_LIMITS.dfpMax - CHARACTER_ARMOR_LIMITS.dfpMin
    return Math.max(0, armor.dfpMax - armor.dfpMin)
  })
  const currentArmorEvpMin = computed(() => 0)
  const currentArmorEvpMax = computed(() => {
    const armor = selectedArmor.value
    if (!armor) return CHARACTER_ARMOR_LIMITS.evpMax - CHARACTER_ARMOR_LIMITS.evpMin
    return Math.max(0, armor.evpMax - armor.evpMin)
  })
  const currentShieldDfpMin = computed(() => 0)
  const currentShieldDfpMax = computed(() => {
    const shield = selectedShield.value
    if (!shield) return CHARACTER_SHIELD_LIMITS.dfpMax - CHARACTER_SHIELD_LIMITS.dfpMin
    return Math.max(0, shield.dfpMax - shield.dfpMin)
  })
  const currentShieldEvpMin = computed(() => 0)
  const currentShieldEvpMax = computed(() => {
    const shield = selectedShield.value
    if (!shield) return CHARACTER_SHIELD_LIMITS.evpMax - CHARACTER_SHIELD_LIMITS.evpMin
    return Math.max(0, shield.evpMax - shield.evpMin)
  })
  const modifiedWeaponAttributeCount = computed(() => countModifiedWeaponAttributes(form.weaponAttributes))
  const currentWeaponRequirementStats = computed(() => {
    const rawAtp = (currentLevelStats.value?.atp ?? 0)
      + (form.materials.power * 2)
      + (form.magPow * 2)
      + (selectedArmor.value?.bonuses.atp ?? 0)
      + (selectedShield.value?.bonuses.atp ?? 0)
      + selectedUnits.value.reduce((total, unit) => total + unit.bonuses.atp, 0)
    const rawMst = (currentLevelStats.value?.mst ?? 0)
      + (form.materials.mind * 2)
      + form.magMind
      + (selectedArmor.value?.bonuses.mst ?? 0)
      + (selectedShield.value?.bonuses.mst ?? 0)
      + selectedUnits.value.reduce((total, unit) => total + unit.bonuses.mst, 0)

    return {
      atp: clampCharacterCappedStat(form.classId, 'atp', rawAtp),
      mst: clampCharacterCappedStat(form.classId, 'mst', rawMst),
    }
  })
  const areWeaponAttributesDisabled = computed(() => selectedWeapon.value?.id === 'none')
  const areUnitSlotsDisabled = computed(() => selectedArmor.value?.id === 'none')
  const hasStatsForLevel = computed(() => Boolean(currentLevelStats.value))
  const hasSeededStats = computed(() => classLevelStats.value.length > 0)
  const isTpMaterialDisabled = computed(() => isAndroidClassId(form.classId))
  const isMindMaterialDisabled = computed(() => isAndroidClassId(form.classId))
  const regularMaterialLimit = computed(() => getRegularMaterialLimit(form.classId))
  const regularMaterialStatMaximums = computed<Record<CharacterRegularMaterialKey, number>>(() => {
    const baseStats = currentLevelStats.value
    const conditionalContext = {
      weaponLabel: selectedWeapon.value?.label,
      weaponType: selectedWeapon.value?.type,
      weaponSpecial: selectedWeapon.value?.special,
      armorLabel: selectedArmor.value?.label,
      shieldLabel: selectedShield.value?.label,
      unitLabels: selectedUnits.value.map((unit) => unit.label),
      magLabel: undefined,
    }
    const unitBonuses = selectedUnits.value.reduce(
      (totals, unit) => {
        const conditional = resolveConditionalEffects(unit.conditionalEffects, conditionalContext).bonuses
        return {
          atp: totals.atp + unit.bonuses.atp + conditional.atp,
          dfp: totals.dfp + unit.bonuses.dfp + conditional.dfp,
          mst: totals.mst + unit.bonuses.mst + conditional.mst,
          evp: totals.evp + unit.bonuses.evp + conditional.evp,
          lck: totals.lck + unit.bonuses.lck + conditional.lck,
        }
      },
      { atp: 0, dfp: 0, mst: 0, evp: 0, lck: 0 },
    )

    const getStatMaximum = (stat: 'atp' | 'dfp' | 'mst' | 'evp' | 'lck', valueWithoutMaterials: number, pointsPerMaterial: number) => {
      const cap = getCharacterMaxStat(form.classId, stat)

      if (cap === undefined) {
        return regularMaterialLimit.value
      }

      return Math.max(0, Math.floor((cap - valueWithoutMaterials) / pointsPerMaterial))
    }

    return {
      power: getStatMaximum('atp', (baseStats?.atp ?? 0) + (form.magPow * 2) + unitBonuses.atp, 2),
      def: getStatMaximum('dfp', (baseStats?.dfp ?? 0) + form.magDef + unitBonuses.dfp, 2),
      mind: getStatMaximum('mst', (baseStats?.mst ?? 0) + form.magMind + unitBonuses.mst, 2),
      evade: getStatMaximum('evp', (baseStats?.evp ?? 0) + unitBonuses.evp, 2),
      luck: getStatMaximum('lck', (baseStats?.lck ?? 0) + unitBonuses.lck, 2),
    }
  })
  const regularMaterialStatDisabled = computed<Record<CharacterRegularMaterialKey, boolean>>(() => {
    const isAndroid = isAndroidClassId(form.classId)
    return {
      power: false,
      def: false,
      mind: isAndroid,
      evade: false,
      luck: false,
    }
  })
  const isOnePersonMode = computed({
    get: () => form.gameMode === 'oneperson',
    set: (value: boolean) => {
      form.gameMode = value ? 'oneperson' : 'normal'
    },
  })
  const weaponAttributeOptions: CharacterWeaponAttributeOption[] = [...CHARACTER_WEAPON_ATTRIBUTE_OPTIONS]

  let previousWeaponId = form.weaponId
  let previousArmorId = form.armorId
  let previousShieldId = form.shieldId
  let isApplyingRemoteConfig = false
  const perClassConfigs: CharacterPerClassConfigs = createDefaultPerClassConfigs()

  function captureCurrentClassConfig(): CharacterClassConfig {
    return pickClassConfig({
      classId: form.classId,
      level: form.level,
      difficulty: form.difficulty,
      gameMode: form.gameMode,
      attackType: form.attackType,
      shiftaLevel: form.shiftaLevel,
      zalureLevel: form.zalureLevel,
      weaponId: form.weaponId,
      specialId: form.specialId,
      grind: form.grind,
      weaponAttributes: { ...form.weaponAttributes },
      armorId: form.armorId,
      armorDfp: form.armorDfp,
      armorEvp: form.armorEvp,
      shieldId: form.shieldId,
      shieldDfp: form.shieldDfp,
      shieldEvp: form.shieldEvp,
      magDef: form.magDef,
      magPow: form.magPow,
      magDex: form.magDex,
      magMind: form.magMind,
      materials: { ...form.materials },
      unitSlot1Id: form.unitSlot1Id,
      unitSlot2Id: form.unitSlot2Id,
      unitSlot3Id: form.unitSlot3Id,
      unitSlot4Id: form.unitSlot4Id,
    })
  }

  function applyClassConfig(classConfig: CharacterClassConfig): void {
    form.level = classConfig.level
    form.attackType = classConfig.attackType
    form.weaponId = classConfig.weaponId
    form.specialId = classConfig.specialId
    form.grind = classConfig.grind
    form.weaponAttributes = { ...classConfig.weaponAttributes }
    form.armorId = classConfig.armorId
    form.armorDfp = classConfig.armorDfp
    form.armorEvp = classConfig.armorEvp
    form.shieldId = classConfig.shieldId
    form.shieldDfp = classConfig.shieldDfp
    form.shieldEvp = classConfig.shieldEvp
    form.magDef = classConfig.magDef
    form.magPow = classConfig.magPow
    form.magDex = classConfig.magDex
    form.magMind = classConfig.magMind
    form.materials = { ...classConfig.materials }
    form.unitSlot1Id = classConfig.unitSlot1Id
    form.unitSlot2Id = classConfig.unitSlot2Id
    form.unitSlot3Id = classConfig.unitSlot3Id
    form.unitSlot4Id = classConfig.unitSlot4Id
    previousWeaponId = classConfig.weaponId
    previousArmorId = classConfig.armorId
    previousShieldId = classConfig.shieldId
  }

  function getArmorBounds(armorId: CharacterConfigInput['armorId']) {
    const armor = armorOptions.value.find((entry) => entry.id === armorId)
    const dfpMin = armor?.dfpMin ?? CHARACTER_ARMOR_LIMITS.dfpMin
    const dfpMax = armor?.dfpMax ?? CHARACTER_ARMOR_LIMITS.dfpMax
    const evpMin = armor?.evpMin ?? CHARACTER_ARMOR_LIMITS.evpMin
    const evpMax = armor?.evpMax ?? CHARACTER_ARMOR_LIMITS.evpMax

    return {
      dfpMin,
      dfpMax,
      evpMin,
      evpMax,
      dfpVarianceMax: Math.max(0, dfpMax - dfpMin),
      evpVarianceMax: Math.max(0, evpMax - evpMin),
    }
  }

  function getShieldBounds(shieldId: CharacterConfigInput['shieldId']) {
    const shield = shieldOptions.value.find((entry) => entry.id === shieldId)
    const dfpMin = shield?.dfpMin ?? CHARACTER_SHIELD_LIMITS.dfpMin
    const dfpMax = shield?.dfpMax ?? CHARACTER_SHIELD_LIMITS.dfpMax
    const evpMin = shield?.evpMin ?? CHARACTER_SHIELD_LIMITS.evpMin
    const evpMax = shield?.evpMax ?? CHARACTER_SHIELD_LIMITS.evpMax

    return {
      dfpMin,
      dfpMax,
      evpMin,
      evpMax,
      dfpVarianceMax: Math.max(0, dfpMax - dfpMin),
      evpVarianceMax: Math.max(0, evpMax - evpMin),
    }
  }

  function isWeaponAttributeDisabled(key: CharacterWeaponAttributeKey): boolean {
    if (areWeaponAttributesDisabled.value && (key === 'enemy' || key === 'hit')) {
      return true
    }

    const currentValue = form.weaponAttributes[key]
    const defaultValue = DEFAULT_CHARACTER_WEAPON_ATTRIBUTES[key]

    return currentValue === defaultValue && modifiedWeaponAttributeCount.value >= CHARACTER_WEAPON_ATTRIBUTE_LIMITS.maxModified
  }

  function isWeaponOptionDisabled(option: CharacterWeaponOption): boolean {
    return !isCharacterOptionCompatibleWithClass(option.compatibleClasses, form.classId)
      || !doesCharacterMeetRequirement(option.requirement, currentWeaponRequirementStats.value)
  }

  function isArmorOptionDisabled(option: CharacterArmorOption): boolean {
    return !isCharacterOptionCompatibleWithClass(option.compatibleClasses, form.classId)
      || option.requiredLevel > form.level
  }

  function isShieldOptionDisabled(option: CharacterShieldOption): boolean {
    return !isCharacterOptionCompatibleWithClass(option.compatibleClasses, form.classId)
      || option.requiredLevel > form.level
  }

  function isUnitOptionDisabled(option: CharacterUnitOption): boolean {
    return !isCharacterOptionCompatibleWithClass(option.compatibleClasses, form.classId)
  }

  function sanitizeInteger(value: number, minimum: number, maximum: number): number {
    if (!Number.isFinite(value)) {
      return minimum
    }

    return Math.min(maximum, Math.max(minimum, Math.trunc(value)))
  }

  function applyBaseConfigForClass(classId: CharacterConfigInput['classId']): void {
    const baseConfig = createBaseCharacterConfigForClass(classId)
    applyClassConfig(pickClassConfig(baseConfig))
  }

  watch(
    () => form.level,
    (value) => {
      form.level = clampCharacterLevel(value)
    },
  )

  watch(
    () => [form.armorId, form.armorDfp, form.armorEvp] as const,
    ([armorId, armorDfp, armorEvp]) => {
      const { dfpVarianceMax, evpVarianceMax } = getArmorBounds(armorId)

      if (armorId !== previousArmorId) {
        previousArmorId = armorId
        form.armorDfp = 0
        form.armorEvp = 0
        return
      }

      form.armorDfp = Math.min(dfpVarianceMax, Math.max(0, Number.isFinite(armorDfp) ? armorDfp : 0))
      form.armorEvp = Math.min(evpVarianceMax, Math.max(0, Number.isFinite(armorEvp) ? armorEvp : 0))
    },
    { immediate: true },
  )

  watch(
    () => form.armorId,
    (armorId) => {
      if (armorId !== 'none') {
        return
      }

      form.unitSlot1Id = 'none'
      form.unitSlot2Id = 'none'
      form.unitSlot3Id = 'none'
      form.unitSlot4Id = 'none'
    },
    { immediate: true },
  )

  watch(
    () => [form.shieldId, form.shieldDfp, form.shieldEvp] as const,
    ([shieldId, shieldDfp, shieldEvp]) => {
      const { dfpVarianceMax, evpVarianceMax } = getShieldBounds(shieldId)

      if (shieldId !== previousShieldId) {
        previousShieldId = shieldId
        form.shieldDfp = 0
        form.shieldEvp = 0
        return
      }

      form.shieldDfp = Math.min(dfpVarianceMax, Math.max(0, Number.isFinite(shieldDfp) ? shieldDfp : 0))
      form.shieldEvp = Math.min(evpVarianceMax, Math.max(0, Number.isFinite(shieldEvp) ? shieldEvp : 0))
    },
    { immediate: true },
  )

  watch(
    () => [form.magDef, form.magPow, form.magDex, form.magMind] as const,
    (values, previousValues) => {
      const minimums = [
        CHARACTER_MAG_LIMITS.defMin,
        CHARACTER_MAG_LIMITS.powMin,
        CHARACTER_MAG_LIMITS.dexMin,
        CHARACTER_MAG_LIMITS.mindMin,
      ] as const
      const maximums = [
        CHARACTER_MAG_LIMITS.defMax,
        CHARACTER_MAG_LIMITS.powMax,
        CHARACTER_MAG_LIMITS.dexMax,
        CHARACTER_MAG_LIMITS.mindMax,
      ] as const
      const individuallySanitizedValues = values.map((value, index) => {
        if (!Number.isFinite(value)) {
          return minimums[index]
        }

        return Math.min(maximums[index], Math.max(minimums[index], Math.trunc(value)))
      })
      const sanitizedValues = individuallySanitizedValues.map((value, index, entries) => {
        const otherStatsTotal = entries.reduce((total, currentValue, currentIndex) => {
          return currentIndex === index ? total : total + currentValue
        }, 0)
        const dynamicMaximum = Math.max(minimums[index], CHARACTER_MAG_LIMITS.totalMax - otherStatsTotal)

        return Math.min(value, dynamicMaximum)
      })

      if (form.magDef !== sanitizedValues[0]) {
        form.magDef = sanitizedValues[0]
      }

      if (form.magPow !== sanitizedValues[1]) {
        form.magPow = sanitizedValues[1]
      }

      if (form.magDex !== sanitizedValues[2]) {
        form.magDex = sanitizedValues[2]
      }

      if (form.magMind !== sanitizedValues[3]) {
        form.magMind = sanitizedValues[3]
      }

      const total = sanitizedValues.reduce((sum, value) => sum + value, 0)

      if (total <= CHARACTER_MAG_LIMITS.totalMax) {
        magErrorMessage.value = ''
        return
      }

      const changedIndex = sanitizedValues.findIndex((value, index) => value !== previousValues?.[index])
      const adjustedValues = [...sanitizedValues]
      let remainingOverflow = total - CHARACTER_MAG_LIMITS.totalMax
      const indexesToAdjust = changedIndex >= 0 ? [changedIndex, 3, 2, 1, 0] : [3, 2, 1, 0]

      for (const index of indexesToAdjust) {
        if (remainingOverflow <= 0) {
          break
        }

        const availableReduction = adjustedValues[index] - minimums[index]

        if (availableReduction <= 0) {
          continue
        }

        const reduction = Math.min(availableReduction, remainingOverflow)
        adjustedValues[index] -= reduction
        remainingOverflow -= reduction
      }

      form.magDef = adjustedValues[0]
      form.magPow = adjustedValues[1]
      form.magDex = adjustedValues[2]
      form.magMind = adjustedValues[3]
      magErrorMessage.value = `Le total DEF + POW + DEX + MIND ne peut pas depasser ${CHARACTER_MAG_LIMITS.totalMax}.`
    },
    { immediate: true },
  )

  watch(
    () => ({
      classId: form.classId,
      hp: form.materials.hp,
      tp: form.materials.tp,
      regularValues: CHARACTER_REGULAR_MATERIAL_KEYS.map((key) => form.materials[key]),
    }),
    (values, previousValues) => {
      const { classId, hp: hpValue, tp: tpValue, regularValues: rawRegularValues } = values
      const hp = sanitizeInteger(hpValue, 0, CHARACTER_MATERIAL_LIMITS.hpMax)
      const tp = isAndroidClassId(classId) ? 0 : sanitizeInteger(tpValue, 0, CHARACTER_MATERIAL_LIMITS.tpMax)

      if (form.materials.hp !== hp) {
        form.materials.hp = hp
      }

      if (form.materials.tp !== tp) {
        form.materials.tp = tp
      }

      const limit = getRegularMaterialLimit(classId)
      const previousRegularValues = previousValues?.regularValues
      const sanitizedRegularValues = CHARACTER_REGULAR_MATERIAL_KEYS.map((key, index) => {
        if (key === 'mind' && isAndroidClassId(classId)) {
          return 0
        }

        return sanitizeInteger(rawRegularValues[index] ?? 0, 0, limit)
      })

      for (const [index, key] of CHARACTER_REGULAR_MATERIAL_KEYS.entries()) {
        if (form.materials[key] !== sanitizedRegularValues[index]) {
          form.materials[key] = sanitizedRegularValues[index]
        }
      }

      const regularMaterials = {
        power: sanitizedRegularValues[0],
        def: sanitizedRegularValues[1],
        mind: sanitizedRegularValues[2],
        evade: sanitizedRegularValues[3],
        luck: sanitizedRegularValues[4],
      }
      const total = countRegularMaterials(regularMaterials)

      if (total <= limit) {
        materialsErrorMessage.value = ''
        return
      }

      const changedIndex = sanitizedRegularValues.findIndex((value, index) => value !== previousRegularValues?.[index])
      const adjustedValues = [...sanitizedRegularValues]
      let remainingOverflow = total - limit
      const indexesToAdjust = changedIndex >= 0 ? [changedIndex, 4, 3, 2, 1, 0] : [4, 3, 2, 1, 0]

      for (const index of indexesToAdjust) {
        if (remainingOverflow <= 0) {
          break
        }

        const availableReduction = adjustedValues[index]

        if (availableReduction <= 0) {
          continue
        }

        const reduction = Math.min(availableReduction, remainingOverflow)
        adjustedValues[index] -= reduction
        remainingOverflow -= reduction
      }

      for (const [index, key] of CHARACTER_REGULAR_MATERIAL_KEYS.entries()) {
        if (form.materials[key] !== adjustedValues[index]) {
          form.materials[key] = adjustedValues[index]
        }
      }

      materialsErrorMessage.value = `Le total Power + Def + Mind + Evade + Luck ne peut pas depasser ${limit}.`
    },
    { immediate: true },
  )

  watch(
    () => CHARACTER_WEAPON_ATTRIBUTE_KEYS.map((key) => form.weaponAttributes[key]),
    (values, previousValues) => {
      const sanitizedValues = values.map((value) => snapWeaponAttributeValue(clampWeaponAttributeValue(value)))
      const changedIndex = sanitizedValues.findIndex((value, index) => value !== previousValues?.[index])

      for (const [index, key] of CHARACTER_WEAPON_ATTRIBUTE_KEYS.entries()) {
        if (form.weaponAttributes[key] !== sanitizedValues[index]) {
          form.weaponAttributes[key] = sanitizedValues[index]
        }
      }

      const modifiedCount = countModifiedWeaponAttributes(form.weaponAttributes)

      if (modifiedCount <= CHARACTER_WEAPON_ATTRIBUTE_LIMITS.maxModified) {
        weaponAttributeErrorMessage.value = ''
        return
      }

      if (changedIndex >= 0 && previousValues) {
        const changedKey = CHARACTER_WEAPON_ATTRIBUTE_KEYS[changedIndex]
        form.weaponAttributes[changedKey] = previousValues[changedIndex]
      }

      weaponAttributeErrorMessage.value = `Seulement ${CHARACTER_WEAPON_ATTRIBUTE_LIMITS.maxModified} attributs d'arme peuvent être modifiés en même temps.`
    },
  )

  watch(
    () => [form.weaponId, form.grind] as const,
    ([weaponId, grind]) => {
      const weapon = weaponOptions.value.find((entry) => entry.id === weaponId)
      const maxGrind = weapon?.maxGrind ?? 0

      if (weaponId !== previousWeaponId) {
        previousWeaponId = weaponId
        form.grind = 0
        form.weaponAttributes.enemy = 0
        form.weaponAttributes.hit = 0
        return
      }

      form.grind = Math.min(maxGrind, Math.max(0, Number.isFinite(grind) ? grind : 0))
    },
    { immediate: true },
  )

  watch(
    () => selectedWeaponSpecialLabel.value,
    (weaponSpecialLabel, previousWeaponSpecialLabel) => {
      if (isCharacterWeaponSpecialSelectable(weaponSpecialLabel)) {
        const isInitialOrRemoteLoad = previousWeaponSpecialLabel === undefined || isApplyingRemoteConfig
        const wasSelectable = previousWeaponSpecialLabel !== undefined
          && isCharacterWeaponSpecialSelectable(previousWeaponSpecialLabel)

        if (!isInitialOrRemoteLoad && !wasSelectable) {
          form.specialId = 'none'
          return
        }

        if (!CHARACTER_SPECIAL_IDS.includes(form.specialId)) {
          form.specialId = 'none'
        }
        return
      }

      if (isCharacterWeaponSpecialNone(weaponSpecialLabel)) {
        form.specialId = 'none'
        return
      }

      form.specialId = getCharacterSpecialIdFromWeaponSpecialLabel(weaponSpecialLabel) ?? 'none'
    },
    { immediate: true },
  )

  watch(
    () => [form.classId, form.weaponId, currentWeaponRequirementStats.value.atp, currentWeaponRequirementStats.value.mst] as const,
    ([, weaponId]) => {
      const weapon = weaponOptions.value.find((entry) => entry.id === weaponId)

      if (!weapon || !isWeaponOptionDisabled(weapon)) {
        return
      }

      form.weaponId = 'none'
    },
    { immediate: true },
  )

  watch(
    () => [form.classId, form.armorId, form.level] as const,
    ([, armorId]) => {
      const armor = armorOptions.value.find((entry) => entry.id === armorId)

      if (!armor || !isArmorOptionDisabled(armor)) {
        return
      }

      form.armorId = 'none'
    },
    { immediate: true },
  )

  watch(
    () => [form.classId, form.shieldId, form.level] as const,
    ([, shieldId]) => {
      const shield = shieldOptions.value.find((entry) => entry.id === shieldId)

      if (!shield || !isShieldOptionDisabled(shield)) {
        return
      }

      form.shieldId = 'none'
    },
    { immediate: true },
  )

  watch(
    () => [form.classId, form.unitSlot1Id, form.unitSlot2Id, form.unitSlot3Id, form.unitSlot4Id] as const,
    ([, unitSlot1Id, unitSlot2Id, unitSlot3Id, unitSlot4Id]) => {
      const selections = [
        ['unitSlot1Id', unitSlot1Id],
        ['unitSlot2Id', unitSlot2Id],
        ['unitSlot3Id', unitSlot3Id],
        ['unitSlot4Id', unitSlot4Id],
      ] as const

      for (const [field, unitId] of selections) {
        const unit = unitOptions.value.find((entry) => entry.id === unitId)

        if (!unit || !isUnitOptionDisabled(unit)) {
          continue
        }

        form[field] = 'none'
      }
    },
    { immediate: true },
  )

  watch(
    () => form.weaponId,
    (weaponId) => {
      if (weaponId !== 'none') {
        return
      }

      form.weaponAttributes.enemy = 0
      form.weaponAttributes.hit = 0
    },
    { immediate: true },
  )

  watch(
    () => form.classId,
    (classId) => {
      void loadClassStats(classId)
    },
    { immediate: true },
  )

  function setActiveClass(classId: CharacterConfigInput['classId']): void {
    if (classId === form.classId) {
      return
    }

    // 1. Snapshot the outgoing class config from the *current* form state
    //    BEFORE any other watcher mutates it as a side effect of changing classId.
    perClassConfigs[form.classId] = captureCurrentClassConfig()

    // 2. Atomically apply the incoming class config (defaults if untouched).
    const incoming = perClassConfigs[classId]
    isApplyingRemoteConfig = true
    form.classId = classId
    applyClassConfig(incoming)

    void nextTick().then(() => {
      isApplyingRemoteConfig = false
      syncConfigToUrl()
    })
  }

  async function loadConfigurator(): Promise<void> {
    isLoading.value = true
    errorMessage.value = ''
    isApplyingRemoteConfig = true

    try {
      options.value = createCharacterOptionsResponse()
      form.classId = DEFAULT_CHARACTER_CONFIG.classId
      form.level = clampCharacterLevel(DEFAULT_CHARACTER_CONFIG.level)
      form.difficulty = DEFAULT_CHARACTER_CONFIG.difficulty
      form.gameMode = DEFAULT_CHARACTER_CONFIG.gameMode
      form.attackType = DEFAULT_CHARACTER_CONFIG.attackType
      form.shiftaLevel = DEFAULT_CHARACTER_CONFIG.shiftaLevel
      form.zalureLevel = DEFAULT_CHARACTER_CONFIG.zalureLevel
      form.weaponId = DEFAULT_CHARACTER_CONFIG.weaponId
      form.specialId = DEFAULT_CHARACTER_CONFIG.specialId
      form.grind = DEFAULT_CHARACTER_CONFIG.grind
      form.armorId = DEFAULT_CHARACTER_CONFIG.armorId
      form.armorDfp = 0
      form.armorEvp = 0
      previousArmorId = form.armorId
      form.shieldId = DEFAULT_CHARACTER_CONFIG.shieldId
      form.shieldDfp = 0
      form.shieldEvp = 0
      previousShieldId = form.shieldId
      form.magDef = DEFAULT_CHARACTER_CONFIG.magDef
      form.magPow = DEFAULT_CHARACTER_CONFIG.magPow
      form.magDex = DEFAULT_CHARACTER_CONFIG.magDex
      form.magMind = DEFAULT_CHARACTER_CONFIG.magMind
      form.materials = { ...DEFAULT_CHARACTER_CONFIG.materials }
      form.unitSlot1Id = DEFAULT_CHARACTER_CONFIG.unitSlot1Id
      form.unitSlot2Id = DEFAULT_CHARACTER_CONFIG.unitSlot2Id
      form.unitSlot3Id = DEFAULT_CHARACTER_CONFIG.unitSlot3Id
      form.unitSlot4Id = DEFAULT_CHARACTER_CONFIG.unitSlot4Id
      form.weaponAttributes = { ...DEFAULT_CHARACTER_WEAPON_ATTRIBUTES }

      const sharedState = readStateFromUrl()

      if (sharedState) {
        applyCharacterConfigState(sharedState)
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "Impossible de joindre l'API pour charger le POC."
    } finally {
      isLoading.value = false
      await nextTick()
      isApplyingRemoteConfig = false
    }
  }

  function readStateFromUrl(): ReturnType<typeof decodeCharacterConfigState> {
    if (typeof window === 'undefined') {
      return null
    }

    const encoded = new URL(window.location.href).searchParams.get(CHARACTER_CONFIG_URL_PARAM)

    if (!encoded) {
      return null
    }

    return decodeCharacterConfigState(encoded)
  }

  function applyCharacterConfigState(state: NonNullable<ReturnType<typeof decodeCharacterConfigState>>): void {
    // Restore the per-class memory so subsequent class changes can rehydrate them.
    for (const [classId, classConfig] of Object.entries(state.perClass) as Array<[
      CharacterConfigInput['classId'],
      CharacterClassConfig,
    ]>) {
      perClassConfigs[classId] = {
        ...classConfig,
        weaponAttributes: { ...classConfig.weaponAttributes },
        materials: { ...classConfig.materials },
      }
    }

    form.shiftaLevel = state.shiftaLevel
    form.zalureLevel = state.zalureLevel
    form.difficulty = state.difficulty
    form.gameMode = state.gameMode
    form.classId = state.activeClassId
    applyClassConfig(perClassConfigs[state.activeClassId])
  }

  function syncConfigToUrl(): void {
    if (typeof window === 'undefined') {
      return
    }

    // Always include the active class' current snapshot in the per-class map.
    perClassConfigs[form.classId] = captureCurrentClassConfig()

    const url = new URL(window.location.href)
    const encoded = encodeCharacterConfigState({
      activeClassId: form.classId,
      shiftaLevel: form.shiftaLevel,
      zalureLevel: form.zalureLevel,
      difficulty: form.difficulty,
      gameMode: form.gameMode,
      perClass: perClassConfigs,
    })

    if (url.searchParams.get(CHARACTER_CONFIG_URL_PARAM) === encoded) {
      return
    }

    url.searchParams.set(CHARACTER_CONFIG_URL_PARAM, encoded)
    window.history.replaceState(window.history.state, '', url.toString())
  }

  async function loadClassStats(classId: CharacterConfigInput['classId']): Promise<void> {
    isStatsLoading.value = true
    statsErrorMessage.value = ''

    try {
      classLevelStats.value = INITIAL_CLASS_LEVEL_STATS.filter((entry) => entry.classId === classId)
    } catch (error) {
      classLevelStats.value = []
      statsErrorMessage.value = error instanceof Error ? error.message : 'Impossible de charger les stats du personnage.'
    } finally {
      isStatsLoading.value = false
    }
  }

  onMounted(() => {
    void loadConfigurator().then(() => {
      watch(
        () => form,
        () => {
          if (isApplyingRemoteConfig || isLoading.value) {
            return
          }

          syncConfigToUrl()
        },
        { deep: true },
      )
    })
  })

  return {
    areUnitSlotsDisabled,
    currentArmorDfpMax,
    currentArmorDfpMin,
    currentArmorEvpMax,
    currentArmorEvpMin,
    currentLevelStats,
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
    isLoading,
    isMindMaterialDisabled,
    isOnePersonMode,
    isArmorOptionDisabled,
    isShieldOptionDisabled,
    isUnitOptionDisabled,
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
    selectedArmor,
    selectedClass,
    selectedEnemyDfpSummary,
    selectedShield,
    selectedUnits,
    selectedWeapon,
    selectedWeaponHasNoSpecial,
    selectedWeaponHasSelectableSpecial,
    selectedWeaponSpecialLabel,
    setActiveClass,
    shieldOptions,
    shiftaOptions,
    specialOptions,
    statsErrorMessage,
    unitOptions,
    weaponAttributeErrorMessage,
    weaponAttributeOptions,
    weaponOptions,
    zalureOptions,
    armorOptions,
    classLevelStats,
  }
}

export type CharacterConfiguratorState = ReturnType<typeof useCharacterConfiguratorState>