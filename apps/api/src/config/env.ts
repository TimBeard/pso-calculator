import dotenv from 'dotenv'

dotenv.config()

function parsePort(rawValue: string | undefined): number {
  const parsed = Number.parseInt(rawValue ?? '4000', 10)
  return Number.isNaN(parsed) ? 4000 : parsed
}

function parseOrigins(rawValue: string | undefined): string[] | true {
  if (!rawValue || rawValue.trim() === '*') {
    return true
  }

  return rawValue
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

export const env = {
  port: parsePort(process.env.PORT),
  mongoUri: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/pso_calculator',
  corsOrigin: parseOrigins(process.env.CORS_ORIGIN),
}
