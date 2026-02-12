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
 
  };

  response.cookies.set("auth_token", "", cookieOptions);
  response.cookies.set("basket_count", "", cookieOptions);
  response.cookies.set("primary_color", "", cookieOptions);
  response.cookies.set("secondary_color", "", cookieOptions);

  return response;
}
