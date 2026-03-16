"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { editProductBasket } from "@/actions/baskets";

function QuantityBasket({ number, id }) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(number);
  }, [number]);

  const handelAddQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    setTimeout(async () => {
      const formData = new FormData();
      formData.append("quantity", newQuantity);

      const result = await editProductBasket(formData, id);
      console.log(result);
    }, 2000);
  };
  const handelRemoveQuantity = async () => {
     const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    setTimeout(async () => {
      const formData = new FormData();
      formData.append("quantity", newQuantity);

      const result = await editProductBasket(formData, id);
      console.log(result);
    }, 2000);
  };
  return (
    <div className="col-span-2">
      <div className="flex items-center justify-center border rounded-md overflow-hidden h-9">
        <button onClick={handelAddQuantity} className="px-2 hover:bg-gray-100">
          <Plus size={14} />
        </button>

        <span className="w-8 border-x text-sm text-center">{quantity}</span>

        <button
          onClick={handelRemoveQuantity}
          className="px-2 hover:bg-gray-100"
        >
          <Minus size={14} />
        </button>
      </div>
    </div>
  );
}

export default QuantityBasket;
