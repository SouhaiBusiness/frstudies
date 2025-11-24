// app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  try {
    const code = new URL(req.url).searchParams.get("code");
    const error = new URL(req.url).searchParams.get("error");

    // Handle user cancellation or errors from Google
    if (error) {
      console.log("Google auth error:", error);
      return NextResponse.redirect(new URL("/?error=google_cancelled", process.env.NEXTAUTH_URL));
    }

    if (!code) {
      console.log("No code received from Google");
      return NextResponse.redirect(new URL("/?error=no_code", process.env.NEXTAUTH_URL));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;

    if (!clientId || !clientSecret) {
      console.error("Missing Google credentials in environment");
      return NextResponse.redirect(
        new URL("/?error=missing_config", process.env.NEXTAUTH_URL)
      );
    }

    // Exchange code for token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange failed:", error);
      return NextResponse.redirect(
        new URL("/?error=token_exchange_failed", process.env.NEXTAUTH_URL)
      );
    }

    const tokenData = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    if (!userResponse.ok) {
      console.error("Getting user info failed");
      return NextResponse.redirect(
        new URL("/?error=userinfo_failed", process.env.NEXTAUTH_URL)
      );
    }

    const googleUser = await userResponse.json();

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find or create user
    let user = await usersCollection.findOne({
      email: googleUser.email,
    });

    if (!user) {
      // Create new user from Google
      const result = await usersCollection.insertOne({
        name: googleUser.name || "User",
        email: googleUser.email,
        googleId: googleUser.id,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Get the created user
      user = await usersCollection.findOne({ _id: result.insertedId });
    }

    // Ensure user is not null
    if (!user) {
      console.error("Failed to create or fetch user");
      return NextResponse.redirect(
        new URL("/?error=user_creation_failed", process.env.NEXTAUTH_URL)
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    // Create redirect URL with token and user data
    const redirectUrl = new URL("/", process.env.NEXTAUTH_URL);
    redirectUrl.searchParams.set("token", token);
    redirectUrl.searchParams.set(
      "user",
      encodeURIComponent(
        JSON.stringify({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        })
      )
    );

    console.log("Google auth successful for:", user.email);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Google auth callback error:", error);
    return NextResponse.redirect(
      new URL("/?error=auth_failed", process.env.NEXTAUTH_URL)
    );
  }
}