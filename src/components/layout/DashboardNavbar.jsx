
"use client";
import React from "react";
import { Search, Bell, Command } from "lucide-react";
import UserMenu from "../dashboard/UserMenu";

function DashboardNavbar() {
  return (
    <nav className="print:hidden fixed top-0 left-0 right-72 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 z-40" dir="rtl">
      
      {/* الجهة اليمنى: البحث السريع أو المسار */}
      <div className="hidden md:flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full group">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D1B50] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="بحث سريع عن منتج ..." 
            className="w-full h-11 pr-11 pl-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#2D1B50]/5 transition-all outline-none"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md text-[10px] text-gray-400 font-bold">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* الجهة اليسرى: التنبيهات ومنطقة المستخدم */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* أيقونة التنبيهات */}
        {/* <button className="relative p-2.5 text-gray-400 hover:bg-gray-50 hover:text-[#2D1B50] rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 left-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button> */}

        {/* فاصل رأسي */}
        <div className="w-[1px] h-8 bg-gray-100 hidden sm:block"></div>

        <UserMenu />
      </div>
    </nav>
  );
}

export default DashboardNavbar;