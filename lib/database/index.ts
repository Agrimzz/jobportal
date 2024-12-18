import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log("Database already connected.")
    return cached.conn
  }
  if (!MONGODB_URI) return console.log("MONGODB_URI not defined")

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "jobportal",
      bufferCommands: false,
    })

  cached.conn = await cached.promise

  return cached.conn
}
