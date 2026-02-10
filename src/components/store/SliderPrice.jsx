"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Wallet } from "lucide-react";

function SliderPrice() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPrice = Number(searchParams.get("price")) || "";
  const [priceRange, setPriceRange] = useState([currentPrice]);

  // مزامنة السلايدر مع الـ URL
  useEffect(() => {
    setPriceRange([currentPrice]);
  }, [currentPrice]);

  const restartPrice = ()=>{
     const params = new URLSearchParams(searchParams.toString());
    params.delete("price");
    params.delete("page"); // مهم مع pagination

    router.push(`?${params.toString()}`);
  }
  const handelFillter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", priceRange[0].toString());
    params.delete("page"); // مهم مع pagination

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm space-y-6">
      {/* العنوان */}
      <div className="flex justify-between items-center gap-2 font-black text-gray-700">
        <span className="flex flex-row gap-2">
          <Wallet className="h-5 w-5 text-[#F18721]" />

          <h1>تصفية حسب السعر</h1>
        </span>
        <span>
          <Button 
          className={'bg-[#F18721]'}
          onClick= {restartPrice}>
          <RotateCcw />

          </Button>
        </span>
      </div>

      {/* السعر الحالي */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">السعر الأقصى</span>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-[#F18721] font-bold">
          {priceRange[0]} ر.س
        </span>
      </div>

      {/* السلايدر */}
      <Slider
        value={priceRange}
        max={1000}
        step={10}
        onValueChange={setPriceRange}
        className="py-3"
      />

      {/* زر التطبيق */}
      <Button
        onClick={handelFillter}
        className="w-full bg-[#F18721] hover:bg-[#d9771a] font-bold py-5 text-base rounded-xl transition-all"
      >
        تطبيق الفلتر
      </Button>
    </div>
  );
}

export default SliderPrice;
