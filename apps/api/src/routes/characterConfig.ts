import {
  DEFAULT_CHARACTER_CONFIG,
  characterConfigSchema,
  createCharacterOptionsResponse,
  type CharacterMaterials,
  type CharacterWeaponAttributes,
} from '@pso/shared'
import { Router } from 'express'
import { CharacterConfigModel } from '../models/CharacterConfig.js'

function readWeaponAttributes(input: unknown): CharacterWeaponAttributes {
  const source = typeof input === 'object' && input !== null
    ? (input as Partial<Record<keyof CharacterWeaponAttributes, unknown>>)
    : {}

  const legacySource = typeof input === 'object' && input !== null
    ? (input as Partial<Record<'native' | 'abeast' | 'machine' | 'dark', unknown>>)
    : {}

  const legacyEnemyValue = [legacySource.native, legacySource.abeast, legacySource.machine, legacySource.dark]
    .map((value) => Number(value))
    .find((value) => Number.isFinite(value) && value !== 0)

  return {
    enemy: Number(source.enemy ?? legacyEnemyValue ?? DEFAULT_CHARACTER_CONFIG.weaponAttributes.enemy),
    hit: Number(source.hit ?? DEFAULT_CHARACTER_CONFIG.weaponAttributes.hit),
  }
}

function readMaterials(input: unknown): CharacterMaterials {
  const source = typeof input === 'object' && input !== null
    ? (input as Partial<Record<keyof CharacterMaterials, unknown>>)
    : {}

  return {
    hp: Number(source.hp ?? DEFAULT_CHARACTER_CONFIG.materials.hp),
    tp: Number(source.tp ?? DEFAULT_CHARACTER_CONFIG.materials.tp),
    power: Number(source.power ?? DEFAULT_CHARACTER_CONFIG.materials.power),
    def: Number(source.def ?? DEFAULT_CHARACTER_CONFIG.materials.def),
    mind: Number(source.mind ?? DEFAULT_CHARACTER_CONFIG.materials.mind),
    evade: Number(source.evade ?? DEFAULT_CHARACTER_CONFIG.materials.evade),
    luck: Number(source.luck ?? DEFAULT_CHARACTER_CONFIG.materials.luck),
  }
}

function normalizeValidationErrors(error: ReturnType<typeof characterConfigSchema.safeParse>): string[] {
  if (error.success) {
    return []
  }

  return error.error.issues.map((issue) => issue.message)
}

export const characterConfigRouter = Router()

characterConfigRouter.get('/character-config/options', (_request, response) => {
  response.json(createCharacterOptionsResponse())
})

characterConfigRouter.get('/character-config', async (_request, response, next) => {
  try {
    const latestConfig = await CharacterConfigModel.findOne().sort({ updatedAt: -1 }).lean()

    if (!latestConfig) {
      response.json({
        config: DEFAULT_CHARACTER_CONFIG,
      })
      return
    }

    response.json({
      config: {
        classId: latestConfig.classId,
        level: latestConfig.level,
        difficulty: latestConfig.difficulty ?? DEFAULT_CHARACTER_CONFIG.difficulty,
        gameMode: latestConfig.gameMode ?? DEFAULT_CHARACTER_CONFIG.gameMode,
        attackType: latestConfig.attackType ?? DEFAULT_CHARACTER_CONFIG.attackType,
        shiftaLevel: latestConfig.shiftaLevel ?? DEFAULT_CHARACTER_CONFIG.shiftaLevel,
        zalureLevel: latestConfig.zalureLevel ?? DEFAULT_CHARACTER_CONFIG.zalureLevel,
        weaponId: latestConfig.weaponId ?? DEFAULT_CHARACTER_CONFIG.weaponId,
        specialId: latestConfig.specialId ?? DEFAULT_CHARACTER_CONFIG.specialId,
        grind: latestConfig.grind ?? DEFAULT_CHARACTER_CONFIG.grind,
        armorId: latestConfig.armorId ?? DEFAULT_CHARACTER_CONFIG.armorId,
        armorDfp: latestConfig.armorDfp ?? DEFAULT_CHARACTER_CONFIG.armorDfp,
        armorEvp: latestConfig.armorEvp ?? DEFAULT_CHARACTER_CONFIG.armorEvp,
        shieldId: latestConfig.shieldId ?? DEFAULT_CHARACTER_CONFIG.shieldId,
        shieldDfp: latestConfig.shieldDfp ?? DEFAULT_CHARACTER_CONFIG.shieldDfp,
        shieldEvp: latestConfig.shieldEvp ?? DEFAULT_CHARACTER_CONFIG.shieldEvp,
        materials: readMaterials(latestConfig.materials),
        unitSlot1Id: latestConfig.unitSlot1Id ?? DEFAULT_CHARACTER_CONFIG.unitSlot1Id,
        unitSlot2Id: latestConfig.unitSlot2Id ?? DEFAULT_CHARACTER_CONFIG.unitSlot2Id,
        unitSlot3Id: latestConfig.unitSlot3Id ?? DEFAULT_CHARACTER_CONFIG.unitSlot3Id,
        unitSlot4Id: latestConfig.unitSlot4Id ?? DEFAULT_CHARACTER_CONFIG.unitSlot4Id,
        weaponAttributes: readWeaponAttributes(latestConfig.weaponAttributes),
      },
    })
  } catch (error) {
    next(error)
  }
})

