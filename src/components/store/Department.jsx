"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

export default function Department({ department }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDepartment = searchParams.get("department") || "";
  const [isPending, startTransition] = useTransition();

  const handelDepartment = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentDepartment === id.toString()) {
      params.delete("department");
    } else {
      params.set("department", id);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  if (!department?.data || department.data.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative">
      {isPending && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl shadow-gray-200/50 border border-gray-100 rounded-full px-5 py-2.5 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
           <span className="w-4 h-4 border-2 border-[var(--primary_color)] border-t-transparent rounded-full animate-spin"></span>
           {/* <span className="text-sm font-black text-[#2D1B50]">جاري تحديث النتائج...</span> */}
        </div>
      )}
      {/* Horizontal Scroll Container with elegant visible scrollbar */}
      <div className={`flex items-center gap-1 overflow-x-auto pb-4 pt-2 px-1 styled-scrollbar snap-x ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
        {department.data.map((dep) => (
          <CategoryItem
            key={dep.id}
            active={currentDepartment === dep.id.toString()}
            onClick={() => handelDepartment(dep.id)}
          >
            {dep.name}
          </CategoryItem>
        ))}
      </div>
    </div>
  );
}

function CategoryItem({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2
        transition-all duration-300 ease-out snap-center outline-none bg-transparent
        ${active
          ? "text-[var(--secondary_color)] scale-105"
          : "text-gray-500 hover:text-[var(--secondary_color)] hover:-translate-y-0.5"
        }
      `}
    >
      <span className={`text-[12px] tracking-wide transition-all duration-300 ${active ? "font-black" : "font-bold"}`}>
        {children}
      </span>

      {/* علامة الصح مع تأثير حركي احترافي */}
      {active && (
        <span className="flex items-center justify-center text-[var(--primary_color)] animate-in zoom-in slide-in-from-right-2 duration-300 fade-in">
          <Check className="w-4 h-4 stroke-[3]" />
        </span>
      )}

      {/* خط سفلي خفيف يزيد من الاحترافية عند التفعيل */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--primary_color)] rounded-t-full transition-all duration-300 ${active ? "w-1/2 opacity-100" : "w-0 opacity-0"}`} />
    </button>
  );
}