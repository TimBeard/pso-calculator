import { createApp } from './app.js'
import { env } from './config/env.js'
import { seedArmorCatalog } from './db/seedArmorCatalog.js'
import { connectToDatabase } from './db/connect.js'
import { seedClassLevelStats } from './db/seedClassLevelStats.js'
import { seedShieldCatalog } from './db/seedShieldCatalog.js'
import { seedUnitCatalog } from './db/seedUnitCatalog.js'

async function startServer(): Promise<void> {
  await connectToDatabase(env.mongoUri)
  await seedClassLevelStats()
  await seedArmorCatalog()
  await seedShieldCatalog()
  await seedUnitCatalog()

  const app = createApp()
  app.listen(env.port, () => {
    console.log(`API listening on port ${env.port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start API', error)
  process.exit(1)
})
