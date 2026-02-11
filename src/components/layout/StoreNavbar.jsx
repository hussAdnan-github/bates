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

import BasketsDialog from "../store/BasketsDialog";
import { cookies } from "next/headers";

async function StoreNavbar() {
  const cookieStore = await cookies();
  const basketcountNumber = cookieStore.get("basket_count")?.value || 0;

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
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              // تم التغيير من hover:text-[#2D1B50] إلى hover:text-primary
              className="text-lg font-bold text-gray-700 hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* ... باقي الكود (الموبايل) ... */}

        <div className="flex items-center gap-2 md:gap-5">
          <SearchBar />

          <BasketsDialog>
            <div className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors group">
              {/* تم التغيير من group-hover:text-[#F18721] إلى group-hover:text-primary */}
              <ShoppingCart className="h-7 w-7 text-gray-700 group-hover:text-secondary transition-colors" />

              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center p-0 text-[10px] rounded-full border-2 border-white">
                {basketcountNumber}
              </Badge>
            </div>
          </BasketsDialog>

          {/* أيقونة تسجيل الخروج */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-secondary transition-colors cursor-pointer"
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
