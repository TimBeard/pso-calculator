import { z } from 'zod'

import { ADDITIONAL_CHARACTER_ARMOR_OPTIONS } from './additionalArmorCatalog.js'
import { ADDITIONAL_CHARACTER_SHIELD_OPTIONS } from './additionalShieldCatalog.js'
import { ADDITIONAL_CHARACTER_UNIT_OPTIONS } from './additionalUnitCatalog.js'
import { ADDITIONAL_CHARACTER_WEAPON_OPTIONS } from './additionalWeaponCatalog.js'

export const CHARACTER_CLASS_IDS = [
  'humar',
  'hunewearl',
  'hucast',
  'hucaseal',
  'ramar',
  'ramarl',
  'racast',
  'racaseal',
  'fomar',
  'fomarl',
  'fonewm',
  'fonewearl',
] as const

export type CharacterClassId = (typeof CHARACTER_CLASS_IDS)[number]

export const CHARACTER_ANDROID_CLASS_IDS = ['hucast', 'hucaseal', 'racast', 'racaseal'] as const satisfies readonly CharacterClassId[]

export const CHARACTER_HIGH_MATERIAL_CAP_CLASS_IDS = ['humar', 'ramar', 'ramarl', 'fomar', 'fomarl'] as const satisfies readonly CharacterClassId[]

export const CHARACTER_WEAPON_IDS = [
  'none',
  'saber',
  'brand',
  'buster',
  'pallasch',
  'gladius',
  'battledore',
  'great_bouquet',
  'flower_bouquet',
  'racket',
  'fifth_anniv_blade',
  'jitte',
  'dbs_saber',
  'kaladbolg',
  'durandal',
  'akikos_wok',
  'dbs_saber_3062',
  'dbs_saber_3064',
  'dbs_saber_3067',
  'dbs_saber_3069_torato',
  'dbs_saber_3069_chris',
  'dbs_saber_3070',
  'dbs_saber_3073',
  'dbs_saber_3075',
  'dbs_saber_3077',
  'delsabers_buster',
  'sting_tip',
  'commander_blade',
  'kusanagi',
  'red_saber',
  'elysion',
  'ancient_saber',
  'flamberge',
  'lame_dargent',
  'lavis_cannon',
  'evil_curst',
  'excalibur',
  'galatine',
  'type_sa_saber',
  'es_saber',
  'es_axe',
  'dagger',
  'knife',
  'blade',
  'edge',
  'ripper',
  'blade_dance',
  'bloody_art',
  'wok_of_akikos_shop',
  'cross_scar',
  's_beats_blade',
  's_berills_hands_0',
  'twin_chakram',
  'zero_divide',
  'p_arms_blade',
  'red_dagger',
  's_reds_blade',
  'flapjack_flapper',
  's_berills_hands_1',
  'two_kamui',
  'lavis_blade',
  'daylight_scar',
  'type_bl_blade',
  'es_blade',
  'partisan',
  'halbert',
  'glaive',
  'berdys',
  'gungnir',
  'butterfly_net',
  'synthesizer',
  'tree_clippers',
  'soul_eater',
  'nice_shot',
  'bamboo_spear',
  'chameleon_scythe',
  'getsugasan',
  'brionac',
  'vjaya',
  'gae_bolg',
  'tyrells_parasol',
  'madams_umbrella',
  'maguwa',
  'plantain_huge_fan',
  'red_partisan',
  'berdysh',
  'snake_spire',
  'imperial_pick',
  'asteron_belt',
  'yunchang',
  'soul_banish',
  'madams_parasol',
  'type_ha_halbert',
  'type_ha_rod',
  'es_partisan',
  'es_scythe',
  'slicer',
  'spinner',
  'cutter',
  'sawcer',
  'diska',
  'slicer_of_assassin',
  'diska_of_liberator',
  'diska_of_braveman',
  'rappys_fan',
  'flight_fan',
  'izmaela',
  'slicer_of_fanatic',
  'red_slicer',
  'flight_cutter',
  'rainbow_baton',
  'type_sl_slicer',
  'type_sl_saber',
  'type_sl_claw',
  'type_sl_katana',
  'es_slicer',
  'es_j_cutter',
  'sword',
  'gigush',
  'breaker',
  'claymore',
  'calibur',
  'akikos_cleaver',
  'hammer',
  'daisy_chain',
  'crazy_tune',
  'huge_battle_fan',
  'flowens_sword',
  'last_survivor',
  'dragon_slayer',
  'flowens_sword_3060',
  'flowens_sword_3064',
  'flowens_sword_3067',
  'flowens_sword_3073',
  'flowens_sword_3077',
  'flowens_sword_3079',
  'flowens_sword_3082',
  'flowens_sword_3083',
  'flowens_sword_3084',
  'victor_axe',
  'red_sword',
  'chain_sawd',
  'zanba',
  'sealed_j_sword',
  'laconium_axe',
  'dark_flow',
  'tsumikiri_j_sword',
  'type_sw_sword',
  'type_sw_j_sword',
  'type_sw_slicer',
  'es_sword',
] as const

export type CharacterWeaponId = string

export const CHARACTER_SPECIAL_IDS = [
  'none',
  'draw',
  'drain',
  'fill',
  'gush',
  'heart',
  'mind',
  'soul',
  'geist',
  'masters',
  'lords',
  'kings',
  'devils',
  'demons',
  'charge',
  'spirit',
  'berserk',
  'ice',
  'frost',
  'freeze',
  'blizzard',
  'bind',
  'hold',
  'seize',
  'arrest',
  'heat',
  'fire',
  'flame',
  'burning',
  'shock',
  'thunder',
  'storm',
  'tempest',
  'dim',
  'shadow',
  'dark',
  'hell',
  'panic',
  'riot',
  'havoc',
  'chaos',
] as const

export type CharacterSpecialId = (typeof CHARACTER_SPECIAL_IDS)[number]

export type CharacterArmorId = string

export type CharacterShieldId = string

export type CharacterUnitId = string

export const CHARACTER_UNIT_GROUP_IDS = [
  'none',
  'hp',
  'tp',
  'power',
  'body',
  'mind',
  'arm',
  'legs',
  'luck',
  'ability',
  'fire',
  'cold',
  'shock',
  'dark',
  'light',
  'resist',
  'hpRestoration',
  'tpRestoration',
  'pbGeneration',
  'battle',
  'technique',
  'cure',
  'miscellaneous',
] as const

export type CharacterUnitGroupId = (typeof CHARACTER_UNIT_GROUP_IDS)[number]

export const CHARACTER_UNIT_GROUP_LABELS: Record<CharacterUnitGroupId, string> = {
  none: 'Aucun',
  hp: 'HP',
  tp: 'TP',
  power: 'Power',
  body: 'Body',
  mind: 'Mind',
  arm: 'Arm',
  legs: 'Legs',
  luck: 'Luck',
  ability: 'Ability',
  fire: 'Fire',
  cold: 'Cold',
  shock: 'Shock',
  dark: 'Dark',
  light: 'Light',
  resist: 'Resist',
  hpRestoration: 'HP Restoration',
  tpRestoration: 'TP Restoration',
  pbGeneration: 'PB Generation',
  battle: 'Battle',
  technique: 'Technique',
  cure: 'Cure',
  miscellaneous: 'Miscellaneous',
}

export const CHARACTER_SHIFTA_LEVELS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  33,
  41,
  61,
  81,
] as const

export type CharacterShiftaLevel = (typeof CHARACTER_SHIFTA_LEVELS)[number]

export const CHARACTER_ZALURE_LEVELS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
] as const

export type CharacterZalureLevel = (typeof CHARACTER_ZALURE_LEVELS)[number]

export const CHARACTER_DIFFICULTY_IDS = ['normal', 'hard', 'veryhard', 'ultimate'] as const

export type CharacterDifficultyId = (typeof CHARACTER_DIFFICULTY_IDS)[number]

export const CHARACTER_GAME_MODE_IDS = ['normal', 'oneperson'] as const

export type CharacterGameModeId = (typeof CHARACTER_GAME_MODE_IDS)[number]

export const CHARACTER_ATTACK_TYPE_IDS = ['normal', 'heavy', 'special'] as const

export type CharacterAttackTypeId = (typeof CHARACTER_ATTACK_TYPE_IDS)[number]

export const CHARACTER_WEAPON_ATTRIBUTE_KEYS = ['enemy', 'hit'] as const

export const CHARACTER_RANGED_WEAPON_TYPES = ['Handgun', 'Rifle', 'Mechgun', 'Shot', 'Launcher'] as const

export const CHARACTER_STATUS_SPECIAL_WEAPON_LABELS = ['Chaos', 'Blizzard', 'Blizzard (Reduced)', 'Arrest'] as const

export const CHARACTER_INSTANT_KILL_SPECIAL_WEAPON_LABELS = ['Hell', 'Hell (Reduced)', 'Dark', 'Dark (Reduced)'] as const

export type CharacterWeaponAttributeKey = (typeof CHARACTER_WEAPON_ATTRIBUTE_KEYS)[number]

export interface CharacterWeaponAttributes {
  enemy: number
  hit: number
}

export interface CharacterWeaponAttributeOption {
  key: CharacterWeaponAttributeKey
  label: string
  defaultValue: number
}

export const CHARACTER_REGULAR_MATERIAL_KEYS = ['power', 'def', 'mind', 'evade', 'luck'] as const

export type CharacterRegularMaterialKey = (typeof CHARACTER_REGULAR_MATERIAL_KEYS)[number]

export interface CharacterMaterials {
  hp: number
  tp: number
  power: number
  def: number
  mind: number
  evade: number
  luck: number
}

export interface CharacterStatBonuses {
  hp: number
  tp: number
  atp: number
  dfp: number
  mst: number
  ata: number
  evp: number
  lck: number
  efr: number
  eic: number
  eth: number
  edk: number
  elt: number
}

export const CHARACTER_CAPPED_STAT_KEYS = ['atp', 'dfp', 'mst', 'ata', 'evp', 'lck'] as const

export type CharacterCappedStatKey = (typeof CHARACTER_CAPPED_STAT_KEYS)[number]

export type CharacterMaxStats = Partial<Record<CharacterCappedStatKey, number>>

export type CharacterCompatibleClasses = 'all' | readonly CharacterClassId[]

export interface CharacterEquipmentConditionRequirements {
  weaponLabels?: string[]
  weaponTypes?: string[]
  weaponSpecials?: string[]
  armorLabels?: string[]
  shieldLabels?: string[]
  unitLabels?: string[]
  magLabels?: string[]
}

export interface CharacterConditionalEffect {
  requirements: CharacterEquipmentConditionRequirements
  bonuses: CharacterStatBonuses
  weaponAtpMultiplierPercent: number
  attackSpeedPercent?: number
  techniqueLevelBonus?: number
  tpCostModifierPercent?: number
  statusSpecialSuccessRatePercent?: number
  instantKillSpecialSuccessRatePercent?: number
  ignoresRangedAccuracyPenalty?: boolean
  reducesTechniqueChargeTime?: boolean
  reducesTechniqueCastTime?: boolean
}

export interface CharacterEquipmentConditionContext {
  weaponLabel?: string
  weaponType?: string
  weaponSpecial?: string
  armorLabel?: string
  shieldLabel?: string
  unitLabels: string[]
  magLabel?: string
}

export interface ResolvedCharacterConditionalEffects {
  bonuses: CharacterStatBonuses
  weaponAtpMultiplierPercent: number
  attackSpeedPercent: number
  techniqueLevelBonus: number
  tpCostModifierPercent: number
  statusSpecialSuccessRatePercent: number
  instantKillSpecialSuccessRatePercent: number
  ignoresRangedAccuracyPenalty: boolean
  reducesTechniqueChargeTime: boolean
  reducesTechniqueCastTime: boolean
}

export type CharacterRequirementStat = 'none' | 'atp' | 'mst'

export interface ParsedCharacterRequirement {
  stat: CharacterRequirementStat
  value: number
}

export interface CharacterRequirementStats {
  atp: number
  mst: number
}

export const ZERO_CHARACTER_STAT_BONUSES: CharacterStatBonuses = {
  hp: 0,
  tp: 0,
  atp: 0,
  dfp: 0,
  mst: 0,
  ata: 0,
  evp: 0,
  lck: 0,
  efr: 0,
  eic: 0,
  eth: 0,
  edk: 0,
  elt: 0,
}

export const ZERO_RESOLVED_CHARACTER_CONDITIONAL_EFFECTS: ResolvedCharacterConditionalEffects = {
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  weaponAtpMultiplierPercent: 0,
  attackSpeedPercent: 0,
  techniqueLevelBonus: 0,
  tpCostModifierPercent: 0,
  statusSpecialSuccessRatePercent: 0,
  instantKillSpecialSuccessRatePercent: 0,
  ignoresRangedAccuracyPenalty: false,
  reducesTechniqueChargeTime: false,
  reducesTechniqueCastTime: false,
}

export interface CharacterArmorOption {
  id: CharacterArmorId
  label: string
  type: string
  rarity: number
  requiredLevel: number
  requirement: string
  hp: number
  tp: number
  atp: number
  dfpMin: number
  dfpMax: number
  mst: number
  ata: number
  evpMin: number
  evpMax: number
  lck: number
  efr: number
  eic: number
  eth: number
  edk: number
  elt: number
  bonuses: CharacterStatBonuses
  conditionalEffects: CharacterConditionalEffect[]
  compatibleClasses: CharacterCompatibleClasses
  hex: string
}

export interface CharacterShieldOption {
  id: CharacterShieldId
  label: string
  type: string
  rarity: number
  requiredLevel: number
  requirement: string
  hp: number
  tp: number
  atp: number
  dfpMin: number
  dfpMax: number
  mst: number
  ata: number
  evpMin: number
  evpMax: number
  lck: number
  efr: number
  eic: number
  eth: number
  edk: number
  elt: number
  bonuses: CharacterStatBonuses
  conditionalEffects: CharacterConditionalEffect[]
  compatibleClasses: CharacterCompatibleClasses
  hex: string
}

export interface CharacterUnitOption {
  id: CharacterUnitId
  label: string
  type: string
  groupId?: CharacterUnitGroupId
  hp: number
  tp: number
  atp: number
  dfp: number
  mst: number
  ata: number
  evp: number
  lck: number
  efr: number
  eic: number
  eth: number
  edk: number
  elt: number
  bonuses: CharacterStatBonuses
  conditionalEffects: CharacterConditionalEffect[]
  compatibleClasses: CharacterCompatibleClasses
  hex: string
}

export interface CharacterClassOption {
  id: CharacterClassId
  label: string
  selectable: boolean
}

export interface CharacterShiftaOption {
  level: CharacterShiftaLevel
  label: string
  atpIncrease: number
}

export interface CharacterZalureOption {
  level: CharacterZalureLevel
  label: string
  dfpReduction: number
}

export interface CharacterDifficultyOption {
  id: CharacterDifficultyId
  label: string
}

export interface CharacterGameModeOption {
  id: CharacterGameModeId
  label: string
}

export interface CharacterAttackTypeOption {
  id: CharacterAttackTypeId
  label: string
}

export interface CharacterSpecialOption {
  id: CharacterSpecialId
  label: string
}

export interface CharacterWeaponOption {
  id: CharacterWeaponId
  label: string
  type: string
  requirement: string
  maxGrind: number
  special: string
  atpMin: number
  atpMax: number
  ata: number
  bonuses: CharacterStatBonuses
  conditionalEffects: CharacterConditionalEffect[]
  compatibleClasses: CharacterCompatibleClasses
  hardDistance: number
  hardAngle: number
  veryHardDistance: number
  veryHardAngle: number
  hex: string
}

export interface CharacterConfigInput {
  classId: CharacterClassId
  level: number
  difficulty: CharacterDifficultyId
  gameMode: CharacterGameModeId
  attackType: CharacterAttackTypeId
  shiftaLevel: CharacterShiftaLevel
  zalureLevel: CharacterZalureLevel
  weaponId: CharacterWeaponId
  specialId: CharacterSpecialId
  grind: number
  weaponAttributes: CharacterWeaponAttributes
  armorId: CharacterArmorId
  armorDfp: number
  armorEvp: number
  shieldId: CharacterShieldId
  shieldDfp: number
  shieldEvp: number
  magDef: number
  magPow: number
  magDex: number
  magMind: number
  materials: CharacterMaterials
  unitSlot1Id: CharacterUnitId
  unitSlot2Id: CharacterUnitId
  unitSlot3Id: CharacterUnitId
  unitSlot4Id: CharacterUnitId
}

export interface ClassLevelStats {
  classId: CharacterClassId
  level: number
  hp: number
  tp: number
  atp: number
  dfp: number
  mst: number
  ata: number
  evp: number
  lck: number
  exp: number
}

export interface CharacterOptionsResponse {
  classes: CharacterClassOption[]
  selectableClassIds: CharacterClassId[]
  difficulties: CharacterDifficultyOption[]
  gameModes: CharacterGameModeOption[]
  attackTypes: CharacterAttackTypeOption[]
  specials: CharacterSpecialOption[]
  shiftaLevels: CharacterShiftaOption[]
  zalureLevels: CharacterZalureOption[]
  weapons: CharacterWeaponOption[]
  armors: CharacterArmorOption[]
  shields: CharacterShieldOption[]
  units: CharacterUnitOption[]
  level: {
    min: number
    max: number
  }
}

export interface EquipmentAtpInput {
  weaponMinAtp: number
  grind: number
  weaponAtpMultiplierPercent?: number
  frameAtp: number
  barrierAtp: number
  unitAtp: number
  weaponAttributePercent?: number
}

export type CharacterProfession = 'hunter' | 'ranger' | 'force'

export interface BaseAtpInput {
  baseAtpMax: number
  professionVarianceMax: number
}

export interface ShiftaAtpInput {
  eqAtp: number
  shiftaAtpIncrease: number
}

export interface ProfessionVarianceRange {
  min: number
  average: number
  max: number
}

export interface EffectiveAtpInput {
  baseAtp: number
  weaponVariance: number
  weaponSpread: number
  shiftaAtpIncrease: number
  eqAtp: number
  professionVariance: number
}

export interface EffectiveEnemyDfpInput {
  baseDfp: number
  zalureReduction: number
}

export interface CriticalRateInput {
  luck: number
}

export interface DamageInput {
  effectiveAtp: number
  effectiveDfp: number
  modifier: number
}

export interface EnemyDfpSummary {
  average: number
  min: number
  minEnemy: string
  max: number
  maxEnemy: string
  entryCount: number
}

export const CHARACTER_CLASS_OPTIONS: CharacterClassOption[] = [
  { id: 'humar', label: 'HUmar', selectable: true },
  { id: 'hunewearl', label: 'HUnewearl', selectable: true },
  { id: 'hucast', label: 'HUcast', selectable: true },
  { id: 'hucaseal', label: 'HUcaseal', selectable: true },
  { id: 'ramar', label: 'RAmar', selectable: true },
  { id: 'ramarl', label: 'RAmarl', selectable: true },
  { id: 'racast', label: 'RAcast', selectable: true },
  { id: 'racaseal', label: 'RAcaseal', selectable: true },
  { id: 'fomar', label: 'FOmar', selectable: true },
  { id: 'fomarl', label: 'FOmarl', selectable: true },
  { id: 'fonewm', label: 'FOnewm', selectable: true },
  { id: 'fonewearl', label: 'FOnewearl', selectable: true },
]

export const CHARACTER_DIFFICULTY_OPTIONS: CharacterDifficultyOption[] = [
  { id: 'normal', label: 'Normal' },
  { id: 'hard', label: 'Hard' },
  { id: 'veryhard', label: 'Very Hard' },
  { id: 'ultimate', label: 'Ultimate' },
]

export const CHARACTER_GAME_MODE_OPTIONS: CharacterGameModeOption[] = [
  { id: 'normal', label: 'Multi' },
  { id: 'oneperson', label: 'Solo' },
]

export const CHARACTER_ATTACK_TYPE_OPTIONS: CharacterAttackTypeOption[] = [
  { id: 'normal', label: 'Normal' },
  { id: 'heavy', label: 'Heavy' },
  { id: 'special', label: 'Special' },
]

export const CHARACTER_SPECIAL_OPTIONS: CharacterSpecialOption[] = [
  { id: 'none', label: 'Aucun' },
  { id: 'draw', label: 'Draw' },
  { id: 'drain', label: 'Drain' },
  { id: 'fill', label: 'Fill' },
  { id: 'gush', label: 'Gush' },
  { id: 'heart', label: 'Heart' },
  { id: 'mind', label: 'Mind' },
  { id: 'soul', label: 'Soul' },
  { id: 'geist', label: 'Geist' },
  { id: 'masters', label: "Master's" },
  { id: 'lords', label: "Lord's" },
  { id: 'kings', label: "King's" },
  { id: 'devils', label: "Devil's" },
  { id: 'demons', label: "Demon's" },
  { id: 'charge', label: 'Charge' },
  { id: 'spirit', label: 'Spirit' },
  { id: 'berserk', label: 'Berserk' },
  { id: 'ice', label: 'Ice' },
  { id: 'frost', label: 'Frost' },
  { id: 'freeze', label: 'Freeze' },
  { id: 'blizzard', label: 'Blizzard' },
  { id: 'bind', label: 'Bind' },
  { id: 'hold', label: 'Hold' },
  { id: 'seize', label: 'Seize' },
  { id: 'arrest', label: 'Arrest' },
  { id: 'heat', label: 'Heat' },
  { id: 'fire', label: 'Fire' },
  { id: 'flame', label: 'Flame' },
  { id: 'burning', label: 'Burning' },
  { id: 'shock', label: 'Shock' },
  { id: 'thunder', label: 'Thunder' },
  { id: 'storm', label: 'Storm' },
  { id: 'tempest', label: 'Tempest' },
  { id: 'dim', label: 'Dim' },
  { id: 'shadow', label: 'Shadow' },
  { id: 'dark', label: 'Dark' },
  { id: 'hell', label: 'Hell' },
  { id: 'panic', label: 'Panic' },
  { id: 'riot', label: 'Riot' },
  { id: 'havoc', label: 'Havoc' },
  { id: 'chaos', label: 'Chaos' },
]

const SPECIAL_LABEL_TO_ID: Record<string, CharacterSpecialId> = CHARACTER_SPECIAL_OPTIONS.reduce(
  (mapping, option) => {
    mapping[option.label.toLowerCase()] = option.id
    return mapping
  },
  {} as Record<string, CharacterSpecialId>,
)

function normalizeWeaponSpecialLabel(label: string): string {
  return label
    .trim()
    .replace(/\s+\(reduced\)$/i, '')
    .toLowerCase()
}

export function isCharacterWeaponSpecialSelectable(label: string): boolean {
  const normalizedLabel = normalizeWeaponSpecialLabel(label)
  return normalizedLabel === 'varies' || normalizedLabel === 'variable'
}

export function isCharacterWeaponSpecialNone(label: string): boolean {
  return normalizeWeaponSpecialLabel(label) === 'none'
}

export function getCharacterSpecialIdFromWeaponSpecialLabel(label: string): CharacterSpecialId | null {
  const normalizedLabel = normalizeWeaponSpecialLabel(label)
  return SPECIAL_LABEL_TO_ID[normalizedLabel] ?? null
}

export const CHARACTER_SHIFTA_OPTIONS: CharacterShiftaOption[] = [
  { level: 0, label: 'Aucun', atpIncrease: 0 },
  { level: 1, label: 'Niveau 1', atpIncrease: 10 },
  { level: 2, label: 'Niveau 2', atpIncrease: 11.3 },
  { level: 3, label: 'Niveau 3', atpIncrease: 12.6 },
  { level: 4, label: 'Niveau 4', atpIncrease: 13.9 },
  { level: 5, label: 'Niveau 5', atpIncrease: 15.2 },
  { level: 6, label: 'Niveau 6', atpIncrease: 16.5 },
  { level: 7, label: 'Niveau 7', atpIncrease: 17.8 },
  { level: 8, label: 'Niveau 8', atpIncrease: 19.1 },
  { level: 9, label: 'Niveau 9', atpIncrease: 20.4 },
  { level: 10, label: 'Niveau 10', atpIncrease: 21.7 },
  { level: 11, label: 'Niveau 11', atpIncrease: 23 },
  { level: 12, label: 'Niveau 12', atpIncrease: 24.3 },
  { level: 13, label: 'Niveau 13', atpIncrease: 25.6 },
  { level: 14, label: 'Niveau 14', atpIncrease: 26.9 },
  { level: 15, label: 'Niveau 15', atpIncrease: 28.2 },
  { level: 16, label: 'Niveau 16', atpIncrease: 29.5 },
  { level: 17, label: 'Niveau 17', atpIncrease: 30.8 },
  { level: 18, label: 'Niveau 18', atpIncrease: 32.1 },
  { level: 19, label: 'Niveau 19', atpIncrease: 33.4 },
  { level: 20, label: 'Niveau 20', atpIncrease: 34.7 },
  { level: 21, label: 'Niveau 21', atpIncrease: 36 },
  { level: 22, label: 'Niveau 22', atpIncrease: 37.3 },
  { level: 23, label: 'Niveau 23', atpIncrease: 38.6 },
  { level: 24, label: 'Niveau 24', atpIncrease: 39.9 },
  { level: 25, label: 'Niveau 25', atpIncrease: 41.2 },
  { level: 26, label: 'Niveau 26', atpIncrease: 42.5 },
  { level: 27, label: 'Niveau 27', atpIncrease: 43.8 },
  { level: 28, label: 'Niveau 28', atpIncrease: 45.1 },
  { level: 29, label: 'Niveau 29', atpIncrease: 46.4 },
  { level: 30, label: 'Niveau 30', atpIncrease: 47.7 },
  { level: 33, label: 'Niveau 33', atpIncrease: 51.6 },
  { level: 41, label: 'Niveau 41', atpIncrease: 62 },
  { level: 61, label: 'Niveau 61', atpIncrease: 88 },
  { level: 81, label: 'Niveau 81', atpIncrease: 114 },
] as const

