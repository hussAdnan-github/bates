"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  const navLinks = [
    { title: "الرئيسية", href: "/" },
    { title: "مميزاتنا", href: "#features" },
    { title: "فروعنا", href: "#branches" },
    { title: "تواصل معنا", href: "#contact" },
  ];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // إذا لم يتم التحميل بعد على المتصفح، لا تظهر الـ Navbar أو أظهر نسخة مبسطة
  if (!mounted) return null; // أو أظهر الهيكل فقط بدون الـ Sheet

  return (
    <nav className="w-full border-b bg-white py-4 sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* جهة اليمين: اللوجو والروابط (للشاشات الكبيرة) */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-3xl font-bold text-[#2D1B50]">
            BTS
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#2D1B50] transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* جهة اليسار: الأزرار (للشاشات الكبيرة) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center border border-[#2D1B50] text-[#2D1B50] hover:bg-[#2D1B50] hover:text-white px-6 py-2 rounded-md transition-colors"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/signUp"
            className="inline-flex items-center justify-center bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold px-6 py-2 rounded-md transition-colors"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* قائمة الموبايل (Responsive Mobile Menu) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
<SheetContent side="right" className="w-[250px] bg-white px-4 md:mx-0" dir="rtl">
              {/* <VisuallyHidden> */}
              <SheetTitle>القائمة الرئيسية</SheetTitle>
              {/* </VisuallyHidden> */}
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-lg font-medium text-gray-700"
                  >
                    {link.title}
                  </Link>
                ))}
                <hr />
                <Button
                  variant="outline"
                  className="border-[#2D1B50] text-[#2D1B50] w-full"
                >
                  تسجيل الدخول
                </Button>
                <Button className="bg-[#FFC107] text-[#2D1B50] font-bold w-full">
                  إنشاء حساب
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
