import { INITIAL_CLASS_LEVEL_STATS, classLevelStatsSchema } from '@pso/shared'
import { ClassLevelStatsModel } from '../models/ClassLevelStats.js'

export async function seedClassLevelStats(): Promise<void> {
  const operations = INITIAL_CLASS_LEVEL_STATS.map((entry) => {
    const validated = classLevelStatsSchema.parse(entry)

    return {
      updateOne: {
        filter: {
          classId: validated.classId,
          level: validated.level,
        },
        update: {
          $set: validated,
        },
        upsert: true,
      },
    }
  })

  if (operations.length === 0) {
    return
  }

  await ClassLevelStatsModel.bulkWrite(operations)
}