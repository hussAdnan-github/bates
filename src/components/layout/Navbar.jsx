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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
      setIsPwa(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <nav 
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
          : "bg-white py-5"
      }`} 
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* جهة اليمين: اللوجو والروابط */}
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="text-3xl font-black tracking-tighter text-[#2D1B50] hover:opacity-80 transition-opacity"
          >
            BTS
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-[15px] font-medium text-gray-600 hover:text-[#2D1B50] relative group transition-colors"
              >
                {link.title}
                {/* خط انيميشن تحت الرابط عند الهوفر */}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#FFC107] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* جهة اليسار: الأزرار */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-[#2D1B50] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/signUp"
            className="bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-sm px-7 py-2.5 rounded-xl shadow-lg shadow-yellow-200/50 transition-all hover:shadow-yellow-200/80 active:scale-95"
          >
            إنشاء حساب
          </Link>
        </div>

        {/* قائمة الموبايل */}
        {!isPwa && (
          <div className="lg:hidden flex items-center gap-2">
            {/* زر الموبايل المحسن */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                  <Menu className="h-6 w-6 text-[#2D1B50]" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-white border-l-0 px-3"
                dir="rtl"
              >
                <div className="flex flex-col h-full">
                  <SheetTitle className="flex justify-start pt-4 pb-8 border-b">
                    <Link href="/" className="text-3xl font-black text-[#2D1B50]">
                      BTS
                    </Link>
                  </SheetTitle>
                  
                  <div className="flex flex-col gap-2 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="text-lg font-semibold text-gray-700 p-3 rounded-lg hover:bg-gray-50 hover:text-[#2D1B50] transition-all"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pb-8">
                    <hr className="mb-4" />
                    <Link
                      href="/login"
                      className="w-full text-center py-3 font-bold text-[#2D1B50] border-2 border-[#2D1B50] rounded-xl"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      href="/signUp"
                      className="w-full text-center py-3 font-bold bg-[#FFC107] text-[#2D1B50] rounded-xl shadow-md"
                    >
                      إنشاء حساب
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;



 