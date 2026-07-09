"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

export default function Department({ department }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDepartment = searchParams.get("department") || "";

  const handelDepartment = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentDepartment === id.toString()) {
      params.delete("department");
    } else {
      params.set("department", id);
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!department?.data || department.data.length === 0) {
    return null;
  }

  return (
    <div className="w-full  ">
      {/* Horizontal Scroll Container with elegant visible scrollbar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-4 pt-2 px-1 styled-scrollbar snap-x">
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
        ${
          active
            ? "text-[var(--secondary_color)] scale-105"
            : "text-gray-500 hover:text-[var(--secondary_color)] hover:-translate-y-0.5"
        }
      `}
    >
      <span className={`text-[10px] tracking-wide transition-all duration-300 ${active ? "font-black" : "font-bold"}`}>
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