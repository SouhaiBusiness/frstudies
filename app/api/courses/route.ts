import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { auth } from "@clerk/nextjs/server"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filiere = searchParams.get("filiere")
    const semester = searchParams.get("semester")
    const module = searchParams.get("module")

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("modules")

    // Build query
    const query: Record<string, any> = {}

    if (filiere) query.filiere = filiere

    // Handle semester parameter (can be single value or comma-separated list)
    if (semester) {
      if (semester.includes(",")) {
        // Handle multiple semesters (comma-separated)
        const semesterValues = semester.split(",").map((s) => Number.parseInt(s))
        query.semester = { $in: semesterValues }
      } else {
        // Handle single semester
        query.semester = Number.parseInt(semester)
      }
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
    console.log("Course upload API called")

    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const filiere = formData.get("filiere") as string | null
    const semesterStr = formData.get("semester") as string | null
    const moduleId = formData.get("module") as string | null

    if (!file || !filiere || !semesterStr || !moduleId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const semester = Number.parseInt(semesterStr)

    console.log("Received course data:", {
      filiere,
      semester,
      moduleId,
      fileName: file?.name,
      fileSize: file?.size,
    })

    // Get module label for the title
    const moduleLabel = moduleId.split("-").pop() || moduleId

    // Since we can't use Vercel Blob, we'll store metadata and use a placeholder URL
    // In a production environment, you would use a file storage service like AWS S3, Firebase Storage, etc.
    const placeholderFileUrl = `/api/files/${file.name.replace(/\s+/g, "-")}`

    const client = await clientPromise
    const db = client.db()

    // Check if the module already exists
    const existingModule = await db.collection("modules").findOne({
      filiere,
      semester,
      moduleId,
    })

    if (existingModule) {
      // Module exists, add the file to its files array
      console.log("Module exists, adding file to existing module:", existingModule._id)

      const fileDoc = {
        id: new ObjectId().toString(),
        name: file.name,
        fileUrl: placeholderFileUrl,
        fileSize: file.size,
        uploadedBy: "User",
        uploadedById: userId,
        uploadedAt: new Date(),
      }

      const result = await db.collection("modules").updateOne(
        { _id: existingModule._id },
        {
          $push: { files: fileDoc },
          $set: { updatedAt: new Date() },
        },
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
      // Module doesn't exist, create a new one with the file
      console.log("Module doesn't exist, creating new module")

      // Get module title based on moduleId
      let moduleTitle = moduleId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

      // If moduleId follows a pattern like "introduction-linguistique", extract a better title
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
        files: [
          {
            id: new ObjectId().toString(),
            name: file.name,
            fileUrl: placeholderFileUrl,
            fileSize: file.size,
            uploadedBy: "User",
            uploadedById: userId,
            uploadedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      console.log("Creating new module:", module)
      const result = await db.collection("modules").insertOne(module)
      console.log("Module created with ID:", result.insertedId)

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
