"use client";

import React, { useEffect, useState, useRef } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { editProductBasket } from "@/actions/baskets";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";

function QuantityBasket({ number, id, isLocal = false }) {
  const [quantity, setQuantity] = useState(number);
  const queryClient = useQueryClient();
  const timerRef = useRef(null);  
  const updateQuantityLocal = useCartStore((state) => state.updateQuantity);

   useEffect(() => {
    setQuantity(number);
  }, [number]);

   const { mutate, isPending } = useMutation({
    mutationFn: async (newQty) => {
      const formData = new FormData();
      formData.append("quantity", newQty);
      return editProductBasket(formData, id);
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["basketShow"] });
    },
  });

  const updateQuantity = (newQty) => {
    if (newQty < 1) return;  

     setQuantity(newQty);

     if (isLocal) {
       updateQuantityLocal(id, newQty);
       return;
     }

     if (timerRef.current) clearTimeout(timerRef.current);

     timerRef.current = setTimeout(() => {
      mutate(newQty);
    }, 500); 
  };

  return (
    <div className="col-span-2">
      <div className="flex items-center justify-center border rounded-md overflow-hidden h-9 bg-white relative">
         <button
          onClick={() => updateQuantity(quantity - 1)}
          disabled={isPending || quantity <= 1}
          className="px-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus size={14} />
        </button>

         <span className="w-8 border-x text-sm text-center font-medium">
          {isPending ? (
            <Loader2 size={12} className="animate-spin mx-auto text-primary" />
          ) : (
            quantity
          )}
        </span>

         <button
          onClick={() => updateQuantity(quantity + 1)}
          disabled={isPending}
          className="px-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

export default QuantityBasket;