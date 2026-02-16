import { ChevronDown, Search } from "lucide-react";
import React from "react";
import UserMenu from "../dashboard/UserMenu";

function DashboardNavbar() {
  return (
    <div className="fixed z-50 flex-row-reverse w-[81%] h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      {/* User Profile Area */}
      {/* <div className="flex items-center gap-3 cursor-pointer">
        <ChevronDown size={16} className="text-gray-400" />
        <span className="font-medium text-gray-700">admin</span>
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border">
           <img src="/avatar-placeholder.png" alt="admin" className="w-full h-full object-cover" />
        </div>
      </div> */}
      <UserMenu />
      {/* Search Area */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="ابحث هنا..."
          className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pr-10 pl-4 text-right focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
      </div>
    </div>
  );
}

export default DashboardNavbar;
