import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
// Add proper SSL options for MongoDB Atlas
const options = {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  retryWrites: true,
  w: "majority",
}

let client
let clientPromise: Promise<MongoClient>

try {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  // Test the connection
  clientPromise
    .then(() => {
      console.log("MongoDB connection successful")
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err)
    })
} catch (error) {
  console.error("MongoDB connection setup error:", error)
  throw new Error(`MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`)
}

export default clientPromise
