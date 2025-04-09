import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri = process.env.MONGODB_URI;

// Clean and valid MongoClient options for latest driver
const options = {
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  retryWrites: true,
  writeConcern: { w: "majority" },
};

let client;
let clientPromise: Promise<MongoClient>;

try {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  // Optional: log success or error
  clientPromise
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
} catch (error) {
  console.error("MongoDB connection setup error:", error);
  throw new Error(
    `MongoDB connection failed: ${error instanceof Error ? error.message : String(error)}`
  );
}

export default clientPromise;
