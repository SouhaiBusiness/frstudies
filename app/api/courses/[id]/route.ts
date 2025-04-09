import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { del } from "@vercel/blob"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const client = await clientPromise
    const db = client.db()

    const course = await db.collection("courses").findOne({
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
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Get the course to delete the file
    const course = await db.collection("courses").findOne({
      _id: new ObjectId(id),
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if user is admin or the uploader
    const user = await db.collection("users").findOne({ clerkId: userId })

    if (user?.role !== "admin" && course.uploadedById !== userId) {
      return NextResponse.json({ error: "Unauthorized to delete this course" }, { status: 403 })
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

    // Delete the course document
    const result = await db.collection("courses").deleteOne({
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
