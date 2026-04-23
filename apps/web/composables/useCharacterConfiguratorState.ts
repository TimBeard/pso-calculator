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
  createCharacterOptionsResponse,
  FOMARL_OPTIMAL_CONFIG,
  FOMAR_OPTIMAL_CONFIG,
  FONEWEARL_OPTIMAL_CONFIG,
  FONEWM_OPTIMAL_CONFIG,
  HUCASEAL_OPTIMAL_CONFIG,
  HUCAST_OPTIMAL_CONFIG,
  HUNEWEARL_OPTIMAL_CONFIG,
  HUMAR_OPTIMAL_CONFIG,
  RACASEAL_OPTIMAL_CONFIG,
  RACAST_OPTIMAL_CONFIG,
  RAMARL_OPTIMAL_CONFIG,
  RAMAR_OPTIMAL_CONFIG,
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
  const currentArmorDfpMin = computed(() => selectedArmor.value?.dfpMin ?? CHARACTER_ARMOR_LIMITS.dfpMin)
  const currentArmorDfpMax = computed(() => selectedArmor.value?.dfpMax ?? CHARACTER_ARMOR_LIMITS.dfpMax)
  const currentArmorEvpMin = computed(() => selectedArmor.value?.evpMin ?? CHARACTER_ARMOR_LIMITS.evpMin)
  const currentArmorEvpMax = computed(() => selectedArmor.value?.evpMax ?? CHARACTER_ARMOR_LIMITS.evpMax)
  const currentShieldDfpMin = computed(() => selectedShield.value?.dfpMin ?? CHARACTER_SHIELD_LIMITS.dfpMin)
  const currentShieldDfpMax = computed(() => selectedShield.value?.dfpMax ?? CHARACTER_SHIELD_LIMITS.dfpMax)
  const currentShieldEvpMin = computed(() => selectedShield.value?.evpMin ?? CHARACTER_SHIELD_LIMITS.evpMin)
  const currentShieldEvpMax = computed(() => selectedShield.value?.evpMax ?? CHARACTER_SHIELD_LIMITS.evpMax)
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
    const unitBonuses = selectedUnits.value.reduce(
      (totals, unit) => {
        return {
          atp: totals.atp + unit.bonuses.atp,
          dfp: totals.dfp + unit.bonuses.dfp,
          mst: totals.mst + unit.bonuses.mst,
          evp: totals.evp + unit.bonuses.evp,
          lck: totals.lck + unit.bonuses.lck,
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

  function getArmorBounds(armorId: CharacterConfigInput['armorId']) {
    const armor = armorOptions.value.find((entry) => entry.id === armorId)

    return {
      dfpMin: armor?.dfpMin ?? CHARACTER_ARMOR_LIMITS.dfpMin,
      dfpMax: armor?.dfpMax ?? CHARACTER_ARMOR_LIMITS.dfpMax,
      evpMin: armor?.evpMin ?? CHARACTER_ARMOR_LIMITS.evpMin,
      evpMax: armor?.evpMax ?? CHARACTER_ARMOR_LIMITS.evpMax,
    }
  }

  function getShieldBounds(shieldId: CharacterConfigInput['shieldId']) {
    const shield = shieldOptions.value.find((entry) => entry.id === shieldId)

    return {
      dfpMin: shield?.dfpMin ?? CHARACTER_SHIELD_LIMITS.dfpMin,
      dfpMax: shield?.dfpMax ?? CHARACTER_SHIELD_LIMITS.dfpMax,
      evpMin: shield?.evpMin ?? CHARACTER_SHIELD_LIMITS.evpMin,
      evpMax: shield?.evpMax ?? CHARACTER_SHIELD_LIMITS.evpMax,
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
  }

  function isShieldOptionDisabled(option: CharacterShieldOption): boolean {
    return !isCharacterOptionCompatibleWithClass(option.compatibleClasses, form.classId)
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

  function applyHumarOptimizedConfig(): void {
    form.weaponId = HUMAR_OPTIMAL_CONFIG.weaponId
    form.grind = HUMAR_OPTIMAL_CONFIG.grind
    form.armorId = HUMAR_OPTIMAL_CONFIG.armorId
    form.armorDfp = HUMAR_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = HUMAR_OPTIMAL_CONFIG.armorEvp
    form.shieldId = HUMAR_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = HUMAR_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = HUMAR_OPTIMAL_CONFIG.shieldEvp
    form.magDef = HUMAR_OPTIMAL_CONFIG.magDef
    form.magPow = HUMAR_OPTIMAL_CONFIG.magPow
    form.magDex = HUMAR_OPTIMAL_CONFIG.magDex
    form.magMind = HUMAR_OPTIMAL_CONFIG.magMind
    form.materials = { ...HUMAR_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = HUMAR_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = HUMAR_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = HUMAR_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = HUMAR_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyHunewearlOptimizedConfig(): void {
    form.weaponId = HUNEWEARL_OPTIMAL_CONFIG.weaponId
    form.grind = HUNEWEARL_OPTIMAL_CONFIG.grind
    form.armorId = HUNEWEARL_OPTIMAL_CONFIG.armorId
    form.armorDfp = HUNEWEARL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = HUNEWEARL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = HUNEWEARL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = HUNEWEARL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = HUNEWEARL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = HUNEWEARL_OPTIMAL_CONFIG.magDef
    form.magPow = HUNEWEARL_OPTIMAL_CONFIG.magPow
    form.magDex = HUNEWEARL_OPTIMAL_CONFIG.magDex
    form.magMind = HUNEWEARL_OPTIMAL_CONFIG.magMind
    form.materials = { ...HUNEWEARL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = HUNEWEARL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = HUNEWEARL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = HUNEWEARL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = HUNEWEARL_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyHucastOptimizedConfig(): void {
    form.weaponId = HUCAST_OPTIMAL_CONFIG.weaponId
    form.grind = HUCAST_OPTIMAL_CONFIG.grind
    form.armorId = HUCAST_OPTIMAL_CONFIG.armorId
    form.armorDfp = HUCAST_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = HUCAST_OPTIMAL_CONFIG.armorEvp
    form.shieldId = HUCAST_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = HUCAST_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = HUCAST_OPTIMAL_CONFIG.shieldEvp
    form.magDef = HUCAST_OPTIMAL_CONFIG.magDef
    form.magPow = HUCAST_OPTIMAL_CONFIG.magPow
    form.magDex = HUCAST_OPTIMAL_CONFIG.magDex
    form.magMind = HUCAST_OPTIMAL_CONFIG.magMind
    form.materials = { ...HUCAST_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = HUCAST_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = HUCAST_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = HUCAST_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = HUCAST_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyHucasealOptimizedConfig(): void {
    form.weaponId = HUCASEAL_OPTIMAL_CONFIG.weaponId
    form.grind = HUCASEAL_OPTIMAL_CONFIG.grind
    form.armorId = HUCASEAL_OPTIMAL_CONFIG.armorId
    form.armorDfp = HUCASEAL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = HUCASEAL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = HUCASEAL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = HUCASEAL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = HUCASEAL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = HUCASEAL_OPTIMAL_CONFIG.magDef
    form.magPow = HUCASEAL_OPTIMAL_CONFIG.magPow
    form.magDex = HUCASEAL_OPTIMAL_CONFIG.magDex
    form.magMind = HUCASEAL_OPTIMAL_CONFIG.magMind
    form.materials = { ...HUCASEAL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = HUCASEAL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = HUCASEAL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = HUCASEAL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = HUCASEAL_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyRamarOptimizedConfig(): void {
    form.weaponId = RAMAR_OPTIMAL_CONFIG.weaponId
    form.grind = RAMAR_OPTIMAL_CONFIG.grind
    form.armorId = RAMAR_OPTIMAL_CONFIG.armorId
    form.armorDfp = RAMAR_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = RAMAR_OPTIMAL_CONFIG.armorEvp
    form.shieldId = RAMAR_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = RAMAR_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = RAMAR_OPTIMAL_CONFIG.shieldEvp
    form.magDef = RAMAR_OPTIMAL_CONFIG.magDef
    form.magPow = RAMAR_OPTIMAL_CONFIG.magPow
    form.magDex = RAMAR_OPTIMAL_CONFIG.magDex
    form.magMind = RAMAR_OPTIMAL_CONFIG.magMind
    form.materials = { ...RAMAR_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = RAMAR_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = RAMAR_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = RAMAR_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = RAMAR_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyRamarlOptimizedConfig(): void {
    form.weaponId = RAMARL_OPTIMAL_CONFIG.weaponId
    form.grind = RAMARL_OPTIMAL_CONFIG.grind
    form.armorId = RAMARL_OPTIMAL_CONFIG.armorId
    form.armorDfp = RAMARL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = RAMARL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = RAMARL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = RAMARL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = RAMARL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = RAMARL_OPTIMAL_CONFIG.magDef
    form.magPow = RAMARL_OPTIMAL_CONFIG.magPow
    form.magDex = RAMARL_OPTIMAL_CONFIG.magDex
    form.magMind = RAMARL_OPTIMAL_CONFIG.magMind
    form.materials = { ...RAMARL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = RAMARL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = RAMARL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = RAMARL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = RAMARL_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyRacastOptimizedConfig(): void {
    form.weaponId = RACAST_OPTIMAL_CONFIG.weaponId
    form.grind = RACAST_OPTIMAL_CONFIG.grind
    form.armorId = RACAST_OPTIMAL_CONFIG.armorId
    form.armorDfp = RACAST_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = RACAST_OPTIMAL_CONFIG.armorEvp
    form.shieldId = RACAST_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = RACAST_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = RACAST_OPTIMAL_CONFIG.shieldEvp
    form.magDef = RACAST_OPTIMAL_CONFIG.magDef
    form.magPow = RACAST_OPTIMAL_CONFIG.magPow
    form.magDex = RACAST_OPTIMAL_CONFIG.magDex
    form.magMind = RACAST_OPTIMAL_CONFIG.magMind
    form.materials = { ...RACAST_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = RACAST_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = RACAST_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = RACAST_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = RACAST_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyRacasealOptimizedConfig(): void {
    form.weaponId = RACASEAL_OPTIMAL_CONFIG.weaponId
    form.grind = RACASEAL_OPTIMAL_CONFIG.grind
    form.armorId = RACASEAL_OPTIMAL_CONFIG.armorId
    form.armorDfp = RACASEAL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = RACASEAL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = RACASEAL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = RACASEAL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = RACASEAL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = RACASEAL_OPTIMAL_CONFIG.magDef
    form.magPow = RACASEAL_OPTIMAL_CONFIG.magPow
    form.magDex = RACASEAL_OPTIMAL_CONFIG.magDex
    form.magMind = RACASEAL_OPTIMAL_CONFIG.magMind
    form.materials = { ...RACASEAL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = RACASEAL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = RACASEAL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = RACASEAL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = RACASEAL_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyFomarOptimizedConfig(): void {
    form.weaponId = FOMAR_OPTIMAL_CONFIG.weaponId
    form.grind = FOMAR_OPTIMAL_CONFIG.grind
    form.armorId = FOMAR_OPTIMAL_CONFIG.armorId
    form.armorDfp = FOMAR_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = FOMAR_OPTIMAL_CONFIG.armorEvp
    form.shieldId = FOMAR_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = FOMAR_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = FOMAR_OPTIMAL_CONFIG.shieldEvp
    form.magDef = FOMAR_OPTIMAL_CONFIG.magDef
    form.magPow = FOMAR_OPTIMAL_CONFIG.magPow
    form.magDex = FOMAR_OPTIMAL_CONFIG.magDex
    form.magMind = FOMAR_OPTIMAL_CONFIG.magMind
    form.materials = { ...FOMAR_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = FOMAR_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = FOMAR_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = FOMAR_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = FOMAR_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyFomarlOptimizedConfig(): void {
    form.weaponId = FOMARL_OPTIMAL_CONFIG.weaponId
    form.grind = FOMARL_OPTIMAL_CONFIG.grind
    form.armorId = FOMARL_OPTIMAL_CONFIG.armorId
    form.armorDfp = FOMARL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = FOMARL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = FOMARL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = FOMARL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = FOMARL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = FOMARL_OPTIMAL_CONFIG.magDef
    form.magPow = FOMARL_OPTIMAL_CONFIG.magPow
    form.magDex = FOMARL_OPTIMAL_CONFIG.magDex
    form.magMind = FOMARL_OPTIMAL_CONFIG.magMind
    form.materials = { ...FOMARL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = FOMARL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = FOMARL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = FOMARL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = FOMARL_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyFonewmOptimizedConfig(): void {
    form.weaponId = FONEWM_OPTIMAL_CONFIG.weaponId
    form.grind = FONEWM_OPTIMAL_CONFIG.grind
    form.armorId = FONEWM_OPTIMAL_CONFIG.armorId
    form.armorDfp = FONEWM_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = FONEWM_OPTIMAL_CONFIG.armorEvp
    form.shieldId = FONEWM_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = FONEWM_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = FONEWM_OPTIMAL_CONFIG.shieldEvp
    form.magDef = FONEWM_OPTIMAL_CONFIG.magDef
    form.magPow = FONEWM_OPTIMAL_CONFIG.magPow
    form.magDex = FONEWM_OPTIMAL_CONFIG.magDex
    form.magMind = FONEWM_OPTIMAL_CONFIG.magMind
    form.materials = { ...FONEWM_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = FONEWM_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = FONEWM_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = FONEWM_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = FONEWM_OPTIMAL_CONFIG.unitSlot4Id
  }

  function applyFonewearlOptimizedConfig(): void {
    form.weaponId = FONEWEARL_OPTIMAL_CONFIG.weaponId
    form.grind = FONEWEARL_OPTIMAL_CONFIG.grind
    form.armorId = FONEWEARL_OPTIMAL_CONFIG.armorId
    form.armorDfp = FONEWEARL_OPTIMAL_CONFIG.armorDfp
    form.armorEvp = FONEWEARL_OPTIMAL_CONFIG.armorEvp
    form.shieldId = FONEWEARL_OPTIMAL_CONFIG.shieldId
    form.shieldDfp = FONEWEARL_OPTIMAL_CONFIG.shieldDfp
    form.shieldEvp = FONEWEARL_OPTIMAL_CONFIG.shieldEvp
    form.magDef = FONEWEARL_OPTIMAL_CONFIG.magDef
    form.magPow = FONEWEARL_OPTIMAL_CONFIG.magPow
    form.magDex = FONEWEARL_OPTIMAL_CONFIG.magDex
    form.magMind = FONEWEARL_OPTIMAL_CONFIG.magMind
    form.materials = { ...FONEWEARL_OPTIMAL_CONFIG.materials }
    form.unitSlot1Id = FONEWEARL_OPTIMAL_CONFIG.unitSlot1Id
    form.unitSlot2Id = FONEWEARL_OPTIMAL_CONFIG.unitSlot2Id
    form.unitSlot3Id = FONEWEARL_OPTIMAL_CONFIG.unitSlot3Id
    form.unitSlot4Id = FONEWEARL_OPTIMAL_CONFIG.unitSlot4Id
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
      const { dfpMin, dfpMax, evpMin, evpMax } = getArmorBounds(armorId)

      if (armorId !== previousArmorId) {
        previousArmorId = armorId
        form.armorDfp = dfpMax
        form.armorEvp = evpMax
        return
      }

      form.armorDfp = Math.min(dfpMax, Math.max(dfpMin, Number.isFinite(armorDfp) ? armorDfp : dfpMin))
      form.armorEvp = Math.min(evpMax, Math.max(evpMin, Number.isFinite(armorEvp) ? armorEvp : evpMin))
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
      const { dfpMin, dfpMax, evpMin, evpMax } = getShieldBounds(shieldId)

      if (shieldId !== previousShieldId) {
        previousShieldId = shieldId
        form.shieldDfp = dfpMax
        form.shieldEvp = evpMax
        return
      }

      form.shieldDfp = Math.min(dfpMax, Math.max(dfpMin, Number.isFinite(shieldDfp) ? shieldDfp : dfpMin))
      form.shieldEvp = Math.min(evpMax, Math.max(evpMin, Number.isFinite(shieldEvp) ? shieldEvp : evpMin))
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
        form.grind = maxGrind
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
    () => [form.classId, form.armorId] as const,
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
    () => [form.classId, form.shieldId] as const,
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
    (classId, previousClassId) => {
      if (classId === 'humar' && previousClassId !== undefined && previousClassId !== classId) {
        applyHumarOptimizedConfig()
      }

      if (classId === 'hunewearl' && previousClassId !== undefined && previousClassId !== classId) {
        applyHunewearlOptimizedConfig()
      }

      if (classId === 'hucast' && previousClassId !== undefined && previousClassId !== classId) {
        applyHucastOptimizedConfig()
      }

      if (classId === 'hucaseal' && previousClassId !== undefined && previousClassId !== classId) {
        applyHucasealOptimizedConfig()
      }

      if (classId === 'ramar' && previousClassId !== undefined && previousClassId !== classId) {
        applyRamarOptimizedConfig()
      }

      if (classId === 'ramarl' && previousClassId !== undefined && previousClassId !== classId) {
        applyRamarlOptimizedConfig()
      }

      if (classId === 'racast' && previousClassId !== undefined && previousClassId !== classId) {
        applyRacastOptimizedConfig()
      }

      if (classId === 'racaseal' && previousClassId !== undefined && previousClassId !== classId) {
        applyRacasealOptimizedConfig()
      }

      if (classId === 'fomar' && previousClassId !== undefined && previousClassId !== classId) {
        applyFomarOptimizedConfig()
      }

      if (classId === 'fomarl' && previousClassId !== undefined && previousClassId !== classId) {
        applyFomarlOptimizedConfig()
      }

      if (classId === 'fonewm' && previousClassId !== undefined && previousClassId !== classId) {
        applyFonewmOptimizedConfig()
      }

      if (classId === 'fonewearl' && previousClassId !== undefined && previousClassId !== classId) {
        applyFonewearlOptimizedConfig()
      }

      void loadClassStats(classId)
    },
    { immediate: true },
  )

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
      const armorBounds = getArmorBounds(form.armorId)
      form.armorDfp = armorBounds.dfpMax
      form.armorEvp = armorBounds.evpMax
      previousArmorId = form.armorId
      form.shieldId = DEFAULT_CHARACTER_CONFIG.shieldId
      const shieldBounds = getShieldBounds(form.shieldId)
      form.shieldDfp = shieldBounds.dfpMax
      form.shieldEvp = shieldBounds.evpMax
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

      if (form.classId === 'humar') {
        applyHumarOptimizedConfig()
      }

      if (form.classId === 'hunewearl') {
        applyHunewearlOptimizedConfig()
      }

      if (form.classId === 'hucast') {
        applyHucastOptimizedConfig()
      }

      if (form.classId === 'hucaseal') {
        applyHucasealOptimizedConfig()
      }

      if (form.classId === 'ramar') {
        applyRamarOptimizedConfig()
      }

      if (form.classId === 'ramarl') {
        applyRamarlOptimizedConfig()
      }

      if (form.classId === 'racast') {
        applyRacastOptimizedConfig()
      }

      if (form.classId === 'racaseal') {
        applyRacasealOptimizedConfig()
      }

      if (form.classId === 'fomar') {
        applyFomarOptimizedConfig()
      }

      if (form.classId === 'fomarl') {
        applyFomarlOptimizedConfig()
      }

      if (form.classId === 'fonewm') {
        applyFonewmOptimizedConfig()
      }

      if (form.classId === 'fonewearl') {
        applyFonewearlOptimizedConfig()
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "Impossible de joindre l'API pour charger le POC."
    } finally {
      isLoading.value = false
      await nextTick()
      isApplyingRemoteConfig = false
    }
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
    void loadConfigurator()
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