// // components/store/ProductActionSection.js
// 'use client'
// import { useState } from "react";
// import QuantityProduct from "./QuantityProduct";
// import ButtonCart from "./ButtonCart";
 
// export default function ProductActionSection({ productId }) {
//   const [quantity, setQuantity] = useState(1);

//   return (
//     <div className="space-y-6">
//        <QuantityProduct quantity={quantity} setQuantity={setQuantity} />
      
//        <ButtonCart id={productId} quantity={quantity} show={2} />
//     </div>
//   ); 
// }


'use client'
import { useState } from "react";
import QuantityProduct from "./QuantityProduct";
import ButtonCart from "./ButtonCart";

export default function ProductActionSection({ productId, product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col sm:flex-row items-end gap-4 mt-4 w-full">
      <div className="w-full sm:w-auto">
        <QuantityProduct quantity={quantity} setQuantity={setQuantity} />
      </div>
      <div className="w-full flex-1">
        <ButtonCart id={productId} quantity={quantity} show={2} product={product} />
      </div>
    </div>
  );
}