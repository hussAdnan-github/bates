import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteProdut } from "@/actions/product";
import { toast } from "sonner";
 
function ProductsRow({product , onDelete}) {
  const handelDelete =async ()=>{
       const results = await deleteProdut(product.id);

       onDelete();
       toast.success (
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت حذف المنتج بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
     }
 return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex items-center justify-center gap-3 w-[20%]">
        <button
        onClick={handelDelete}
        className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
        <Link href={`products/${product.id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
          <Pencil size={18} />
        </Link>
      </div>

      

      {/* السعر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {product.price}
      </div>

      {/* القسم */}
      <div className="w-[20%] text-center text-gray-500 font-medium" dir="rtl">
        {product.name_department || "غير محدد"}
      </div>

      {/* المنتج */}
       <div className="flex flex-row-reverse items-center gap-3 w-[40%] justify-end">
        <span className="font-bold text-gray-800">{product.name}</span>
        <div className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
 ) 
    
} 

export default ProductsRow