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
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-center">
      {/* 1. المنتج */}
      <div className="flex items-center gap-3 w-[20%] justify-start pr-4">
        <div className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="w-8 h-8 object-contain"
          />
        </div>
        <span className="font-bold text-gray-800 line-clamp-2 text-right leading-tight" title={product.name}>{product.name}</span>
      </div>

      <div className="w-[10%] text-center font-bold text-gray-700">
        {product.serial_number || "-"}
      </div>

      {/* 2. القسم */}
      <div className="w-[10%] text-gray-500 font-medium line-clamp-1" dir="rtl" title={product.name_department}>
        {product.name_department || "غير محدد"}
      </div>

      {/* 3. الحالة */}
      <div className="w-[10%] flex justify-center items-center">
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

      {/* 4. السعر الأساسي (الجملة) */}
      <div className="w-[10%] text-purple-700 font-bold">
        {product.price || 0} <span className="text-xs text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* 5. سعر التجزئة السعودي */}
      <div className="w-[15%] text-blue-600 font-bold">
        {product.retail_price || 0} <span className="text-xs text-gray-400 font-normal">ر.س</span>
      </div>

      {/* 6. سعر التجزئة اليمني */}
      <div className="w-[15%] text-green-600 font-bold">
        {product.retail_price_ye_new || 0} <span className="text-xs text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* 7. إجراءات */}
      <div className="flex items-center justify-end gap-3 w-[10%] pl-4">
        <Link href={`products/${product.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
          <Pencil size={18} />
        </Link>
        <button
          onClick={handelDelete}
          className="text-gray-400 hover:text-red-600 transition-colors p-2 bg-red-50 rounded-lg hover:bg-red-100">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )

}

export default ProductsRow