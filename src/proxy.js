
// import { NextResponse } from "next/server";

//  export function proxy(request) {
//   const token = request.cookies.get("auth_token")?.value;
//   const pathname = request.nextUrl.pathname;

//    const isProtectedRoute =
//     pathname.startsWith("/shop") || pathname.startsWith("/dashboard");

//   if (isProtectedRoute) {
//     if (!token) {
//        const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//    if (pathname === "/login" && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

//  export const config = {
//   matcher: [
//     "/shop/:path*",
//     "/dashboard/:path*",
//     "/login",
//   ],
// };




import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. تحديد أنواع المسارات
  const isProtectedRoute = pathname.startsWith("/shop") || pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/login";

  // 2. إذا كان المستخدم يحاول دخول صفحة محمية وهو غير مسجل دخول
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    // إضافة پارامتر ليعرف النظام أين كان يريد المستخدم الذهاب (اختياري ومفيد)
    // loginUrl.searchParams.set("from", pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // 3. إذا كان المستخدم مسجل دخول ويحاول دخول صفحة تسجيل الدخول
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 4. السماح بمرور الطلب إذا لم تتحقق الشروط أعلاه
  return NextResponse.next();
}

// 5. الـ matcher لتحديد المسارات التي يعمل عليها الـ middleware
export const config = {
  matcher: [
    "/shop/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};