export const CHARACTER_ZALURE_OPTIONS: CharacterZalureOption[] = [
  { level: 0, label: 'Aucun', dfpReduction: 0 },
  { level: 1, label: 'Niveau 1', dfpReduction: 10 },
  { level: 2, label: 'Niveau 2', dfpReduction: 11.3 },
  { level: 3, label: 'Niveau 3', dfpReduction: 12.6 },
  { level: 4, label: 'Niveau 4', dfpReduction: 13.9 },
  { level: 5, label: 'Niveau 5', dfpReduction: 15.2 },
  { level: 6, label: 'Niveau 6', dfpReduction: 16.5 },
  { level: 7, label: 'Niveau 7', dfpReduction: 17.8 },
  { level: 8, label: 'Niveau 8', dfpReduction: 18.1 },
  { level: 9, label: 'Niveau 9', dfpReduction: 20.4 },
  { level: 10, label: 'Niveau 10', dfpReduction: 21.7 },
  { level: 11, label: 'Niveau 11', dfpReduction: 23 },
  { level: 12, label: 'Niveau 12', dfpReduction: 24.3 },
  { level: 13, label: 'Niveau 13', dfpReduction: 25.6 },
  { level: 14, label: 'Niveau 14', dfpReduction: 26.9 },
  { level: 15, label: 'Niveau 15', dfpReduction: 28.2 },
  { level: 16, label: 'Niveau 16', dfpReduction: 29.5 },
  { level: 17, label: 'Niveau 17', dfpReduction: 30.8 },
  { level: 18, label: 'Niveau 18', dfpReduction: 32.1 },
  { level: 19, label: 'Niveau 19', dfpReduction: 33.4 },
  { level: 20, label: 'Niveau 20', dfpReduction: 34.7 },
  { level: 21, label: 'Niveau 21', dfpReduction: 36 },
  { level: 22, label: 'Niveau 22', dfpReduction: 37.3 },
  { level: 23, label: 'Niveau 23', dfpReduction: 38.6 },
  { level: 24, label: 'Niveau 24', dfpReduction: 39.9 },
  { level: 25, label: 'Niveau 25', dfpReduction: 41.2 },
  { level: 26, label: 'Niveau 26', dfpReduction: 42.5 },
  { level: 27, label: 'Niveau 27', dfpReduction: 43.8 },
  { level: 28, label: 'Niveau 28', dfpReduction: 45.1 },
  { level: 29, label: 'Niveau 29', dfpReduction: 46.4 },
  { level: 30, label: 'Niveau 30', dfpReduction: 47.7 },
] as const

const HUNTER_CHARACTER_CLASS_IDS = ['humar', 'hunewearl', 'hucast', 'hucaseal'] as const satisfies readonly CharacterClassId[]
const RANGER_CHARACTER_CLASS_IDS = ['ramar', 'ramarl', 'racast', 'racaseal'] as const satisfies readonly CharacterClassId[]
const FORCE_CHARACTER_CLASS_IDS = ['fomar', 'fomarl', 'fonewm', 'fonewearl'] as const satisfies readonly CharacterClassId[]
const HUNTER_HUMAR_HUCAST_CLASS_IDS = ['humar', 'hucast'] as const satisfies readonly CharacterClassId[]
const HUNTER_HUMAR_HUCAST_HUCASEAL_CLASS_IDS = ['humar', 'hucast', 'hucaseal'] as const satisfies readonly CharacterClassId[]
const NON_FORCE_CHARACTER_CLASS_IDS = [...HUNTER_CHARACTER_CLASS_IDS, ...RANGER_CHARACTER_CLASS_IDS] as const satisfies readonly CharacterClassId[]
const ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS = [
  'humar',
  'hunewearl',
  'hucast',
  'hucaseal',
  'ramar',
  'ramarl',
  'racast',
  'racaseal',
  'fomar',
  'fomarl',
  'fonewm',
] as const satisfies readonly CharacterClassId[]
const ELYSION_CHARACTER_CLASS_IDS = ['humar', 'hunewearl', 'ramarl', 'fomar', 'fomarl', 'fonewm', 'fonewearl'] as const satisfies readonly CharacterClassId[]
const ANCIENT_SABER_CHARACTER_CLASS_IDS = ['humar', 'hunewearl', 'hucast', 'hucaseal', 'fomar', 'fomarl', 'fonewm'] as const satisfies readonly CharacterClassId[]
const GALATINE_CHARACTER_CLASS_IDS = [...NON_FORCE_CHARACTER_CLASS_IDS, 'fomar', 'fomarl'] as const satisfies readonly CharacterClassId[]
const FLAPJACK_FLAPPER_CHARACTER_CLASS_IDS = ['hunewearl', 'hucaseal', 'ramarl', 'racaseal'] as const satisfies readonly CharacterClassId[]
const FEMALE_CHARACTER_CLASS_IDS = ['hunewearl', 'hucaseal', 'ramarl', 'racaseal', 'fomarl', 'fonewearl'] as const satisfies readonly CharacterClassId[]
const HUNTER_CAST_CHARACTER_CLASS_IDS = ['hucast', 'hucaseal'] as const satisfies readonly CharacterClassId[]
const PLANTAIN_HUGE_FAN_CHARACTER_CLASS_IDS = ['humar', 'hunewearl', 'fomar', 'fomarl', 'fonewm', 'fonewearl'] as const satisfies readonly CharacterClassId[]
const ASTERON_BELT_CHARACTER_CLASS_IDS = ['humar', 'hucast', 'ramar', 'racast', 'fomar'] as const satisfies readonly CharacterClassId[]
const SOUL_BANISH_CHARACTER_CLASS_IDS = ['humar', 'hunewearl', 'hucast', 'hucaseal', 'fomar', 'fomarl'] as const satisfies readonly CharacterClassId[]

const SABER_WEAPON_DEFAULTS = {
  type: 'Saber',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 14,
  hardAngle: 26,
  veryHardDistance: 18,
  veryHardAngle: 26,
}

const DAGGER_WEAPON_DEFAULTS = {
  type: 'Dagger',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 14,
  hardAngle: 30,
  veryHardDistance: 18,
  veryHardAngle: 26,
}

const PARTISAN_WEAPON_DEFAULTS = {
  type: 'Partisan',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 30,
  hardAngle: 40,
  veryHardDistance: 15,
  veryHardAngle: 26,
}

const SLICER_WEAPON_DEFAULTS = {
  type: 'Slicer',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 95,
  hardAngle: 26,
  veryHardDistance: 15,
  veryHardAngle: 26,
}


const CLAW_WEAPON_DEFAULTS = {
  type: 'Claw',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 14,
  hardAngle: 26,
  veryHardDistance: 18,
  veryHardAngle: 36,
}
const DOUBLE_SABER_WEAPON_DEFAULTS = {
  type: 'Double Saber',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 17,
  hardAngle: 75,
  veryHardDistance: 18,
  veryHardAngle: 26,
}

const SWORD_WEAPON_DEFAULTS = {
  type: 'Sword',
  bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  conditionalEffects: [] as CharacterConditionalEffect[],
  compatibleClasses: 'all' as const,
  hardDistance: 25,
  hardAngle: 45,
  veryHardDistance: 15,
  veryHardAngle: 26,
}

export const CHARACTER_WEAPON_OPTIONS: CharacterWeaponOption[] = [
  {
    id: 'none',
    label: 'Aucune',
    type: 'None',
    requirement: 'Aucun',
    maxGrind: 0,
    special: 'None',
    atpMin: 0,
    atpMax: 0,
    ata: 0,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
    conditionalEffects: [],
    compatibleClasses: 'all',
    hardDistance: 0,
    hardAngle: 0,
    veryHardDistance: 0,
    veryHardAngle: 0,
    hex: '000000',
  },
  {
    id: 'saber',
    label: 'Saber',
    requirement: '30 ATP',
    maxGrind: 35,
    special: 'Variable',
    atpMin: 40,
    atpMax: 55,
    ata: 30,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'brand',
    label: 'Brand',
    requirement: '90 ATP',
    maxGrind: 32,
    special: 'Variable',
    atpMin: 80,
    atpMax: 100,
    ata: 33,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'buster',
    label: 'Buster',
    requirement: '155 ATP',
    maxGrind: 30,
    special: 'Variable',
    atpMin: 120,
    atpMax: 160,
    ata: 35,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'pallasch',
    label: 'Pallasch',
    requirement: '233 ATP',
    maxGrind: 26,
    special: 'Variable',
    atpMin: 170,
    atpMax: 220,
    ata: 38,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'gladius',
    label: 'Gladius',
    requirement: '296 ATP',
    maxGrind: 18,
    special: 'Variable',
    atpMin: 240,
    atpMax: 280,
    ata: 40,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'battledore',
    label: 'Battledore',
    requirement: 'Aucun',
    maxGrind: 0,
    special: 'None',
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'great_bouquet',
    label: 'Great Bouquet',
    requirement: 'Aucun',
    maxGrind: 0,
    special: 'Chaos',
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'flower_bouquet',
    label: 'Flower Bouquet',
    requirement: 'Aucun',
    maxGrind: 0,
    special: 'None',
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'racket',
    label: 'Racket',
    requirement: 'Aucun',
    maxGrind: 0,
    special: 'None',
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'fifth_anniv_blade',
    label: '5th Anniv. Blade',
    requirement: '90 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 152,
    atpMax: 282,
    ata: 45,
    ...SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 45, mst: 45 },
    hex: '000100',
  },
  {
    id: 'jitte',
    label: 'Jitte',
    requirement: '135 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 123,
    atpMax: 135,
    ata: 32,
    ...SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 10 },
    hex: '000100',
  },
  {
    id: 'dbs_saber',
    label: "DB's Saber",
    requirement: '320 ATP',
    maxGrind: 44,
    special: 'None',
    atpMin: 200,
    atpMax: 250,
    ata: 43,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'kaladbolg',
    label: 'Kaladbolg',
    requirement: '340 ATP',
    maxGrind: 25,
    special: 'Freeze',
    atpMin: 260,
    atpMax: 320,
    ata: 45,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'durandal',
    label: 'Durandal',
    requirement: '360 ATP',
    maxGrind: 37,
    special: "Lord's",
    atpMin: 300,
    atpMax: 376,
    ata: 45,
    ...SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 15 },
    hex: '000100',
  },
  {
    id: 'akikos_wok',
    label: "Akiko's Wok",
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Burning',
    atpMin: 210,
    atpMax: 250,
    ata: 40,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3062',
    label: "DB's Saber (3062)",
    requirement: '130 ATP',
    maxGrind: 18,
    special: 'None',
    atpMin: 112,
    atpMax: 124,
    ata: 27,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3064',
    label: "DB's Saber (3064)",
    requirement: '288 ATP',
    maxGrind: 18,
    special: 'None',
    atpMin: 289,
    atpMax: 301,
    ata: 48,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3067',
    label: "DB's Saber (3067)",
    requirement: '131 ATP',
    maxGrind: 14,
    special: 'None',
    atpMin: 100,
    atpMax: 143,
    ata: 29,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3069_torato',
    label: "DB's Saber (3069 Torato)",
    requirement: '129 ATP',
    maxGrind: 21,
    special: 'None',
    atpMin: 130,
    atpMax: 149,
    ata: 27,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3069_chris',
    label: "DB's Saber (3069 Chris)",
    requirement: '140 ATP',
    maxGrind: 36,
    special: 'None',
    atpMin: 189,
    atpMax: 202,
    ata: 34,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3070',
    label: "DB's Saber (3070)",
    requirement: '90 ATP',
    maxGrind: 29,
    special: 'None',
    atpMin: 93,
    atpMax: 109,
    ata: 21,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3073',
    label: "DB's Saber (3073)",
    requirement: '253 ATP',
    maxGrind: 24,
    special: 'None',
    atpMin: 212,
    atpMax: 231,
    ata: 29,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3075',
    label: "DB's Saber (3075)",
    requirement: '600 ATP',
    maxGrind: 85,
    special: 'None',
    atpMin: 300,
    atpMax: 340,
    ata: 40,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'dbs_saber_3077',
    label: "DB's Saber (3077)",
    requirement: '139 ATP',
    maxGrind: 9,
    special: 'None',
    atpMin: 140,
    atpMax: 168,
    ata: 30,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'delsabers_buster',
    label: "Delsaber's Buster",
    requirement: '295 ATP',
    maxGrind: 9,
    special: 'Storm',
    atpMin: 340,
    atpMax: 350,
    ata: 44,
    ...SABER_WEAPON_DEFAULTS,
    conditionalEffects: [
      {
        requirements: { shieldLabels: ['Shield of Delsaber'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 100,
      },
    ],
    hex: '000100',
  },
  {
    id: 'sting_tip',
    label: 'Sting Tip',
    requirement: '450 MST',
    maxGrind: 30,
    special: 'Soul',
    atpMin: 170,
    atpMax: 170,
    ata: 35,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: FORCE_CHARACTER_CLASS_IDS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 30, evp: 40 },
    hex: '000100',
  },
  {
    id: 'commander_blade',
    label: 'Commander Blade',
    requirement: '502 ATP',
    maxGrind: 0,
    special: 'Trap Vision',
    atpMin: 560,
    atpMax: 585,
    ata: 45,
    ...SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 15 },
    hex: '000100',
  },
  {
    id: 'kusanagi',
    label: 'Kusanagi',
    requirement: '502 ATP',
    maxGrind: 32,
    special: "Demon's",
    atpMin: 560,
    atpMax: 575,
    ata: 53,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    conditionalEffects: [
      {
        requirements: { unitLabels: ['Yasakani Magatama'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 30 },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000100',
  },
  {
    id: 'red_saber',
    label: 'Red Saber',
    requirement: '502 ATP',
    maxGrind: 78,
    special: 'Fill',
    atpMin: 450,
    atpMax: 489,
    ata: 51,
    ...SABER_WEAPON_DEFAULTS,
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Red Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 15 },
        weaponAtpMultiplierPercent: 30,
      },
      {
        requirements: { armorLabels: ['Crimson Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 22 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000100',
  },
  {
    id: 'elysion',
    label: 'Elysion',
    requirement: '680 MST',
    maxGrind: 9,
    special: 'Foie',
    atpMin: 360,
    atpMax: 368,
    ata: 52,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ELYSION_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'ancient_saber',
    label: 'Ancient Saber',
    requirement: '740 ATP',
    maxGrind: 9,
    special: "King's",
    atpMin: 531,
    atpMax: 544,
    ata: 50,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ANCIENT_SABER_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'flamberge',
    label: 'Flamberge',
    requirement: '740 ATP',
    maxGrind: 30,
    special: 'Spirit',
    atpMin: 575,
    atpMax: 590,
    ata: 50,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'lame_dargent',
    label: "Lame d'Argent",
    requirement: '800 ATP',
    maxGrind: 35,
    special: 'None',
    atpMin: 430,
    atpMax: 465,
    ata: 40,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'lavis_cannon',
    label: 'Lavis Cannon',
    requirement: '800 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 730,
    atpMax: 750,
    ata: 54,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'evil_curst',
    label: 'Evil Curst',
    requirement: '999 MST',
    maxGrind: 0,
    special: 'Megid',
    atpMin: 444,
    atpMax: 666,
    ata: 44,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: FORCE_CHARACTER_CLASS_IDS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 35, evp: 50 },
    hex: '000100',
  },
  {
    id: 'excalibur',
    label: 'Excalibur',
    requirement: '800 ATP',
    maxGrind: 0,
    special: 'Berserk',
    atpMin: 900,
    atpMax: 950,
    ata: 60,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 35 },
    conditionalEffects: [
      {
        requirements: { magLabels: ['Tellusis'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, edk: 10, elt: 10 },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000100',
  },
  {
    id: 'galatine',
    label: 'Galatine',
    requirement: '820 ATP',
    maxGrind: 9,
    special: 'Spirit',
    atpMin: 990,
    atpMax: 1260,
    ata: 77,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: GALATINE_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'type_sa_saber',
    label: 'TypeSA/Saber',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 120,
    atpMax: 120,
    ata: 50,
    ...SABER_WEAPON_DEFAULTS,
    hex: '000100',
  },
  {
    id: 'es_saber',
    label: 'ES Saber',
    requirement: '800 ATP',
    maxGrind: 250,
    special: 'Variable',
    atpMin: 150,
    atpMax: 150,
    ata: 50,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'es_axe',
    label: 'ES Axe',
    requirement: '800 ATP',
    maxGrind: 250,
    special: 'Variable',
    atpMin: 200,
    atpMax: 200,
    ata: 50,
    ...SABER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000100',
  },
  {
    id: 'dagger',
    label: 'Dagger',
    requirement: '65 ATP',
    maxGrind: 65,
    special: 'Variable',
    atpMin: 25,
    atpMax: 40,
    ata: 20,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'knife',
    label: 'Knife',
    requirement: '117 ATP',
    maxGrind: 50,
    special: 'Variable',
    atpMin: 50,
    atpMax: 70,
    ata: 22,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'blade',
    label: 'Blade',
    requirement: '182 ATP',
    maxGrind: 35,
    special: 'Variable',
    atpMin: 80,
    atpMax: 100,
    ata: 24,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'edge',
    label: 'Edge',
    requirement: '281 ATP',
    maxGrind: 25,
    special: 'Variable',
    atpMin: 105,
    atpMax: 130,
    ata: 26,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'ripper',
    label: 'Ripper',
    requirement: '340 ATP',
    maxGrind: 15,
    special: 'Variable',
    atpMin: 125,
    atpMax: 160,
    ata: 28,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'blade_dance',
    label: 'Blade Dance',
    requirement: '385 ATP',
    maxGrind: 30,
    special: 'Seize (Reduced)',
    atpMin: 110,
    atpMax: 180,
    ata: 30,
    ...DAGGER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'bloody_art',
    label: 'Bloody Art',
    requirement: '412 ATP',
    maxGrind: 42,
    special: "Devil's (Reduced)",
    atpMin: 120,
    atpMax: 175,
    ata: 32,
    ...DAGGER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'wok_of_akikos_shop',
    label: "Wok of Akiko's Shop",
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Charge',
    atpMin: 160,
    atpMax: 170,
    ata: 25,
    ...DAGGER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 30 },
    hex: '000300',
  },
  {
    id: 'cross_scar',
    label: 'Cross Scar',
    requirement: '463 ATP',
    maxGrind: 28,
    special: 'Storm',
    atpMin: 135,
    atpMax: 220,
    ata: 32,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 's_beats_blade',
    label: "S-Beat's Blade",
    requirement: '400 ATP',
    maxGrind: 15,
    special: 'Hell',
    atpMin: 210,
    atpMax: 220,
    ata: 35,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 's_berills_hands_0',
    label: "S-Berill's Hands #0",
    requirement: '450 ATP',
    maxGrind: 35,
    special: 'Havoc',
    atpMin: 158,
    atpMax: 197,
    ata: 30,
    ...DAGGER_WEAPON_DEFAULTS,
    hex: '000300',
  },
  {
    id: 'twin_chakram',
    label: 'Twin Chakram',
    requirement: '480 ATP',
    maxGrind: 20,
    special: 'Dark',
    atpMin: 245,
    atpMax: 250,
    ata: 32,
    ...DAGGER_WEAPON_DEFAULTS,
    hex: '000300',
  },
  {
    id: 'zero_divide',
    label: 'Zero Divide',
    requirement: '490 ATP',
    maxGrind: 99,
    special: 'Blizzard (Reduced)',
    atpMin: 200,
    atpMax: 300,
    ata: 29,
    ...DAGGER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 30 },
    hex: '000300',
  },
  {
    id: 'p_arms_blade',
    label: "P-Arms' Blade",
    requirement: '568 ATP',
    maxGrind: 25,
    special: 'Arrest',
    atpMin: 250,
    atpMax: 270,
    ata: 34,
    ...DAGGER_WEAPON_DEFAULTS,
    hex: '000300',
  },
  {
    id: 'red_dagger',
    label: 'Red Dagger',
    requirement: '600 ATP',
    maxGrind: 65,
    special: 'Soul',
    atpMin: 245,
    atpMax: 280,
    ata: 35,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Red Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 15 },
        weaponAtpMultiplierPercent: 30,
      },
      {
        requirements: { armorLabels: ['Crimson Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 22 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000300',
  },
  {
    id: 's_reds_blade',
    label: "S-Red's Blade",
    requirement: '821 ATP',
    maxGrind: 15,
    special: 'Shifta & Deband',
    atpMin: 340,
    atpMax: 350,
    ata: 39,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'flapjack_flapper',
    label: 'Flapjack Flapper',
    requirement: '830 ATP',
    maxGrind: 25,
    special: 'Gush',
    atpMin: 350,
    atpMax: 400,
    ata: 45,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: FLAPJACK_FLAPPER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 's_berills_hands_1',
    label: "S-Berill's Hands #1",
    requirement: '600 ATP',
    maxGrind: 15,
    special: 'Chaos',
    atpMin: 320,
    atpMax: 321,
    ata: 30,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'two_kamui',
    label: 'Two Kamui',
    requirement: '900 ATP',
    maxGrind: 0,
    special: 'Zalure',
    atpMin: 600,
    atpMax: 650,
    ata: 50,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: 30 },
    hex: '000300',
  },
  {
    id: 'lavis_blade',
    label: 'Lavis Blade',
    requirement: '850 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 380,
    atpMax: 450,
    ata: 40,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'daylight_scar',
    label: 'Daylight Scar',
    requirement: '850 ATP',
    maxGrind: 25,
    special: 'Berserk',
    atpMin: 500,
    atpMax: 550,
    ata: 48,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'type_bl_blade',
    label: 'TypeBL/Blade',
    requirement: '350 ATP',
    maxGrind: 90,
    special: 'None',
    atpMin: 10,
    atpMax: 10,
    ata: 35,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'es_blade',
    label: 'ES Blade',
    requirement: '800 ATP',
    maxGrind: 200,
    special: 'Varies',
    atpMin: 10,
    atpMax: 10,
    ata: 35,
    ...DAGGER_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000300',
  },
  {
    id: 'partisan',
    label: 'Partisan',
    requirement: '124 ATP',
    maxGrind: 35,
    special: 'Variable',
    atpMin: 30,
    atpMax: 40,
    ata: 20,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'halbert',
    label: 'Halbert',
    requirement: '192 ATP',
    maxGrind: 30,
    special: 'Variable',
    atpMin: 65,
    atpMax: 75,
    ata: 23,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'glaive',
    label: 'Glaive',
    requirement: '286 ATP',
    maxGrind: 25,
    special: 'Variable',
    atpMin: 95,
    atpMax: 110,
    ata: 26,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'berdys',
    label: 'Berdys',
    requirement: '335 ATP',
    maxGrind: 20,
    special: 'Variable',
    atpMin: 130,
    atpMax: 145,
    ata: 29,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'gungnir',
    label: 'Gungnir',
    requirement: '450 ATP',
    maxGrind: 10,
    special: 'Variable',
    atpMin: 150,
    atpMax: 180,
    ata: 32,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'butterfly_net',
    label: 'Butterfly Net',
    requirement: '0 ATP',
    maxGrind: 0,
    special: "Lord's",
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'synthesizer',
    label: 'Synthesizer',
    requirement: '0 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 1,
    atpMax: 1,
    ata: 1,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'tree_clippers',
    label: 'Tree Clippers',
    requirement: '0 ATP',
    maxGrind: 0,
    special: 'Charge',
    atpMin: 1,
    atpMax: 200,
    ata: 1,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'soul_eater',
    label: 'Soul Eater',
    requirement: '165 ATP',
    maxGrind: 9,
    special: 'Berserk',
    atpMin: 180,
    atpMax: 185,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'nice_shot',
    label: 'Nice Shot',
    requirement: '300 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 180,
    atpMax: 200,
    ata: 38,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'bamboo_spear',
    label: 'Bamboo Spear',
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Spirit',
    atpMin: 2,
    atpMax: 255,
    ata: 3,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 35, evp: 40 },
    hex: '000400',
  },
  {
    id: 'chameleon_scythe',
    label: 'Chameleon Scythe',
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Geist',
    atpMin: 80,
    atpMax: 180,
    ata: 30,
    ...PARTISAN_WEAPON_DEFAULTS,
    hex: '000400',
  },
  {
    id: 'getsugasan',
    label: 'Getsugasan',
    requirement: '465 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 190,
    atpMax: 230,
    ata: 39,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 12 },
    hex: '000400',
  },
  {
    id: 'brionac',
    label: 'Brionac',
    requirement: '475 ATP',
    maxGrind: 15,
    special: 'Soul (Reduced)',
    atpMin: 150,
    atpMax: 182,
    ata: 33,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'vjaya',
    label: 'Vjaya',
    requirement: '480 ATP',
    maxGrind: 15,
    special: 'See Notes',
    atpMin: 160,
    atpMax: 220,
    ata: 36,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'gae_bolg',
    label: 'Gae Bolg',
    requirement: '500 ATP',
    maxGrind: 30,
    special: 'Freeze (Reduced)',
    atpMin: 215,
    atpMax: 220,
    ata: 36,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'tyrells_parasol',
    label: "Tyrell's Parasol",
    requirement: '580 ATP',
    maxGrind: 0,
    special: 'Charge',
    atpMin: 250,
    atpMax: 300,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: FEMALE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'madams_umbrella',
    label: "Madam's Umbrella",
    requirement: '500 ATP',
    maxGrind: 0,
    special: 'Berserk',
    atpMin: 210,
    atpMax: 280,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: FEMALE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'maguwa',
    label: 'Maguwa',
    requirement: '500 ATP',
    maxGrind: 15,
    special: 'None',
    atpMin: 230,
    atpMax: 250,
    ata: 30,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'plantain_huge_fan',
    label: 'Plantain Huge Fan',
    requirement: '690 MST',
    maxGrind: 9,
    special: 'See Notes',
    atpMin: 265,
    atpMax: 300,
    ata: 38,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: PLANTAIN_HUGE_FAN_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'red_partisan',
    label: 'Red Partisan',
    requirement: '700 ATP',
    maxGrind: 40,
    special: 'Freeze',
    atpMin: 290,
    atpMax: 295,
    ata: 43,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'berdysh',
    label: 'Berdysh',
    requirement: '710 ATP',
    maxGrind: 25,
    special: 'See Notes',
    atpMin: 270,
    atpMax: 290,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CAST_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'snake_spire',
    label: 'Snake Spire',
    requirement: '780 ATP',
    maxGrind: 15,
    special: 'Dark',
    atpMin: 290,
    atpMax: 310,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'imperial_pick',
    label: 'Imperial Pick',
    requirement: '785 ATP',
    maxGrind: 9,
    special: "Devil's",
    atpMin: 280,
    atpMax: 300,
    ata: 41,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'asteron_belt',
    label: 'Asteron Belt',
    requirement: '800 ATP',
    maxGrind: 9,
    special: 'Hell (Reduced)',
    atpMin: 380,
    atpMax: 400,
    ata: 55,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 50 },
    compatibleClasses: ASTERON_BELT_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'yunchang',
    label: 'Yunchang',
    requirement: '800 ATP',
    maxGrind: 25,
    special: 'Berserk',
    atpMin: 300,
    atpMax: 350,
    ata: 49,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'soul_banish',
    label: 'Soul Banish',
    requirement: '850 ATP',
    maxGrind: 9,
    special: 'Megid',
    atpMin: 350,
    atpMax: 370,
    ata: 45,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: SOUL_BANISH_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'madams_parasol',
    label: "Madam's Parasol",
    requirement: '570 ATP',
    maxGrind: 0,
    special: 'Spirit',
    atpMin: 215,
    atpMax: 220,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: FEMALE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'type_ha_halbert',
    label: 'TypeHA/Halbert',
    requirement: '350 ATP',
    maxGrind: 90,
    special: 'None',
    atpMin: 10,
    atpMax: 10,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'type_ha_rod',
    label: 'TypeHA/Rod',
    requirement: '350 MST',
    maxGrind: 80,
    special: 'None',
    atpMin: 10,
    atpMax: 10,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 50 },
    compatibleClasses: FORCE_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'es_partisan',
    label: 'ES Partisan',
    requirement: '800 ATP',
    maxGrind: 200,
    special: 'Varies',
    atpMin: 10,
    atpMax: 10,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'es_scythe',
    label: 'ES Scythe',
    requirement: '800 ATP',
    maxGrind: 180,
    special: 'Varies',
    atpMin: 10,
    atpMax: 10,
    ata: 40,
    ...PARTISAN_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000400',
  },
  {
    id: 'slicer',
    label: 'Slicer',
    requirement: '135 ATP',
    maxGrind: 20,
    special: 'Variable',
    atpMin: 5,
    atpMax: 15,
    ata: 13,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'spinner',
    label: 'Spinner',
    requirement: '204 ATP',
    maxGrind: 20,
    special: 'Variable',
    atpMin: 10,
    atpMax: 30,
    ata: 16,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'cutter',
    label: 'Cutter',
    requirement: '302 ATP',
    maxGrind: 15,
    special: 'Variable',
    atpMin: 35,
    atpMax: 55,
    ata: 19,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'sawcer',
    label: 'Sawcer',
    requirement: '395 ATP',
    maxGrind: 15,
    special: 'Variable',
    atpMin: 60,
    atpMax: 80,
    ata: 22,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'diska',
    label: 'Diska',
    requirement: '476 ATP',
    maxGrind: 10,
    special: 'Variable',
    atpMin: 85,
    atpMax: 105,
    ata: 25,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'slicer_of_assassin',
    label: 'Slicer of Assassin',
    requirement: '475 ATP',
    maxGrind: 12,
    special: 'Dark (Reduced)',
    atpMin: 120,
    atpMax: 125,
    ata: 28,
    ...SLICER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 10 },
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Thirteen'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 30 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000500',
  },
  {
    id: 'diska_of_liberator',
    label: 'Diska of Liberator',
    requirement: '480 ATP',
    maxGrind: 9,
    special: 'Havoc (Reduced)',
    atpMin: 120,
    atpMax: 146,
    ata: 31,
    ...SLICER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 10 },
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Thirteen'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 30 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000500',
  },
  {
    id: 'diska_of_braveman',
    label: 'Diska of Braveman',
    requirement: '495 ATP',
    maxGrind: 9,
    special: 'Berserk',
    atpMin: 150,
    atpMax: 167,
    ata: 31,
    ...SLICER_WEAPON_DEFAULTS,
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Thirteen'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 30 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000500',
  },
  {
    id: 'rappys_fan',
    label: "Rappy's Fan",
    requirement: '480 ATP',
    maxGrind: 32,
    special: 'Havoc',
    atpMin: 140,
    atpMax: 146,
    ata: 35,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'flight_fan',
    label: 'Flight Fan',
    requirement: '500 ATP',
    maxGrind: 15,
    special: "Lord's",
    atpMin: 185,
    atpMax: 200,
    ata: 34,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'izmaela',
    label: 'Izmaela',
    requirement: '500 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 250,
    atpMax: 250,
    ata: 25,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'slicer_of_fanatic',
    label: 'Slicer of Fanatic',
    requirement: '570 ATP',
    maxGrind: 30,
    special: "Demon's",
    atpMin: 340,
    atpMax: 360,
    ata: 40,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'red_slicer',
    label: 'Red Slicer',
    requirement: '750 ATP',
    maxGrind: 45,
    special: 'Flame',
    atpMin: 190,
    atpMax: 200,
    ata: 38,
    ...SLICER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Red Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 15 },
        weaponAtpMultiplierPercent: 30,
      },
      {
        requirements: { armorLabels: ['Crimson Coat'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, ata: 22 },
        weaponAtpMultiplierPercent: 50,
      },
    ],
    hex: '000500',
  },
  {
    id: 'flight_cutter',
    label: 'Flight Cutter',
    requirement: '820 ATP',
    maxGrind: 9,
    special: "Devil's",
    atpMin: 250,
    atpMax: 260,
    ata: 40,
    ...SLICER_WEAPON_DEFAULTS,
    compatibleClasses: NON_FORCE_CHARACTER_CLASS_IDS,
    hex: '000500',
  },
  {
    id: 'rainbow_baton',
    label: 'Rainbow Baton',
    requirement: '570 ATP',
    maxGrind: 24,
    special: 'Chaos',
    atpMin: 300,
    atpMax: 320,
    ata: 40,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'type_sl_slicer',
    label: 'TypeSL/Slicer',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 140,
    atpMax: 140,
    ata: 50,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'type_sl_saber',
    label: 'TypeSL/Saber',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 100,
    atpMax: 130,
    ata: 60,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'type_sl_claw',
    label: 'TypeSL/Claw',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 100,
    atpMax: 150,
    ata: 45,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'type_sl_katana',
    label: 'TypeSL/Katana',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 100,
    atpMax: 140,
    ata: 55,
    ...SLICER_WEAPON_DEFAULTS,
    hex: '000500',
  },
  {
    id: 'es_slicer',
    label: 'ES Slicer',
    requirement: '800 ATP',
    maxGrind: 140,
    special: 'Varies',
    atpMin: 10,
    atpMax: 10,
    ata: 35,
    ...SLICER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000500',
  },
  {
    id: 'es_j_cutter',
    label: 'ES J-Cutter',
    requirement: '800 ATP',
    maxGrind: 150,
    special: 'Varies',
    atpMin: 25,
    atpMax: 25,
    ata: 35,
    ...SLICER_WEAPON_DEFAULTS,
    compatibleClasses: ALL_EXCEPT_FONEWEARL_CHARACTER_CLASS_IDS,
    hex: '000500',
  },
  // --- CLAW FAMILY ---
  {
    id: 'photon_claw',
    label: 'Photon Claw',
    requirement: '300 ATP',
    maxGrind: 20,
    special: 'Drain',
    atpMin: 230,
    atpMax: 300,
    ata: 48,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'boomas_claw',
    label: "Booma's Claw",
    requirement: '300 ATP',
    maxGrind: 15,
    special: 'None',
    atpMin: 300,
    atpMax: 315,
    ata: 48,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'panthers_claw',
    label: "Panther's Claw",
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Chaos',
    atpMin: 180,
    atpMax: 280,
    ata: 38,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'silence_claw',
    label: 'Silence Claw',
    requirement: '336 ATP',
    maxGrind: 15,
    special: 'Dark',
    atpMin: 335,
    atpMax: 345,
    ata: 50,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: 15 },
    hex: '000600',
  },
  {
    id: 'goboomas_claw',
    label: "Gobooma's Claw",
    requirement: '336 ATP',
    maxGrind: 35,
    special: 'None',
    atpMin: 330,
    atpMax: 345,
    ata: 50,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'neis_claw_replica',
    label: "Nei's Claw (Replica)",
    requirement: '412 ATP',
    maxGrind: 25,
    special: 'Gush',
    atpMin: 386,
    atpMax: 400,
    ata: 60,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'phoenix_claw',
    label: 'Phoenix Claw',
    requirement: '508 ATP',
    maxGrind: 15,
    special: 'Burning',
    atpMin: 540,
    atpMax: 570,
    ata: 57,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: 50 },
    conditionalEffects: [
      {
        requirements: {},
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000600',
  },
  {
    id: 'gigoboomas_claw',
    label: "Gigobooma's Claw",
    requirement: '600 ATP',
    maxGrind: 55,
    special: 'None',
    atpMin: 450,
    atpMax: 500,
    ata: 55,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'dragons_claw',
    label: "Dragon's Claw",
    requirement: '600 ATP',
    maxGrind: 35,
    special: 'Foie',
    atpMin: 550,
    atpMax: 580,
    ata: 54,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'morning_glory',
    label: 'Morning Glory',
    requirement: '700 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 700,
    atpMax: 750,
    ata: 52,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Morning Prayer'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, atp: 150, ata: 10 },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000600',
  },
  {
    id: 'heart_of_poumn',
    label: 'Heart of Poumn',
    requirement: '850 ATP',
    maxGrind: 0,
    special: 'Chaos',
    atpMin: 695,
    atpMax: 715,
    ata: 71,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 15, mst: 15, evp: 15, lck: 15 },
    hex: '000600',
  },
  {
    id: 'rikas_claw',
    label: "Rika's Claw",
    requirement: '890 ATP',
    maxGrind: 35,
    special: 'Tempest',
    atpMin: 600,
    atpMax: 680,
    ata: 64,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 10, mst: 10, evp: 10, lck: 10 },
    conditionalEffects: [
      {
        requirements: {},
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000600',
  },
  {
    id: 'neis_claw',
    label: "Nei's Claw",
    requirement: '900 ATP',
    maxGrind: 0,
    special: 'Spirit',
    atpMin: 756,
    atpMax: 756,
    ata: 60,
    ...CLAW_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -20 },
    conditionalEffects: [
      {
        requirements: {},
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 0,
      },
    ],
    hex: '000600',
  },
  {
    id: 'typecl_claw',
    label: 'TypeCL/Claw',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 170,
    atpMax: 170,
    ata: 55,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'es_claw',
    label: 'ES Claw',
    requirement: '800 ATP',
    maxGrind: 250,
    special: 'Varies',
    atpMin: 180,
    atpMax: 180,
    ata: 55,
    ...CLAW_WEAPON_DEFAULTS,
    hex: '000600',
  },
  // --- END CLAW FAMILY ---
  {
    id: 'sword',
    label: 'Sword',
    requirement: '82 ATP',
    maxGrind: 46,
    special: 'Variable',
    atpMin: 25,
    atpMax: 60,
    ata: 15,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'gigush',
    label: 'Gigush',
    requirement: '169 ATP',
    maxGrind: 32,
    special: 'Variable',
    atpMin: 55,
    atpMax: 100,
    ata: 18,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'breaker',
    label: 'Breaker',
    requirement: '258 ATP',
    maxGrind: 18,
    special: 'Variable',
    atpMin: 100,
    atpMax: 150,
    ata: 20,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'claymore',
    label: 'Claymore',
    requirement: '316 ATP',
    maxGrind: 16,
    special: 'Variable',
    atpMin: 150,
    atpMax: 200,
    ata: 23,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'calibur',
    label: 'Calibur',
    requirement: '371 ATP',
    maxGrind: 10,
    special: 'Variable',
    atpMin: 210,
    atpMax: 255,
    ata: 25,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -10 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'akikos_cleaver',
    label: "Akiko's Cleaver",
    requirement: '0 ATP',
    maxGrind: 0,
    special: 'None',
    atpMin: 1,
    atpMax: 200,
    ata: 1,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'hammer',
    label: 'Hammer',
    requirement: '129 ATP',
    maxGrind: 0,
    special: 'Dark',
    atpMin: 120,
    atpMax: 185,
    ata: 35,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'daisy_chain',
    label: 'Daisy Chain',
    requirement: '400 ATP',
    maxGrind: 0,
    special: 'Chaos',
    atpMin: 350,
    atpMax: 410,
    ata: 32,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'crazy_tune',
    label: 'Crazy Tune',
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Chaos',
    atpMin: 200,
    atpMax: 255,
    ata: 30,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'huge_battle_fan',
    label: 'Huge Battle Fan',
    requirement: '412 ATP',
    maxGrind: 0,
    special: 'Havoc',
    atpMin: 10,
    atpMax: 255,
    ata: 30,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'flowens_sword',
    label: "Flowen's Sword",
    requirement: '430 ATP',
    maxGrind: 28,
    special: 'None',
    atpMin: 230,
    atpMax: 300,
    ata: 28,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'last_survivor',
    label: 'Last Survivor',
    requirement: '470 ATP',
    maxGrind: 31,
    special: 'Fill',
    atpMin: 275,
    atpMax: 321,
    ata: 30,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, hp: 20 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'dragon_slayer',
    label: 'Dragon Slayer',
    requirement: '480 ATP',
    maxGrind: 34,
    special: 'Burning',
    atpMin: 345,
    atpMax: 352,
    ata: 30,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -15 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3060',
    label: "Flowen's Sword (3060)",
    requirement: '378 ATP',
    maxGrind: 12,
    special: 'None',
    atpMin: 135,
    atpMax: 243,
    ata: 7,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3064',
    label: "Flowen's Sword (3064)",
    requirement: '387 ATP',
    maxGrind: 16,
    special: 'None',
    atpMin: 164,
    atpMax: 248,
    ata: 13,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3067',
    label: "Flowen's Sword (3067)",
    requirement: '379 ATP',
    maxGrind: 21,
    special: 'None',
    atpMin: 200,
    atpMax: 256,
    ata: 5,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3073',
    label: "Flowen's Sword (3073)",
    requirement: '385 ATP',
    maxGrind: 34,
    special: 'None',
    atpMin: 197,
    atpMax: 262,
    ata: 15,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3077',
    label: "Flowen's Sword (3077)",
    requirement: '401 ATP',
    maxGrind: 32,
    special: 'None',
    atpMin: 121,
    atpMax: 255,
    ata: 12,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3079',
    label: "Flowen's Sword (3079)",
    requirement: '402 ATP',
    maxGrind: 9,
    special: 'None',
    atpMin: 290,
    atpMax: 300,
    ata: 25,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3082',
    label: "Flowen's Sword (3082)",
    requirement: '388 ATP',
    maxGrind: 12,
    special: 'None',
    atpMin: 211,
    atpMax: 273,
    ata: 17,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3083',
    label: "Flowen's Sword (3083)",
    requirement: '382 ATP',
    maxGrind: 11,
    special: 'None',
    atpMin: 261,
    atpMax: 283,
    ata: 19,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'flowens_sword_3084',
    label: "Flowen's Sword (3084)",
    requirement: '680 ATP',
    maxGrind: 85,
    special: 'Spirit',
    atpMin: 300,
    atpMax: 320,
    ata: 34,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, lck: 5 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'victor_axe',
    label: 'Victor Axe',
    requirement: '400 ATP',
    maxGrind: 20,
    special: 'Fill',
    atpMin: 300,
    atpMax: 420,
    ata: 44,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'red_sword',
    label: 'Red Sword',
    requirement: '630 ATP',
    maxGrind: 52,
    special: 'Seize',
    atpMin: 400,
    atpMax: 611,
    ata: 37,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'chain_sawd',
    label: 'Chain Sawd',
    requirement: '700 ATP',
    maxGrind: 15,
    special: 'Gush',
    atpMin: 500,
    atpMax: 525,
    ata: 36,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -15 },
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'zanba',
    label: 'Zanba',
    requirement: '710 ATP',
    maxGrind: 38,
    special: 'Berserk',
    atpMin: 310,
    atpMax: 438,
    ata: 38,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_HUMAR_HUCAST_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'sealed_j_sword',
    label: 'Sealed J-Sword',
    requirement: '710 ATP',
    maxGrind: 0,
    special: 'Hell',
    atpMin: 420,
    atpMax: 525,
    ata: 35,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'laconium_axe',
    label: 'Laconium Axe',
    requirement: '880 ATP',
    maxGrind: 25,
    special: 'Berserk',
    atpMin: 700,
    atpMax: 750,
    ata: 40,
    ...SWORD_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, evp: -30 },
    compatibleClasses: HUNTER_HUMAR_HUCAST_HUCASEAL_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'dark_flow',
    label: 'Dark Flow',
    requirement: '971 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 756,
    atpMax: 900,
    ata: 50,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'tsumikiri_j_sword',
    label: 'Tsumikiri J-Sword',
    requirement: '910 ATP',
    maxGrind: 50,
    special: 'See Notes',
    atpMin: 700,
    atpMax: 756,
    ata: 40,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'type_sw_sword',
    label: 'TypeSW/Sword',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 150,
    atpMax: 150,
    ata: 35,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },
  {
    id: 'type_sw_j_sword',
    label: 'TypeSW/J-Sword',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 100,
    atpMax: 150,
    ata: 40,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'type_sw_slicer',
    label: 'TypeSW/Slicer',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 100,
    atpMax: 140,
    ata: 45,
    ...SWORD_WEAPON_DEFAULTS,
    hex: '000200',
  },
  {
    id: 'es_sword',
    label: 'ES Sword',
    requirement: '800 ATP',
    maxGrind: 250,
    special: 'Variable',
    atpMin: 200,
    atpMax: 200,
    ata: 35,
    ...SWORD_WEAPON_DEFAULTS,
    compatibleClasses: HUNTER_CHARACTER_CLASS_IDS,
    hex: '000200',
  },

  // --- Double Sabers ---
  {
    id: 'double_saber',
    label: 'Double Saber',
    requirement: '235 ATP',
    maxGrind: 35,
    special: 'Mind',
    atpMin: 150,
    atpMax: 152,
    ata: 30,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'stag_cutlery',
    label: 'Stag Cutlery',
    requirement: '343 ATP',
    maxGrind: 30,
    special: 'Havoc',
    atpMin: 230,
    atpMax: 235,
    ata: 35,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'twin_brand',
    label: 'Twin Brand',
    requirement: '400 ATP',
    maxGrind: 60,
    special: "Devil's",
    atpMin: 235,
    atpMax: 240,
    ata: 39,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'monkey_king_bar',
    label: 'Monkey King Bar',
    requirement: '500 ATP',
    maxGrind: 25,
    special: "Devil's",
    atpMin: 380,
    atpMax: 390,
    ata: 41,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
    conditionalEffects: [
      {
        requirements: { weaponLabels: ['Blue-black Stone'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 0,
      },
    ],
  },
  {
    id: 'girasole',
    label: 'Girasole',
    requirement: '555 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 500,
    atpMax: 550,
    ata: 50,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 2 },
    hex: '000600',
    conditionalEffects: [
      {
        requirements: {},
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 0,
      },
    ],
  },
  {
    id: 'partisan_of_lightning',
    label: 'Partisan of Lightning',
    requirement: '600 ATP',
    maxGrind: 60,
    special: 'Tempest',
    atpMin: 370,
    atpMax: 410,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'demolition_comet',
    label: 'Demolition Comet',
    requirement: '652 ATP',
    maxGrind: 25,
    special: "Devil's",
    atpMin: 530,
    atpMax: 530,
    ata: 38,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'twin_blaze',
    label: 'Twin Blaze',
    requirement: '685 ATP',
    maxGrind: 9,
    special: 'Gifoie',
    atpMin: 300,
    atpMax: 520,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 40 },
    hex: '000600',
  },
  {
    id: 'meteor_cudgel',
    label: 'Meteor Cudgel',
    requirement: '750 ATP',
    maxGrind: 15,
    special: 'Blizzard',
    atpMin: 300,
    atpMax: 560,
    ata: 42,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'vivienne',
    label: 'Vivienne',
    requirement: '580 ATP',
    maxGrind: 50,
    special: 'Heart',
    atpMin: 575,
    atpMax: 590,
    ata: 49,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    conditionalEffects: [
      {
        requirements: { armorLabels: ['Sweetheart'] },
        bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
        weaponAtpMultiplierPercent: 20,
      },
    ],
    hex: '000600',
  },
  {
    id: 'black_king_bar',
    label: 'Black King Bar',
    requirement: '800 ATP',
    maxGrind: 80,
    special: "Devil's",
    atpMin: 590,
    atpMax: 600,
    ata: 43,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'double_cannon',
    label: 'Double Cannon',
    requirement: '900 ATP',
    maxGrind: 0,
    special: 'See Notes',
    atpMin: 620,
    atpMax: 650,
    ata: 45,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'type_ds_d_saber',
    label: 'TypeDS/D.Saber',
    requirement: '350 ATP',
    maxGrind: 125,
    special: 'None',
    atpMin: 30,
    atpMax: 30,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  {
    id: 'type_ds_rod',
    label: 'TypeDS/Rod',
    requirement: '350 MST',
    maxGrind: 80,
    special: 'None',
    atpMin: 10,
    atpMax: 30,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, dfp: 50 },
    hex: '000600',
  },
  {
    id: 'type_ds_wand',
    label: 'TypeDS/Wand',
    requirement: '350 MST',
    maxGrind: 80,
    special: 'None',
    atpMin: 10,
    atpMax: 30,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES, mst: 50 },
    hex: '000600',
  },
  {
    id: 'es_twin',
    label: 'ES Twin',
    requirement: '800 ATP',
    maxGrind: 250,
    special: 'Varies',
    atpMin: 50,
    atpMax: 50,
    ata: 40,
    ...DOUBLE_SABER_WEAPON_DEFAULTS,
    hex: '000600',
  },
  ...ADDITIONAL_CHARACTER_WEAPON_OPTIONS,
]

