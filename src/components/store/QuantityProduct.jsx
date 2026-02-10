'use client'
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

function QuantityProduct() {
   const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <span className="font-bold text-gray-700">الكمية:</span>
      <div className="flex items-center border rounded-lg bg-gray-50">
        <Button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="p-3 hover:text-[#F18721] transition-colors"
        >
          <Plus size={18} />
        </Button>
        <span className="w-12 text-center font-bold text-lg border-x py-2 bg-white">
          {quantity}
        </span>
        <Button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          className="p-3 hover:text-[#F18721] transition-colors"
        >
          <Minus size={18} />
        </Button>
      </div>
    </div>
  );
}

export default QuantityProduct;
