import { deleteFileFromCloudinary } from '@/lib/cloudinary';
import { NextRequest } from 'next/server'
import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import type { Module, FileItem } from '@/lib/models';

// ... existing imports ...

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

    // Delete from Cloudinary if publicId exists
    if (fileToDelete.publicId) {
      try {
        await deleteFileFromCloudinary(fileToDelete.publicId);
      } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    // Remove the file from the module
    await db.collection<Module>("modules").updateOne(
      { _id: new ObjectId(moduleId) },
      {
        $pull: { 
          files: { id: fileId } as FileItem
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