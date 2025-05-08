import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  clerkId: string
  email: string
  name: string
  role: "admin" | "author" | "user"
  createdAt: Date
  updatedAt: Date
}

export interface Blog {
  _id?: ObjectId
  title: string
  description: string
  content: string
  author: string
  authorId: string
  category: string
  slug: string
  status: "draft" | "published"
  createdAt: Date
  updatedAt: Date
}

export interface FileItem {
  id: string;
  name: string;
  fileUrl: string;
  publicId: string;  // Add this line
  fileSize: number;
  uploadedBy: string;
  uploadedById: string;
  uploadedAt: Date;
}

export interface Module {
  _id?: ObjectId
  filiere: "literature" | "linguistics" | "exams" | "commentaire-compose" | "dissertation" | "essai"
  semester: number
  moduleId: string
  title: string
  files: FileItem[]
  createdAt: Date
  updatedAt: Date
}
export type Filiere = Module["filiere"];

// Add to your existing models.ts
export interface NewsletterSubscriber {
  _id?: ObjectId
  email: string
  createdAt: Date
  verified?: boolean
  unsubscribed?: boolean
}