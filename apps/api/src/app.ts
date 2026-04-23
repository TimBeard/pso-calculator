import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { characterConfigRouter } from './routes/characterConfig.js'
import { classLevelStatsRouter } from './routes/classLevelStats.js'
import { healthRouter } from './routes/health.js'

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: env.corsOrigin,
    }),
  )
  app.use(express.json())

  app.use(healthRouter)
  app.use('/api', characterConfigRouter)
  app.use('/api', classLevelStatsRouter)

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    const message = error instanceof Error ? error.message : 'Unexpected server error'

    response.status(500).json({
      error: message,
    })
  })

  return app
}
