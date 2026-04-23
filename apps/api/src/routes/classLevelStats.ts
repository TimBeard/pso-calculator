import { CHARACTER_CLASS_IDS, CHARACTER_LEVEL_LIMITS, isSupportedCharacterLevel } from '@pso/shared'
import { Router } from 'express'
import { ClassLevelStatsModel } from '../models/ClassLevelStats.js'

function isCharacterClassId(value: string): boolean {
  return CHARACTER_CLASS_IDS.includes(value as (typeof CHARACTER_CLASS_IDS)[number])
}

function parseLevelParam(value: string): number | null {
  const parsed = Number.parseInt(value, 10)

  if (Number.isNaN(parsed)) {
    return null
  }

  if (parsed < CHARACTER_LEVEL_LIMITS.min || parsed > CHARACTER_LEVEL_LIMITS.max) {
    return null
  }

  if (!isSupportedCharacterLevel(parsed)) {
    return null
  }

  return parsed
}

export const classLevelStatsRouter = Router()

classLevelStatsRouter.get('/class-level-stats/:classId', async (request, response, next) => {
  const classId = request.params.classId

  if (!isCharacterClassId(classId)) {
    response.status(400).json({
      error: 'Unknown class id.',
    })
    return
  }

  try {
    const stats = await ClassLevelStatsModel.find({ classId }).sort({ level: 1 }).lean()

    response.json({
      stats,
    })
  } catch (error) {
    next(error)
  }
})

classLevelStatsRouter.get('/class-level-stats/:classId/:level', async (request, response, next) => {
  const classId = request.params.classId
  const level = parseLevelParam(request.params.level)

  if (!isCharacterClassId(classId)) {
    response.status(400).json({
      error: 'Unknown class id.',
    })
    return
  }

  if (level === null) {
    response.status(400).json({
      error: 'Invalid level.',
    })
    return
  }

  try {
    const stats = await ClassLevelStatsModel.findOne({ classId, level }).lean()

    if (!stats) {
      response.status(404).json({
        error: 'Class level stats not found.',
      })
      return
    }

    response.json({
      stats,
    })
  } catch (error) {
    next(error)
  }
})