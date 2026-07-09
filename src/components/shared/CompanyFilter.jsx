 

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, Building2, Globe } from "lucide-react";
import Image from "next/image";

export default function CompanyFilter({ companies, activeCompanyId, inDrawer = false, onSelect }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCompany = searchParams.get("department__company") || activeCompanyId || "";

  const handleFilter = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "") {
      params.delete("department__company");
    } else {
      params.set("department__company", id);
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
    if (onSelect) onSelect();
  };

  return (
    <div className="relative w-full">
      {/* حاوية القائمة: عمودية في الجوال، وأفقية في الشاشات الكبيرة */}
      <div className={
        inDrawer
          ? "flex flex-col gap-3 pt-2 pb-6 px-1"
          : "flex items-center gap-3 overflow-x-auto pb-4 pt-4 px-1 scrollbar-hide"
      }>
        
        {/* زر "كل الشركات" */}
        {/* <button
          onClick={() => handleFilter("")}
          className={`
            relative flex-shrink-0 flex items-center p-2 pr-2 pl-4 min-h-[3.5rem] rounded-2xl border-2 transition-all duration-300 group
            ${inDrawer ? "w-full" : "w-auto"}
            ${
              activeCompany === ""
                ? "bg-white border-[var(--primary_color)] shadow-xl shadow-yellow-500/10 -translate-y-1"
                : "bg-white border-gray-100 hover:border-[var(--primary_color)]/50 hover:shadow-md hover:-translate-y-0.5"
            }
          `}
        >
          <div
            className={`
            w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ml-3 transition-transform duration-300
            ${activeCompany === "" ? "bg-[var(--primary_color)] scale-105" : "bg-gray-50 group-hover:scale-105"}
          `}
          >
            <Building2
              className={`w-5 h-5 ${activeCompany === "" ? "text-[var(--secondary_color)]" : "text-gray-400"}`}
            />
          </div>
          <div className="flex-1 text-right ml-4">
            <span
              className={`text-xs sm:text-sm font-black whitespace-nowrap ${activeCompany === "" ? "text-[var(--secondary_color)]" : "text-gray-500"}`}
            >
              الكل
            </span>
          </div>
          {activeCompany === "" && (
            <div className="mr-2 bg-[var(--primary_color)] text-[var(--secondary_color)] p-1 rounded-full">
              <Check className="w-3.5 h-3.5" />
            </div>
          )}
        </button> */}

        {/* قائمة الشركات */}
        {companies.length > 0 && companies.map((com) => {
          const isActive = activeCompany === com.id.toString();
          return (
            <button
              key={com.id}
              onClick={() => handleFilter(com.id.toString())}
              className={`
                relative flex-shrink-0 flex items-center p-2 pr-2 pl-4 min-h-[3.5rem] rounded-2xl border-2 transition-all duration-300 group
                ${inDrawer ? "w-full" : "w-auto min-w-[140px]"}
                ${
                  isActive
                    ? "bg-white border-[var(--primary_color)] shadow-xl shadow-yellow-500/10 -translate-y-1"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
               <div
                className={`
                w-10 h-10 shrink-0 rounded-xl overflow-hidden border ml-3 flex items-center justify-center p-1 bg-white transition-all duration-300
                ${isActive ? "border-[var(--primary_color)] shadow-inner scale-105" : "border-gray-50 group-hover:scale-105"}
              `}
              >
                {com.logo ? (
                  <Image
                    src={com.logo}
                    alt={com.name_ar}
                    width={32}
                    height={32}
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                ) : (
                  <Globe className="text-gray-200 w-5 h-5" />
                )}
              </div>

               <div className="flex-1 text-right ml-4">
                <p
                  className={`text-xs sm:text-sm font-black ${!inDrawer ? "whitespace-nowrap" : ""} transition-colors ${isActive ? "text-[var(--secondary_color)]" : "text-gray-600"}`}
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
