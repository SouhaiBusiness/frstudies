import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check for auth token
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = request.headers.get("x-user-id")
    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user exists
    const requestingUser = await db.collection("users").findOne({
      email: userId,
    })

    if (!requestingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let user

    // Try as MongoDB ObjectId first
    try {
      user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    } catch {
      // If not a valid ObjectId, search by email
      user = await db.collection("users").findOne({ email: id })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only allow admins or the user themselves to access user data
    if (requestingUser.role !== "admin" && requestingUser.email !== user.email) {
      return NextResponse.json({ error: "Unauthorized to access this user data" }, { status: 403 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check for auth token
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = request.headers.get("x-user-id")
    const id = params.id
    const body = await request.json()

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user is an admin or the user being updated
    const requestingUser = await db.collection("users").findOne({
      email: userId,
    })

    if (!requestingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let userToUpdate

    // Try as MongoDB ObjectId first
    try {
      userToUpdate = await db.collection("users").findOne({ _id: new ObjectId(id) })
    } catch {
      // If not a valid ObjectId, search by email
      userToUpdate = await db.collection("users").findOne({ email: id })
    }

    if (!userToUpdate) {
      return NextResponse.json({ error: "User to update not found" }, { status: 404 })
    }

    // Only allow admins or the user themselves to update user data
    if (requestingUser.role !== "admin" && requestingUser.email !== userToUpdate.email) {
      return NextResponse.json({ error: "Unauthorized to update this user" }, { status: 403 })
    }

    // Only admins can change roles
    if (requestingUser.role !== "admin" && body.role) {
      return NextResponse.json({ error: "Unauthorized to change user role" }, { status: 403 })
    }

    // Update the user
    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    let result

    // Try as MongoDB ObjectId first
    try {
      result = await db.collection("users").updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      )
    } catch {
      // If not a valid ObjectId, update by email
      result = await db.collection("users").updateOne(
        { email: id },
        { $set: updateData }
      )
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "User updated successfully",
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check for auth token
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = request.headers.get("x-user-id")
    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user is an admin
    const adminUser = await db.collection("users").findOne({
      email: userId,
      role: "admin",
    })

    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    let result

    // Try as MongoDB ObjectId first
    try {
      result = await db.collection("users").deleteOne({
        _id: new ObjectId(id),
      })
    } catch {
      // If not a valid ObjectId, delete by email
      result = await db.collection("users").deleteOne({
        email: id,
      })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}