// "use client";
// import React from "react";
// import { Button } from "../ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ChevronLeft } from "lucide-react";

// export default function Department({ department }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const currentDepartment = searchParams.get("department") || "";

//   const handelDepartment = (id) => {
//     const params = new URLSearchParams(searchParams.toString());
 
//     if (id === "") {
//       params.delete("department");
//     } else {
//       params.set("department", id);
//     }

//      params.delete("page");

//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div className="space-y-2">
//       {/* كل الفئات */}
//       <CategoryItem
//         active={currentDepartment === ""}
//         onClick={() => handelDepartment("")}
//       >
//         كل الفئات
//       </CategoryItem>

//       {/* الفئات */}
//       {department.data.map((dep) => (
//         <CategoryItem
//           key={dep.id}
//           active={currentDepartment === dep.id.toString()}
//           onClick={() => handelDepartment(dep.id)}
//         >
//           {dep.name}
//         </CategoryItem>
//       ))}
//     </div>
//   );
// }

// /* عنصر الفئة */
// function CategoryItem({ children, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         group w-full flex items-center justify-between rounded-lg px-4 py-3
//         text-sm transition-all duration-200
//         ${
//           active
//             ? "bg-orange-50 text-secondary font-bold shadow-sm"
//             : "text-gray-600 hover:bg-gray-50 hover:text-secondary"
//         }
//       `}
//     >
//       <span>{children}</span>

//       {/* سهم يظهر عند التفعيل */}
//       <ChevronLeft
//         className={`
//           h-4 w-4 transition-all
//           ${
//             active
//               ? "opacity-100 translate-x-0"
//               : "opacity-0 translate-x-2 group-hover:opacity-50"
//           }
//         `}
//       />
//     </button>
//   );
// }




"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Grid2X2 } from "lucide-react";

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
    <div className="relative w-full py-1">
      {/* Horizontal Scroll Container */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide">
        {department.data.map((dep) => (
          <CategoryItem
            key={dep.id}
            active={currentDepartment === dep.id.toString()}
            onClick={() => handelDepartment(dep.id)}
            icon={<Grid2X2 className="w-4 h-4" />}
          >
            {dep.name}
          </CategoryItem>
        ))}
      </div>
      
      {/* ظل خفيف للموبايل للدلالة على وجود تمرير أفقياً */}
      <div className="absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none lg:hidden" />
      <div className="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden" />
    </div>
  );
}

function CategoryItem({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex-shrink-0 flex items-center gap-2 pr-1 pl-5 py-1 rounded-full
        font-bold transition-all duration-500 ease-out border-2
        ${
          active
            ? "bg-[var(--secondary_color)] text-white border-transparent shadow-[0_6px_15px_-4px_rgba(45,27,77,0.4)] scale-[1.02] -translate-y-0.5"
            : "bg-white text-gray-500 border-gray-100 hover:border-[var(--primary_color)]/40 hover:shadow-md hover:-translate-y-0.5 hover:text-[var(--secondary_color)]"
        }
      `}
    >
      {/* حاوية الأيقونة الدائرية المصغرة */}
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500
        ${active ? "bg-[var(--primary_color)] text-[var(--secondary_color)] shadow-inner" : "bg-gray-50 text-gray-400 group-hover:bg-[#FFC107]/20 group-hover:text-[var(--primary_color)]"}
      `}>
        {active ? <Sparkles className="w-4 h-4 animate-pulse" /> : icon}
      </div>

      {/* النص المنسق والمصغر */}
      <span className="text-[12px] md:text-[13px] whitespace-nowrap tracking-wide">
        {children}
      </span>
    </button>
  );
}