export const CHARACTER_WEAPON_VALUE_IDS = CHARACTER_WEAPON_OPTIONS.map((weapon) => weapon.id)

const CHARACTER_WEAPON_TYPE_SORT_ORDER: Record<string, number> = {
  None: 0,
  Saber: 1,
  Sword: 2,
  Dagger: 3,
  Partisan: 4,
  Slicer: 5,
  'Double Saber': 6,
  Claw: 7,
  Katana: 8,
  'Twin Sword': 9,
  Fist: 10,
  Handgun: 11,
  Rifle: 12,
  Mechgun: 13,
  Shot: 14,
  Launcher: 15,
  Cane: 16,
  Rod: 17,
  Wand: 18,
  Card: 19,
}

export function sortCharacterWeaponOptions(options: CharacterWeaponOption[]): CharacterWeaponOption[] {
  return [...options].sort((left, right) => {
    const leftRank = CHARACTER_WEAPON_TYPE_SORT_ORDER[left.type] ?? Number.MAX_SAFE_INTEGER
    const rightRank = CHARACTER_WEAPON_TYPE_SORT_ORDER[right.type] ?? Number.MAX_SAFE_INTEGER

    if (leftRank !== rightRank) {
      return leftRank - rightRank
    }

    return 0
  })
}

export const CHARACTER_ARMOR_OPTIONS: CharacterArmorOption[] = [
  {
    id: 'none',
    label: 'Aucune',
    type: 'None',
    rarity: -1,
    requiredLevel: 0,
    requirement: 'Aucun',
    hp: 0,
    tp: 0,
    atp: 0,
    dfpMin: 0,
    dfpMax: 0,
    mst: 0,
    ata: 0,
    evpMin: 0,
    evpMax: 0,
    lck: 0,
    efr: 0,
    eic: 0,
    eth: 0,
    edk: 0,
    elt: 0,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
    conditionalEffects: [],
    compatibleClasses: 'all',
    hex: '000000',
  },
  ...ADDITIONAL_CHARACTER_ARMOR_OPTIONS,
]

export const CHARACTER_ARMOR_VALUE_IDS = CHARACTER_ARMOR_OPTIONS.map((armor) => armor.id)
export const CHARACTER_ARMOR_IDS = CHARACTER_ARMOR_VALUE_IDS
export const INITIAL_CHARACTER_ARMOR_OPTIONS = CHARACTER_ARMOR_OPTIONS.filter((armor) => armor.id !== 'none')

export const CHARACTER_SHIELD_OPTIONS: CharacterShieldOption[] = [
  {
    id: 'none',
    label: 'Aucun',
    type: 'None',
    rarity: -1,
    requiredLevel: 0,
    requirement: 'Aucun',
    hp: 0,
    tp: 0,
    atp: 0,
    dfpMin: 0,
    dfpMax: 0,
    mst: 0,
    ata: 0,
    evpMin: 0,
    evpMax: 0,
    lck: 0,
    efr: 0,
    eic: 0,
    eth: 0,
    edk: 0,
    elt: 0,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
    conditionalEffects: [],
    compatibleClasses: 'all',
    hex: '000000',
  },
  ...ADDITIONAL_CHARACTER_SHIELD_OPTIONS,
]

export const CHARACTER_SHIELD_VALUE_IDS = CHARACTER_SHIELD_OPTIONS.map((shield) => shield.id)
export const CHARACTER_SHIELD_IDS = CHARACTER_SHIELD_VALUE_IDS
export const INITIAL_CHARACTER_SHIELD_OPTIONS = CHARACTER_SHIELD_OPTIONS.filter((shield) => shield.id !== 'none')

export const CHARACTER_UNIT_OPTIONS: CharacterUnitOption[] = [
  {
    id: 'none',
    label: 'Aucun',
    type: 'None',
    hp: 0,
    tp: 0,
    atp: 0,
    dfp: 0,
    mst: 0,
    ata: 0,
    evp: 0,
    lck: 0,
    efr: 0,
    eic: 0,
    eth: 0,
    edk: 0,
    elt: 0,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
    conditionalEffects: [],
    compatibleClasses: 'all',
    hex: '000000',
  },
  ...ADDITIONAL_CHARACTER_UNIT_OPTIONS,
]

export const CHARACTER_UNIT_VALUE_IDS = CHARACTER_UNIT_OPTIONS.map((unit) => unit.id)

export const CHARACTER_UNIT_IDS = CHARACTER_UNIT_VALUE_IDS

export const INITIAL_CHARACTER_UNIT_OPTIONS = CHARACTER_UNIT_OPTIONS.filter((unit) => unit.id !== 'none')

export function getCharacterUnitGroupId(unit: Pick<CharacterUnitOption, 'id' | 'label' | 'groupId'>): CharacterUnitGroupId {
  if (unit.id === 'none') {
    return 'none'
  }

  if (unit.groupId) {
    return unit.groupId
  }

  if (unit.label.endsWith('/HP')) {
    return 'hp'
  }

  if (unit.label.endsWith('/TP')) {
    return 'tp'
  }

  if (unit.label.endsWith('/Power')) {
    return 'power'
  }

  if (unit.label.endsWith('/Body')) {
    return 'body'
  }

  if (unit.label.endsWith('/Mind')) {
    return 'mind'
  }

  if (unit.label.endsWith('/Arm') || unit.label.endsWith('/Arms')) {
    return 'arm'
  }

  if (unit.label.endsWith('/Legs')) {
    return 'legs'
  }

  if (unit.label.endsWith('/Luck')) {
    return 'luck'
  }

  if (unit.label.endsWith('/Ability')) {
    return 'ability'
  }

  if (unit.label.startsWith('Resist/')) {
    if (unit.label === 'Resist/Fire' || unit.label === 'Resist/Flame' || unit.label === 'Resist/Burning') {
      return 'fire'
    }

    if (unit.label === 'Resist/Cold' || unit.label === 'Resist/Freeze' || unit.label === 'Resist/Blizzard') {
      return 'cold'
    }

    if (unit.label === 'Resist/Shock' || unit.label === 'Resist/Thunder' || unit.label === 'Resist/Storm') {
      return 'shock'
    }

    if (unit.label === 'Resist/Dark' || unit.label === 'Resist/Evil' || unit.label === 'Resist/Devil') {
      return 'dark'
    }

    if (unit.label === 'Resist/Light' || unit.label === 'Resist/Saint' || unit.label === 'Resist/Holy') {
      return 'light'
    }
  }

  if (unit.label.endsWith('/Resist')) {
    return 'resist'
  }

  if (unit.label.startsWith('HP/')) {
    return 'hpRestoration'
  }

  if (unit.label.startsWith('TP/')) {
    return 'tpRestoration'
  }

  if (unit.label.startsWith('PB/')) {
    return 'pbGeneration'
  }

  if (unit.label.endsWith('/Battle')) {
    return 'battle'
  }

  if (unit.label.endsWith('/Technique')) {
    return 'technique'
  }

  if (unit.label.startsWith('Cure/')) {
    return 'cure'
  }

  return 'miscellaneous'
}

