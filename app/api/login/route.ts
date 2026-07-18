import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const password = body.password;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "admin_session",
    value: "authenticated",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
