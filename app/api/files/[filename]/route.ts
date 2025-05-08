import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  try {
    // Since files are now served directly from Cloudinary,
    // this endpoint should redirect to the Cloudinary URL
    // You might want to keep it for backward compatibility
    // or tracking downloads
    
    return NextResponse.json(
      { error: "Files are now served directly from Cloudinary" },
      { status: 410 } // Gone status code
    );
  } catch (error) {
    console.error("Error serving file:", error);
    return NextResponse.json({ error: "Failed to serve file" }, { status: 500 });
  }
}