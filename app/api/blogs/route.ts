import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Blog } from "@/lib/models"
import type { InsertOneResult } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("blogs")

    // Build query
    let query: any = {}

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ],
      }
    }

    if (status) {
      query.status = status
    }

    // Get total count for pagination
    const total = await collection.countDocuments(query)

    // Get blogs with pagination
    const blogs = await collection.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    // Calculate pagination info
    const pages = Math.ceil(total / limit)

    return NextResponse.json({
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages,
      },
    })
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("Blog creation API called")

    // Get auth token from request header
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    console.log("Received blog data:", body)

    // Validate required fields
    if (!body.title || !body.description || !body.content) {
      console.log("Validation failed: Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Test MongoDB connection before proceeding
    console.log("Testing MongoDB connection...")
    const client = await clientPromise
    console.log("MongoDB client created")

    const db = client.db()
    console.log("Database accessed")

    // Verify we can access the blogs collection
    const collections = await db.listCollections({ name: "blogs" }).toArray()
    console.log("Collections check:", collections.length > 0 ? "blogs collection exists" : "blogs collection not found")

    if (collections.length === 0) {
      // Create the collection if it doesn't exist
      console.log("Creating blogs collection")
      await db.createCollection("blogs")
    }

    // Create slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
    }

    // Set default values
    const newBlog: Blog = {
      ...body,
      authorId: body.authorId || "anonymous",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Attempting to insert blog:", JSON.stringify(newBlog, null, 2))

    // Try to insert the blog with a timeout
    const insertPromise = db.collection("blogs").insertOne(newBlog)

    // Set a timeout for the insert operation
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timed out")), 10000),
    )

    // Race the insert operation against the timeout
    const result = (await Promise.race([insertPromise, timeoutPromise])) as InsertOneResult<Blog>

    console.log("Blog created with ID:", result.insertedId)

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blogId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating blog:", error)

    // Detailed error information
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    }

    console.error("Error details:", errorDetails)

    return NextResponse.json(
      {
        error: "Failed to create blog",
        details: errorDetails.message,
        errorInfo: errorDetails,
      },
      { status: 500 },
    )
  }
}