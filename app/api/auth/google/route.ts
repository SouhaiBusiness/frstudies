// app/api/auth/google/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/google/callback`;

  if (!clientId) {
    return NextResponse.json(
      { message: "Google Client ID not configured" },
      { status: 500 }
    );
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
  }).toString()}`;

  return NextResponse.redirect(googleAuthUrl);
}