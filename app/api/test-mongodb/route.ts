import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    console.log("Testing MongoDB connection...")

    // Test database connection
    const client = await clientPromise
    console.log("MongoDB client created successfully")

    const db = client.db()
    console.log("Database accessed successfully")

    // List all collections
    const collections = await db.listCollections().toArray()
    console.log(`Found ${collections.length} collections`)

    // Try to insert a test document
    const testCollection = db.collection("test_connection")
    const testResult = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: "MongoDB connection test",
    })
    console.log("Test document inserted with ID:", testResult.insertedId)

    // Delete the test document
    await testCollection.deleteOne({ _id: testResult.insertedId })
    console.log("Test document deleted")

    return NextResponse.json({
      status: "success",
      message: "MongoDB connection test successful",
      collections: collections.map((c) => c.name),
      testInsertId: testResult.insertedId.toString(),
    })
  } catch (error) {
    console.error("MongoDB connection test failed:", error)

    return NextResponse.json(
      {
        status: "error",
        message: "MongoDB connection test failed",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
