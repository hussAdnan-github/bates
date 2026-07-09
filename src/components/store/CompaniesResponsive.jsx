"use client";

import React, { useState, useRef, useEffect } from "react";
import { Building2, ChevronDown } from "lucide-react";
import CompanyFilter from "../shared/CompanyFilter";
import { AnimatePresence, motion } from "framer-motion";

export default function CompaniesResponsive({ companies, activeCompanyId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCompanyName = activeCompanyId
    ? companies.find(c => c.id.toString() === activeCompanyId)?.name_ar
    : "كل الشركات";

  return (
    <>
      {/* Desktop View (الشاشات الكبيرة) */}
      <div className="hidden lg:block bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
            <Building2 className="w-3.5 h-3.5 text-[var(--secondary_color)]" />
          </div>
          <h3 className="font-black text-[var(--secondary_color)] text-xs md:text-sm">تصفية حسب الشركة</h3>
        </div>
        <CompanyFilter companies={companies} activeCompanyId={activeCompanyId} />
      </div>

      {/* Mobile Dropdown View (قائمة منسدلة للجوال) */}
      <div className="lg:hidden w-full relative " ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-white border-2 rounded-xl py-2 px-3 flex items-center justify-between transition-all duration-300 shadow-sm ${isOpen ? "border-[var(--primary_color)] shadow-md" : "border-gray-100 hover:border-gray-200"}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[var(--secondary_color)]" />
            </div>
            <div className="text-right">
              <h3 className="font-black text-[var(--secondary_color)] text-[11px] leading-tight">تصفية حسب الشركة</h3>
              <p className="text-[10px] font-bold text-gray-500 mt-0.5 leading-tight">
                {activeCompanyName}
              </p>
            </div>
          </div>
          <div className={`p-1 rounded-full transition-colors ${isOpen ? "bg-[var(--primary_color)]/10" : "bg-gray-50"}`}>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--secondary_color)]" : "text-gray-400"}`} />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden"
            >
              <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5 bg-gray-50/30">
                <CompanyFilter
                  companies={companies}
                  activeCompanyId={activeCompanyId}
                  inDrawer={true}
                  onSelect={() => setIsOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
