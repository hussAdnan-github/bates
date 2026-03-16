// components/store/ProductActionSection.js
'use client'
import { useState } from "react";
import QuantityProduct from "./QuantityProduct";
import ButtonCart from "./ButtonCart";
 
export default function ProductActionSection({ productId }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
       <QuantityProduct quantity={quantity} setQuantity={setQuantity} />
      
       <ButtonCart id={productId} quantity={quantity} show={2} />
    </div>
  ); 
}