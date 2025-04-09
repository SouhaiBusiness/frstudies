import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filiere = searchParams.get("filiere")
    const semester = searchParams.get("semester")

    if (!filiere) {
      return NextResponse.json({ error: "Filiere parameter is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("courses")

    // Build query
    const query: Record<string, any> = { filiere }
    if (semester) {
      query.semester = Number.parseInt(semester)
    }

    const courses = await collection.find(query).sort({ semester: 1, title: 1 }).toArray()

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error fetching courses by filiere:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
