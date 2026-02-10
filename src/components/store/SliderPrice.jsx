'use client'
import React, { useState } from "react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

function SliderPrice() {
  const [priceRange, setPriceRange] = useState([1000]);

  return (
    <div className="space-y-6 flex justify-center flex-col">
      <div className="flex justify-between items-center text-sm font-bold">
        <span>السعر الأقصى:</span>
      </div>
      <Slider
        defaultValue={[1000]}
        max={1000}
        step={10}
        onValueChange={(val) => setPriceRange(val)}
        className="py-4"
      />
      <span className="text-[#F18721] text-center">{priceRange[0]} ر.س</span>

      <Button className="w-full bg-[#F18721] hover:bg-[#d9771a] font-bold py-6 text-lg">
        تطبيق الفلتر
      </Button>
    </div>
  );
}

export default SliderPrice;
