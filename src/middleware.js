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

  if (pathname === "/" && !hasVisited) {
    const redirectUrl = new URL("/products", request.url);
    response = NextResponse.redirect(redirectUrl);
    response.cookies.set("has_visited", "true", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  if (!token) {
    if (isDashboard || isCheckout) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }


  if (token) {
    if (isLoginPage) {
      const target = role === "admin" ? "/dashboard" : "/";
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (role === "admin") {
      return response;
    }

    else {
      if (isDashboard) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return response;
}

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
