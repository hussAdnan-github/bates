import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "تم تسجيل الخروج بنجاح",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // حذف الكوكي
  };

  response.cookies.set("auth_token", "", cookieOptions);
  response.cookies.set("roles", "", cookieOptions);
  response.cookies.set("userName", "", cookieOptions);

  return response;
}
