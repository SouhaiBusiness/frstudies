import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("blogs")

    // Get total count
    const totalBlogs = await collection.countDocuments()

    // Get published count
    const publishedBlogs = await collection.countDocuments({ status: "published" })

    // Get draft count
    const draftBlogs = await collection.countDocuments({ status: "draft" })

    return NextResponse.json({
      totalBlogs,
      publishedBlogs,
      draftBlogs,
    })
  } catch (error) {
    console.error("Error fetching blog stats:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch blog statistics",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
