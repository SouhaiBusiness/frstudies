import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Type for Cloudinary upload response
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
  bytes?: number;
  created_at?: string;
}

// Upload file to Cloudinary
export async function uploadFileToCloudinary(file: File | Blob): Promise<CloudinaryUploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        format: 'pdf',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("No result from Cloudinary"));
        } else {
          resolve(result);
        }
      }
    );
    
    uploadStream.end(buffer);
  });
}

// Delete file from Cloudinary
export async function deleteFileFromCloudinary(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, 
      { resource_type: 'raw' },
      (error, result) => {
        if (error) reject(error);
        else resolve();
      }
    );
  });
}