function createDefenseLimits<T extends Pick<CharacterArmorOption | CharacterShieldOption, 'dfpMin' | 'dfpMax' | 'evpMin' | 'evpMax'>>(options: T[]) {
  return {
    dfpMin: Math.min(...options.map((option) => option.dfpMin)),
    dfpMax: Math.max(...options.map((option) => option.dfpMax)),
    evpMin: Math.min(...options.map((option) => option.evpMin)),
    evpMax: Math.max(...options.map((option) => option.evpMax)),
  } as const
}

export const CHARACTER_ARMOR_LIMITS = createDefenseLimits(CHARACTER_ARMOR_OPTIONS)

export const CHARACTER_SHIELD_LIMITS = createDefenseLimits(CHARACTER_SHIELD_OPTIONS)

export const CHARACTER_MAG_LIMITS = {
  defMin: 5,
  defMax: 200,
  powMin: 0,
  powMax: 195,
  dexMin: 0,
  dexMax: 195,
  mindMin: 0,
  mindMax: 195,
  totalMax: 200,
} as const

export const CHARACTER_WEAPON_ATTRIBUTE_LIMITS = {
  min: -5,
  max: 100,
  step: 5,
  maxModified: 3,
} as const

export const DEFAULT_CHARACTER_WEAPON_ATTRIBUTES: CharacterWeaponAttributes = {
  enemy: 0,
  hit: 0,
}

export const CHARACTER_WEAPON_ATTRIBUTE_OPTIONS: CharacterWeaponAttributeOption[] = [
  { key: 'enemy', label: 'Enemy', defaultValue: DEFAULT_CHARACTER_WEAPON_ATTRIBUTES.enemy },
  { key: 'hit', label: 'Hit', defaultValue: DEFAULT_CHARACTER_WEAPON_ATTRIBUTES.hit },
]

export const CHARACTER_LEVEL_LIMITS = {
  min: 1,
  max: 200,
} as const

export const CHARACTER_MATERIAL_LIMITS = {
  hpMax: 125,
  tpMax: 125,
  regularTotalDefault: 150,
  regularTotalExtended: 250,
} as const

export const CHARACTER_CLASS_MAX_STATS: Partial<Record<CharacterClassId, CharacterMaxStats>> = {
  humar: {
    atp: 1397,
    dfp: 579,
    mst: 732,
    ata: 200,
    evp: 756,
    lck: 100,
  },
  hunewearl: {
    atp: 1237,
    dfp: 589,
    mst: 1177,
    ata: 199,
    evp: 811,
    lck: 100,
  },
  hucast: {
    atp: 1639,
    dfp: 601,
    mst: 0,
    ata: 191,
    evp: 660,
    lck: 100,
  },
  hucaseal: {
    atp: 1301,
    dfp: 525,
    mst: 0,
    ata: 218,
    evp: 877,
    lck: 100,
  },
  ramar: {
    atp: 1260,
    dfp: 515,
    mst: 665,
    ata: 249,
    evp: 715,
    lck: 100,
  },
  ramarl: {
    atp: 1145,
    dfp: 577,
    mst: 1031,
    ata: 241,
    evp: 900,
    lck: 100,
  },
  racast: {
    atp: 1350,
    dfp: 606,
    mst: 0,
    ata: 224,
    evp: 699,
    lck: 100,
  },
  racaseal: {
    atp: 1175,
    dfp: 688,
    mst: 0,
    ata: 231,
    evp: 787,
    lck: 100,
  },
  fomar: {
    atp: 1002,
    dfp: 470,
    mst: 1340,
    ata: 163,
    evp: 651,
    lck: 100,
  },
  fomarl: {
    atp: 872,
    dfp: 498,
    mst: 1284,
    ata: 170,
    evp: 588,
    lck: 100,
  },
  fonewm: {
    atp: 814,
    dfp: 463,
    mst: 1500,
    ata: 180,
    evp: 679,
    lck: 100,
  },
  fonewearl: {
    atp: 583,
    dfp: 390,
    mst: 2750,
    ata: 186,
    evp: 883,
    lck: 100,
  },
}

export const DEFAULT_CHARACTER_MATERIALS: CharacterMaterials = {
  hp: CHARACTER_MATERIAL_LIMITS.hpMax,
  tp: CHARACTER_MATERIAL_LIMITS.tpMax,
  power: 0,
  def: 0,
  mind: 0,
  evade: 0,
  luck: 0,
}

export function isAndroidClassId(classId: CharacterClassId): boolean {
  return CHARACTER_ANDROID_CLASS_IDS.includes(classId as (typeof CHARACTER_ANDROID_CLASS_IDS)[number])
}

export function getRegularMaterialLimit(classId: CharacterClassId): number {
  return CHARACTER_HIGH_MATERIAL_CAP_CLASS_IDS.includes(classId as (typeof CHARACTER_HIGH_MATERIAL_CAP_CLASS_IDS)[number])
    ? CHARACTER_MATERIAL_LIMITS.regularTotalExtended
    : CHARACTER_MATERIAL_LIMITS.regularTotalDefault
}

export function countRegularMaterials(materials: Pick<CharacterMaterials, CharacterRegularMaterialKey>): number {
  return CHARACTER_REGULAR_MATERIAL_KEYS.reduce((total, key) => total + materials[key], 0)
}

export function getCharacterMaxStat(classId: CharacterClassId, stat: CharacterCappedStatKey): number | undefined {
  return CHARACTER_CLASS_MAX_STATS[classId]?.[stat]
}

export function clampCharacterCappedStat(classId: CharacterClassId, stat: CharacterCappedStatKey, value: number): number {
  const maximum = getCharacterMaxStat(classId, stat)

  if (maximum === undefined) {
    return value
  }

  return Math.min(value, maximum)
}

const HUNTER_BASE_WEAPON_ID = 'saber'
const RANGER_BASE_WEAPON_ID = 'handgun'
const FORCE_BASE_WEAPON_ID = 'cane'

export function getBaseWeaponIdForCharacterClass(classId: CharacterClassId): string {
  if ((HUNTER_CHARACTER_CLASS_IDS as readonly CharacterClassId[]).includes(classId)) {
    return HUNTER_BASE_WEAPON_ID
  }

  if ((RANGER_CHARACTER_CLASS_IDS as readonly CharacterClassId[]).includes(classId)) {
    return RANGER_BASE_WEAPON_ID
  }

  return FORCE_BASE_WEAPON_ID
}

export function createBaseCharacterConfigForClass(classId: CharacterClassId): CharacterConfigInput {
  return {
    classId,
    level: CHARACTER_LEVEL_LIMITS.min,
    difficulty: 'normal',
    gameMode: 'normal',
    attackType: 'normal',
    shiftaLevel: 0,
    zalureLevel: 0,
    weaponId: getBaseWeaponIdForCharacterClass(classId),
    specialId: 'none',
    grind: 0,
    weaponAttributes: { ...DEFAULT_CHARACTER_WEAPON_ATTRIBUTES },
    armorId: 'frame',
    armorDfp: 0,
    armorEvp: 0,
    shieldId: 'none',
    shieldDfp: 0,
    shieldEvp: 0,
    magDef: CHARACTER_MAG_LIMITS.defMin,
    magPow: CHARACTER_MAG_LIMITS.powMin,
    magDex: CHARACTER_MAG_LIMITS.dexMin,
    magMind: CHARACTER_MAG_LIMITS.mindMin,
    materials: {
      hp: 0,
      tp: 0,
      power: 0,
      def: 0,
      mind: 0,
      evade: 0,
      luck: 0,
    },
    unitSlot1Id: 'none',
    unitSlot2Id: 'none',
    unitSlot3Id: 'none',
    unitSlot4Id: 'none',
  }
}

export const DEFAULT_CHARACTER_CONFIG: CharacterConfigInput = createBaseCharacterConfigForClass('humar')

export { OPTIMAL_CHARACTER_CONFIGS, type OptimalCharacterClassConfig } from './optimalCharacterConfigs.js'

const weaponAttributeSchema = z
  .number()
  .int()
  .min(CHARACTER_WEAPON_ATTRIBUTE_LIMITS.min)
  .max(CHARACTER_WEAPON_ATTRIBUTE_LIMITS.max)
  .multipleOf(CHARACTER_WEAPON_ATTRIBUTE_LIMITS.step)

export const characterWeaponAttributesSchema = z.object({
  enemy: weaponAttributeSchema,
  hit: weaponAttributeSchema,
})

const regularMaterialSchema = z.number().int().min(0).max(CHARACTER_MATERIAL_LIMITS.regularTotalExtended)

export const characterMaterialsSchema = z.object({
  hp: z.number().int().min(0).max(CHARACTER_MATERIAL_LIMITS.hpMax),
  tp: z.number().int().min(0).max(CHARACTER_MATERIAL_LIMITS.tpMax),
  power: regularMaterialSchema,
  def: regularMaterialSchema,
  mind: regularMaterialSchema,
  evade: regularMaterialSchema,
  luck: regularMaterialSchema,
})

export const characterArmorOptionSchema = z.object({
  id: z.string().refine((value) => CHARACTER_ARMOR_VALUE_IDS.includes(value), 'Unknown armor selection.'),
  label: z.string(),
  type: z.string(),
  rarity: z.number().int().min(-1),
  requiredLevel: z.number().int().min(0),
  requirement: z.string(),
  hp: z.number().int(),
  tp: z.number().int(),
  atp: z.number().int(),
  dfpMin: z.number().int(),
  dfpMax: z.number().int(),
  mst: z.number().int(),
  ata: z.number().int(),
  evpMin: z.number().int(),
  evpMax: z.number().int(),
  lck: z.number().int(),
  efr: z.number().int(),
  eic: z.number().int(),
  eth: z.number().int(),
  edk: z.number().int(),
  elt: z.number().int(),
  bonuses: z.object({
    hp: z.number().int(),
    tp: z.number().int(),
    atp: z.number().int(),
    dfp: z.number().int(),
    mst: z.number().int(),
    ata: z.number().int(),
    evp: z.number().int(),
    lck: z.number().int(),
    efr: z.number().int(),
    eic: z.number().int(),
    eth: z.number().int(),
    edk: z.number().int(),
    elt: z.number().int(),
  }),
  conditionalEffects: z.array(z.object({
    requirements: z.object({
      weaponLabels: z.array(z.string()).optional(),
      armorLabels: z.array(z.string()).optional(),
      shieldLabels: z.array(z.string()).optional(),
      unitLabels: z.array(z.string()).optional(),
      magLabels: z.array(z.string()).optional(),
    }),
    bonuses: z.object({
      hp: z.number().int(),
      tp: z.number().int(),
      atp: z.number().int(),
      dfp: z.number().int(),
      mst: z.number().int(),
      ata: z.number().int(),
      evp: z.number().int(),
      lck: z.number().int(),
      efr: z.number().int(),
      eic: z.number().int(),
      eth: z.number().int(),
      edk: z.number().int(),
      elt: z.number().int(),
    }),
    weaponAtpMultiplierPercent: z.number().int(),
  })),
  compatibleClasses: z.union([z.literal('all'), z.array(z.enum(CHARACTER_CLASS_IDS))]),
  hex: z.string(),
})

export const characterShieldOptionSchema = z.object({
  id: z.string().refine((value) => CHARACTER_SHIELD_VALUE_IDS.includes(value), 'Unknown shield selection.'),
  label: z.string(),
  type: z.string(),
  rarity: z.number().int().min(-1),
  requiredLevel: z.number().int().min(0),
  requirement: z.string(),
  hp: z.number().int(),
  tp: z.number().int(),
  atp: z.number().int(),
  dfpMin: z.number().int(),
  dfpMax: z.number().int(),
  mst: z.number().int(),
  ata: z.number().int(),
  evpMin: z.number().int(),
  evpMax: z.number().int(),
  lck: z.number().int(),
  efr: z.number().int(),
  eic: z.number().int(),
  eth: z.number().int(),
  edk: z.number().int(),
  elt: z.number().int(),
  bonuses: z.object({
    hp: z.number().int(),
    tp: z.number().int(),
    atp: z.number().int(),
    dfp: z.number().int(),
    mst: z.number().int(),
    ata: z.number().int(),
    evp: z.number().int(),
    lck: z.number().int(),
    efr: z.number().int(),
    eic: z.number().int(),
    eth: z.number().int(),
    edk: z.number().int(),
    elt: z.number().int(),
  }),
  conditionalEffects: z.array(z.object({
    requirements: z.object({
      weaponLabels: z.array(z.string()).optional(),
      armorLabels: z.array(z.string()).optional(),
      shieldLabels: z.array(z.string()).optional(),
      unitLabels: z.array(z.string()).optional(),
      magLabels: z.array(z.string()).optional(),
    }),
    bonuses: z.object({
      hp: z.number().int(),
      tp: z.number().int(),
      atp: z.number().int(),
      dfp: z.number().int(),
      mst: z.number().int(),
      ata: z.number().int(),
      evp: z.number().int(),
      lck: z.number().int(),
      efr: z.number().int(),
      eic: z.number().int(),
      eth: z.number().int(),
      edk: z.number().int(),
      elt: z.number().int(),
    }),
    weaponAtpMultiplierPercent: z.number().int(),
  })),
  compatibleClasses: z.union([z.literal('all'), z.array(z.enum(CHARACTER_CLASS_IDS))]),
  hex: z.string(),
})

const characterConditionRequirementsSchema = z.object({
  weaponLabels: z.array(z.string()).optional(),
  weaponTypes: z.array(z.string()).optional(),
  weaponSpecials: z.array(z.string()).optional(),
  armorLabels: z.array(z.string()).optional(),
  shieldLabels: z.array(z.string()).optional(),
  unitLabels: z.array(z.string()).optional(),
  magLabels: z.array(z.string()).optional(),
})

const characterConditionalBonusesSchema = z.object({
  hp: z.number().int(),
  tp: z.number().int(),
  atp: z.number().int(),
  dfp: z.number().int(),
  mst: z.number().int(),
  ata: z.number(),
  evp: z.number().int(),
  lck: z.number().int(),
  efr: z.number().int(),
  eic: z.number().int(),
  eth: z.number().int(),
  edk: z.number().int(),
  elt: z.number().int(),
})

const characterConditionalEffectSchema = z.object({
  requirements: characterConditionRequirementsSchema,
  bonuses: characterConditionalBonusesSchema,
  weaponAtpMultiplierPercent: z.number().int(),
  attackSpeedPercent: z.number().int().optional(),
  techniqueLevelBonus: z.number().int().optional(),
  tpCostModifierPercent: z.number().int().optional(),
  statusSpecialSuccessRatePercent: z.number().int().optional(),
  instantKillSpecialSuccessRatePercent: z.number().int().optional(),
  ignoresRangedAccuracyPenalty: z.boolean().optional(),
  reducesTechniqueChargeTime: z.boolean().optional(),
  reducesTechniqueCastTime: z.boolean().optional(),
})

export const characterUnitOptionSchema = z.object({
  id: z.string().refine((value) => CHARACTER_UNIT_VALUE_IDS.includes(value), 'Unknown unit selection.'),
  label: z.string(),
  type: z.string(),
  hp: z.number().int(),
  tp: z.number().int(),
  atp: z.number().int(),
  dfp: z.number().int(),
  mst: z.number().int(),
  ata: z.number(),
  evp: z.number().int(),
  lck: z.number().int(),
  efr: z.number().int(),
  eic: z.number().int(),
  eth: z.number().int(),
  edk: z.number().int(),
  elt: z.number().int(),
  bonuses: z.object({
    hp: z.number().int(),
    tp: z.number().int(),
    atp: z.number().int(),
    dfp: z.number().int(),
    mst: z.number().int(),
    ata: z.number(),
    evp: z.number().int(),
    lck: z.number().int(),
    efr: z.number().int(),
    eic: z.number().int(),
    eth: z.number().int(),
    edk: z.number().int(),
    elt: z.number().int(),
  }),
  conditionalEffects: z.array(characterConditionalEffectSchema),
  compatibleClasses: z.union([z.literal('all'), z.array(z.enum(CHARACTER_CLASS_IDS))]),
  hex: z.string(),
})

