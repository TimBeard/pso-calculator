import { INITIAL_CHARACTER_ARMOR_OPTIONS, characterArmorOptionSchema } from '@pso/shared'
import { ArmorCatalogModel } from '../models/ArmorCatalog.js'

export async function seedArmorCatalog(): Promise<void> {
  const operations: Parameters<typeof ArmorCatalogModel.bulkWrite>[0] = INITIAL_CHARACTER_ARMOR_OPTIONS.map((entry) => {
    const validated = characterArmorOptionSchema.parse(entry)

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

  await ArmorCatalogModel.bulkWrite(operations)
}