import {
  CHARACTER_CLASS_IDS,
  characterConfigSchema,
  createBaseCharacterConfigForClass,
  type CharacterClassId,
  type CharacterConfigInput,
} from '@pso/shared'

export const CHARACTER_CONFIG_URL_PARAM = 'c'

export type CharacterClassConfig = Omit<
  CharacterConfigInput,
  'classId' | 'shiftaLevel' | 'zalureLevel' | 'difficulty' | 'gameMode'
>

export type CharacterPerClassConfigs = Record<CharacterClassId, CharacterClassConfig>

export interface CharacterConfigState {
  activeClassId: CharacterClassId
  shiftaLevel: CharacterConfigInput['shiftaLevel']
  zalureLevel: CharacterConfigInput['zalureLevel']
  difficulty: CharacterConfigInput['difficulty']
  gameMode: CharacterConfigInput['gameMode']
  perClass: CharacterPerClassConfigs
}

function toUrlSafeBase64(value: string): string {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromUrlSafeBase64(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const paddingNeeded = (4 - (normalized.length % 4)) % 4
  return normalized + '='.repeat(paddingNeeded)
}

function encodeUtf8ToBase64(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'utf-8').toString('base64')
  }

  const bytes = new TextEncoder().encode(value)
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return window.btoa(binary)
}

function decodeBase64ToUtf8(value: string): string {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'base64').toString('utf-8')
  }

  const binary = window.atob(value)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new TextDecoder().decode(bytes)
}

export function pickClassConfig(config: CharacterConfigInput): CharacterClassConfig {
  return {
    level: config.level,
    attackType: config.attackType,
    weaponId: config.weaponId,
    specialId: config.specialId,
    grind: config.grind,
    weaponAttributes: { ...config.weaponAttributes },
    armorId: config.armorId,
    armorDfp: config.armorDfp,
    armorEvp: config.armorEvp,
    shieldId: config.shieldId,
    shieldDfp: config.shieldDfp,
    shieldEvp: config.shieldEvp,
    magDef: config.magDef,
    magPow: config.magPow,
    magDex: config.magDex,
    magMind: config.magMind,
    materials: { ...config.materials },
    unitSlot1Id: config.unitSlot1Id,
    unitSlot2Id: config.unitSlot2Id,
    unitSlot3Id: config.unitSlot3Id,
    unitSlot4Id: config.unitSlot4Id,
  }
}

export function composeCharacterConfig(
  classId: CharacterClassId,
  classConfig: CharacterClassConfig,
  shiftaLevel: CharacterConfigInput['shiftaLevel'],
  zalureLevel: CharacterConfigInput['zalureLevel'],
  difficulty: CharacterConfigInput['difficulty'],
  gameMode: CharacterConfigInput['gameMode'],
): CharacterConfigInput {
  return {
    classId,
    shiftaLevel,
    zalureLevel,
    difficulty,
    gameMode,
    ...classConfig,
    weaponAttributes: { ...classConfig.weaponAttributes },
    materials: { ...classConfig.materials },
  }
}

export function createDefaultPerClassConfigs(): CharacterPerClassConfigs {
  const result = {} as CharacterPerClassConfigs

  for (const classId of CHARACTER_CLASS_IDS) {
    result[classId] = pickClassConfig(createBaseCharacterConfigForClass(classId))
  }

  return result
}

function isCharacterClassId(value: unknown): value is CharacterClassId {
  return typeof value === 'string' && (CHARACTER_CLASS_IDS as readonly string[]).includes(value)
}

function validateClassConfig(
  classId: CharacterClassId,
  classConfig: unknown,
): CharacterClassConfig | null {
  if (!classConfig || typeof classConfig !== 'object') {
    return null
  }

  // shiftaLevel/zalureLevel/difficulty/gameMode are stored globally; provide schema defaults
  // so legacy per-class payloads (or newer payloads where they are intentionally absent) still validate.
  const defaults = createBaseCharacterConfigForClass(classId)
  const candidate = {
    classId,
    shiftaLevel: defaults.shiftaLevel,
    zalureLevel: defaults.zalureLevel,
    difficulty: defaults.difficulty,
    gameMode: defaults.gameMode,
    ...(classConfig as Record<string, unknown>),
  }
  const result = characterConfigSchema.safeParse(candidate)

  if (!result.success) {
    return null
  }

  return pickClassConfig(result.data as CharacterConfigInput)
}