export const INITIAL_CLASS_LEVEL_STATS: ClassLevelStats[] = [
  // HUmar
  { classId: 'humar', level: 1, hp: 40, tp: 29, atp: 45, dfp: 17, mst: 29, ata: 68, evp: 45, lck: 10, exp: 0 },
  { classId: 'humar', level: 5, hp: 68, tp: 51, atp: 71, dfp: 20, mst: 47, ata: 71, evp: 67, lck: 10, exp: 800 },
  { classId: 'humar', level: 10, hp: 104, tp: 79, atp: 104, dfp: 23, mst: 70, ata: 74, evp: 94, lck: 10, exp: 4050 },
  { classId: 'humar', level: 15, hp: 138, tp: 100, atp: 136, dfp: 27, mst: 86, ata: 78, evp: 122, lck: 10, exp: 9848 },
  { classId: 'humar', level: 20, hp: 174, tp: 120, atp: 167, dfp: 30, mst: 101, ata: 81, evp: 149, lck: 10, exp: 20539 },
  { classId: 'humar', level: 25, hp: 208, tp: 141, atp: 200, dfp: 34, mst: 117, ata: 85, evp: 177, lck: 10, exp: 39924 },
  { classId: 'humar', level: 30, hp: 244, tp: 163, atp: 232, dfp: 42, mst: 134, ata: 88, evp: 202, lck: 10, exp: 69816 },
  { classId: 'humar', level: 35, hp: 278, tp: 183, atp: 265, dfp: 49, mst: 149, ata: 92, evp: 227, lck: 10, exp: 111455 },
  { classId: 'humar', level: 40, hp: 314, tp: 199, atp: 297, dfp: 57, mst: 160, ata: 95, evp: 251, lck: 10, exp: 166145 },
  { classId: 'humar', level: 45, hp: 346, tp: 222, atp: 327, dfp: 64, mst: 178, ata: 99, evp: 273, lck: 10, exp: 235166 },
  { classId: 'humar', level: 50, hp: 376, tp: 248, atp: 356, dfp: 72, mst: 199, ata: 102, evp: 293, lck: 10, exp: 319847 },
  { classId: 'humar', level: 55, hp: 406, tp: 274, atp: 389, dfp: 80, mst: 220, ata: 105, evp: 310, lck: 10, exp: 421524 },
  { classId: 'humar', level: 60, hp: 436, tp: 295, atp: 421, dfp: 87, mst: 236, ata: 108, evp: 325, lck: 10, exp: 541513 },
  { classId: 'humar', level: 65, hp: 466, tp: 320, atp: 453, dfp: 97, mst: 256, ata: 111, evp: 338, lck: 10, exp: 681023 },
  { classId: 'humar', level: 70, hp: 496, tp: 341, atp: 486, dfp: 106, mst: 272, ata: 114, evp: 350, lck: 10, exp: 841271 },
  { classId: 'humar', level: 75, hp: 526, tp: 365, atp: 510, dfp: 116, mst: 291, ata: 117, evp: 360, lck: 10, exp: 1023533 },
  { classId: 'humar', level: 80, hp: 556, tp: 386, atp: 532, dfp: 126, mst: 307, ata: 120, evp: 368, lck: 10, exp: 1229071 },
  { classId: 'humar', level: 85, hp: 586, tp: 410, atp: 551, dfp: 136, mst: 326, ata: 123, evp: 378, lck: 10, exp: 1459348 },
  { classId: 'humar', level: 90, hp: 616, tp: 431, atp: 566, dfp: 150, mst: 342, ata: 126, evp: 388, lck: 10, exp: 1717321 },
  { classId: 'humar', level: 95, hp: 656, tp: 456, atp: 581, dfp: 165, mst: 362, ata: 129, evp: 398, lck: 10, exp: 2008126 },
  { classId: 'humar', level: 100, hp: 696, tp: 481, atp: 596, dfp: 180, mst: 382, ata: 132, evp: 403, lck: 10, exp: 2339735 },
  { classId: 'humar', level: 105, hp: 736, tp: 501, atp: 611, dfp: 195, mst: 397, ata: 135, evp: 415, lck: 10, exp: 2743485 },
  { classId: 'humar', level: 110, hp: 776, tp: 521, atp: 626, dfp: 210, mst: 412, ata: 137, evp: 434, lck: 10, exp: 3270523 },
  { classId: 'humar', level: 115, hp: 816, tp: 541, atp: 641, dfp: 225, mst: 427, ata: 140, evp: 456, lck: 10, exp: 3954983 },
  { classId: 'humar', level: 120, hp: 860, tp: 561, atp: 657, dfp: 240, mst: 442, ata: 142, evp: 480, lck: 10, exp: 4835405 },
  { classId: 'humar', level: 125, hp: 908, tp: 581, atp: 677, dfp: 255, mst: 457, ata: 145, evp: 500, lck: 10, exp: 5956316 },
  { classId: 'humar', level: 130, hp: 948, tp: 601, atp: 697, dfp: 270, mst: 472, ata: 147, evp: 523, lck: 10, exp: 7337658 },
  { classId: 'humar', level: 135, hp: 988, tp: 621, atp: 717, dfp: 285, mst: 487, ata: 150, evp: 539, lck: 10, exp: 8994927 },
  { classId: 'humar', level: 140, hp: 1028, tp: 641, atp: 737, dfp: 299, mst: 502, ata: 152, evp: 552, lck: 10, exp: 10939630 },
  { classId: 'humar', level: 145, hp: 1066, tp: 661, atp: 757, dfp: 312, mst: 517, ata: 155, evp: 562, lck: 10, exp: 13184299 },
  { classId: 'humar', level: 150, hp: 1096, tp: 680, atp: 777, dfp: 324, mst: 531, ata: 157, evp: 578, lck: 10, exp: 15741551 },
  { classId: 'humar', level: 155, hp: 1126, tp: 695, atp: 797, dfp: 335, mst: 541, ata: 159, evp: 599, lck: 10, exp: 18623854 },
  { classId: 'humar', level: 160, hp: 1156, tp: 710, atp: 817, dfp: 345, mst: 551, ata: 161, evp: 613, lck: 10, exp: 21844850 },
  { classId: 'humar', level: 165, hp: 1186, tp: 725, atp: 837, dfp: 355, mst: 561, ata: 163, evp: 627, lck: 10, exp: 25426153 },
  { classId: 'humar', level: 170, hp: 1216, tp: 739, atp: 857, dfp: 365, mst: 570, ata: 165, evp: 644, lck: 10, exp: 29395299 },
  { classId: 'humar', level: 175, hp: 1246, tp: 749, atp: 877, dfp: 375, mst: 575, ata: 167, evp: 656, lck: 10, exp: 33802211 },
  { classId: 'humar', level: 180, hp: 1276, tp: 759, atp: 897, dfp: 385, mst: 580, ata: 169, evp: 663, lck: 10, exp: 38751371 },
  { classId: 'humar', level: 185, hp: 1306, tp: 769, atp: 915, dfp: 395, mst: 585, ata: 170, evp: 668, lck: 10, exp: 44504634 },
  { classId: 'humar', level: 190, hp: 1340, tp: 779, atp: 925, dfp: 405, mst: 590, ata: 172, evp: 673, lck: 10, exp: 52082887 },
  { classId: 'humar', level: 195, hp: 1380, tp: 788, atp: 935, dfp: 415, mst: 594, ata: 173, evp: 678, lck: 10, exp: 63728621 },
  { classId: 'humar', level: 200, hp: 1420, tp: 793, atp: 943, dfp: 422, mst: 594, ata: 174, evp: 682, lck: 10, exp: 83227800 },
  // HUnewearl
  { classId: 'hunewearl', level: 1, hp: 38, tp: 40, atp: 40, dfp: 22, mst: 40, ata: 63, evp: 60, lck: 10, exp: 0 },
  { classId: 'hunewearl', level: 5, hp: 64, tp: 61, atp: 61, dfp: 29, mst: 57, ata: 66, evp: 87, lck: 10, exp: 800 },
  { classId: 'hunewearl', level: 10, hp: 98, tp: 87, atp: 88, dfp: 37, mst: 78, ata: 69, evp: 120, lck: 10, exp: 4050 },
  { classId: 'hunewearl', level: 15, hp: 130, tp: 113, atp: 115, dfp: 46, mst: 99, ata: 72, evp: 154, lck: 10, exp: 9848 },
  { classId: 'hunewearl', level: 20, hp: 162, tp: 140, atp: 142, dfp: 54, mst: 121, ata: 75, evp: 187, lck: 10, exp: 20539 },
  { classId: 'hunewearl', level: 25, hp: 194, tp: 166, atp: 169, dfp: 62, mst: 142, ata: 78, evp: 220, lck: 10, exp: 39924 },
  { classId: 'hunewearl', level: 30, hp: 228, tp: 192, atp: 197, dfp: 71, mst: 163, ata: 80, evp: 250, lck: 10, exp: 69816 },
  { classId: 'hunewearl', level: 35, hp: 260, tp: 218, atp: 224, dfp: 79, mst: 184, ata: 83, evp: 277, lck: 10, exp: 111455 },
  { classId: 'hunewearl', level: 40, hp: 292, tp: 245, atp: 252, dfp: 87, mst: 206, ata: 86, evp: 297, lck: 10, exp: 166145 },
  { classId: 'hunewearl', level: 45, hp: 326, tp: 271, atp: 281, dfp: 96, mst: 227, ata: 89, evp: 315, lck: 10, exp: 235166 },
  { classId: 'hunewearl', level: 50, hp: 358, tp: 297, atp: 312, dfp: 104, mst: 248, ata: 91, evp: 330, lck: 10, exp: 319847 },
  { classId: 'hunewearl', level: 55, hp: 388, tp: 323, atp: 346, dfp: 112, mst: 269, ata: 94, evp: 342, lck: 10, exp: 421524 },
  { classId: 'hunewearl', level: 60, hp: 418, tp: 350, atp: 378, dfp: 121, mst: 291, ata: 97, evp: 352, lck: 10, exp: 541513 },
  { classId: 'hunewearl', level: 65, hp: 448, tp: 376, atp: 409, dfp: 130, mst: 312, ata: 100, evp: 362, lck: 10, exp: 681023 },
  { classId: 'hunewearl', level: 70, hp: 478, tp: 402, atp: 435, dfp: 140, mst: 333, ata: 102, evp: 372, lck: 10, exp: 841271 },
  { classId: 'hunewearl', level: 75, hp: 508, tp: 428, atp: 455, dfp: 150, mst: 354, ata: 105, evp: 382, lck: 10, exp: 1023533 },
  { classId: 'hunewearl', level: 80, hp: 538, tp: 455, atp: 470, dfp: 160, mst: 376, ata: 108, evp: 387, lck: 10, exp: 1229071 },
  { classId: 'hunewearl', level: 85, hp: 568, tp: 481, atp: 490, dfp: 170, mst: 397, ata: 111, evp: 392, lck: 10, exp: 1459348 },
  { classId: 'hunewearl', level: 90, hp: 598, tp: 507, atp: 505, dfp: 180, mst: 418, ata: 113, evp: 397, lck: 10, exp: 1717321 },
  { classId: 'hunewearl', level: 95, hp: 628, tp: 533, atp: 520, dfp: 190, mst: 439, ata: 116, evp: 405, lck: 10, exp: 2008126 },
  { classId: 'hunewearl', level: 100, hp: 658, tp: 560, atp: 535, dfp: 200, mst: 461, ata: 119, evp: 415, lck: 10, exp: 2339735 },
  { classId: 'hunewearl', level: 105, hp: 688, tp: 593, atp: 550, dfp: 212, mst: 489, ata: 121, evp: 425, lck: 10, exp: 2743485 },
  { classId: 'hunewearl', level: 110, hp: 718, tp: 624, atp: 565, dfp: 225, mst: 515, ata: 123, evp: 435, lck: 10, exp: 3270523 },
  { classId: 'hunewearl', level: 115, hp: 748, tp: 656, atp: 580, dfp: 239, mst: 542, ata: 123, evp: 445, lck: 10, exp: 3954983 },
  { classId: 'hunewearl', level: 120, hp: 778, tp: 683, atp: 595, dfp: 255, mst: 564, ata: 126, evp: 456, lck: 10, exp: 4835405 },
  { classId: 'hunewearl', level: 125, hp: 816, tp: 709, atp: 610, dfp: 271, mst: 585, ata: 128, evp: 471, lck: 10, exp: 5956316 },
  { classId: 'hunewearl', level: 130, hp: 856, tp: 734, atp: 625, dfp: 288, mst: 605, ata: 129, evp: 486, lck: 10, exp: 7337658 },
  { classId: 'hunewearl', level: 135, hp: 896, tp: 759, atp: 640, dfp: 307, mst: 625, ata: 131, evp: 501, lck: 10, exp: 8994927 },
  { classId: 'hunewearl', level: 140, hp: 936, tp: 784, atp: 655, dfp: 325, mst: 645, ata: 132, evp: 516, lck: 10, exp: 10939630 },
  { classId: 'hunewearl', level: 145, hp: 976, tp: 809, atp: 670, dfp: 343, mst: 665, ata: 134, evp: 531, lck: 10, exp: 13184299 },
  { classId: 'hunewearl', level: 150, hp: 1016, tp: 834, atp: 685, dfp: 362, mst: 685, ata: 135, evp: 546, lck: 10, exp: 15741551 },
  { classId: 'hunewearl', level: 155, hp: 1046, tp: 859, atp: 700, dfp: 380, mst: 705, ata: 137, evp: 561, lck: 10, exp: 18623854 },
  { classId: 'hunewearl', level: 160, hp: 1076, tp: 884, atp: 715, dfp: 398, mst: 725, ata: 138, evp: 576, lck: 10, exp: 21844850 },
  { classId: 'hunewearl', level: 165, hp: 1106, tp: 909, atp: 730, dfp: 415, mst: 745, ata: 140, evp: 591, lck: 10, exp: 25426153 },
  { classId: 'hunewearl', level: 170, hp: 1136, tp: 934, atp: 745, dfp: 432, mst: 765, ata: 141, evp: 606, lck: 10, exp: 29395299 },
  { classId: 'hunewearl', level: 175, hp: 1166, tp: 959, atp: 760, dfp: 450, mst: 785, ata: 143, evp: 616, lck: 10, exp: 33802211 },
  { classId: 'hunewearl', level: 180, hp: 1196, tp: 984, atp: 775, dfp: 468, mst: 805, ata: 144, evp: 626, lck: 10, exp: 38751371 },
  { classId: 'hunewearl', level: 185, hp: 1226, tp: 1009, atp: 790, dfp: 485, mst: 825, ata: 145, evp: 636, lck: 10, exp: 44504634 },
  { classId: 'hunewearl', level: 190, hp: 1256, tp: 1034, atp: 805, dfp: 502, mst: 845, ata: 146, evp: 646, lck: 10, exp: 52082887 },
  { classId: 'hunewearl', level: 195, hp: 1286, tp: 1059, atp: 820, dfp: 520, mst: 865, ata: 147, evp: 656, lck: 10, exp: 63728621 },
  { classId: 'hunewearl', level: 200, hp: 1308, tp: 1084, atp: 835, dfp: 538, mst: 885, ata: 147, evp: 666, lck: 10, exp: 83227800 },
  // HUcast
  { classId: 'hucast', level: 1, hp: 44, tp: 0, atp: 45, dfp: 18, mst: 0, ata: 64, evp: 35, lck: 10, exp: 0 },
  { classId: 'hucast', level: 5, hp: 76, tp: 0, atp: 76, dfp: 23, mst: 0, ata: 67, evp: 54, lck: 10, exp: 800 },
  { classId: 'hucast', level: 10, hp: 116, tp: 0, atp: 114, dfp: 29, mst: 0, ata: 70, evp: 77, lck: 10, exp: 4050 },
  { classId: 'hucast', level: 15, hp: 156, tp: 0, atp: 150, dfp: 35, mst: 0, ata: 73, evp: 101, lck: 10, exp: 9848 },
  { classId: 'hucast', level: 20, hp: 196, tp: 0, atp: 187, dfp: 41, mst: 0, ata: 76, evp: 124, lck: 10, exp: 20539 },
  { classId: 'hucast', level: 25, hp: 234, tp: 0, atp: 222, dfp: 48, mst: 0, ata: 79, evp: 145, lck: 10, exp: 39924 },
  { classId: 'hucast', level: 30, hp: 268, tp: 0, atp: 255, dfp: 55, mst: 0, ata: 82, evp: 165, lck: 10, exp: 69816 },
  { classId: 'hucast', level: 35, hp: 302, tp: 0, atp: 284, dfp: 62, mst: 0, ata: 85, evp: 183, lck: 10, exp: 111455 },
  { classId: 'hucast', level: 40, hp: 334, tp: 0, atp: 314, dfp: 69, mst: 0, ata: 87, evp: 201, lck: 10, exp: 166145 },
  { classId: 'hucast', level: 45, hp: 366, tp: 0, atp: 338, dfp: 75, mst: 0, ata: 90, evp: 216, lck: 10, exp: 235166 },
  { classId: 'hucast', level: 50, hp: 398, tp: 0, atp: 363, dfp: 82, mst: 0, ata: 94, evp: 231, lck: 10, exp: 319847 },
  { classId: 'hucast', level: 55, hp: 430, tp: 0, atp: 385, dfp: 90, mst: 0, ata: 97, evp: 246, lck: 10, exp: 421524 },
  { classId: 'hucast', level: 60, hp: 462, tp: 0, atp: 408, dfp: 97, mst: 0, ata: 100, evp: 261, lck: 10, exp: 541513 },
  { classId: 'hucast', level: 65, hp: 492, tp: 0, atp: 435, dfp: 105, mst: 0, ata: 104, evp: 276, lck: 10, exp: 681023 },
  { classId: 'hucast', level: 70, hp: 524, tp: 0, atp: 466, dfp: 113, mst: 0, ata: 107, evp: 291, lck: 10, exp: 841271 },
  { classId: 'hucast', level: 75, hp: 554, tp: 0, atp: 499, dfp: 123, mst: 0, ata: 110, evp: 306, lck: 10, exp: 1023533 },
  { classId: 'hucast', level: 80, hp: 586, tp: 0, atp: 531, dfp: 133, mst: 0, ata: 113, evp: 321, lck: 10, exp: 1229071 },
  { classId: 'hucast', level: 85, hp: 626, tp: 0, atp: 564, dfp: 143, mst: 0, ata: 116, evp: 336, lck: 10, exp: 1459348 },
  { classId: 'hucast', level: 90, hp: 666, tp: 0, atp: 595, dfp: 153, mst: 0, ata: 119, evp: 351, lck: 10, exp: 1717321 },
  { classId: 'hucast', level: 95, hp: 706, tp: 0, atp: 621, dfp: 164, mst: 0, ata: 122, evp: 366, lck: 10, exp: 2008126 },
  { classId: 'hucast', level: 100, hp: 746, tp: 0, atp: 646, dfp: 179, mst: 0, ata: 125, evp: 382, lck: 10, exp: 2339735 },
  { classId: 'hucast', level: 105, hp: 796, tp: 0, atp: 671, dfp: 194, mst: 0, ata: 128, evp: 397, lck: 10, exp: 2743485 },
  { classId: 'hucast', level: 110, hp: 846, tp: 0, atp: 696, dfp: 209, mst: 0, ata: 130, evp: 412, lck: 10, exp: 3270523 },
  { classId: 'hucast', level: 115, hp: 906, tp: 0, atp: 721, dfp: 224, mst: 0, ata: 133, evp: 422, lck: 10, exp: 3954983 },
  { classId: 'hucast', level: 120, hp: 972, tp: 0, atp: 746, dfp: 242, mst: 0, ata: 135, evp: 428, lck: 10, exp: 4835405 },
  { classId: 'hucast', level: 125, hp: 1042, tp: 0, atp: 771, dfp: 262, mst: 0, ata: 136, evp: 435, lck: 10, exp: 5956316 },
  { classId: 'hucast', level: 130, hp: 1112, tp: 0, atp: 796, dfp: 282, mst: 0, ata: 138, evp: 445, lck: 10, exp: 7337658 },
  { classId: 'hucast', level: 135, hp: 1172, tp: 0, atp: 821, dfp: 302, mst: 0, ata: 139, evp: 455, lck: 10, exp: 8994927 },
  { classId: 'hucast', level: 140, hp: 1232, tp: 0, atp: 846, dfp: 322, mst: 0, ata: 141, evp: 467, lck: 10, exp: 10939630 },
  { classId: 'hucast', level: 145, hp: 1292, tp: 0, atp: 871, dfp: 342, mst: 0, ata: 142, evp: 482, lck: 10, exp: 13184299 },
  { classId: 'hucast', level: 150, hp: 1350, tp: 0, atp: 896, dfp: 361, mst: 0, ata: 144, evp: 497, lck: 10, exp: 15741551 },
  { classId: 'hucast', level: 155, hp: 1400, tp: 0, atp: 921, dfp: 376, mst: 0, ata: 145, evp: 512, lck: 10, exp: 18623854 },
  { classId: 'hucast', level: 160, hp: 1450, tp: 0, atp: 946, dfp: 391, mst: 0, ata: 147, evp: 525, lck: 10, exp: 21844850 },
  { classId: 'hucast', level: 165, hp: 1500, tp: 0, atp: 971, dfp: 406, mst: 0, ata: 147, evp: 535, lck: 10, exp: 25426153 },
  { classId: 'hucast', level: 170, hp: 1544, tp: 0, atp: 996, dfp: 421, mst: 0, ata: 150, evp: 545, lck: 10, exp: 29395299 },
  { classId: 'hucast', level: 175, hp: 1584, tp: 0, atp: 1021, dfp: 436, mst: 0, ata: 151, evp: 555, lck: 10, exp: 33802211 },
  { classId: 'hucast', level: 180, hp: 1624, tp: 0, atp: 1046, dfp: 451, mst: 0, ata: 153, evp: 565, lck: 10, exp: 38751371 },
  { classId: 'hucast', level: 185, hp: 1664, tp: 0, atp: 1071, dfp: 466, mst: 0, ata: 154, evp: 570, lck: 10, exp: 44504634 },
  { classId: 'hucast', level: 190, hp: 1702, tp: 0, atp: 1096, dfp: 481, mst: 0, ata: 156, evp: 575, lck: 10, exp: 52082887 },
  { classId: 'hucast', level: 195, hp: 1732, tp: 0, atp: 1121, dfp: 491, mst: 0, ata: 157, evp: 580, lck: 10, exp: 63728621 },
  { classId: 'hucast', level: 200, hp: 1762, tp: 0, atp: 1146, dfp: 501, mst: 0, ata: 159, evp: 585, lck: 10, exp: 83227800 },
  // HUcaseal
  { classId: 'hucaseal', level: 1, hp: 44, tp: 0, atp: 45, dfp: 18, mst: 0, ata: 71, evp: 35, lck: 10, exp: 0 },
  { classId: 'hucaseal', level: 5, hp: 76, tp: 0, atp: 70, dfp: 25, mst: 0, ata: 75, evp: 60, lck: 10, exp: 800 },
  { classId: 'hucaseal', level: 10, hp: 112, tp: 0, atp: 99, dfp: 33, mst: 0, ata: 78, evp: 89, lck: 10, exp: 4050 },
  { classId: 'hucaseal', level: 15, hp: 146, tp: 0, atp: 130, dfp: 38, mst: 0, ata: 82, evp: 120, lck: 10, exp: 9848 },
  { classId: 'hucaseal', level: 20, hp: 180, tp: 0, atp: 160, dfp: 43, mst: 0, ata: 86, evp: 150, lck: 10, exp: 20539 },
  { classId: 'hucaseal', level: 25, hp: 212, tp: 0, atp: 189, dfp: 49, mst: 0, ata: 90, evp: 176, lck: 10, exp: 39924 },
  { classId: 'hucaseal', level: 30, hp: 244, tp: 0, atp: 220, dfp: 56, mst: 0, ata: 94, evp: 200, lck: 10, exp: 69816 },
  { classId: 'hucaseal', level: 35, hp: 276, tp: 0, atp: 250, dfp: 62, mst: 0, ata: 98, evp: 226, lck: 10, exp: 111455 },
  { classId: 'hucaseal', level: 40, hp: 302, tp: 0, atp: 279, dfp: 69, mst: 0, ata: 102, evp: 244, lck: 10, exp: 166145 },
  { classId: 'hucaseal', level: 45, hp: 330, tp: 0, atp: 310, dfp: 75, mst: 0, ata: 106, evp: 261, lck: 10, exp: 235166 },
  { classId: 'hucaseal', level: 50, hp: 360, tp: 0, atp: 340, dfp: 81, mst: 0, ata: 109, evp: 278, lck: 10, exp: 319847 },
  { classId: 'hucaseal', level: 55, hp: 392, tp: 0, atp: 369, dfp: 89, mst: 0, ata: 113, evp: 293, lck: 10, exp: 421524 },
  { classId: 'hucaseal', level: 60, hp: 418, tp: 0, atp: 400, dfp: 96, mst: 0, ata: 117, evp: 309, lck: 10, exp: 541513 },
  { classId: 'hucaseal', level: 65, hp: 444, tp: 0, atp: 430, dfp: 102, mst: 0, ata: 120, evp: 326, lck: 10, exp: 681023 },
  { classId: 'hucaseal', level: 70, hp: 472, tp: 0, atp: 459, dfp: 108, mst: 0, ata: 123, evp: 341, lck: 10, exp: 841271 },
  { classId: 'hucaseal', level: 75, hp: 498, tp: 0, atp: 484, dfp: 114, mst: 0, ata: 127, evp: 356, lck: 10, exp: 1023533 },
  { classId: 'hucaseal', level: 80, hp: 524, tp: 0, atp: 501, dfp: 121, mst: 0, ata: 130, evp: 371, lck: 10, exp: 1229071 },
  { classId: 'hucaseal', level: 85, hp: 552, tp: 0, atp: 517, dfp: 127, mst: 0, ata: 134, evp: 386, lck: 10, exp: 1459348 },
  { classId: 'hucaseal', level: 90, hp: 578, tp: 0, atp: 534, dfp: 133, mst: 0, ata: 137, evp: 401, lck: 10, exp: 1717321 },
  { classId: 'hucaseal', level: 95, hp: 604, tp: 0, atp: 551, dfp: 143, mst: 0, ata: 141, evp: 416, lck: 10, exp: 2008126 },
  { classId: 'hucaseal', level: 100, hp: 632, tp: 0, atp: 567, dfp: 155, mst: 0, ata: 144, evp: 432, lck: 10, exp: 2339735 },
  { classId: 'hucaseal', level: 105, hp: 672, tp: 0, atp: 584, dfp: 165, mst: 0, ata: 148, evp: 448, lck: 10, exp: 2743485 },
  { classId: 'hucaseal', level: 110, hp: 712, tp: 0, atp: 601, dfp: 175, mst: 0, ata: 151, evp: 465, lck: 10, exp: 3270523 },
  { classId: 'hucaseal', level: 115, hp: 752, tp: 0, atp: 617, dfp: 185, mst: 0, ata: 153, evp: 482, lck: 10, exp: 3954983 },
  { classId: 'hucaseal', level: 120, hp: 792, tp: 0, atp: 634, dfp: 195, mst: 0, ata: 156, evp: 500, lck: 10, exp: 4835405 },
  { classId: 'hucaseal', level: 125, hp: 832, tp: 0, atp: 651, dfp: 205, mst: 0, ata: 158, evp: 518, lck: 10, exp: 5956316 },
  { classId: 'hucaseal', level: 130, hp: 872, tp: 0, atp: 667, dfp: 215, mst: 0, ata: 160, evp: 535, lck: 10, exp: 7337658 },
  { classId: 'hucaseal', level: 135, hp: 912, tp: 0, atp: 684, dfp: 225, mst: 0, ata: 162, evp: 552, lck: 10, exp: 8994927 },
  { classId: 'hucaseal', level: 140, hp: 952, tp: 0, atp: 701, dfp: 240, mst: 0, ata: 164, evp: 569, lck: 10, exp: 10939630 },
  { classId: 'hucaseal', level: 145, hp: 992, tp: 0, atp: 717, dfp: 251, mst: 0, ata: 166, evp: 587, lck: 10, exp: 13184299 },
  { classId: 'hucaseal', level: 150, hp: 1030, tp: 0, atp: 734, dfp: 262, mst: 0, ata: 168, evp: 606, lck: 10, exp: 15741551 },
  { classId: 'hucaseal', level: 155, hp: 1046, tp: 0, atp: 751, dfp: 274, mst: 0, ata: 170, evp: 625, lck: 10, exp: 18623854 },
  { classId: 'hucaseal', level: 160, hp: 1100, tp: 0, atp: 767, dfp: 289, mst: 0, ata: 172, evp: 643, lck: 10, exp: 21844850 },
  { classId: 'hucaseal', level: 165, hp: 1136, tp: 0, atp: 784, dfp: 304, mst: 0, ata: 174, evp: 660, lck: 10, exp: 25426153 },
  { classId: 'hucaseal', level: 170, hp: 1170, tp: 0, atp: 801, dfp: 319, mst: 0, ata: 176, evp: 677, lck: 10, exp: 29395299 },
  { classId: 'hucaseal', level: 175, hp: 1204, tp: 0, atp: 817, dfp: 334, mst: 0, ata: 177, evp: 696, lck: 10, exp: 33802211 },
  { classId: 'hucaseal', level: 180, hp: 1240, tp: 0, atp: 834, dfp: 349, mst: 0, ata: 179, evp: 714, lck: 10, exp: 38751371 },
  { classId: 'hucaseal', level: 185, hp: 1276, tp: 0, atp: 851, dfp: 364, mst: 0, ata: 180, evp: 732, lck: 10, exp: 44504634 },
  { classId: 'hucaseal', level: 190, hp: 1310, tp: 0, atp: 867, dfp: 379, mst: 0, ata: 182, evp: 747, lck: 10, exp: 52082887 },
  { classId: 'hucaseal', level: 195, hp: 1344, tp: 0, atp: 884, dfp: 389, mst: 0, ata: 183, evp: 762, lck: 10, exp: 63728621 },
  { classId: 'hucaseal', level: 200, hp: 1380, tp: 0, atp: 901, dfp: 399, mst: 0, ata: 184, evp: 777, lck: 10, exp: 83227800 },
  // RAmar
  { classId: 'ramar', level: 1, hp: 29, tp: 20, atp: 23, dfp: 13, mst: 20, ata: 80, evp: 36, lck: 10, exp: 0 },
  { classId: 'ramar', level: 5, hp: 51, tp: 37, atp: 40, dfp: 16, mst: 33, ata: 84, evp: 54, lck: 10, exp: 800 },
  { classId: 'ramar', level: 10, hp: 77, tp: 59, atp: 59, dfp: 19, mst: 50, ata: 88, evp: 76, lck: 10, exp: 4050 },
  { classId: 'ramar', level: 15, hp: 103, tp: 80, atp: 80, dfp: 23, mst: 66, ata: 92, evp: 99, lck: 10, exp: 9848 },
  { classId: 'ramar', level: 20, hp: 131, tp: 102, atp: 100, dfp: 26, mst: 83, ata: 97, evp: 119, lck: 10, exp: 20539 },
  { classId: 'ramar', level: 25, hp: 157, tp: 124, atp: 120, dfp: 29, mst: 100, ata: 101, evp: 139, lck: 10, exp: 39924 },
  { classId: 'ramar', level: 30, hp: 185, tp: 145, atp: 139, dfp: 33, mst: 116, ata: 105, evp: 156, lck: 10, exp: 69816 },
  { classId: 'ramar', level: 35, hp: 214, tp: 165, atp: 160, dfp: 38, mst: 131, ata: 109, evp: 174, lck: 10, exp: 111455 },
  { classId: 'ramar', level: 40, hp: 242, tp: 185, atp: 180, dfp: 43, mst: 146, ata: 114, evp: 191, lck: 10, exp: 166145 },
  { classId: 'ramar', level: 45, hp: 271, tp: 204, atp: 199, dfp: 48, mst: 160, ata: 118, evp: 209, lck: 10, exp: 235166 },
  { classId: 'ramar', level: 50, hp: 301, tp: 224, atp: 220, dfp: 53, mst: 175, ata: 122, evp: 226, lck: 10, exp: 319847 },
  { classId: 'ramar', level: 55, hp: 329, tp: 244, atp: 240, dfp: 60, mst: 190, ata: 126, evp: 244, lck: 10, exp: 421524 },
  { classId: 'ramar', level: 60, hp: 358, tp: 267, atp: 259, dfp: 68, mst: 208, ata: 131, evp: 261, lck: 10, exp: 541513 },
  { classId: 'ramar', level: 65, hp: 386, tp: 291, atp: 280, dfp: 75, mst: 227, ata: 135, evp: 277, lck: 10, exp: 681023 },
  { classId: 'ramar', level: 70, hp: 414, tp: 314, atp: 300, dfp: 82, mst: 245, ata: 139, evp: 287, lck: 10, exp: 841271 },
  { classId: 'ramar', level: 75, hp: 442, tp: 336, atp: 319, dfp: 88, mst: 262, ata: 143, evp: 297, lck: 10, exp: 1023533 },
  { classId: 'ramar', level: 80, hp: 471, tp: 358, atp: 340, dfp: 96, mst: 279, ata: 148, evp: 307, lck: 10, exp: 1229071 },
  { classId: 'ramar', level: 85, hp: 508, tp: 382, atp: 360, dfp: 106, mst: 298, ata: 152, evp: 317, lck: 10, exp: 1459348 },
  { classId: 'ramar', level: 90, hp: 545, tp: 403, atp: 379, dfp: 116, mst: 314, ata: 156, evp: 327, lck: 10, exp: 1717321 },
  { classId: 'ramar', level: 95, hp: 582, tp: 428, atp: 400, dfp: 126, mst: 334, ata: 160, evp: 337, lck: 10, exp: 2008126 },
  { classId: 'ramar', level: 100, hp: 619, tp: 453, atp: 420, dfp: 136, mst: 354, ata: 165, evp: 347, lck: 10, exp: 2339735 },
  { classId: 'ramar', level: 105, hp: 656, tp: 473, atp: 442, dfp: 146, mst: 369, ata: 169, evp: 363, lck: 10, exp: 2743485 },
  { classId: 'ramar', level: 110, hp: 703, tp: 493, atp: 464, dfp: 156, mst: 384, ata: 173, evp: 380, lck: 10, exp: 3270523 },
  { classId: 'ramar', level: 115, hp: 749, tp: 513, atp: 485, dfp: 167, mst: 399, ata: 177, evp: 396, lck: 10, exp: 3954983 },
  { classId: 'ramar', level: 120, hp: 795, tp: 528, atp: 507, dfp: 179, mst: 409, ata: 180, evp: 409, lck: 10, exp: 4835405 },
  { classId: 'ramar', level: 125, hp: 841, tp: 543, atp: 529, dfp: 192, mst: 419, ata: 184, evp: 419, lck: 10, exp: 5956316 },
  { classId: 'ramar', level: 130, hp: 888, tp: 558, atp: 552, dfp: 204, mst: 429, ata: 187, evp: 447, lck: 10, exp: 7337658 },
  { classId: 'ramar', level: 135, hp: 934, tp: 573, atp: 574, dfp: 217, mst: 439, ata: 191, evp: 464, lck: 10, exp: 8994927 },
  { classId: 'ramar', level: 140, hp: 980, tp: 584, atp: 596, dfp: 229, mst: 445, ata: 194, evp: 481, lck: 10, exp: 10939630 },
  { classId: 'ramar', level: 145, hp: 1026, tp: 594, atp: 617, dfp: 242, mst: 450, ata: 197, evp: 497, lck: 10, exp: 13184299 },
  { classId: 'ramar', level: 150, hp: 1073, tp: 604, atp: 638, dfp: 254, mst: 455, ata: 200, evp: 513, lck: 10, exp: 15741551 },
  { classId: 'ramar', level: 155, hp: 1119, tp: 614, atp: 656, dfp: 267, mst: 460, ata: 203, evp: 525, lck: 10, exp: 18623854 },
  { classId: 'ramar', level: 160, hp: 1165, tp: 624, atp: 675, dfp: 279, mst: 465, ata: 206, evp: 537, lck: 10, exp: 21844850 },
  { classId: 'ramar', level: 165, hp: 1211, tp: 634, atp: 692, dfp: 289, mst: 470, ata: 209, evp: 549, lck: 10, exp: 25426153 },
  { classId: 'ramar', level: 170, hp: 1258, tp: 644, atp: 710, dfp: 299, mst: 475, ata: 212, evp: 561, lck: 10, exp: 29395299 },
  { classId: 'ramar', level: 175, hp: 1304, tp: 654, atp: 730, dfp: 309, mst: 480, ata: 215, evp: 571, lck: 10, exp: 33802211 },
  { classId: 'ramar', level: 180, hp: 1350, tp: 664, atp: 746, dfp: 319, mst: 485, ata: 218, evp: 581, lck: 10, exp: 38751371 },
  { classId: 'ramar', level: 185, hp: 1396, tp: 674, atp: 761, dfp: 329, mst: 490, ata: 221, evp: 594, lck: 10, exp: 44504634 },
  { classId: 'ramar', level: 190, hp: 1443, tp: 684, atp: 776, dfp: 339, mst: 495, ata: 224, evp: 609, lck: 10, exp: 52082887 },
  { classId: 'ramar', level: 195, hp: 1483, tp: 694, atp: 791, dfp: 349, mst: 500, ata: 227, evp: 624, lck: 10, exp: 63728621 },
  { classId: 'ramar', level: 200, hp: 1520, tp: 704, atp: 806, dfp: 359, mst: 505, ata: 230, evp: 639, lck: 10, exp: 83227800 },
  // RAmarl
  { classId: 'ramarl', level: 1, hp: 29, tp: 20, atp: 23, dfp: 13, mst: 20, ata: 72, evp: 36, lck: 10, exp: 0 },
  { classId: 'ramarl', level: 5, hp: 53, tp: 40, atp: 39, dfp: 21, mst: 36, ata: 76, evp: 55, lck: 10, exp: 800 },
  { classId: 'ramarl', level: 10, hp: 83, tp: 68, atp: 60, dfp: 28, mst: 59, ata: 80, evp: 81, lck: 10, exp: 4050 },
  { classId: 'ramarl', level: 15, hp: 112, tp: 97, atp: 81, dfp: 33, mst: 83, ata: 85, evp: 105, lck: 10, exp: 9848 },
  { classId: 'ramarl', level: 20, hp: 142, tp: 124, atp: 101, dfp: 39, mst: 105, ata: 89, evp: 130, lck: 10, exp: 20539 },
  { classId: 'ramarl', level: 25, hp: 172, tp: 153, atp: 122, dfp: 44, mst: 129, ata: 94, evp: 156, lck: 10, exp: 39924 },
  { classId: 'ramarl', level: 30, hp: 201, tp: 179, atp: 142, dfp: 50, mst: 150, ata: 98, evp: 180, lck: 10, exp: 69816 },
  { classId: 'ramarl', level: 35, hp: 231, tp: 207, atp: 161, dfp: 57, mst: 173, ata: 103, evp: 205, lck: 10, exp: 111455 },
  { classId: 'ramarl', level: 40, hp: 260, tp: 233, atp: 184, dfp: 65, mst: 194, ata: 107, evp: 231, lck: 10, exp: 166145 },
  { classId: 'ramarl', level: 45, hp: 290, tp: 256, atp: 205, dfp: 73, mst: 212, ata: 111, evp: 255, lck: 10, exp: 235166 },
  { classId: 'ramarl', level: 50, hp: 320, tp: 277, atp: 226, dfp: 80, mst: 228, ata: 115, evp: 280, lck: 10, exp: 319847 },
  { classId: 'ramarl', level: 55, hp: 349, tp: 299, atp: 250, dfp: 88, mst: 245, ata: 119, evp: 306, lck: 10, exp: 421524 },
  { classId: 'ramarl', level: 60, hp: 379, tp: 323, atp: 275, dfp: 95, mst: 264, ata: 123, evp: 328, lck: 10, exp: 541513 },
  { classId: 'ramarl', level: 65, hp: 408, tp: 350, atp: 296, dfp: 104, mst: 286, ata: 127, evp: 345, lck: 10, exp: 681023 },
  { classId: 'ramarl', level: 70, hp: 438, tp: 376, atp: 315, dfp: 110, mst: 307, ata: 131, evp: 360, lck: 10, exp: 841271 },
  { classId: 'ramarl', level: 75, hp: 468, tp: 403, atp: 330, dfp: 117, mst: 329, ata: 135, evp: 375, lck: 10, exp: 1023533 },
  { classId: 'ramarl', level: 80, hp: 497, tp: 430, atp: 341, dfp: 124, mst: 351, ata: 139, evp: 390, lck: 10, exp: 1229071 },
  { classId: 'ramarl', level: 85, hp: 527, tp: 455, atp: 351, dfp: 132, mst: 371, ata: 143, evp: 405, lck: 10, exp: 1459348 },
  { classId: 'ramarl', level: 90, hp: 556, tp: 479, atp: 363, dfp: 138, mst: 390, ata: 147, evp: 420, lck: 10, exp: 1717321 },
  { classId: 'ramarl', level: 95, hp: 586, tp: 504, atp: 378, dfp: 145, mst: 410, ata: 151, evp: 435, lck: 10, exp: 2008126 },
  { classId: 'ramarl', level: 100, hp: 616, tp: 530, atp: 393, dfp: 155, mst: 431, ata: 155, evp: 450, lck: 10, exp: 2339735 },
  { classId: 'ramarl', level: 105, hp: 643, tp: 556, atp: 411, dfp: 169, mst: 452, ata: 159, evp: 468, lck: 10, exp: 2743485 },
  { classId: 'ramarl', level: 110, hp: 678, tp: 578, atp: 428, dfp: 183, mst: 469, ata: 162, evp: 486, lck: 10, exp: 3270523 },
  { classId: 'ramarl', level: 115, hp: 712, tp: 600, atp: 447, dfp: 198, mst: 486, ata: 166, evp: 504, lck: 10, exp: 3954983 },
  { classId: 'ramarl', level: 120, hp: 747, tp: 623, atp: 465, dfp: 212, mst: 504, ata: 169, evp: 522, lck: 10, exp: 4835405 },
  { classId: 'ramarl', level: 125, hp: 786, tp: 646, atp: 484, dfp: 225, mst: 522, ata: 172, evp: 540, lck: 10, exp: 5956316 },
  { classId: 'ramarl', level: 130, hp: 821, tp: 668, atp: 503, dfp: 240, mst: 539, ata: 175, evp: 560, lck: 10, exp: 7337658 },
  { classId: 'ramarl', level: 135, hp: 856, tp: 690, atp: 522, dfp: 255, mst: 556, ata: 179, evp: 579, lck: 10, exp: 8994927 },
  { classId: 'ramarl', level: 140, hp: 891, tp: 713, atp: 541, dfp: 268, mst: 574, ata: 182, evp: 599, lck: 10, exp: 10939630 },
  { classId: 'ramarl', level: 145, hp: 926, tp: 736, atp: 559, dfp: 281, mst: 592, ata: 185, evp: 621, lck: 10, exp: 13184299 },
  { classId: 'ramarl', level: 150, hp: 958, tp: 754, atp: 577, dfp: 293, mst: 605, ata: 188, evp: 640, lck: 10, exp: 15741551 },
  { classId: 'ramarl', level: 155, hp: 991, tp: 772, atp: 596, dfp: 306, mst: 618, ata: 192, evp: 657, lck: 10, exp: 18623854 },
  { classId: 'ramarl', level: 160, hp: 1023, tp: 789, atp: 614, dfp: 319, mst: 630, ata: 195, evp: 673, lck: 10, exp: 21844850 },
  { classId: 'ramarl', level: 165, hp: 1056, tp: 806, atp: 632, dfp: 332, mst: 642, ata: 197, evp: 690, lck: 10, exp: 25426153 },
  { classId: 'ramarl', level: 170, hp: 1093, tp: 824, atp: 651, dfp: 346, mst: 655, ata: 200, evp: 705, lck: 10, exp: 29395299 },
  { classId: 'ramarl', level: 175, hp: 1130, tp: 842, atp: 668, dfp: 361, mst: 668, ata: 203, evp: 719, lck: 10, exp: 33802211 },
  { classId: 'ramarl', level: 180, hp: 1167, tp: 859, atp: 683, dfp: 376, mst: 680, ata: 206, evp: 733, lck: 10, exp: 38751371 },
  { classId: 'ramarl', level: 185, hp: 1206, tp: 876, atp: 698, dfp: 391, mst: 692, ata: 208, evp: 747, lck: 10, exp: 44504634 },
  { classId: 'ramarl', level: 190, hp: 1245, tp: 894, atp: 713, dfp: 406, mst: 705, ata: 211, evp: 762, lck: 10, exp: 52082887 },
  { classId: 'ramarl', level: 195, hp: 1282, tp: 912, atp: 728, dfp: 416, mst: 718, ata: 214, evp: 780, lck: 10, exp: 63728621 },
  { classId: 'ramarl', level: 200, hp: 1315, tp: 931, atp: 743, dfp: 426, mst: 732, ata: 216, evp: 798, lck: 10, exp: 83227800 },
  // RAcast
  { classId: 'racast', level: 1, hp: 33, tp: 0, atp: 30, dfp: 18, mst: 0, ata: 75, evp: 31, lck: 10, exp: 0 },
  { classId: 'racast', level: 5, hp: 57, tp: 0, atp: 48, dfp: 21, mst: 0, ata: 79, evp: 45, lck: 10, exp: 800 },
  { classId: 'racast', level: 10, hp: 88, tp: 0, atp: 69, dfp: 25, mst: 0, ata: 82, evp: 64, lck: 10, exp: 4050 },
  { classId: 'racast', level: 15, hp: 118, tp: 0, atp: 91, dfp: 29, mst: 0, ata: 86, evp: 82, lck: 10, exp: 9848 },
  { classId: 'racast', level: 20, hp: 148, tp: 0, atp: 113, dfp: 33, mst: 0, ata: 90, evp: 98, lck: 10, exp: 20539 },
  { classId: 'racast', level: 25, hp: 177, tp: 0, atp: 134, dfp: 37, mst: 0, ata: 94, evp: 113, lck: 10, exp: 39924 },
  { classId: 'racast', level: 30, hp: 207, tp: 0, atp: 156, dfp: 42, mst: 0, ata: 98, evp: 128, lck: 10, exp: 69816 },
  { classId: 'racast', level: 35, hp: 234, tp: 0, atp: 178, dfp: 47, mst: 0, ata: 102, evp: 143, lck: 10, exp: 111455 },
  { classId: 'racast', level: 40, hp: 264, tp: 0, atp: 199, dfp: 52, mst: 0, ata: 106, evp: 158, lck: 10, exp: 166145 },
  { classId: 'racast', level: 45, hp: 292, tp: 0, atp: 221, dfp: 58, mst: 0, ata: 110, evp: 173, lck: 10, exp: 235166 },
  { classId: 'racast', level: 50, hp: 320, tp: 0, atp: 243, dfp: 66, mst: 0, ata: 113, evp: 188, lck: 10, exp: 319847 },
  { classId: 'racast', level: 55, hp: 347, tp: 0, atp: 264, dfp: 74, mst: 0, ata: 117, evp: 203, lck: 10, exp: 421524 },
  { classId: 'racast', level: 60, hp: 375, tp: 0, atp: 286, dfp: 81, mst: 0, ata: 120, evp: 218, lck: 10, exp: 541513 },
  { classId: 'racast', level: 65, hp: 403, tp: 0, atp: 308, dfp: 90, mst: 0, ata: 124, evp: 233, lck: 10, exp: 681023 },
  { classId: 'racast', level: 70, hp: 431, tp: 0, atp: 329, dfp: 100, mst: 0, ata: 127, evp: 248, lck: 10, exp: 841271 },
  { classId: 'racast', level: 75, hp: 458, tp: 0, atp: 351, dfp: 110, mst: 0, ata: 131, evp: 263, lck: 10, exp: 1023533 },
  { classId: 'racast', level: 80, hp: 488, tp: 0, atp: 373, dfp: 120, mst: 0, ata: 134, evp: 278, lck: 10, exp: 1229071 },
  { classId: 'racast', level: 85, hp: 525, tp: 0, atp: 394, dfp: 134, mst: 0, ata: 137, evp: 293, lck: 10, exp: 1459348 },
  { classId: 'racast', level: 90, hp: 564, tp: 0, atp: 416, dfp: 149, mst: 0, ata: 139, evp: 308, lck: 10, exp: 1717321 },
  { classId: 'racast', level: 95, hp: 610, tp: 0, atp: 438, dfp: 164, mst: 0, ata: 142, evp: 320, lck: 10, exp: 2008126 },
  { classId: 'racast', level: 100, hp: 656, tp: 0, atp: 459, dfp: 179, mst: 0, ata: 144, evp: 330, lck: 10, exp: 2339735 },
  { classId: 'racast', level: 105, hp: 704, tp: 0, atp: 479, dfp: 194, mst: 0, ata: 147, evp: 345, lck: 10, exp: 2743485 },
  { classId: 'racast', level: 110, hp: 762, tp: 0, atp: 499, dfp: 209, mst: 0, ata: 150, evp: 360, lck: 10, exp: 3270523 },
  { classId: 'racast', level: 115, hp: 826, tp: 0, atp: 519, dfp: 224, mst: 0, ata: 153, evp: 375, lck: 10, exp: 3954983 },
  { classId: 'racast', level: 120, hp: 893, tp: 0, atp: 539, dfp: 240, mst: 0, ata: 156, evp: 390, lck: 10, exp: 4835405 },
  { classId: 'racast', level: 125, hp: 967, tp: 0, atp: 559, dfp: 260, mst: 0, ata: 159, evp: 405, lck: 10, exp: 5956316 },
  { classId: 'racast', level: 130, hp: 1041, tp: 0, atp: 579, dfp: 280, mst: 0, ata: 162, evp: 420, lck: 10, exp: 7337658 },
  { classId: 'racast', level: 135, hp: 1115, tp: 0, atp: 599, dfp: 300, mst: 0, ata: 165, evp: 435, lck: 10, exp: 8994927 },
  { classId: 'racast', level: 140, hp: 1187, tp: 0, atp: 619, dfp: 320, mst: 0, ata: 168, evp: 450, lck: 10, exp: 10939630 },
  { classId: 'racast', level: 145, hp: 1252, tp: 0, atp: 639, dfp: 340, mst: 0, ata: 171, evp: 465, lck: 10, exp: 13184299 },
  { classId: 'racast', level: 150, hp: 1317, tp: 0, atp: 659, dfp: 359, mst: 0, ata: 174, evp: 480, lck: 10, exp: 15741551 },
  { classId: 'racast', level: 155, hp: 1381, tp: 0, atp: 679, dfp: 374, mst: 0, ata: 177, evp: 495, lck: 10, exp: 18623854 },
  { classId: 'racast', level: 160, hp: 1446, tp: 0, atp: 699, dfp: 389, mst: 0, ata: 179, evp: 510, lck: 10, exp: 21844850 },
  { classId: 'racast', level: 165, hp: 1511, tp: 0, atp: 719, dfp: 404, mst: 0, ata: 182, evp: 525, lck: 10, exp: 25426153 },
  { classId: 'racast', level: 170, hp: 1576, tp: 0, atp: 739, dfp: 419, mst: 0, ata: 184, evp: 540, lck: 10, exp: 29395299 },
  { classId: 'racast', level: 175, hp: 1640, tp: 0, atp: 759, dfp: 434, mst: 0, ata: 187, evp: 555, lck: 10, exp: 33802211 },
  { classId: 'racast', level: 180, hp: 1705, tp: 0, atp: 779, dfp: 449, mst: 0, ata: 189, evp: 570, lck: 10, exp: 38751371 },
  { classId: 'racast', level: 185, hp: 1770, tp: 0, atp: 799, dfp: 464, mst: 0, ata: 192, evp: 585, lck: 10, exp: 44504634 },
  { classId: 'racast', level: 190, hp: 1835, tp: 0, atp: 819, dfp: 479, mst: 0, ata: 194, evp: 600, lck: 10, exp: 52082887 },
  { classId: 'racast', level: 195, hp: 1899, tp: 0, atp: 839, dfp: 494, mst: 0, ata: 197, evp: 615, lck: 10, exp: 63728621 },
  { classId: 'racast', level: 200, hp: 1964, tp: 0, atp: 859, dfp: 505, mst: 0, ata: 199, evp: 626, lck: 10, exp: 83227800 },
  // RAcaseal
  { classId: 'racaseal', level: 1, hp: 31, tp: 0, atp: 25, dfp: 23, mst: 0, ata: 77, evp: 31, lck: 10, exp: 0 },
  { classId: 'racaseal', level: 5, hp: 55, tp: 0, atp: 42, dfp: 31, mst: 0, ata: 81, evp: 45, lck: 10, exp: 800 },
  { classId: 'racaseal', level: 10, hp: 85, tp: 0, atp: 64, dfp: 40, mst: 0, ata: 85, evp: 64, lck: 10, exp: 4050 },
  { classId: 'racaseal', level: 15, hp: 112, tp: 0, atp: 85, dfp: 50, mst: 0, ata: 89, evp: 82, lck: 10, exp: 9848 },
  { classId: 'racaseal', level: 20, hp: 142, tp: 0, atp: 107, dfp: 59, mst: 0, ata: 93, evp: 99, lck: 10, exp: 20539 },
  { classId: 'racaseal', level: 25, hp: 172, tp: 0, atp: 129, dfp: 69, mst: 0, ata: 97, evp: 115, lck: 10, exp: 39924 },
  { classId: 'racaseal', level: 30, hp: 201, tp: 0, atp: 150, dfp: 78, mst: 0, ata: 101, evp: 132, lck: 10, exp: 69816 },
  { classId: 'racaseal', level: 35, hp: 229, tp: 0, atp: 172, dfp: 88, mst: 0, ata: 104, evp: 149, lck: 10, exp: 111455 },
  { classId: 'racaseal', level: 40, hp: 259, tp: 0, atp: 194, dfp: 97, mst: 0, ata: 108, evp: 165, lck: 10, exp: 166145 },
  { classId: 'racaseal', level: 45, hp: 288, tp: 0, atp: 215, dfp: 107, mst: 0, ata: 112, evp: 182, lck: 10, exp: 235166 },
  { classId: 'racaseal', level: 50, hp: 316, tp: 0, atp: 236, dfp: 116, mst: 0, ata: 116, evp: 199, lck: 10, exp: 319847 },
  { classId: 'racaseal', level: 55, hp: 344, tp: 0, atp: 258, dfp: 126, mst: 0, ata: 120, evp: 215, lck: 10, exp: 421524 },
  { classId: 'racaseal', level: 60, hp: 371, tp: 0, atp: 280, dfp: 135, mst: 0, ata: 124, evp: 232, lck: 10, exp: 541513 },
  { classId: 'racaseal', level: 65, hp: 399, tp: 0, atp: 302, dfp: 145, mst: 0, ata: 127, evp: 248, lck: 10, exp: 681023 },
  { classId: 'racaseal', level: 70, hp: 427, tp: 0, atp: 325, dfp: 154, mst: 0, ata: 131, evp: 265, lck: 10, exp: 841271 },
  { classId: 'racaseal', level: 75, hp: 455, tp: 0, atp: 347, dfp: 164, mst: 0, ata: 134, evp: 280, lck: 10, exp: 1023533 },
  { classId: 'racaseal', level: 80, hp: 484, tp: 0, atp: 365, dfp: 173, mst: 0, ata: 137, evp: 295, lck: 10, exp: 1229071 },
  { classId: 'racaseal', level: 85, hp: 521, tp: 0, atp: 380, dfp: 183, mst: 0, ata: 140, evp: 310, lck: 10, exp: 1459348 },
  { classId: 'racaseal', level: 90, hp: 558, tp: 0, atp: 395, dfp: 192, mst: 0, ata: 143, evp: 325, lck: 10, exp: 1717321 },
  { classId: 'racaseal', level: 95, hp: 595, tp: 0, atp: 410, dfp: 202, mst: 0, ata: 146, evp: 340, lck: 10, exp: 2008126 },
  { classId: 'racaseal', level: 100, hp: 641, tp: 0, atp: 425, dfp: 212, mst: 0, ata: 149, evp: 355, lck: 10, exp: 2339735 },
  { classId: 'racaseal', level: 105, hp: 688, tp: 0, atp: 440, dfp: 229, mst: 0, ata: 152, evp: 375, lck: 10, exp: 2743485 },
  { classId: 'racaseal', level: 110, hp: 740, tp: 0, atp: 455, dfp: 246, mst: 0, ata: 154, evp: 395, lck: 10, exp: 3270523 },
  { classId: 'racaseal', level: 115, hp: 795, tp: 0, atp: 470, dfp: 264, mst: 0, ata: 157, evp: 415, lck: 10, exp: 3954983 },
  { classId: 'racaseal', level: 120, hp: 852, tp: 0, atp: 485, dfp: 282, mst: 0, ata: 159, evp: 435, lck: 10, exp: 4835405 },
  { classId: 'racaseal', level: 125, hp: 917, tp: 0, atp: 505, dfp: 299, mst: 0, ata: 162, evp: 455, lck: 10, exp: 5956316 },
  { classId: 'racaseal', level: 130, hp: 982, tp: 0, atp: 525, dfp: 316, mst: 0, ata: 165, evp: 475, lck: 10, exp: 7337658 },
  { classId: 'racaseal', level: 135, hp: 1047, tp: 0, atp: 545, dfp: 334, mst: 0, ata: 168, evp: 495, lck: 10, exp: 8994927 },
  { classId: 'racaseal', level: 140, hp: 1111, tp: 0, atp: 565, dfp: 352, mst: 0, ata: 171, evp: 515, lck: 10, exp: 10939630 },
  { classId: 'racaseal', level: 145, hp: 1176, tp: 0, atp: 585, dfp: 369, mst: 0, ata: 174, evp: 535, lck: 10, exp: 13184299 },
  { classId: 'racaseal', level: 150, hp: 1241, tp: 0, atp: 605, dfp: 386, mst: 0, ata: 177, evp: 555, lck: 10, exp: 15741551 },
  { classId: 'racaseal', level: 155, hp: 1306, tp: 0, atp: 625, dfp: 404, mst: 0, ata: 180, evp: 575, lck: 10, exp: 18623854 },
  { classId: 'racaseal', level: 160, hp: 1370, tp: 0, atp: 645, dfp: 422, mst: 0, ata: 183, evp: 593, lck: 10, exp: 21844850 },
  { classId: 'racaseal', level: 165, hp: 1435, tp: 0, atp: 665, dfp: 439, mst: 0, ata: 186, evp: 608, lck: 10, exp: 25426153 },
  { classId: 'racaseal', level: 170, hp: 1500, tp: 0, atp: 685, dfp: 456, mst: 0, ata: 189, evp: 623, lck: 10, exp: 29395299 },
  { classId: 'racaseal', level: 175, hp: 1565, tp: 0, atp: 700, dfp: 474, mst: 0, ata: 192, evp: 638, lck: 10, exp: 33802211 },
  { classId: 'racaseal', level: 180, hp: 1629, tp: 0, atp: 715, dfp: 492, mst: 0, ata: 195, evp: 653, lck: 10, exp: 38751371 },
  { classId: 'racaseal', level: 185, hp: 1694, tp: 0, atp: 730, dfp: 509, mst: 0, ata: 198, evp: 668, lck: 10, exp: 44504634 },
  { classId: 'racaseal', level: 190, hp: 1759, tp: 0, atp: 745, dfp: 526, mst: 0, ata: 201, evp: 683, lck: 10, exp: 52082887 },
  { classId: 'racaseal', level: 195, hp: 1824, tp: 0, atp: 760, dfp: 544, mst: 0, ata: 205, evp: 698, lck: 10, exp: 63728621 },
  { classId: 'racaseal', level: 200, hp: 1890, tp: 0, atp: 775, dfp: 562, mst: 0, ata: 208, evp: 713, lck: 10, exp: 83227800 },
  // FOmar
  { classId: 'fomar', level: 1, hp: 29, tp: 79, atp: 16, dfp: 10, mst: 53, ata: 63, evp: 35, lck: 10, exp: 0 },
  { classId: 'fomar', level: 5, hp: 47, tp: 111, atp: 30, dfp: 14, mst: 70, ata: 66, evp: 53, lck: 10, exp: 800 },
  { classId: 'fomar', level: 10, hp: 71, tp: 153, atp: 47, dfp: 19, mst: 93, ata: 68, evp: 75, lck: 10, exp: 4050 },
  { classId: 'fomar', level: 15, hp: 94, tp: 193, atp: 64, dfp: 23, mst: 115, ata: 71, evp: 98, lck: 10, exp: 9848 },
  { classId: 'fomar', level: 20, hp: 120, tp: 234, atp: 82, dfp: 27, mst: 137, ata: 73, evp: 121, lck: 10, exp: 20539 },
  { classId: 'fomar', level: 25, hp: 145, tp: 273, atp: 102, dfp: 29, mst: 158, ata: 75, evp: 144, lck: 10, exp: 39924 },
  { classId: 'fomar', level: 30, hp: 168, tp: 310, atp: 124, dfp: 33, mst: 178, ata: 77, evp: 165, lck: 10, exp: 69816 },
  { classId: 'fomar', level: 35, hp: 192, tp: 351, atp: 146, dfp: 40, mst: 200, ata: 79, evp: 186, lck: 10, exp: 111455 },
  { classId: 'fomar', level: 40, hp: 214, tp: 391, atp: 168, dfp: 47, mst: 222, ata: 82, evp: 206, lck: 10, exp: 166145 },
  { classId: 'fomar', level: 45, hp: 236, tp: 435, atp: 190, dfp: 53, mst: 246, ata: 84, evp: 225, lck: 10, exp: 235166 },
  { classId: 'fomar', level: 50, hp: 255, tp: 478, atp: 209, dfp: 59, mst: 270, ata: 87, evp: 243, lck: 10, exp: 319847 },
  { classId: 'fomar', level: 55, hp: 281, tp: 531, atp: 224, dfp: 66, mst: 300, ata: 89, evp: 260, lck: 10, exp: 421524 },
  { classId: 'fomar', level: 60, hp: 307, tp: 582, atp: 241, dfp: 71, mst: 329, ata: 92, evp: 278, lck: 10, exp: 541513 },
  { classId: 'fomar', level: 65, hp: 333, tp: 624, atp: 257, dfp: 76, mst: 352, ata: 94, evp: 297, lck: 10, exp: 681023 },
  { classId: 'fomar', level: 70, hp: 359, tp: 667, atp: 272, dfp: 81, mst: 376, ata: 96, evp: 314, lck: 10, exp: 841271 },
  { classId: 'fomar', level: 75, hp: 385, tp: 708, atp: 287, dfp: 89, mst: 398, ata: 99, evp: 324, lck: 10, exp: 1023533 },
  { classId: 'fomar', level: 80, hp: 413, tp: 745, atp: 302, dfp: 94, mst: 418, ata: 101, evp: 336, lck: 10, exp: 1229071 },
  { classId: 'fomar', level: 85, hp: 440, tp: 780, atp: 320, dfp: 101, mst: 436, ata: 104, evp: 347, lck: 10, exp: 1459348 },
  { classId: 'fomar', level: 90, hp: 466, tp: 814, atp: 340, dfp: 107, mst: 454, ata: 106, evp: 359, lck: 10, exp: 1717321 },
  { classId: 'fomar', level: 95, hp: 494, tp: 849, atp: 360, dfp: 114, mst: 472, ata: 109, evp: 370, lck: 10, exp: 2008126 },
  { classId: 'fomar', level: 100, hp: 523, tp: 883, atp: 380, dfp: 121, mst: 490, ata: 111, evp: 381, lck: 10, exp: 2339735 },
  { classId: 'fomar', level: 105, hp: 555, tp: 928, atp: 400, dfp: 131, mst: 515, ata: 113, evp: 393, lck: 10, exp: 2743485 },
  { classId: 'fomar', level: 110, hp: 587, tp: 973, atp: 420, dfp: 141, mst: 540, ata: 114, evp: 404, lck: 10, exp: 3270523 },
  { classId: 'fomar', level: 115, hp: 620, tp: 1018, atp: 440, dfp: 151, mst: 565, ata: 115, evp: 416, lck: 10, exp: 3954983 },
  { classId: 'fomar', level: 120, hp: 653, tp: 1063, atp: 460, dfp: 161, mst: 590, ata: 117, evp: 428, lck: 10, exp: 4835405 },
  { classId: 'fomar', level: 125, hp: 685, tp: 1108, atp: 478, dfp: 171, mst: 615, ata: 118, evp: 439, lck: 10, exp: 5956316 },
  { classId: 'fomar', level: 130, hp: 717, tp: 1153, atp: 496, dfp: 181, mst: 640, ata: 119, evp: 451, lck: 10, exp: 7337658 },
  { classId: 'fomar', level: 135, hp: 751, tp: 1198, atp: 515, dfp: 191, mst: 665, ata: 120, evp: 462, lck: 10, exp: 8994927 },
  { classId: 'fomar', level: 140, hp: 784, tp: 1243, atp: 533, dfp: 201, mst: 690, ata: 121, evp: 474, lck: 10, exp: 10939630 },
  { classId: 'fomar', level: 145, hp: 816, tp: 1288, atp: 551, dfp: 211, mst: 715, ata: 123, evp: 485, lck: 10, exp: 13184299 },
  { classId: 'fomar', level: 150, hp: 848, tp: 1333, atp: 570, dfp: 221, mst: 740, ata: 124, evp: 496, lck: 10, exp: 15741551 },
  { classId: 'fomar', level: 155, hp: 884, tp: 1378, atp: 588, dfp: 231, mst: 765, ata: 125, evp: 506, lck: 10, exp: 18623854 },
  { classId: 'fomar', level: 160, hp: 914, tp: 1423, atp: 606, dfp: 241, mst: 790, ata: 127, evp: 517, lck: 10, exp: 21844850 },
  { classId: 'fomar', level: 165, hp: 946, tp: 1468, atp: 625, dfp: 251, mst: 815, ata: 128, evp: 527, lck: 10, exp: 25426153 },
  { classId: 'fomar', level: 170, hp: 978, tp: 1513, atp: 643, dfp: 261, mst: 840, ata: 130, evp: 537, lck: 10, exp: 29395299 },
  { classId: 'fomar', level: 175, hp: 1012, tp: 1558, atp: 661, dfp: 271, mst: 865, ata: 131, evp: 547, lck: 10, exp: 33802211 },
  { classId: 'fomar', level: 180, hp: 1045, tp: 1603, atp: 679, dfp: 281, mst: 890, ata: 133, evp: 551, lck: 10, exp: 38751371 },
  { classId: 'fomar', level: 185, hp: 1077, tp: 1648, atp: 698, dfp: 291, mst: 915, ata: 134, evp: 551, lck: 10, exp: 44504634 },
  { classId: 'fomar', level: 190, hp: 1109, tp: 1693, atp: 714, dfp: 301, mst: 940, ata: 136, evp: 551, lck: 10, exp: 52082887 },
  { classId: 'fomar', level: 195, hp: 1142, tp: 1738, atp: 734, dfp: 311, mst: 965, ata: 137, evp: 551, lck: 10, exp: 63728621 },
  { classId: 'fomar', level: 200, hp: 1175, tp: 1783, atp: 753, dfp: 321, mst: 990, ata: 138, evp: 551, lck: 10, exp: 83227800 },
  // FOmarl
  { classId: 'fomarl', level: 1, hp: 29, tp: 79, atp: 16, dfp: 10, mst: 53, ata: 63, evp: 35, lck: 10, exp: 0 },
  { classId: 'fomarl', level: 5, hp: 52, tp: 114, atp: 26, dfp: 13, mst: 72, ata: 66, evp: 53, lck: 10, exp: 800 },
  { classId: 'fomarl', level: 10, hp: 81, tp: 156, atp: 38, dfp: 17, mst: 95, ata: 69, evp: 74, lck: 10, exp: 4050 },
  { classId: 'fomarl', level: 15, hp: 110, tp: 199, atp: 51, dfp: 21, mst: 119, ata: 72, evp: 96, lck: 10, exp: 9848 },
  { classId: 'fomarl', level: 20, hp: 139, tp: 241, atp: 64, dfp: 25, mst: 145, ata: 75, evp: 118, lck: 10, exp: 20539 },
  { classId: 'fomarl', level: 25, hp: 168, tp: 283, atp: 81, dfp: 28, mst: 165, ata: 78, evp: 139, lck: 10, exp: 39924 },
  { classId: 'fomarl', level: 30, hp: 197, tp: 327, atp: 97, dfp: 33, mst: 189, ata: 80, evp: 159, lck: 10, exp: 69816 },
  { classId: 'fomarl', level: 35, hp: 226, tp: 372, atp: 113, dfp: 41, mst: 214, ata: 83, evp: 178, lck: 10, exp: 111455 },
  { classId: 'fomarl', level: 40, hp: 255, tp: 420, atp: 130, dfp: 48, mst: 241, ata: 85, evp: 197, lck: 10, exp: 166145 },
  { classId: 'fomarl', level: 45, hp: 284, tp: 466, atp: 147, dfp: 56, mst: 267, ata: 88, evp: 216, lck: 10, exp: 235166 },
  { classId: 'fomarl', level: 50, hp: 313, tp: 514, atp: 164, dfp: 63, mst: 294, ata: 90, evp: 234, lck: 10, exp: 319847 },
  { classId: 'fomarl', level: 55, hp: 342, tp: 571, atp: 179, dfp: 71, mst: 327, ata: 93, evp: 251, lck: 10, exp: 421524 },
  { classId: 'fomarl', level: 60, hp: 371, tp: 624, atp: 194, dfp: 78, mst: 357, ata: 96, evp: 267, lck: 10, exp: 541513 },
  { classId: 'fomarl', level: 65, hp: 400, tp: 669, atp: 209, dfp: 86, mst: 382, ata: 100, evp: 284, lck: 10, exp: 681023 },
  { classId: 'fomarl', level: 70, hp: 429, tp: 714, atp: 224, dfp: 93, mst: 407, ata: 103, evp: 299, lck: 10, exp: 841271 },
  { classId: 'fomarl', level: 75, hp: 458, tp: 759, atp: 239, dfp: 101, mst: 432, ata: 106, evp: 309, lck: 10, exp: 1023533 },
  { classId: 'fomarl', level: 80, hp: 487, tp: 799, atp: 254, dfp: 111, mst: 454, ata: 109, evp: 319, lck: 10, exp: 1229071 },
  { classId: 'fomarl', level: 85, hp: 516, tp: 837, atp: 272, dfp: 121, mst: 474, ata: 112, evp: 329, lck: 10, exp: 1459348 },
  { classId: 'fomarl', level: 90, hp: 545, tp: 874, atp: 292, dfp: 131, mst: 494, ata: 114, evp: 339, lck: 10, exp: 1717321 },
  { classId: 'fomarl', level: 95, hp: 574, tp: 912, atp: 312, dfp: 141, mst: 514, ata: 117, evp: 349, lck: 10, exp: 2008126 },
  { classId: 'fomarl', level: 100, hp: 603, tp: 949, atp: 332, dfp: 151, mst: 534, ata: 120, evp: 359, lck: 10, exp: 2339735 },
  { classId: 'fomarl', level: 105, hp: 639, tp: 987, atp: 352, dfp: 161, mst: 554, ata: 121, evp: 369, lck: 10, exp: 2743485 },
  { classId: 'fomarl', level: 110, hp: 675, tp: 1024, atp: 372, dfp: 171, mst: 574, ata: 123, evp: 379, lck: 10, exp: 3270523 },
  { classId: 'fomarl', level: 115, hp: 711, tp: 1062, atp: 392, dfp: 181, mst: 594, ata: 124, evp: 389, lck: 10, exp: 3954983 },
  { classId: 'fomarl', level: 120, hp: 748, tp: 1099, atp: 412, dfp: 191, mst: 614, ata: 125, evp: 399, lck: 10, exp: 4835405 },
  { classId: 'fomarl', level: 125, hp: 784, tp: 1137, atp: 432, dfp: 201, mst: 634, ata: 127, evp: 409, lck: 10, exp: 5956316 },
  { classId: 'fomarl', level: 130, hp: 820, tp: 1174, atp: 452, dfp: 211, mst: 654, ata: 128, evp: 419, lck: 10, exp: 7337658 },
  { classId: 'fomarl', level: 135, hp: 856, tp: 1212, atp: 472, dfp: 221, mst: 674, ata: 129, evp: 429, lck: 10, exp: 8994927 },
  { classId: 'fomarl', level: 140, hp: 893, tp: 1249, atp: 492, dfp: 231, mst: 694, ata: 130, evp: 439, lck: 10, exp: 10939630 },
  { classId: 'fomarl', level: 145, hp: 929, tp: 1287, atp: 512, dfp: 241, mst: 714, ata: 131, evp: 449, lck: 10, exp: 13184299 },
  { classId: 'fomarl', level: 150, hp: 965, tp: 1324, atp: 532, dfp: 251, mst: 734, ata: 132, evp: 459, lck: 10, exp: 15741551 },
  { classId: 'fomarl', level: 155, hp: 1001, tp: 1362, atp: 552, dfp: 261, mst: 754, ata: 134, evp: 469, lck: 10, exp: 18623854 },
  { classId: 'fomarl', level: 160, hp: 1038, tp: 1399, atp: 572, dfp: 271, mst: 774, ata: 135, evp: 479, lck: 10, exp: 21844850 },
  { classId: 'fomarl', level: 165, hp: 1070, tp: 1437, atp: 592, dfp: 281, mst: 794, ata: 136, evp: 489, lck: 10, exp: 25426153 },
  { classId: 'fomarl', level: 170, hp: 1099, tp: 1474, atp: 612, dfp: 291, mst: 814, ata: 137, evp: 499, lck: 10, exp: 29395299 },
  { classId: 'fomarl', level: 175, hp: 1128, tp: 1512, atp: 632, dfp: 301, mst: 834, ata: 138, evp: 509, lck: 10, exp: 33802211 },
  { classId: 'fomarl', level: 180, hp: 1157, tp: 1549, atp: 652, dfp: 311, mst: 854, ata: 139, evp: 513, lck: 10, exp: 38751371 },
  { classId: 'fomarl', level: 185, hp: 1186, tp: 1587, atp: 672, dfp: 321, mst: 874, ata: 141, evp: 513, lck: 10, exp: 44504634 },
  { classId: 'fomarl', level: 190, hp: 1215, tp: 1624, atp: 691, dfp: 331, mst: 894, ata: 142, evp: 513, lck: 10, exp: 52082887 },
  { classId: 'fomarl', level: 195, hp: 1244, tp: 1662, atp: 706, dfp: 341, mst: 914, ata: 143, evp: 513, lck: 10, exp: 63728621 },
  { classId: 'fomarl', level: 200, hp: 1273, tp: 1699, atp: 721, dfp: 351, mst: 934, ata: 144, evp: 513, lck: 10, exp: 83227800 },
  // FOnewm
  { classId: 'fonewm', level: 1, hp: 27, tp: 90, atp: 16, dfp: 7, mst: 60, ata: 61, evp: 50, lck: 10, exp: 0 },
  { classId: 'fonewm', level: 5, hp: 49, tp: 135, atp: 24, dfp: 9, mst: 86, ata: 63, evp: 73, lck: 10, exp: 800 },
  { classId: 'fonewm', level: 10, hp: 76, tp: 189, atp: 34, dfp: 13, mst: 117, ata: 65, evp: 101, lck: 10, exp: 4050 },
  { classId: 'fonewm', level: 15, hp: 104, tp: 244, atp: 44, dfp: 16, mst: 149, ata: 67, evp: 126, lck: 10, exp: 9848 },
  { classId: 'fonewm', level: 20, hp: 131, tp: 300, atp: 54, dfp: 19, mst: 181, ata: 69, evp: 151, lck: 10, exp: 20539 },
  { classId: 'fonewm', level: 25, hp: 158, tp: 354, atp: 64, dfp: 23, mst: 212, ata: 71, evp: 172, lck: 10, exp: 39924 },
  { classId: 'fonewm', level: 30, hp: 185, tp: 409, atp: 74, dfp: 28, mst: 244, ata: 73, evp: 192, lck: 10, exp: 69816 },
  { classId: 'fonewm', level: 35, hp: 213, tp: 460, atp: 84, dfp: 33, mst: 273, ata: 75, evp: 212, lck: 10, exp: 111455 },
  { classId: 'fonewm', level: 40, hp: 240, tp: 505, atp: 94, dfp: 38, mst: 298, ata: 77, evp: 232, lck: 10, exp: 166145 },
  { classId: 'fonewm', level: 45, hp: 266, tp: 550, atp: 104, dfp: 43, mst: 323, ata: 79, evp: 257, lck: 10, exp: 235166 },
  { classId: 'fonewm', level: 50, hp: 294, tp: 595, atp: 115, dfp: 49, mst: 348, ata: 81, evp: 280, lck: 10, exp: 319847 },
  { classId: 'fonewm', level: 55, hp: 321, tp: 640, atp: 130, dfp: 56, mst: 373, ata: 83, evp: 295, lck: 10, exp: 421524 },
  { classId: 'fonewm', level: 60, hp: 349, tp: 685, atp: 145, dfp: 64, mst: 398, ata: 85, evp: 310, lck: 10, exp: 541513 },
  { classId: 'fonewm', level: 65, hp: 375, tp: 730, atp: 160, dfp: 71, mst: 423, ata: 87, evp: 325, lck: 10, exp: 681023 },
  { classId: 'fonewm', level: 70, hp: 403, tp: 775, atp: 175, dfp: 79, mst: 448, ata: 89, evp: 339, lck: 10, exp: 841271 },
  { classId: 'fonewm', level: 75, hp: 430, tp: 820, atp: 192, dfp: 88, mst: 473, ata: 91, evp: 349, lck: 10, exp: 1023533 },
  { classId: 'fonewm', level: 80, hp: 459, tp: 865, atp: 212, dfp: 98, mst: 498, ata: 93, evp: 359, lck: 10, exp: 1229071 },
  { classId: 'fonewm', level: 85, hp: 488, tp: 910, atp: 232, dfp: 108, mst: 523, ata: 95, evp: 369, lck: 10, exp: 1459348 },
  { classId: 'fonewm', level: 90, hp: 517, tp: 955, atp: 252, dfp: 118, mst: 548, ata: 97, evp: 379, lck: 10, exp: 1717321 },
  { classId: 'fonewm', level: 95, hp: 546, tp: 1000, atp: 272, dfp: 128, mst: 573, ata: 99, evp: 389, lck: 10, exp: 2008126 },
  { classId: 'fonewm', level: 100, hp: 575, tp: 1045, atp: 293, dfp: 138, mst: 598, ata: 101, evp: 399, lck: 10, exp: 2339735 },
  { classId: 'fonewm', level: 105, hp: 611, tp: 1090, atp: 313, dfp: 153, mst: 623, ata: 102, evp: 409, lck: 10, exp: 2743485 },
  { classId: 'fonewm', level: 110, hp: 645, tp: 1135, atp: 333, dfp: 168, mst: 648, ata: 104, evp: 419, lck: 10, exp: 3270523 },
  { classId: 'fonewm', level: 115, hp: 684, tp: 1180, atp: 353, dfp: 183, mst: 673, ata: 105, evp: 429, lck: 10, exp: 3954983 },
  { classId: 'fonewm', level: 120, hp: 720, tp: 1228, atp: 373, dfp: 198, mst: 698, ata: 107, evp: 439, lck: 10, exp: 4835405 },
  { classId: 'fonewm', level: 125, hp: 756, tp: 1270, atp: 388, dfp: 213, mst: 723, ata: 108, evp: 449, lck: 10, exp: 5956316 },
  { classId: 'fonewm', level: 130, hp: 793, tp: 1315, atp: 403, dfp: 228, mst: 748, ata: 110, evp: 459, lck: 10, exp: 7337658 },
  { classId: 'fonewm', level: 135, hp: 829, tp: 1360, atp: 418, dfp: 243, mst: 773, ata: 111, evp: 469, lck: 10, exp: 8994927 },
  { classId: 'fonewm', level: 140, hp: 865, tp: 1405, atp: 433, dfp: 258, mst: 798, ata: 113, evp: 474, lck: 10, exp: 10939630 },
  { classId: 'fonewm', level: 145, hp: 901, tp: 1450, atp: 448, dfp: 273, mst: 823, ata: 114, evp: 479, lck: 10, exp: 13184299 },
  { classId: 'fonewm', level: 150, hp: 938, tp: 1495, atp: 463, dfp: 288, mst: 848, ata: 116, evp: 484, lck: 10, exp: 15741551 },
  { classId: 'fonewm', level: 155, hp: 971, tp: 1540, atp: 478, dfp: 303, mst: 873, ata: 117, evp: 489, lck: 10, exp: 18623854 },
  { classId: 'fonewm', level: 160, hp: 1000, tp: 1585, atp: 493, dfp: 318, mst: 898, ata: 119, evp: 494, lck: 10, exp: 21844850 },
  { classId: 'fonewm', level: 165, hp: 1029, tp: 1630, atp: 508, dfp: 333, mst: 923, ata: 120, evp: 499, lck: 10, exp: 25426153 },
  { classId: 'fonewm', level: 170, hp: 1058, tp: 1675, atp: 523, dfp: 348, mst: 948, ata: 122, evp: 504, lck: 10, exp: 29395299 },
  { classId: 'fonewm', level: 175, hp: 1087, tp: 1720, atp: 538, dfp: 358, mst: 973, ata: 123, evp: 509, lck: 10, exp: 33802211 },
  { classId: 'fonewm', level: 180, hp: 1116, tp: 1765, atp: 553, dfp: 368, mst: 998, ata: 124, evp: 514, lck: 10, exp: 38751371 },
  { classId: 'fonewm', level: 185, hp: 1145, tp: 1810, atp: 568, dfp: 378, mst: 1023, ata: 125, evp: 519, lck: 10, exp: 44504634 },
  { classId: 'fonewm', level: 190, hp: 1174, tp: 1855, atp: 583, dfp: 388, mst: 1048, ata: 126, evp: 524, lck: 10, exp: 52082887 },
  { classId: 'fonewm', level: 195, hp: 1203, tp: 1900, atp: 598, dfp: 398, mst: 1073, ata: 127, evp: 529, lck: 10, exp: 63728621 },
  { classId: 'fonewm', level: 200, hp: 1232, tp: 1945, atp: 613, dfp: 408, mst: 1098, ata: 128, evp: 531, lck: 10, exp: 83227800 },
  // FOnewearl
  { classId: 'fonewearl', level: 1, hp: 27, tp: 87, atp: 13, dfp: 13, mst: 58, ata: 61, evp: 53, lck: 10, exp: 0 },
  { classId: 'fonewearl', level: 5, hp: 44, tp: 127, atp: 21, dfp: 17, mst: 81, ata: 63, evp: 77, lck: 10, exp: 800 },
  { classId: 'fonewearl', level: 10, hp: 66, tp: 181, atp: 31, dfp: 21, mst: 112, ata: 65, evp: 106, lck: 10, exp: 4050 },
  { classId: 'fonewearl', level: 15, hp: 88, tp: 232, atp: 39, dfp: 25, mst: 141, ata: 67, evp: 131, lck: 10, exp: 9848 },
  { classId: 'fonewearl', level: 20, hp: 110, tp: 285, atp: 47, dfp: 29, mst: 172, ata: 69, evp: 156, lck: 10, exp: 20539 },
  { classId: 'fonewearl', level: 25, hp: 131, tp: 339, atp: 54, dfp: 33, mst: 202, ata: 71, evp: 181, lck: 10, exp: 39924 },
  { classId: 'fonewearl', level: 30, hp: 153, tp: 390, atp: 64, dfp: 38, mst: 231, ata: 73, evp: 206, lck: 10, exp: 69816 },
  { classId: 'fonewearl', level: 35, hp: 175, tp: 442, atp: 73, dfp: 43, mst: 261, ata: 75, evp: 226, lck: 10, exp: 111455 },
  { classId: 'fonewearl', level: 40, hp: 197, tp: 493, atp: 82, dfp: 48, mst: 290, ata: 77, evp: 246, lck: 10, exp: 166145 },
  { classId: 'fonewearl', level: 45, hp: 218, tp: 547, atp: 93, dfp: 53, mst: 321, ata: 78, evp: 266, lck: 10, exp: 235166 },
  { classId: 'fonewearl', level: 50, hp: 242, tp: 598, atp: 105, dfp: 58, mst: 350, ata: 80, evp: 285, lck: 10, exp: 319847 },
  { classId: 'fonewearl', level: 55, hp: 269, tp: 651, atp: 117, dfp: 64, mst: 380, ata: 82, evp: 300, lck: 10, exp: 421524 },
  { classId: 'fonewearl', level: 60, hp: 297, tp: 705, atp: 130, dfp: 70, mst: 411, ata: 84, evp: 315, lck: 10, exp: 541513 },
  { classId: 'fonewearl', level: 65, hp: 323, tp: 756, atp: 145, dfp: 76, mst: 440, ata: 86, evp: 330, lck: 10, exp: 681023 },
  { classId: 'fonewearl', level: 70, hp: 350, tp: 808, atp: 160, dfp: 83, mst: 470, ata: 88, evp: 345, lck: 10, exp: 841271 },
  { classId: 'fonewearl', level: 75, hp: 378, tp: 862, atp: 175, dfp: 91, mst: 501, ata: 90, evp: 360, lck: 10, exp: 1023533 },
  { classId: 'fonewearl', level: 80, hp: 407, tp: 913, atp: 195, dfp: 99, mst: 530, ata: 92, evp: 375, lck: 10, exp: 1229071 },
  { classId: 'fonewearl', level: 85, hp: 443, tp: 966, atp: 215, dfp: 106, mst: 560, ata: 94, evp: 390, lck: 10, exp: 1459348 },
  { classId: 'fonewearl', level: 90, hp: 479, tp: 1020, atp: 235, dfp: 114, mst: 591, ata: 96, evp: 405, lck: 10, exp: 1717321 },
  { classId: 'fonewearl', level: 95, hp: 516, tp: 1071, atp: 259, dfp: 124, mst: 620, ata: 98, evp: 420, lck: 10, exp: 2008126 },
  { classId: 'fonewearl', level: 100, hp: 552, tp: 1123, atp: 284, dfp: 134, mst: 650, ata: 100, evp: 435, lck: 10, exp: 2339735 },
  { classId: 'fonewearl', level: 105, hp: 588, tp: 1174, atp: 309, dfp: 144, mst: 679, ata: 102, evp: 450, lck: 10, exp: 2743485 },
  { classId: 'fonewearl', level: 110, hp: 624, tp: 1224, atp: 332, dfp: 154, mst: 707, ata: 104, evp: 465, lck: 10, exp: 3270523 },
  { classId: 'fonewearl', level: 115, hp: 661, tp: 1272, atp: 352, dfp: 164, mst: 734, ata: 106, evp: 480, lck: 10, exp: 3954983 },
  { classId: 'fonewearl', level: 120, hp: 697, tp: 1318, atp: 371, dfp: 174, mst: 760, ata: 108, evp: 495, lck: 10, exp: 4835405 },
  { classId: 'fonewearl', level: 125, hp: 733, tp: 1369, atp: 386, dfp: 184, mst: 789, ata: 110, evp: 510, lck: 10, exp: 5956316 },
  { classId: 'fonewearl', level: 130, hp: 767, tp: 1419, atp: 401, dfp: 194, mst: 817, ata: 112, evp: 525, lck: 10, exp: 7337658 },
  { classId: 'fonewearl', level: 135, hp: 796, tp: 1467, atp: 416, dfp: 204, mst: 844, ata: 114, evp: 540, lck: 10, exp: 8994927 },
  { classId: 'fonewearl', level: 140, hp: 825, tp: 1513, atp: 431, dfp: 214, mst: 870, ata: 116, evp: 555, lck: 10, exp: 10939630 },
  { classId: 'fonewearl', level: 145, hp: 854, tp: 1564, atp: 446, dfp: 224, mst: 899, ata: 117, evp: 570, lck: 10, exp: 13184299 },
  { classId: 'fonewearl', level: 150, hp: 883, tp: 1614, atp: 459, dfp: 234, mst: 927, ata: 119, evp: 585, lck: 10, exp: 15741551 },
  { classId: 'fonewearl', level: 155, hp: 912, tp: 1662, atp: 464, dfp: 244, mst: 954, ata: 120, evp: 600, lck: 10, exp: 18623854 },
  { classId: 'fonewearl', level: 160, hp: 941, tp: 1709, atp: 469, dfp: 254, mst: 980, ata: 122, evp: 615, lck: 10, exp: 21844850 },
  { classId: 'fonewearl', level: 165, hp: 970, tp: 1759, atp: 474, dfp: 264, mst: 1009, ata: 123, evp: 630, lck: 10, exp: 25426153 },
  { classId: 'fonewearl', level: 170, hp: 999, tp: 1809, atp: 479, dfp: 274, mst: 1037, ata: 125, evp: 645, lck: 10, exp: 29395299 },
  { classId: 'fonewearl', level: 175, hp: 1028, tp: 1857, atp: 483, dfp: 284, mst: 1064, ata: 126, evp: 660, lck: 10, exp: 33802211 },
  { classId: 'fonewearl', level: 180, hp: 1057, tp: 1903, atp: 483, dfp: 294, mst: 1090, ata: 128, evp: 675, lck: 10, exp: 38751371 },
  { classId: 'fonewearl', level: 185, hp: 1083, tp: 1954, atp: 483, dfp: 304, mst: 1119, ata: 129, evp: 690, lck: 10, exp: 44504634 },
  { classId: 'fonewearl', level: 190, hp: 1104, tp: 2004, atp: 483, dfp: 314, mst: 1147, ata: 131, evp: 705, lck: 10, exp: 52082887 },
  { classId: 'fonewearl', level: 195, hp: 1126, tp: 2052, atp: 483, dfp: 324, mst: 1174, ata: 132, evp: 720, lck: 10, exp: 63728621 },
  { classId: 'fonewearl', level: 200, hp: 1148, tp: 2098, atp: 483, dfp: 334, mst: 1200, ata: 133, evp: 735, lck: 10, exp: 83227800 },
]


