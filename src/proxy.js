// import { NextResponse, NextRequest } from "next/server";
// // default
// export function middleware(request) {
//   const token = request.cookies.get("auth_token")?.value;
//   const pathname = request.nextUrl.pathname;

//   // قائمة المسارات المحمية
//   const isProtectedRoute =
//     pathname.startsWith("/shop") || pathname.startsWith("/dashboard");

//   if (isProtectedRoute) {
//     if (!token) {
//       // حفظ المسار الذي كان يحاول المستخدم دخوله لإعادته إليه لاحقاً (اختياري)
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }

// // تحديث الـ matcher ليشمل كل المسارات المحمية
// export const config = {
//   matcher: [
//     "/shop/:path*",
//     "/dashboard/:path*", // أضفنا هذا
//     "/login",
//   ],
// };


import { NextResponse } from "next/server";

 export function proxy(request) {
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  // قائمة المسارات المحمية
  const isProtectedRoute =
    pathname.startsWith("/shop") || pathname.startsWith("/dashboard");

  if (isProtectedRoute) {
    if (!token) {
      // إعادة التوجيه لصفحة تسجيل الدخول إذا لم يوجد توكن
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // اختياري: إذا كان المستخدم مسجل دخول ويحاول دخول صفحة /login، وجهه للرئيسية
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// الـ matcher يبقى كما هو بدون تغيير
export const config = {
  matcher: [
    "/shop/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};