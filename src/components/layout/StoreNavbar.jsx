

 
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Home, LayoutGrid, LogIn } from "lucide-react";
import SearchBar from "../store/SearchBar";
import BasketsDialog from "../store/BasketsDialog";
import LogoutButton from "../store/LogoutButton";

function StoreNavbar({ currencyButtonDesktop, currencyButtonMobile, isLoggedIn }) {
  const pathname = usePathname();

  return (
    <>
      {/* --- الديسكتوب: لم يتغير --- */}
      <nav className="hidden lg:block w-full bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm" dir="rtl">
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-black text-[#2D1B50] tracking-tighter">
              BTS <span className="text-[#FFC107] text-sm">STORE</span>
            </Link>
            <div className="flex items-center gap-8">
               <Link href="/" className="font-bold text-gray-500">الرئيسية</Link>
               <Link href="/products" className="font-bold text-gray-500">المنتجات</Link>
               <Link href="/orders" className="font-bold text-gray-500">الطلبات</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <SearchBar />
            <div className="flex items-center border-r pr-6 gap-4">
              {currencyButtonDesktop}
              <BasketsDialog />
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-[#2D1B50] font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/signUp"
                    className="bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-yellow-200/50 transition-all hover:shadow-yellow-200/80 active:scale-95"
                  >
                    إنشاء حساب
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- الموبايل: الهيدر (لوجو فقط لأن الخروج نزل تحت) --- */}
      <nav className="lg:hidden w-full bg-white border-b sticky top-0 z-50" dir="rtl">
        <div className="px-4 h-14 flex items-center justify-center">
          <Link href="/" className="text-xl font-black text-[#2D1B50]">
            BTS <span className="text-[#FFC107] text-xs">STORE</span>
          </Link>
        </div>

        {/* البحث: مفتوح دائماً في الموبايل */}
        <div className="px-4 pb-3">
          <SearchBar /> 
        </div>
      </nav>

      {/* --- الموبايل: زر تغيير العملة العائم --- */}
      <div className="lg:hidden fixed bottom-20 left-4 z-50 drop-shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        {currencyButtonMobile}
      </div>

      {/* --- الموبايل: البار السفلي --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-16 px-2 relative" dir="rtl">
          
          {/* الرئيسية */}
          <Link href="/" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/' ? "text-white bg-[var(--secondary_color)] py-1 rounded-xl" : "text-gray-400"}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </Link>

          {/* المنتجات */}
          <Link href="/products" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/products' ? "text-white bg-[var(--secondary_color)] py-1 rounded-xl" : "text-gray-400"}`}>
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-bold">المنتجات</span>
          </Link>

          {/* السلة في المنتصف (تصميم بارز) */}
          <div className="flex-none w-16 h-16 relative -top-5">
            <div className="absolute inset-0 bg-white rounded-full p-1.5 shadow-md">
              <div className="w-full h-full bg-[var(--secondary_color)] rounded-full flex items-center justify-center text-white">
                <BasketsDialog />
              </div>
            </div>
          </div>

          {/* الطلبات */}
          <Link href="/orders" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/orders' ? "text-white bg-[var(--secondary_color)] py-1 rounded-xl" : "text-gray-400"}`}>
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-bold">طلباتي</span>
          </Link>

          {/* تسجيل الخروج أو الدخول بدل "المزيد" */}
          <div className="flex-1 flex justify-center">
             {isLoggedIn ? (
               <LogoutButton isMobile={true} />
             ) : (
               <Link href="/login" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--primary_color)]">
                 <LogIn className="w-6 h-6" />
                 <span className="text-[10px] font-bold">دخول</span>
               </Link>
             )}
          </div>

        </div>
      </div>

      {/* مساحة تعويضية في الأسفل للموبايل */}
      <div className="h-20 lg:hidden"></div>
    </>
  );
}

export default StoreNavbar;