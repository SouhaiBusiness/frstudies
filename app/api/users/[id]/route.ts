import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user is an admin or the user being requested
    const requestingUser = await db.collection("users").findOne({
      clerkId: userId,
    })

    if (!requestingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let user

    // If the ID is a Clerk ID
    if (id.startsWith("user_")) {
      user = await db.collection("users").findOne({ clerkId: id })
    } else {
      // If the ID is a MongoDB ObjectId
      user = await db.collection("users").findOne({ _id: new ObjectId(id) })
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Only allow admins or the user themselves to access user data
    if (requestingUser.role !== "admin" && requestingUser.clerkId !== user.clerkId) {
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
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    const body = await request.json()

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user is an admin
    const requestingUser = await db.collection("users").findOne({
      clerkId: userId,
    })

    if (!requestingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    let userToUpdate

    // If the ID is a Clerk ID
    if (id.startsWith("user_")) {
      userToUpdate = await db.collection("users").findOne({ clerkId: id })
    } else {
      // If the ID is a MongoDB ObjectId
      userToUpdate = await db.collection("users").findOne({ _id: new ObjectId(id) })
    }

    if (!userToUpdate) {
      return NextResponse.json({ error: "User to update not found" }, { status: 404 })
    }

    // Only allow admins or the user themselves to update user data
    // Only admins can change roles
    if (requestingUser.role !== "admin" && requestingUser.clerkId !== userToUpdate.clerkId) {
      return NextResponse.json({ error: "Unauthorized to update this user" }, { status: 403 })
    }

    if (requestingUser.role !== "admin" && body.role) {
      return NextResponse.json({ error: "Unauthorized to change user role" }, { status: 403 })
    }

    // Update the user
    const updateData = {
      ...body,
      updatedAt: new Date(),
    }

    let result

    // If the ID is a Clerk ID
    if (id.startsWith("user_")) {
      result = await db.collection("users").updateOne({ clerkId: id }, { $set: updateData })
    } else {
      // If the ID is a MongoDB ObjectId
      result = await db.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: updateData })
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
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    const client = await clientPromise
    const db = client.db()

    // Check if the requesting user is an admin
    const adminUser = await db.collection("users").findOne({
      clerkId: userId,
      role: "admin",
    })

    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    let result

    // If the ID is a Clerk ID
    if (id.startsWith("user_")) {
      result = await db.collection("users").deleteOne({ clerkId: id })
    } else {
      // If the ID is a MongoDB ObjectId
      result = await db.collection("users").deleteOne({ _id: new ObjectId(id) })
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