export function encodeCharacterConfigState(state: CharacterConfigState): string {
  const payload = {
    v: 5,
    a: state.activeClassId,
    s: state.shiftaLevel,
    z: state.zalureLevel,
    d: state.difficulty,
    g: state.gameMode,
    c: state.perClass,
  }

  return toUrlSafeBase64(encodeUtf8ToBase64(JSON.stringify(payload)))
}

export function decodeCharacterConfigState(encoded: string): CharacterConfigState | null {
  if (!encoded) {
    return null
  }

  let parsed: unknown

  try {
    parsed = JSON.parse(decodeBase64ToUtf8(fromUrlSafeBase64(encoded)))
  } catch {
    return null
  }

  if (!parsed || typeof parsed !== 'object') {
    return null
  }

  const payload = parsed as Record<string, unknown>
  const defaults = createDefaultPerClassConfigs()
  const baseDefaults = createBaseCharacterConfigForClass(CHARACTER_CLASS_IDS[0])

  // Legacy single-config payload (no version field).
  if (!('v' in payload)) {
    const legacy = characterConfigSchema.safeParse(parsed)
    if (!legacy.success) {
      return null
    }
    const config = legacy.data as CharacterConfigInput

    return {
      activeClassId: config.classId,
      shiftaLevel: config.shiftaLevel,
      zalureLevel: config.zalureLevel,
      difficulty: config.difficulty,
      gameMode: config.gameMode,
      perClass: { ...defaults, [config.classId]: pickClassConfig(config) },
    }
  }

  const activeClassRaw = payload.a
  if (!isCharacterClassId(activeClassRaw)) {
    return null
  }

  const perClass: CharacterPerClassConfigs = { ...defaults }
  const perClassRaw = payload.c
  // For legacy v3/v4 payloads, capture shifta/zalure/difficulty/gameMode from the active class entry before stripping.
  let legacyActiveShifta: CharacterConfigInput['shiftaLevel'] | undefined
  let legacyActiveZalure: CharacterConfigInput['zalureLevel'] | undefined
  let legacyActiveDifficulty: CharacterConfigInput['difficulty'] | undefined
  let legacyActiveGameMode: CharacterConfigInput['gameMode'] | undefined

  if (perClassRaw && typeof perClassRaw === 'object') {
    for (const [rawClassId, rawFields] of Object.entries(perClassRaw as Record<string, unknown>)) {
      if (!isCharacterClassId(rawClassId)) {
        continue
      }

      if (rawClassId === activeClassRaw && rawFields && typeof rawFields === 'object') {
        const fields = rawFields as Record<string, unknown>
        if (typeof fields.shiftaLevel === 'number') {
          legacyActiveShifta = fields.shiftaLevel as CharacterConfigInput['shiftaLevel']
        }
        if (typeof fields.zalureLevel === 'number') {
          legacyActiveZalure = fields.zalureLevel as CharacterConfigInput['zalureLevel']
        }
        if (typeof fields.difficulty === 'string') {
          legacyActiveDifficulty = fields.difficulty as CharacterConfigInput['difficulty']
        }
        if (typeof fields.gameMode === 'string') {
          legacyActiveGameMode = fields.gameMode as CharacterConfigInput['gameMode']
        }
      }

      const validated = validateClassConfig(rawClassId, rawFields)

      if (validated) {
        perClass[rawClassId] = validated
      }
    }
  }

  const rawShifta = payload.s
  const rawZalure = payload.z
  const rawDifficulty = payload.d
  const rawGameMode = payload.g
  const shiftaLevel = (typeof rawShifta === 'number' ? rawShifta : legacyActiveShifta ?? baseDefaults.shiftaLevel) as CharacterConfigInput['shiftaLevel']
  const zalureLevel = (typeof rawZalure === 'number' ? rawZalure : legacyActiveZalure ?? baseDefaults.zalureLevel) as CharacterConfigInput['zalureLevel']
  const difficulty = (typeof rawDifficulty === 'string' ? rawDifficulty : legacyActiveDifficulty ?? baseDefaults.difficulty) as CharacterConfigInput['difficulty']
  const gameMode = (typeof rawGameMode === 'string' ? rawGameMode : legacyActiveGameMode ?? baseDefaults.gameMode) as CharacterConfigInput['gameMode']

  return {
    activeClassId: activeClassRaw,
    shiftaLevel,
    zalureLevel,
    difficulty,
    gameMode,
    perClass,
  }
}
