import { INITIAL_CHARACTER_SHIELD_OPTIONS, characterShieldOptionSchema } from '@pso/shared'
import { ShieldCatalogModel } from '../models/ShieldCatalog.js'

export async function seedShieldCatalog(): Promise<void> {
  const operations: Parameters<typeof ShieldCatalogModel.bulkWrite>[0] = INITIAL_CHARACTER_SHIELD_OPTIONS.map((entry) => {
    const validated = characterShieldOptionSchema.parse(entry)

    return {
      updateOne: {
        filter: {
          id: validated.id,
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

  await ShieldCatalogModel.bulkWrite(operations)
}