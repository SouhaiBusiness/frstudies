import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { auth } from "@clerk/nextjs/server"

export async function DELETE(
  request: Request,
  { params }: { params: { moduleId: string; fileId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { moduleId, fileId } = params

    const client = await clientPromise
    const db = client.db()

    // Find the module
    const module = await db.collection("modules").findOne({
      _id: new ObjectId(moduleId),
    })

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 })
    }

    // Find the file to delete
    const fileToDelete = module.files?.find((file: any) => file.id === fileId)
    if (!fileToDelete) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Check permissions (admin or file uploader)
    const user = await db.collection("users").findOne({ clerkId: userId })
    if (user?.role !== "admin" && fileToDelete.uploadedById !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Remove the file from the module
    await db.collection("modules").updateOne(
      { _id: new ObjectId(moduleId) },
      {
        $pull: { files: { id: fileId } },
        $set: { updatedAt: new Date() },
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    )
  }
}