export interface ClassMaxStats {
  classId: CharacterClassId
  hp: number
  tp: number
  atp: number
  dfp: number
  mst: number
  ata: number
  evp: number
  lck: number
}

// Source: https://wiki.pioneer2.net/w/<Class> "Maximum" column on the per-level stats summary table.
// HP/TP maxes assume 125 HP/TP Materials on top of the level 200 stats and (for TP) max MST.
// Wiki tables do not list a LCK ceiling; LCK max is the in-game cap of 100 (base 10 + 90 from
// Mag, units, and Luck Materials at most 50).
export const CLASS_MAX_STATS: ClassMaxStats[] = [
  { classId: 'humar',     hp: 1670, tp: 1181, atp: 1397, dfp: 579, mst: 732,  ata: 200, evp: 756, lck: 100 },
  { classId: 'hunewearl', hp: 1558, tp: 1626, atp: 1237, dfp: 589, mst: 1177, ata: 199, evp: 811, lck: 100 },
  { classId: 'hucast',    hp: 2012, tp: 0,    atp: 1639, dfp: 601, mst: 0,    ata: 191, evp: 660, lck: 100 },
  { classId: 'hucaseal',  hp: 1630, tp: 0,    atp: 1301, dfp: 525, mst: 0,    ata: 218, evp: 877, lck: 100 },
  { classId: 'ramar',     hp: 1770, tp: 1114, atp: 1260, dfp: 515, mst: 665,  ata: 249, evp: 715, lck: 100 },
  { classId: 'ramarl',    hp: 1565, tp: 1480, atp: 1145, dfp: 577, mst: 1031, ata: 241, evp: 900, lck: 100 },
  { classId: 'racast',    hp: 2214, tp: 0,    atp: 1350, dfp: 606, mst: 0,    ata: 224, evp: 699, lck: 100 },
  { classId: 'racaseal',  hp: 2140, tp: 0,    atp: 1175, dfp: 688, mst: 0,    ata: 231, evp: 787, lck: 100 },
  { classId: 'fomar',     hp: 1425, tp: 2558, atp: 1002, dfp: 470, mst: 1340, ata: 163, evp: 651, lck: 100 },
  { classId: 'fomarl',    hp: 1523, tp: 2474, atp: 872,  dfp: 498, mst: 1284, ata: 170, evp: 588, lck: 100 },
  { classId: 'fonewm',    hp: 1482, tp: 2798, atp: 814,  dfp: 463, mst: 1500, ata: 180, evp: 679, lck: 100 },
  { classId: 'fonewearl', hp: 1398, tp: 3173, atp: 583,  dfp: 390, mst: 1750, ata: 186, evp: 883, lck: 100 },
]

