import mongoose from 'mongoose'

export async function connectToDatabase(mongoUri: string): Promise<void> {
  mongoose.set('strictQuery', true)

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  })
}
