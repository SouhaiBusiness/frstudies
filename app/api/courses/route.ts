import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { auth } from "@clerk/nextjs/server"
import { ObjectId } from "mongodb"
import type { FileItem, Module } from "@/lib/models"
import { put, del } from '@vercel/blob';

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
    // Authentication
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const filiere = formData.get("filiere") as Filiere | null;
    const semesterStr = formData.get("semester") as string | null;
    const moduleId = formData.get("module") as string | null;

    // Validate inputs
    if (!file || !filiere || !semesterStr || !moduleId) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      contentType: file.type
    });

    const client = await clientPromise;
    const db = client.db();
    const modulesCollection = db.collection<Module>("modules");

    // Create file document
    const fileDoc: FileItem = {
      id: new ObjectId().toString(),
      name: file.name,
      fileUrl: blob.url, // Using Blob URL
      fileSize: file.size,
      uploadedBy: "User",
      uploadedById: userId,
      uploadedAt: new Date(),
    };

    // Check if module exists
    const existingModule = await modulesCollection.findOne({
      filiere,
      semester: Number(semesterStr),
      moduleId,
    });

    if (existingModule) {
      // Update existing module
      await modulesCollection.updateOne(
        { _id: existingModule._id },
        {
          $push: { files: fileDoc },
          $set: { updatedAt: new Date() },
        }
      );

      return NextResponse.json(
        {
          message: "File added to existing module",
          moduleId: existingModule._id,
          fileId: fileDoc.id,
          fileUrl: blob.url,
        },
        { status: 200 }
      );
    } else {
      // Create new module
      const moduleTitle = moduleId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const newModule: Module = {
        filiere,
        semester: Number(semesterStr),
        moduleId,
        title: moduleTitle,
        files: [fileDoc],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await modulesCollection.insertOne(newModule);

      return NextResponse.json(
        {
          message: "New module created with file",
          moduleId: result.insertedId,
          fileUrl: blob.url,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error uploading course:", error);
    return NextResponse.json(
      {
        error: "Failed to upload course",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}




export async function DELETE(
  request: Request,
  { params }: { params: { moduleId: string; fileId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { moduleId, fileId } = params;

    const client = await clientPromise;
    const db = client.db();

    // Find the module
    const module = await db.collection<Module>("modules").findOne({
      _id: new ObjectId(moduleId),
    });

    if (!module) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    // Find the file to delete
    const fileToDelete = module.files?.find((file) => file.id === fileId);
    if (!fileToDelete) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check permissions
    const user = await db.collection("users").findOne({ clerkId: userId });
    if (user?.role !== "admin" && fileToDelete.uploadedById !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete from Vercel Blob
    try {
      await del(fileToDelete.fileUrl);
    } catch (error) {
      console.error("Error deleting file from Blob:", error);
      // Continue with deletion even if Blob deletion fails
    }

    // Remove the file from the module
    await db.collection<Module>("modules").updateOne(
      { _id: new ObjectId(moduleId) },
      {
        $pull: { 
          files: { id: fileId } 
        },
        $set: { updatedAt: new Date() },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}