export const CHARACTER_LEVEL_OPTIONS = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]
export const characterConfigSchema = z
  .object({
    classId: z.enum(CHARACTER_CLASS_IDS),
    level: z
      .number()
      .int()
      .min(CHARACTER_LEVEL_LIMITS.min)
      .max(CHARACTER_LEVEL_LIMITS.max)
      .refine((value) => CHARACTER_LEVEL_OPTIONS.includes(value), 'Level must match a seeded class checkpoint.'),
    difficulty: z.enum(CHARACTER_DIFFICULTY_IDS),
    gameMode: z.enum(CHARACTER_GAME_MODE_IDS),
    attackType: z.enum(CHARACTER_ATTACK_TYPE_IDS),
    shiftaLevel: z.number().int().refine(
      (value) => CHARACTER_SHIFTA_LEVELS.includes(value as CharacterShiftaLevel),
      'Unknown Shifta level selection.',
    ),
    zalureLevel: z.number().int().refine(
      (value) => CHARACTER_ZALURE_LEVELS.includes(value as CharacterZalureLevel),
      'Unknown Zalure level selection.',
    ),
    weaponId: z.string().refine((value) => CHARACTER_WEAPON_VALUE_IDS.includes(value), 'Unknown weapon selection.'),
    specialId: z.enum(CHARACTER_SPECIAL_IDS),
    grind: z.number().int().min(0).max(250),
    weaponAttributes: characterWeaponAttributesSchema,
    armorId: z.string().refine((value) => CHARACTER_ARMOR_VALUE_IDS.includes(value), 'Unknown armor selection.'),
    armorDfp: z.number().int().min(0).max(Math.max(0, CHARACTER_ARMOR_LIMITS.dfpMax - CHARACTER_ARMOR_LIMITS.dfpMin)),
    armorEvp: z.number().int().min(0).max(Math.max(0, CHARACTER_ARMOR_LIMITS.evpMax - CHARACTER_ARMOR_LIMITS.evpMin)),
    shieldId: z.string().refine((value) => CHARACTER_SHIELD_VALUE_IDS.includes(value), 'Unknown shield selection.'),
    shieldDfp: z.number().int().min(0).max(Math.max(0, CHARACTER_SHIELD_LIMITS.dfpMax - CHARACTER_SHIELD_LIMITS.dfpMin)),
    shieldEvp: z.number().int().min(0).max(Math.max(0, CHARACTER_SHIELD_LIMITS.evpMax - CHARACTER_SHIELD_LIMITS.evpMin)),
    magDef: z.number().int().min(CHARACTER_MAG_LIMITS.defMin).max(CHARACTER_MAG_LIMITS.defMax),
    magPow: z.number().int().min(CHARACTER_MAG_LIMITS.powMin).max(CHARACTER_MAG_LIMITS.powMax),
    magDex: z.number().int().min(CHARACTER_MAG_LIMITS.dexMin).max(CHARACTER_MAG_LIMITS.dexMax),
    magMind: z.number().int().min(CHARACTER_MAG_LIMITS.mindMin).max(CHARACTER_MAG_LIMITS.mindMax),
    materials: characterMaterialsSchema,
    unitSlot1Id: z.string().refine((value) => CHARACTER_UNIT_VALUE_IDS.includes(value), 'Unknown unit selection.'),
    unitSlot2Id: z.string().refine((value) => CHARACTER_UNIT_VALUE_IDS.includes(value), 'Unknown unit selection.'),
    unitSlot3Id: z.string().refine((value) => CHARACTER_UNIT_VALUE_IDS.includes(value), 'Unknown unit selection.'),
    unitSlot4Id: z.string().refine((value) => CHARACTER_UNIT_VALUE_IDS.includes(value), 'Unknown unit selection.'),
  })
  .superRefine((value, context) => {
    const selectedWeapon = CHARACTER_WEAPON_OPTIONS.find((weapon) => weapon.id === value.weaponId)
    const selectedArmor = CHARACTER_ARMOR_OPTIONS.find((armor) => armor.id === value.armorId)
    const selectedShield = CHARACTER_SHIELD_OPTIONS.find((shield) => shield.id === value.shieldId)
    const modifiedAttributesCount = countModifiedWeaponAttributes(value.weaponAttributes)
    const regularMaterialLimit = getRegularMaterialLimit(value.classId)
    const regularMaterialTotal = countRegularMaterials(value.materials)
    const selectedUnitSlots = [
      ['unitSlot1Id', value.unitSlot1Id],
      ['unitSlot2Id', value.unitSlot2Id],
      ['unitSlot3Id', value.unitSlot3Id],
      ['unitSlot4Id', value.unitSlot4Id],
    ] as const

    if (!selectedWeapon) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['weaponId'],
        message: 'Unknown weapon selection.',
      })
      return
    }

    if (value.grind > selectedWeapon.maxGrind) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['grind'],
        message: `Grind cannot exceed ${selectedWeapon.maxGrind} for ${selectedWeapon.label}.`,
      })
    }

    if (!isCharacterOptionCompatibleWithClass(selectedWeapon.compatibleClasses, value.classId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['weaponId'],
        message: `${selectedWeapon.label} cannot be equipped by ${value.classId}.`,
      })
    }

    const currentLevelStats = INITIAL_CLASS_LEVEL_STATS.find((entry) => entry.classId === value.classId && entry.level === value.level)
    const selectedUnits = selectedUnitSlots
      .map(([path, unitId]) => {
        const unit = CHARACTER_UNIT_OPTIONS.find((entry) => entry.id === unitId)
        return unit ? { path, unit } : null
      })
      .filter((selection): selection is { path: (typeof selectedUnitSlots)[number][0], unit: CharacterUnitOption } => {
        return Boolean(selection && selection.unit.id !== 'none')
      })
    const requirementStats = {
      atp: (currentLevelStats?.atp ?? 0)
        + (value.materials.power * 2)
        + (value.magPow * 2)
        + (selectedArmor?.bonuses.atp ?? 0)
        + (selectedShield?.bonuses.atp ?? 0)
        + selectedUnits.reduce((total, selection) => total + selection.unit.bonuses.atp, 0),
      mst: (currentLevelStats?.mst ?? 0)
        + (value.materials.mind * 2)
        + value.magMind
        + (selectedArmor?.bonuses.mst ?? 0)
        + (selectedShield?.bonuses.mst ?? 0)
        + selectedUnits.reduce((total, selection) => total + selection.unit.bonuses.mst, 0),
    }

    if (!doesCharacterMeetRequirement(selectedWeapon.requirement, requirementStats)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['weaponId'],
        message: `${selectedWeapon.label} requires ${selectedWeapon.requirement}.`,
      })
    }

    if (!selectedArmor) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['armorId'],
        message: 'Unknown armor selection.',
      })
      return
    }

    if (!isCharacterOptionCompatibleWithClass(selectedArmor.compatibleClasses, value.classId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['armorId'],
        message: `${selectedArmor.label} cannot be equipped by ${value.classId}.`,
      })
    }

    if (value.armorDfp < 0 || value.armorDfp > selectedArmor.dfpMax - selectedArmor.dfpMin) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['armorDfp'],
        message: `Armor DFP variance must stay between 0 and ${selectedArmor.dfpMax - selectedArmor.dfpMin} for ${selectedArmor.label}.`,
      })
    }

    if (value.armorEvp < 0 || value.armorEvp > selectedArmor.evpMax - selectedArmor.evpMin) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['armorEvp'],
        message: `Armor EVP variance must stay between 0 and ${selectedArmor.evpMax - selectedArmor.evpMin} for ${selectedArmor.label}.`,
      })
    }

    if (!selectedShield) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shieldId'],
        message: 'Unknown shield selection.',
      })
      return
    }

    if (!isCharacterOptionCompatibleWithClass(selectedShield.compatibleClasses, value.classId)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shieldId'],
        message: `${selectedShield.label} cannot be equipped by ${value.classId}.`,
      })
    }

    if (value.shieldDfp < 0 || value.shieldDfp > selectedShield.dfpMax - selectedShield.dfpMin) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shieldDfp'],
        message: `Shield DFP variance must stay between 0 and ${selectedShield.dfpMax - selectedShield.dfpMin} for ${selectedShield.label}.`,
      })
    }

    if (value.shieldEvp < 0 || value.shieldEvp > selectedShield.evpMax - selectedShield.evpMin) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['shieldEvp'],
        message: `Shield EVP variance must stay between 0 and ${selectedShield.evpMax - selectedShield.evpMin} for ${selectedShield.label}.`,
      })
    }

    if (value.armorId === 'none') {
      for (const selection of selectedUnits) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [selection.path],
          message: `${selection.unit.label} cannot be equipped without armor.`,
        })
      }
    }

    for (const selection of selectedUnits) {
      if (!isCharacterOptionCompatibleWithClass(selection.unit.compatibleClasses, value.classId)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [selection.path],
          message: `${selection.unit.label} cannot be equipped by ${value.classId}.`,
        })
      }
    }

    if ((value.magDef + value.magPow + value.magDex + value.magMind) > CHARACTER_MAG_LIMITS.totalMax) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['magDef'],
        message: `MAG levels cannot exceed a total of ${CHARACTER_MAG_LIMITS.totalMax}.`,
      })
    }

    if (modifiedAttributesCount > CHARACTER_WEAPON_ATTRIBUTE_LIMITS.maxModified) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['weaponAttributes'],
        message: `Only ${CHARACTER_WEAPON_ATTRIBUTE_LIMITS.maxModified} weapon attributes can differ from their defaults at once.`,
      })
    }

    if (isAndroidClassId(value.classId) && value.materials.tp !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['materials', 'tp'],
        message: 'Android classes cannot use TP Materials.',
      })
    }

    if (isAndroidClassId(value.classId) && value.materials.mind !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['materials', 'mind'],
        message: 'Android classes cannot use Mind Materials.',
      })
    }

    if (regularMaterialTotal > regularMaterialLimit) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['materials'],
        message: `Regular Materials cannot exceed ${regularMaterialLimit} for ${value.classId}.`,
      })
    }
  })

