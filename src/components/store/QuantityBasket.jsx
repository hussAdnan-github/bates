"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";

function QuantityBasket({ number }) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(number);
  }, [number]);
  return (
    <div className="col-span-2">
      <div className="flex items-center justify-center border rounded-md overflow-hidden h-9">
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-2 hover:bg-gray-100"
        >
          <Plus size={14} />
        </button>

        <span className="w-8 border-x text-sm text-center">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
          className="px-2 hover:bg-gray-100"
        >
          <Minus size={14} />
        </button>
      </div>
    </div>
  );
}

export default QuantityBasket;
