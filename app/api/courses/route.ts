import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
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
    console.log("Course upload API called");

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const filiere = formData.get("filiere") as Filiere | null;
    const semesterStr = formData.get("semester") as string | null;
    const moduleId = formData.get("module") as string | null;
    const userId = formData.get("userId") as string | null;

    console.log("Received form data:", {
      filiere,
      semesterStr,
      moduleId,
      userId,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type
    });

    // Validate inputs
    if (!file || !filiere || !semesterStr || !moduleId || !userId) {
      console.log("Validation failed - missing fields:", {
        hasFile: !!file,
        hasFiliere: !!filiere,
        hasSemester: !!semesterStr,
        hasModule: !!moduleId,
        hasUserId: !!userId
      });
      
      return NextResponse.json(
        { 
          error: "Missing required fields",
          details: {
            file: !file ? "File is required" : undefined,
            filiere: !filiere ? "Filiere is required" : undefined,
            semester: !semesterStr ? "Semester is required" : undefined,
            module: !moduleId ? "Module is required" : undefined,
            userId: !userId ? "UserId is required" : undefined
          }
        }, 
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    console.log("Uploading file to Vercel Blob...");

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      contentType: file.type
    });

    console.log("File uploaded to blob:", blob.url);

    const client = await clientPromise;
    const db = client.db();
    const modulesCollection = db.collection<Module>("modules");

    // Create file document
    const fileDoc: FileItem = {
      id: new ObjectId().toString(),
      name: file.name,
      fileUrl: blob.url,
      fileSize: file.size,
      uploadedBy: "User",
      uploadedById: userId,
      uploadedAt: new Date(),
    };

    console.log("Checking if module exists...");

    // Check if module exists
    const existingModule = await modulesCollection.findOne({
      filiere,
      semester: Number(semesterStr),
      moduleId,
    });

    if (existingModule) {
      console.log("Module exists, updating...");
      
      // Update existing module
      await modulesCollection.updateOne(
        { _id: existingModule._id },
        {
          $push: { files: fileDoc },
          $set: { updatedAt: new Date() },
        }
      );

      console.log("Module updated successfully");

      return NextResponse.json(
        {
          message: "File added to existing module",
          moduleId: existingModule._id.toString(),
          fileId: fileDoc.id,
          fileUrl: blob.url,
        },
        { status: 200 }
      );
    } else {
      console.log("Creating new module...");
      
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

      console.log("Inserting new module:", newModule);

      const result = await modulesCollection.insertOne(newModule);

      console.log("New module created with ID:", result.insertedId);

      return NextResponse.json(
        {
          message: "New module created with file",
          moduleId: result.insertedId.toString(),
          fileUrl: blob.url,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error uploading course:", error);
    
    // Ensure we always return valid JSON
    return NextResponse.json(
      {
        error: "Failed to upload course",
        details: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined,
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