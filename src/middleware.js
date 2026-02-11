import { NextResponse, NextRequest } from "next/server";
// default
export  function middleware(request) {

    console.log("🔥 Middleware is running");
 
  const token = request.cookies.get("auth_token")?.value;
  const pathname = request.nextUrl.pathname;

  // حماية shop
  if (pathname.startsWith("/shop")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // منع الدخول لصفحة login لو المستخدم مسجل
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shop/:path*", "/login"],
};