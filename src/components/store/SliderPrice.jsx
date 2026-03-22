// "use client";
// import React, { useState, useEffect } from "react";
// import { Slider } from "../ui/slider";
// import { Button } from "../ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { RotateCcw, Wallet } from "lucide-react";

// function SliderPrice() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const currentPrice = Number(searchParams.get("price")) || "";
//   const [priceRange, setPriceRange] = useState([currentPrice]);

//   // مزامنة السلايدر مع الـ URL
//   useEffect(() => {
//     setPriceRange([currentPrice]);
//   }, [currentPrice]);

//   const restartPrice = ()=>{
//      const params = new URLSearchParams(searchParams.toString());
//     params.delete("price");
//     params.delete("page"); 

//     router.push(`?${params.toString()}`);
//   }
//   const handelFillter = () => { 
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("price", priceRange[0].toString());
//     params.delete("page"); // مهم مع pagination

//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-6">
//       {/* العنوان */}
//       <div className="flex justify-between items-center gap-2 font-black text-gray-700">
//         <span className="flex flex-row gap-2">
//           <Wallet className="h-5 w-5 text-secondary" />

//           <h1>تصفية حسب السعر</h1>
//         </span>
//         <span>
//           <Button 
//           className={'bg-sectext-secondary'}
//           onClick= {restartPrice}>
//           <RotateCcw />

//           </Button>
//         </span>
//       </div>

//       {/* السعر الحالي */}
//       <div className="flex justify-between items-center text-sm">
//         <span className="text-gray-500">السعر الأقصى</span>
//         <span className="rounded-full bg-orange-50 px-3 py-1 text-secondary font-bold">
//           {priceRange[0]} ر.س
//         </span>
//       </div>

//       {/* السلايدر */}
//       <Slider
//         value={priceRange}
//         max={1000}
//         step={10}
//         onValueChange={setPriceRange}
//         className="py-3"
//       />

//       {/* زر التطبيق */}
//       <Button
//         onClick={handelFillter}
//         className="w-full bg-secondary hover:bg-secondary-hover cursor-pointer font-bold py-5 text-base rounded-xl transition-all"
//       >
//         تطبيق الفلتر
//       </Button>
//     </div>
//   );
// }

// export default SliderPrice;



"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Wallet, Banknote } from "lucide-react";

function SliderPrice() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // قيمة افتراضية في حال لم يوجد سعر في الرابط
  const initialPrice = Number(searchParams.get("price")) || 1000;
  const [priceRange, setPriceRange] = useState([initialPrice]);

  useEffect(() => {
    setPriceRange([Number(searchParams.get("price")) || 1000]);
  }, [searchParams]);

  const restartPrice = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("price");
    params.delete("page");
    setPriceRange([1000]); // إعادة السلايدر لأقصى قيمة
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handelFillter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", priceRange[0].toString());
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* الرأس: العنوان وزر الإعادة */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#2D1B50]/5 rounded-lg">
            <Banknote className="h-5 w-5 text-[#2D1B50]" />
          </div>
          <h1 className="font-bold text-[#2D1B50] text-sm">تصفية حسب السعر</h1>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={restartPrice}
          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          title="إعادة ضبط"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* عرض السعر المختار بتصميم جذاب */}
      <div className="bg-[var(--secondary_color)] rounded-2xl p-4 text-center shadow-inner relative overflow-hidden group">
        {/* خلفية زخرفية خفيفة */}
        <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-110 transition-transform">
            <Wallet className="w-12 h-12 text-white" />
        </div>
        
        <p className="text-[var(--primary_color)]/70 text-[10px] mb-1 font-bold">السعر الأقصى المحدد</p>
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl font-black text-white">{priceRange[0]}</span>
          <span className="text-[var(--primary_color)] font-bold text-xs">ر.س</span>
        </div>
      </div>

      {/* السلايدر */}
      <div className="px-2">
        <Slider
          value={priceRange}
          max={2000} // زدنا المدى ليعطي مرونة أكثر
          min={0}
          step={10}
          onValueChange={setPriceRange}
          className="cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold">
          <span>0 ر.س</span>
          <span>2000 ر.س</span>
        </div>
      </div>

      {/* زر التطبيق */}
      <Button
        onClick={handelFillter}
        className="w-full bg-[var(--primary_color)] hover:bg-[var(--primary_color)] text-[var(--secondary_color)] font-black py-6 text-sm rounded-xl shadow-lg shadow-yellow-500/20 transition-all active:scale-95"
      >
        تطبيق الفلتر
      </Button>
    </div>
  );
}

export default SliderPrice;