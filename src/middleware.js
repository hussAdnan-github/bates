import { NextResponse, NextRequest } from "next/server";
// default
export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  // قائمة المسارات المحمية
  const isProtectedRoute =
    pathname.startsWith("/shop") || pathname.startsWith("/dashboard");

  if (isProtectedRoute) {
    if (!token) {
      // حفظ المسار الذي كان يحاول المستخدم دخوله لإعادته إليه لاحقاً (اختياري)
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// تحديث الـ matcher ليشمل كل المسارات المحمية
export const config = {
  matcher: [
    "/shop/:path*",
    "/dashboard/:path*", // أضفنا هذا
    "/login",
  ],
};
