import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { del } from "@vercel/blob"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Query the "modules" collection instead of "courses"
    const course = await db.collection("modules").findOne({
      _id: new ObjectId(id),
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Query the "modules" collection instead of "courses"
    // Get the course to delete the file
    const course = await db.collection("modules").findOne({
      _id: new ObjectId(id),
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Delete the file from Vercel Blob
    if (course.fileUrl) {
      try {
        await del(course.fileUrl)
      } catch (error) {
        console.error("Error deleting file from Vercel Blob:", error)
        // Continue with deletion even if blob deletion fails
      }
    }

    // Delete from "modules" collection instead of "courses"
    const result = await db.collection("modules").deleteOne({
      _id: new ObjectId(id),
    })

    return NextResponse.json({
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 })
  }
}