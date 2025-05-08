import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { auth } from "@clerk/nextjs/server"
import { ObjectId } from "mongodb"
import type { FileItem, Module } from "@/lib/models"

type Filiere = Module["filiere"]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filiere = searchParams.get("filiere")
    const semester = searchParams.get("semester")
    const module = searchParams.get("module")

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection<Module>("modules")

    const query: Record<string, any> = {}

    if (filiere) query.filiere = filiere

    if (semester) {
      query.semester = semester.includes(",")
        ? { $in: semester.split(",").map((s) => Number.parseInt(s)) }
        : Number.parseInt(semester)
    }

    if (module) query.moduleId = module

    const modules = await collection.find(query).sort({ semester: 1, title: 1 }).toArray()

    return NextResponse.json({ courses: modules })
  } catch (error) {
    console.error("Error fetching modules:", error)
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const filiere = formData.get("filiere") as Filiere | null
    const semesterStr = formData.get("semester") as string | null
    const moduleId = formData.get("module") as string | null

    if (!file || !filiere || !semesterStr || !moduleId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const semester = Number.parseInt(semesterStr)
    const moduleLabel = moduleId.split("-").pop() || moduleId
    const placeholderFileUrl = `/api/files/${file.name.replace(/\s+/g, "-")}`

    const client = await clientPromise
    const db = client.db()
    const modulesCollection = db.collection<Module>("modules")

    const existingModule = await modulesCollection.findOne({
      filiere,
      semester,
      moduleId,
    })

    const fileDoc: FileItem = {
      id: new ObjectId().toString(),
      name: file.name,
      fileUrl: placeholderFileUrl,
      fileSize: file.size,
      uploadedBy: "User",
      uploadedById: userId,
      uploadedAt: new Date(),
    }

    if (existingModule) {
      await modulesCollection.updateOne(
        { _id: existingModule._id },
        {
          $push: { files: fileDoc },
          $set: { updatedAt: new Date() },
        } as any // ✅ Workaround: TypeScript accepts this as a valid update
      )

      return NextResponse.json(
        {
          message: "File added to existing module successfully",
          moduleId: existingModule._id,
          fileId: fileDoc.id,
          note: "File URL is a placeholder. In production, use a file storage service.",
        },
        { status: 200 }
      )
    } else {
      const moduleTitle = moduleId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      const newModule: Module = {
        filiere,
        semester,
        moduleId,
        title: moduleTitle,
        files: [fileDoc],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await modulesCollection.insertOne(newModule)

      return NextResponse.json(
        {
          message: "New module with file created successfully",
          moduleId: result.insertedId,
          note: "File URL is a placeholder. In production, use a file storage service.",
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error("Error uploading course:", error)
    return NextResponse.json(
      {
        error: "Failed to upload course",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
