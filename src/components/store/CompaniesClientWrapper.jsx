"use client";

import React, { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";

export default function CompaniesClientWrapper({ children, activeCompanyName, hasActive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm transition-all duration-500 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors rounded-[24px]"
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-all duration-300 border
            ${hasActive
              ? "bg-[var(--primary_color)]/10 border-[var(--primary_color)]/20 shadow-inner"
              : "bg-gray-50 border-gray-100 group-hover:border-[var(--primary_color)]/30 group-hover:bg-[#FFC107]/5"}`}
          >
            <Building2 className={`w-5 h-5 transition-colors ${hasActive ? "text-[var(--primary_color)]" : "text-gray-400 group-hover:text-[var(--secondary_color)]"}`} />
          </div>
          <div className="text-right flex flex-col justify-center">
            <h3 className="font-bold text-[var(--secondary_color)] text-sm md:text-base flex items-center gap-2">
              تصفية حسب الماركة
              {hasActive && !isOpen && (
                <span className="flex w-2 h-2 rounded-full bg-[var(--primary_color)] relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary_color)] opacity-75"></span>
                </span>
              )}
            </h3>
            <p className={`text-[11px] md:text-xs font-bold transition-colors mt-0.5 ${hasActive ? "text-[var(--primary_color)]" : "text-gray-400"}`}>
              {hasActive ? activeCompanyName : "اختر الماركة المفضلة لديك"}
            </p>
          </div>
        </div>

        <div className={`w-9 h-9 ml-1 rounded-xl flex items-center justify-center transition-all duration-500 border
          ${isOpen
            ? "rotate-180 bg-[var(--secondary_color)] border-[var(--secondary_color)] shadow-md"
            : "bg-white border-gray-100 group-hover:border-gray-200"}`}
        >
          <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? "text-[var(--primary_color)]" : "text-gray-400 group-hover:text-gray-600"}`} />
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden`}
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-10px)"
        }}
      >
        <div className="px-2 pb-3 md:px-3 md:pb-4 pt-1 border-t border-gray-50 mx-4 mt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
