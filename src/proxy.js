import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("username")?.value; // تأكد أن اسم الكوكي هو role أو حسب ما تسميه
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";

  // 1. إذا لم يكن هناك توكن، وجهه لصفحة تسجيل الدخول (إلا إذا كان فيها بالفعل)
  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 2. إذا كان المستخدم مسجل دخوله (يوجد توكن)
  if (token) {
    // منع الوصول لصفحة اللوجن إذا كان مسجل دخول بالفعل
    if (isLoginPage) {
      const target = role === "admin" ? "/dashboard" : "/shop";
      return NextResponse.redirect(new URL(target, request.url));
    }

    // منطق الأدمن: يُسمح له بكل شيء (لا نحتاج لوضع قيود)
    if (role === "admin") {
      return NextResponse.next();
    } 
    
    // منطق المستخدم العادي (غير الأدمن)
    else {
      // إذا حاول الوصول لأي مسار لا يبدأ بـ /shop، وجهه إجبارياً للمتجر
      if (!pathname.startsWith("/shop")) {
        return NextResponse.redirect(new URL("/shop", request.url));
      }
    }
  }

  return NextResponse.next();
}

// المسارات التي يعمل عليها الـ Middleware
export const config = {
  matcher: ["/shop/:path*", "/dashboard/:path*", "/login"],
};