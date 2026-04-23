import { Router } from 'express'
import mongoose from 'mongoose'

export const healthRouter = Router()

healthRouter.get('/health', (_request, response) => {
  response.json({
    status: 'ok',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})
