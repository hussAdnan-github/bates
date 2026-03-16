// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "../ui/button";
  

// export default function CompanyFilter({ companies }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//    const activeCompany = searchParams.get("department__company") || "";

//   const handleFilter = (id) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (id === "") {
//       params.delete("department__company");
//     } else {
//       params.set("department__company", id);
//     }
//     params.delete("page");   
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//       <Button
//         onClick={() => handleFilter("")}
//         className={` whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all ${
//           activeCompany === "" 
//           ? "bg-[#F18721] text-white shadow-md" 
//           : "bg-gray-100 text-gray-600 hover:bg-orange-50"
//         }`}
//       >
//         كل الشركات
//       </Button>

//       {companies.map((com) => (
//         <Button
//           key={com.id}
//           onClick={() => handleFilter(com.id.toString())}
//           className={`hover:bg-primary whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all ${
//             activeCompany === com.id.toString()
//             ? "bg-secondary text-white font-bold"
//             : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-secondary"
//           }`}
//         >
//           {com.name_ar}
//         </Button>
//       ))}
//     </div>
//   );
// }


// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "../ui/button";
// import { Check } from "lucide-react"; // أيقونة تدل على الاختيار

// export default function CompanyFilter({ companies }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const activeCompany = searchParams.get("department__company") || "";

//   const handleFilter = (id) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (id === "") {
//       params.delete("department__company");
//     } else {
//       params.set("department__company", id);
//     }
//     params.delete("page");   
//     router.push(`?${params.toString()}`, { scroll: false });
//   };

//   return (
//     <div className="relative">
//       {/* حاوية الأزرار مع تمرير عرضي سلس */}
//       <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide mask-fade-left">
        
//         {/* زر "كل الشركات" */}
//         <button
//           onClick={() => handleFilter("")}
//           className={`
//             whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border
//             ${activeCompany === "" 
//               ? "bg-[#2D1B50] text-[#FFC107] border-[#2D1B50] shadow-md shadow-indigo-900/10" 
//               : "bg-white text-gray-500 border-gray-100 hover:border-[#FFC107] hover:text-[#2D1B50]"
//             }
//           `}
//         >
//           كل الشركات
//         </button>

//         {/* الشركات الديناميكية */}
//         {companies.map((com) => {
//           const isActive = activeCompany === com.id.toString();
//           return (
//             <button
//               key={com.id}
//               onClick={() => handleFilter(com.id.toString())}
//               className={`
//                 flex items-center gap-2 whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border
//                 ${isActive
//                   ? "bg-[#FFC107] text-[#2D1B50] border-[#FFC107] shadow-md shadow-yellow-500/20 scale-105"
//                   : "bg-white text-gray-500 border-gray-100 hover:border-[#FFC107] hover:text-[#2D1B50]"
//                 }
//               `}
//             >
//               {isActive && <Check className="w-3.5 h-3.5" />}
//               {com.name_ar}
//             </button>
//           );
//         })}
//       </div>
      
//       {/* إشارة بصرية أن هناك المزيد من العناصر جهة اليسار في الموبايل */}
//       <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none lg:hidden" />
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, Building2, Globe } from "lucide-react";
import Image from "next/image";

export default function CompanyFilter({ companies }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCompany = searchParams.get("department__company") || "";

  const handleFilter = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "") {
      params.delete("department__company");
    } else {
      params.set("department__company", id);
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-full">
      {/* حاوية التمرير بتنسيق احترافي */}
      <div className="flex items-center gap-4 overflow-x-auto pb-6 pt-2 px-1 scrollbar-hide">
        
        {/* زر "كل الشركات" - تصميم ملكي */}
        <button
          onClick={() => handleFilter("")}
          className={`
            relative flex-shrink-0 flex flex-col items-center justify-center w-24 h-28 rounded-3xl border-2 transition-all duration-500
            ${activeCompany === "" 
              ? "bg-[#2D1B50] border-[#2D1B50] shadow-2xl shadow-indigo-900/30 -translate-y-1" 
              : "bg-white border-gray-100 hover:border-[#FFC107] hover:shadow-xl hover:-translate-y-1"
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-500
            ${activeCompany === "" ? "bg-[#FFC107] rotate-12" : "bg-gray-50"}
          `}>
            <Building2 className={`w-6 h-6 ${activeCompany === "" ? "text-[#2D1B50]" : "text-gray-400"}`} />
          </div>
          <span className={`text-[11px] font-black ${activeCompany === "" ? "text-white" : "text-gray-500"}`}>
            الكل
          </span>
          {activeCompany === "" && (
            <div className="absolute -top-2 -right-2 bg-[#FFC107] text-[#2D1B50] p-1 rounded-full shadow-lg border-2 border-white animate-bounce">
              <Check className="w-3 h-3" />
            </div>
          )}
        </button>

        {/* قائمة الشركات */}
        {companies.map((com) => {
          const isActive = activeCompany === com.id.toString();
          return (
            <button
              key={com.id}
              onClick={() => handleFilter(com.id.toString())}
              className={`
                relative flex-shrink-0 flex flex-col items-center p-3 w-28 h-32 rounded-3xl border-2 transition-all duration-500 group
                ${isActive
                  ? "bg-white border-[#FFC107] shadow-2xl shadow-yellow-500/20 -translate-y-2"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1"
                }
              `}
            >
              {/* حاوية اللوجو - دائرية بظل ناعم */}
              <div className={`
                w-16 h-16 rounded-2xl overflow-hidden border mb-3 flex items-center justify-center p-2 bg-white transition-all duration-500
                ${isActive ? "border-[#FFC107] shadow-inner scale-110" : "border-gray-50 group-hover:scale-105"}
              `}>
                {com.logo ? (
                  <Image 
                    src={com.logo} 
                    alt={com.name_ar} 
                    width={60} 
                    height={60} 
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                ) : (
                  <Globe className="text-gray-200 w-8 h-8" />
                )}
              </div>

              {/* اسم الشركة */}
              <div className="text-center w-full">
                <p className={`text-[12px] font-black truncate px-1 transition-colors ${isActive ? "text-[#2D1B50]" : "text-gray-600"}`}>
                  {com.name_ar}
                </p>
                <div className={`h-1 w-4 mx-auto mt-1 rounded-full transition-all ${isActive ? "bg-[#FFC107] w-8" : "bg-transparent"}`} />
              </div>

              {isActive && (
                <div className="absolute -top-2 -right-2 bg-[#2D1B50] text-[#FFC107] p-1.5 rounded-full shadow-xl border-2 border-white animate-in zoom-in duration-300">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* لمسة نهائية: تلاشي الضوء عند الأطراف */}
      <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-gray-50/50 to-transparent pointer-events-none lg:hidden" />
    </div>
  );
}