import { INITIAL_CHARACTER_UNIT_OPTIONS, characterUnitOptionSchema } from '@pso/shared'
import { UnitCatalogModel } from '../models/UnitCatalog.js'

export async function seedUnitCatalog(): Promise<void> {
  const operations: Parameters<typeof UnitCatalogModel.bulkWrite>[0] = INITIAL_CHARACTER_UNIT_OPTIONS.map((entry) => {
    const validated = characterUnitOptionSchema.parse(entry)

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

  await UnitCatalogModel.bulkWrite(operations)
}
