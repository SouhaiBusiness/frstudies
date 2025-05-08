import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { uploadFileToCloudinary } from '@/lib/cloudinary';
import type { Filiere, Module, FileItem } from '@/lib/models';

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

    // Upload to Cloudinary
    const uploadResult = await uploadFileToCloudinary(file);
    if (!uploadResult?.secure_url) {
      throw new Error("Failed to upload file to Cloudinary");
    }

    const semester = Number.parseInt(semesterStr);
    const client = await clientPromise;
    const db = client.db();
    const modulesCollection = db.collection<Module>("modules");

    // Create file document
    const fileDoc: FileItem = {
      id: new ObjectId().toString(),
      name: file.name,
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileSize: file.size,
      uploadedBy: "User",
      uploadedById: userId,
      uploadedAt: new Date(),
    };

    // Check if module exists
    const existingModule = await modulesCollection.findOne({
      filiere,
      semester,
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
        semester,
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