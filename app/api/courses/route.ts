import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { auth } from "@clerk/nextjs/server"
import { ObjectId } from "mongodb"
import type { UpdateFilter } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    console.log("Course upload API called")

    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const filiere = formData.get("filiere") as string
    const semester = Number.parseInt(formData.get("semester") as string)
    const moduleId = formData.get("module") as string

    if (!file || !filiere || !semester || !moduleId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const placeholderFileUrl = `/api/files/${file.name.replace(/\s+/g, "-")}`

    const client = await clientPromise
    const db = client.db()

    const existingModule = await db.collection("modules").findOne({
      filiere,
      semester,
      moduleId,
    })

    const fileDoc = {
      id: new ObjectId().toString(),
      name: file.name,
      fileUrl: placeholderFileUrl,
      fileSize: file.size,
      uploadedBy: "User",
      uploadedById: userId,
      uploadedAt: new Date(),
    }

    if (existingModule) {
      const updateData: UpdateFilter<Document> = {
        $push: { files: fileDoc },
        $set: { updatedAt: new Date() },
      }

      const result = await db.collection("modules").updateOne(
        { _id: existingModule._id },
        updateData as any
      )

      return NextResponse.json(
        {
          message: "File added to existing module successfully",
          moduleId: existingModule._id,
          fileId: fileDoc.id,
          note: "File URL is a placeholder. In production, use a file storage service.",
        },
        { status: 200 },
      )
    } else {
      let moduleTitle = moduleId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

      if (moduleId.includes("-")) {
        moduleTitle = moduleId
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      }

      const module = {
        filiere,
        semester,
        moduleId,
        title: moduleTitle,
        files: [fileDoc],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection("modules").insertOne(module)

      return NextResponse.json(
        {
          message: "New module with file created successfully",
          moduleId: result.insertedId,
          note: "File URL is a placeholder. In production, use a file storage service.",
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error("Error uploading course:", error)
    return NextResponse.json(
      {
        error: "Failed to upload course",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
