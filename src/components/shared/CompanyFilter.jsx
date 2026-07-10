 

"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Building2, Globe } from "lucide-react";
import Image from "next/image";

export default function CompanyFilter({ companies, activeCompanyId, inDrawer = false, onSelect }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCompany = searchParams.get("department__company") || activeCompanyId || "";
  const [isPending, startTransition] = useTransition();

  const handleFilter = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "") {
      params.delete("department__company");
    } else {
      params.set("department__company", id);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
      if (onSelect) onSelect();
    });
  };

  const sortedCompanies = [...(companies || [])].sort((a, b) => {
    if (a.number !== null && b.number !== null) {
      return a.number - b.number;
    }
    if (a.number !== null) return -1;
    if (b.number !== null) return 1;
    return 0;
  });

  return (
    <div className="relative w-full">
      {isPending && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-full px-5 py-2.5 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
           <span className="w-4 h-4 border-2 border-[var(--primary_color)] border-t-transparent rounded-full animate-spin"></span>
           {/* <span className="text-sm font-black text-[#2D1B50]">جاري تحديث النتائج...</span> */}
        </div>
      )}
      {/* حاوية القائمة: عمودية في الجوال، وأفقية في الشاشات الكبيرة */}
      <div className={
        inDrawer
          ? `flex flex-col gap-3 pt-2 pb-6 px-1 ${isPending ? "opacity-50 pointer-events-none" : ""}`
          : `flex items-center gap-3 overflow-x-auto pb-4 pt-4 px-1 scrollbar-hide ${isPending ? "opacity-50 pointer-events-none" : ""}`
      }>
        
       

        {/* قائمة الشركات */}
        {sortedCompanies.length > 0 && sortedCompanies.map((com) => {
          const isActive = activeCompany === com.id.toString();
          return (
            <button
              key={com.id}
              onClick={() => handleFilter(com.id.toString())}
              className={`
                relative flex-shrink-0 flex items-center p-1 md:p-2 pr-1 md:pr-2 pl-2 md:pl-4 min-h-[2.5rem] md:min-h-[3.5rem] rounded-xl  transition-all duration-300 group
                ${inDrawer ? "w-full" : "w-auto min-w-[90px] md:min-w-[140px]"}
                ${
                  isActive
                    ? "bg-white border-[var(--primary_color)] shadow-xl shadow-yellow-500/10 -translate-y-1"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
               <div
                className={`
                w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 shrink-0 rounded-xl overflow-hidden border ml-1.5 md:ml-3 flex items-center justify-center p-0.5 md:p-1 bg-white transition-all duration-300
                ${isActive ? "border-[var(--primary_color)] shadow-inner scale-105" : "border-gray-50 group-hover:scale-105"}
              `}
              >
                {com.logo ? (
                  <Image
                    src={com.logo}
                    alt={com.name_ar}
                    width={32}
                    height={32}
                    className="object-contain transition-transform group-hover:scale-110 w-full h-full"
                  />
                ) : (
                  <Globe className="text-gray-200 w-3.5 h-3.5 md:w-5 md:h-5" />
                )}
              </div>

               <div className="flex-1 text-right ml-1.5 md:ml-4">
                <p
                  className={`text-[9.5px] sm:text-xs md:text-sm font-black ${!inDrawer ? "whitespace-nowrap" : ""} transition-colors ${isActive ? "text-[var(--secondary_color)]" : "text-gray-600"}`}
                >
                  {com.name_ar}
                </p>
              </div>

              {isActive && (
                <div className="mr-2 bg-[var(--secondary_color)] text-[var(--primary_color)] p-1 rounded-full animate-in zoom-in duration-300">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* لمسة نهائية: تلاشي الضوء عند الأطراف في الشاشات الكبيرة */}
      {!inDrawer && (
        <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none lg:hidden" />
      )}
    </div>
  );
}
