import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("username")?.value;
  const hasVisited = request.cookies.get("has_visited")?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";
  const isDashboard = pathname.startsWith("/dashboard");
  const isCheckout = pathname.startsWith("/orders") || pathname.startsWith("/shop/orders");

  let response = NextResponse.next();

  // First time visit logic
  if (pathname === "/" && !hasVisited) {
    const redirectUrl = new URL("/products", request.url);
    response = NextResponse.redirect(redirectUrl);
    // Set a cookie so we know they've visited
    response.cookies.set("has_visited", "true", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // 1. إذا لم يكن هناك توكن، نوجهه لصفحة تسجيل الدخول فقط إذا حاول الوصول لصفحات محمية
  if (!token) {
    if (isDashboard || isCheckout) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // السماح بالوصول لصفحات التسوق والصفحات الأخرى للزوار
    return response;
  }

  // 2. إذا كان المستخدم مسجل دخوله (يوجد توكن)
  if (token) {
    // منع الوصول لصفحة اللوجن إذا كان مسجل دخول بالفعل
    if (isLoginPage) {
      const target = role === "admin" ? "/dashboard" : "/";
      return NextResponse.redirect(new URL(target, request.url));
    }

    // منطق الأدمن: يُسمح له بكل شيء (لا نحتاج لوضع قيود)
    if (role === "admin") {
      return response;
    }

    // منطق المستخدم العادي (غير الأدمن)
    else {
      // منع الوصول للوحة التحكم
      if (isDashboard) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return response;
}

// المسارات التي يعمل عليها الـ Middleware
export const config = {
  matcher: [
    "/",
    "/products/:path*",
    "/orders/:path*",
    "/shop/orders/:path*",
    "/dashboard/:path*",
    "/login"
  ],
};