export const classLevelStatsSchema = z.object({
  classId: z.enum(CHARACTER_CLASS_IDS),
  level: z
    .number()
    .int()
    .min(CHARACTER_LEVEL_LIMITS.min)
    .max(CHARACTER_LEVEL_LIMITS.max)
    .refine((value) => CHARACTER_LEVEL_OPTIONS.includes(value), 'Level must match a seeded class checkpoint.'),
  hp: z.number().int().nonnegative(),
  tp: z.number().int().nonnegative(),
  atp: z.number().int().nonnegative(),
  dfp: z.number().int().nonnegative(),
  mst: z.number().int().nonnegative(),
  ata: z.number().int().nonnegative(),
  evp: z.number().int().nonnegative(),
  lck: z.number().int().nonnegative(),
  exp: z.number().int().nonnegative(),
})

export function isSupportedCharacterLevel(level: number): boolean {
  return CHARACTER_LEVEL_OPTIONS.includes(level)
}

export function clampCharacterLevel(level: number): number {
  if (!Number.isFinite(level)) {
    return CHARACTER_LEVEL_LIMITS.min
  }

  const clamped = Math.min(CHARACTER_LEVEL_LIMITS.max, Math.max(CHARACTER_LEVEL_LIMITS.min, Math.trunc(level)))
  let supportedLevel = CHARACTER_LEVEL_OPTIONS[0]

  for (const option of CHARACTER_LEVEL_OPTIONS) {
    if (option > clamped) {
      break
    }

    supportedLevel = option
  }

  return supportedLevel
}

export function clampWeaponAttributeValue(value: number): number {
  if (!Number.isFinite(value)) {
    return CHARACTER_WEAPON_ATTRIBUTE_LIMITS.min
  }

  return Math.min(
    CHARACTER_WEAPON_ATTRIBUTE_LIMITS.max,
    Math.max(CHARACTER_WEAPON_ATTRIBUTE_LIMITS.min, value),
  )
}

export function snapWeaponAttributeValue(value: number): number {
  const clamped = clampWeaponAttributeValue(value)

  return Math.floor(clamped / CHARACTER_WEAPON_ATTRIBUTE_LIMITS.step) * CHARACTER_WEAPON_ATTRIBUTE_LIMITS.step
}

export function countModifiedWeaponAttributes(attributes: CharacterWeaponAttributes): number {
  return CHARACTER_WEAPON_ATTRIBUTE_KEYS.filter((key) => attributes[key] !== DEFAULT_CHARACTER_WEAPON_ATTRIBUTES[key]).length
}

export function isSelectableClassId(classId: CharacterClassId): boolean {
  return CHARACTER_CLASS_IDS.includes(classId)
}

export function isCharacterOptionCompatibleWithClass(
  compatibleClasses: CharacterCompatibleClasses,
  classId: CharacterClassId,
): boolean {
  return compatibleClasses === 'all' || compatibleClasses.includes(classId)
}

export function parseCharacterRequirement(requirement: string): ParsedCharacterRequirement {
  const normalized = requirement.trim()

  if (normalized === 'Aucun') {
    return { stat: 'none', value: 0 }
  }

  const match = normalized.match(/^(\d+)\s+(ATP|MST)$/i)

  if (!match) {
    return { stat: 'none', value: 0 }
  }

  return {
    stat: match[2].toLowerCase() as Exclude<CharacterRequirementStat, 'none'>,
    value: Number(match[1]),
  }
}

export function doesCharacterMeetRequirement(requirement: string, stats: CharacterRequirementStats): boolean {
  const parsedRequirement = parseCharacterRequirement(requirement)

  if (parsedRequirement.stat === 'none') {
    return true
  }

  if (parsedRequirement.stat === 'atp') {
    return stats.atp >= parsedRequirement.value
  }

  return stats.mst >= parsedRequirement.value
}

export function createCharacterOptionsResponse(): CharacterOptionsResponse {
  return {
    classes: [...CHARACTER_CLASS_OPTIONS],
    selectableClassIds: [...CHARACTER_CLASS_IDS],
    difficulties: [...CHARACTER_DIFFICULTY_OPTIONS],
    gameModes: [...CHARACTER_GAME_MODE_OPTIONS],
    attackTypes: [...CHARACTER_ATTACK_TYPE_OPTIONS],
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
}

function includesSelectedLabel(selectedLabel: string | undefined, expectedLabels: string[] | undefined): boolean {
  if (!expectedLabels || expectedLabels.length === 0) {
    return true
  }

  if (!selectedLabel) {
    return false
  }

  return expectedLabels.includes(selectedLabel)
}

function includesSelectedValue(selectedValue: string | undefined, expectedValues: string[] | undefined): boolean {
  if (!expectedValues || expectedValues.length === 0) {
    return true
  }

  if (!selectedValue) {
    return false
  }

  return expectedValues.includes(selectedValue)
}

function includesAnySelectedUnit(selectedLabels: string[], expectedLabels: string[] | undefined): boolean {
  if (!expectedLabels || expectedLabels.length === 0) {
    return true
  }

  return expectedLabels.some((label) => selectedLabels.includes(label))
}

export function mergeResolvedConditionalEffects(
  left: ResolvedCharacterConditionalEffects,
  right: ResolvedCharacterConditionalEffects,
): ResolvedCharacterConditionalEffects {
  return {
    bonuses: {
      hp: left.bonuses.hp + right.bonuses.hp,
      tp: left.bonuses.tp + right.bonuses.tp,
      atp: left.bonuses.atp + right.bonuses.atp,
      dfp: left.bonuses.dfp + right.bonuses.dfp,
      mst: left.bonuses.mst + right.bonuses.mst,
      ata: left.bonuses.ata + right.bonuses.ata,
      evp: left.bonuses.evp + right.bonuses.evp,
      lck: left.bonuses.lck + right.bonuses.lck,
      efr: left.bonuses.efr + right.bonuses.efr,
      eic: left.bonuses.eic + right.bonuses.eic,
      eth: left.bonuses.eth + right.bonuses.eth,
      edk: left.bonuses.edk + right.bonuses.edk,
      elt: left.bonuses.elt + right.bonuses.elt,
    },
    weaponAtpMultiplierPercent: left.weaponAtpMultiplierPercent + right.weaponAtpMultiplierPercent,
    attackSpeedPercent: Math.max(left.attackSpeedPercent, right.attackSpeedPercent),
    techniqueLevelBonus: left.techniqueLevelBonus + right.techniqueLevelBonus,
    tpCostModifierPercent: left.tpCostModifierPercent + right.tpCostModifierPercent,
    statusSpecialSuccessRatePercent: left.statusSpecialSuccessRatePercent + right.statusSpecialSuccessRatePercent,
    instantKillSpecialSuccessRatePercent: left.instantKillSpecialSuccessRatePercent + right.instantKillSpecialSuccessRatePercent,
    ignoresRangedAccuracyPenalty: left.ignoresRangedAccuracyPenalty || right.ignoresRangedAccuracyPenalty,
    reducesTechniqueChargeTime: left.reducesTechniqueChargeTime || right.reducesTechniqueChargeTime,
    reducesTechniqueCastTime: left.reducesTechniqueCastTime || right.reducesTechniqueCastTime,
  }
}

export function resolveConditionalEffects(
  effects: CharacterConditionalEffect[],
  context: CharacterEquipmentConditionContext,
): ResolvedCharacterConditionalEffects {
  return effects.reduce<ResolvedCharacterConditionalEffects>((resolved, effect) => {
    const matches = includesSelectedLabel(context.weaponLabel, effect.requirements.weaponLabels)
      && includesSelectedValue(context.weaponType, effect.requirements.weaponTypes)
      && includesSelectedValue(context.weaponSpecial, effect.requirements.weaponSpecials)
      && includesSelectedLabel(context.armorLabel, effect.requirements.armorLabels)
      && includesSelectedLabel(context.shieldLabel, effect.requirements.shieldLabels)
      && includesAnySelectedUnit(context.unitLabels, effect.requirements.unitLabels)
      && includesSelectedLabel(context.magLabel, effect.requirements.magLabels)

    if (!matches) {
      return resolved
    }

    return mergeResolvedConditionalEffects(resolved, {
      bonuses: {
        ...effect.bonuses,
      },
      weaponAtpMultiplierPercent: effect.weaponAtpMultiplierPercent,
      attackSpeedPercent: effect.attackSpeedPercent ?? 0,
      techniqueLevelBonus: effect.techniqueLevelBonus ?? 0,
      tpCostModifierPercent: effect.tpCostModifierPercent ?? 0,
      statusSpecialSuccessRatePercent: effect.statusSpecialSuccessRatePercent ?? 0,
      instantKillSpecialSuccessRatePercent: effect.instantKillSpecialSuccessRatePercent ?? 0,
      ignoresRangedAccuracyPenalty: effect.ignoresRangedAccuracyPenalty ?? false,
      reducesTechniqueChargeTime: effect.reducesTechniqueChargeTime ?? false,
      reducesTechniqueCastTime: effect.reducesTechniqueCastTime ?? false,
    })
  }, {
    ...ZERO_RESOLVED_CHARACTER_CONDITIONAL_EFFECTS,
    bonuses: { ...ZERO_CHARACTER_STAT_BONUSES },
  })
}

export function calculateEquipmentAtp(input: EquipmentAtpInput): number {
  const weaponAtp = (input.weaponMinAtp + (2 * input.grind)) * (1 + ((input.weaponAtpMultiplierPercent ?? 0) * 0.01))
  const baseAtp = weaponAtp + input.frameAtp + input.barrierAtp + input.unitAtp
  const attributeMultiplier = 1 + ((input.weaponAttributePercent ?? 0) * 0.01)

  return baseAtp * attributeMultiplier
}

export function getCharacterProfession(classId: CharacterClassId): CharacterProfession {
  if (classId.startsWith('hu')) {
    return 'hunter'
  }

  if (classId.startsWith('ra')) {
    return 'ranger'
  }

  return 'force'
}

export function getMaxProfessionVariance(classId: CharacterClassId): number {
  const profession = getCharacterProfession(classId)

  if (profession === 'hunter') {
    return 6
  }

  if (profession === 'ranger') {
    return 4
  }

  return 3
}

export function calculateBaseAtp(input: BaseAtpInput): number {
  return input.baseAtpMax - input.professionVarianceMax
}

export function getShiftaOption(level: CharacterShiftaLevel): CharacterShiftaOption {
  return CHARACTER_SHIFTA_OPTIONS.find((entry) => entry.level === level) ?? CHARACTER_SHIFTA_OPTIONS[0]
}

export function getZalureOption(level: CharacterZalureLevel): CharacterZalureOption {
  return CHARACTER_ZALURE_OPTIONS.find((entry) => entry.level === level) ?? CHARACTER_ZALURE_OPTIONS[0]
}

export function calculateShiftaEqAtp(input: ShiftaAtpInput): number {
  return input.eqAtp * (1 + (input.shiftaAtpIncrease * 0.01))
}

export function getProfessionVarianceRange(classId: CharacterClassId): ProfessionVarianceRange {
  const profession = getCharacterProfession(classId)

  if (profession === 'hunter') {
    return {
      min: 1,
      average: 3.5,
      max: 6,
    }
  }

  if (profession === 'ranger') {
    return {
      min: 1,
      average: 2.5,
      max: 4,
    }
  }

  return {
    min: 1,
    average: 2,
    max: 3,
  }
}

export function calculateEffectiveAtp(input: EffectiveAtpInput): number {
  const shiftaMultiplier = 1 + (input.shiftaAtpIncrease * 0.01)

  return ((input.baseAtp + (input.weaponVariance * input.weaponSpread)) * shiftaMultiplier) + input.eqAtp + input.professionVariance
}

const ENEMY_DFP_SUMMARIES: Record<CharacterDifficultyId, Record<CharacterGameModeId, EnemyDfpSummary>> = {
  normal: {
    normal: {
      average: 91.14,
      min: 0,
      minEnemy: 'Mothmant (E1)',
      max: 500,
      maxEnemy: 'Pan Arms (E1), Epsilon',
      entryCount: 158,
    },
    oneperson: {
      average: 76.8,
      min: 0,
      minEnemy: 'Mothmant (E1)',
      max: 500,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
  },
  hard: {
    normal: {
      average: 216.03,
      min: 0,
      minEnemy: 'Dubwitch (E1)',
      max: 858,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
    oneperson: {
      average: 174.25,
      min: -198,
      minEnemy: 'Pazuzu (Desert)',
      max: 773,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
  },
  veryhard: {
    normal: {
      average: 362.28,
      min: 0,
      minEnemy: 'Dubwitch (E1)',
      max: 1128,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
    oneperson: {
      average: 303.8,
      min: 0,
      minEnemy: 'Dubwitch (E2)',
      max: 1068,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
  },
  ultimate: {
    normal: {
      average: 783.38,
      min: 0,
      minEnemy: 'Dubwitch (E1)',
      max: 1860,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
    oneperson: {
      average: 641.27,
      min: 0,
      minEnemy: 'Dubwitch (E2)',
      max: 1676,
      maxEnemy: 'Pan Arms (E1)',
      entryCount: 158,
    },
  },
}

export function getEnemyDfpSummary(
  difficulty: CharacterDifficultyId,
  gameMode: CharacterGameModeId,
): EnemyDfpSummary {
  return ENEMY_DFP_SUMMARIES[difficulty][gameMode]
}

export function calculateEffectiveEnemyDfp(input: EffectiveEnemyDfpInput): number {
  return input.baseDfp * (1 - (input.zalureReduction * 0.01))
}

export function calculateCriticalRate(input: CriticalRateInput): number {
  return (Math.min(input.luck, 100) / 5) * 0.01
}

export function getAttackModifier(
  attackType: CharacterAttackTypeId,
  weapon: CharacterWeaponOption | undefined,
  effectiveSpecialLabel?: string,
): number {
  if (attackType === 'normal') {
    return 1
  }

  if (attackType === 'heavy') {
    return 1.89
  }

  if (weapon?.label === 'Vjaya') {
    return 5.67
  }

  const specialLabel = effectiveSpecialLabel ?? weapon?.special

  if (specialLabel === 'Charge' || specialLabel === 'Spirit' || specialLabel === 'Berserk') {
    return 3.33
  }

  return 0.56
}

export function calculateDamage(input: DamageInput): number {
  return ((input.effectiveAtp - input.effectiveDfp) / 5) * 0.9 * input.modifier
}
