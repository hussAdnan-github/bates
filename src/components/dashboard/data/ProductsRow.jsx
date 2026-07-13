import React, { useState } from "react";
import { Pencil, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { deleteProdut, patchProduct } from "@/actions/product";
import { toast } from "sonner";

function ProductsRow({ product, onDelete }) {
  const [isActive, setIsActive] = useState(product.status === 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const handelDelete = async () => {
    const results = await deleteProdut(product.id);

    onDelete();
    toast.success(
      <div style={{ direction: "rtl", textAlign: "right" }}>
        <strong>تمت حذف المنتج بنجاح ✅</strong>
      </div>,
      { duration: 4000 },
    );
  }

  const toggleStatus = async () => {
    setIsUpdating(true);
    const newStatus = isActive ? 2 : 1;

    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      const result = await patchProduct(formData, product.id);
      if (result.success) {
        setIsActive(!isActive);
        toast.success(
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <strong>تم {newStatus === 1 ? "تفعيل" : "إيقاف"} المنتج بنجاح ✅</strong>
          </div>,
          { duration: 3000 }
        );
      } else {
        toast.error("فشل في تحديث حالة المنتج");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setIsUpdating(false);
    }
  };

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
      <div className="w-[15%] text-center text-gray-600 font-medium">
        {product.price}
      </div>

      {/* الحالة */}
      <div className="w-[15%] flex justify-center items-center">
        <button
          onClick={toggleStatus}
          disabled={isUpdating}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isActive ? "bg-green-500" : "bg-gray-300"
            } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          title={isActive ? "نشط" : "غير نشط"}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? "-translate-x-1" : "-translate-x-6"
              }`}
          />
          {isUpdating && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 size={12} className="animate-spin text-white" />
            </span>
          )}
        </button>
      </div>

      {/* القسم */}
      <div className="w-[15%] text-center text-gray-500 font-medium" dir="rtl">
        {product.name_department || "غير محدد"}
      </div>

      {/* المنتج */}
      <div className="flex flex-row-reverse items-center gap-3 w-[35%] justify-end">
        <span className="font-bold text-gray-800 line-clamp-1">{product.name}</span>
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