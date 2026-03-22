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
import { ChevronLeft, LayoutGrid, Tag } from "lucide-react"; // أضفنا أيقونات

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
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-1">
      {/* كل الفئات */}
      <CategoryItem
        active={currentDepartment === ""}
        onClick={() => handelDepartment("")}
        icon={<LayoutGrid className="w-4 h-4" />}
      >
        كل الفئات
      </CategoryItem>

      {/* الفئات الديناميكية */}
      {department?.data?.map((dep) => (
        <CategoryItem
          key={dep.id}
          active={currentDepartment === dep.id.toString()}
          onClick={() => handelDepartment(dep.id)}
          icon={<Tag className="w-4 h-4" />}
        >
          {dep.name}
        </CategoryItem>
      ))}
    </div>
  );
}

function CategoryItem({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full flex items-center justify-between rounded-xl px-4 py-3.5
        text-[14px] transition-all duration-300 ease-in-out
        ${
          active
            ? "bg-[var(--secondary_color)] text-[var(--primary_color)] shadow-md translate-x-[-4px]"
            : "text-gray-500 hover:bg-gray-100 hover:text-[var(--secondary_color)]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? "text-[var(--primary_color)]" : "text-gray-400 group-hover:text-[var(--secondary_color)]"}`}>
          {icon}
        </span>
        <span className={`font-bold transition-colors ${active ? "font-black" : ""}`}>
          {children}
        </span>
      </div>

      <ChevronLeft
        className={`
          h-4 w-4 transition-all duration-300
          ${
            active
              ? "opacity-100 rotate-0"
              : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }
        `}
      />
    </button>
  );
}