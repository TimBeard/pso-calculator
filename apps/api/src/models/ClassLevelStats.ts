import { CHARACTER_CLASS_IDS, CHARACTER_LEVEL_LIMITS } from '@pso/shared'
import { Schema, model } from 'mongoose'

const classLevelStatsSchema = new Schema(
  {
    classId: {
      type: String,
      enum: CHARACTER_CLASS_IDS,
      required: true,
    },
    level: {
      type: Number,
      min: CHARACTER_LEVEL_LIMITS.min,
      max: CHARACTER_LEVEL_LIMITS.max,
      required: true,
    },
    hp: {
      type: Number,
      min: 0,
      required: true,
    },
    tp: {
      type: Number,
      min: 0,
      required: true,
    },
    atp: {
      type: Number,
      min: 0,
      required: true,
    },
    dfp: {
      type: Number,
      min: 0,
      required: true,
    },
    mst: {
      type: Number,
      min: 0,
      required: true,
    },
    ata: {
      type: Number,
      min: 0,
      required: true,
    },
    evp: {
      type: Number,
      min: 0,
      required: true,
    },
    lck: {
      type: Number,
      min: 0,
      required: true,
    },
    exp: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

classLevelStatsSchema.index({ classId: 1, level: 1 }, { unique: true })

export const ClassLevelStatsModel = model('ClassLevelStats', classLevelStatsSchema)