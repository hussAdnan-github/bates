"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, LogOut, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from "../store/SearchBar";
import CartDialog from "../store/CartDialog";

function StoreNavbar() {
  const navLinks = [
    { title: "الرئيسية", href: "/" },
    { title: "المنتجات", href: "/shop/products" },
    { title: "الطلبات", href: "/orders" },
  ];

  return (
    <nav
      className="w-full bg-white border-b sticky top-0 z-50 shadow-sm"
      dir="rtl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* جهة اليمين: الروابط الأساسية (Desktop) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-lg font-bold text-gray-700 hover:text-[#2D1B50] transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* الموبايل: زر القائمة الجانبية */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64" dir="rtl">
              <SheetTitle>القائمة الرئيسية</SheetTitle>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-xl font-bold text-gray-800"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* جهة اليسار: أيقونات العمليات (البحث، السلة، الخروج) */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* أيقونة البحث */}

          <SearchBar />
          {/* <Search className="h-6 w-6" /> */}

          {/* استبدال الـ Link بمكون السلة المنبثقة */}
          <CartDialog>
            <div className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors group">
              {/* أيقونة السلة */}
              <ShoppingCart className="h-7 w-7 text-gray-700 group-hover:text-[#F18721] transition-colors" />

              {/* عداد المنتجات (Badge) */}
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center p-0 text-[10px] rounded-full border-2 border-white">
                0
              </Badge>
            </div>
          </CartDialog>
          {/* أيقونة تسجيل الخروج */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-6 w-6 rotate-180" />{" "}
            {/* تدوير الأيقونة لتناسب الاتجاه العربي */}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default StoreNavbar;
