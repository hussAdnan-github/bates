// QuantityProduct.jsx
'use client'
import { Minus, Plus } from "lucide-react";
import React from "react";

function QuantityProduct({ quantity, setQuantity }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-bold text-gray-500 mr-1">الكمية</span>
      <div className="flex items-center w-fit border-2 border-gray-100 rounded-2xl p-1 bg-white shadow-sm">
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="p-2.5 hover:bg-orange-50 text-[#F18721] rounded-xl transition-all active:scale-90"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
        
        <input 
          type="text" 
          readOnly 
          value={quantity} 
          className="w-12 text-center font-black text-xl text-gray-800 bg-transparent outline-none"
        />

        <button
          onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          className="p-2.5 hover:bg-gray-100 text-gray-400 rounded-xl transition-all active:scale-90"
          disabled={quantity <= 1}
        >
          <Minus size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
export default QuantityProduct;