characterConfigRouter.post('/character-config', async (request, response, next) => {
  const requestedLevel = Number(request.body?.level)

  const validation = characterConfigSchema.safeParse({
    classId: request.body?.classId,
    level: requestedLevel,
    difficulty: request.body?.difficulty,
    gameMode: request.body?.gameMode,
    attackType: request.body?.attackType,
    shiftaLevel: Number(request.body?.shiftaLevel),
    zalureLevel: Number(request.body?.zalureLevel),
    weaponId: request.body?.weaponId,
    specialId: request.body?.specialId,
    grind: Number(request.body?.grind),
    armorId: request.body?.armorId,
    armorDfp: Number(request.body?.armorDfp),
    armorEvp: Number(request.body?.armorEvp),
    shieldId: request.body?.shieldId,
    shieldDfp: Number(request.body?.shieldDfp),
    shieldEvp: Number(request.body?.shieldEvp),
    magDef: Number(request.body?.magDef),
    magPow: Number(request.body?.magPow),
    magDex: Number(request.body?.magDex),
    magMind: Number(request.body?.magMind),
    materials: readMaterials(request.body?.materials),
    unitSlot1Id: request.body?.unitSlot1Id,
    unitSlot2Id: request.body?.unitSlot2Id,
    unitSlot3Id: request.body?.unitSlot3Id,
    unitSlot4Id: request.body?.unitSlot4Id,
    weaponAttributes: readWeaponAttributes(request.body?.weaponAttributes),
  })

  if (!validation.success) {
    response.status(400).json({
      errors: normalizeValidationErrors(validation),
    })
    return
  }

  try {
    const document = await CharacterConfigModel.create(validation.data)

    response.status(201).json({
      config: {
        id: document.id,
        classId: document.classId,
        level: document.level,
        difficulty: document.difficulty,
        gameMode: document.gameMode,
        attackType: document.attackType,
        shiftaLevel: document.shiftaLevel,
        zalureLevel: document.zalureLevel,
        weaponId: document.weaponId,
        specialId: document.specialId,
        grind: document.grind,
        armorId: document.armorId,
        armorDfp: document.armorDfp,
        armorEvp: document.armorEvp,
        shieldId: document.shieldId,
        shieldDfp: document.shieldDfp,
        shieldEvp: document.shieldEvp,
        magDef: document.magDef,
        magPow: document.magPow,
        magDex: document.magDex,
        magMind: document.magMind,
        materials: document.materials,
        unitSlot1Id: document.unitSlot1Id,
        unitSlot2Id: document.unitSlot2Id,
        unitSlot3Id: document.unitSlot3Id,
        unitSlot4Id: document.unitSlot4Id,
        weaponAttributes: document.weaponAttributes,
        updatedAt: document.updatedAt,
      },
    })
  } catch (error) {
    next(error)
  }
})
