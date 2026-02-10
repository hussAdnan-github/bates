"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Department({ department }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentDepartment = searchParams.get("department") || "";

  const handelDepartment = (id) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "") {
      params.delete("department");
    } else {
      params.set("department", id);
    }

     params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      {/* كل الفئات */}
      <CategoryItem
        active={currentDepartment === ""}
        onClick={() => handelDepartment("")}
      >
        كل الفئات
      </CategoryItem>

      {/* الفئات */}
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
  );
}

/* عنصر الفئة */
function CategoryItem({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center justify-between rounded-lg px-4 py-3
        text-sm transition-all duration-200
        ${
          active
            ? "bg-orange-50 text-[#F18721] font-bold shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-[#F18721]"
        }
      `}
    >
      <span>{children}</span>

      {/* سهم يظهر عند التفعيل */}
      <ChevronLeft
        className={`
          h-4 w-4 transition-all
          ${
            active
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 group-hover:opacity-50"
          }
        `}
      />
    </button>
  );
}
