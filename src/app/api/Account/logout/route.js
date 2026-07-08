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

  response.cookies.delete("auth_token");
  response.cookies.delete("basket_count");
  response.cookies.delete("primary_color");
  response.cookies.delete("secondary_color");
  response.cookies.delete("username");

  return response;
}
