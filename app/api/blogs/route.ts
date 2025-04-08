import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Blog } from "@/lib/models"
import { auth } from "@clerk/nextjs/server"
import type { InsertOneResult, Document } from "mongodb"

// GET all blogs with filters & pagination
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
    const blogs = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

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

// POST create a new blog
export async function POST(request: NextRequest) {
  try {
    console.log("Blog creation API called")

    const { userId } = auth()
    console.log("User ID from auth:", userId)

    const body = await request.json()
    console.log("Received blog data:", body)

    if (!body.title || !body.description || !body.content) {
      console.log("Validation failed: Missing required fields")
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    const collections = await db.listCollections({ name: "blogs" }).toArray()
    if (collections.length === 0) {
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

    const newBlog: Blog = {
      ...body,
      authorId: userId || "anonymous",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Attempting to insert blog:", JSON.stringify(newBlog, null, 2))

    const insertPromise = db.collection("blogs").insertOne(newBlog)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timed out")), 10000),
    )

    const result = await Promise.race([insertPromise, timeoutPromise]) as InsertOneResult<Document>

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

    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    }

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
