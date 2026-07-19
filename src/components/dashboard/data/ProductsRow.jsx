import React, { useState } from "react";
import { Pencil, Trash2, Loader2, Check, X } from "lucide-react";
import Link from "next/link";
import { deleteProdut, patchProduct } from "@/actions/product";
import { toast } from "sonner";
import DeleteConfirmModal from "../DeleteConfirmModal";

function ProductsRow({ product, onDelete }) {
  const [isActive, setIsActive] = useState(product.status === 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. المنتج */}
      <div className="w-[20%] flex items-center gap-3 pr-2">
        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
          <img src={product.image || "/placeholder.png"} alt={product.name || "Product"} className="w-8 h-8 object-contain" />
        </div>
        <span className="font-bold text-gray-800 line-clamp-2 leading-tight text-right" title={product.name}>{product.name || "بدون اسم"}</span>
      </div>

      {/* 2. الترتيب */}
      <div className="w-[8%] text-center font-bold text-gray-700">
        {product.number || "-"}
      </div>

      {/* 3. الموديل */}
      <div className="w-[10%] text-center font-bold text-gray-600">
        {product.model || "-"}
      </div>

      {/* 4. القسم */}
      <div className="w-[10%] text-center text-gray-500 font-medium line-clamp-1" dir="rtl" title={product.name_department}>
        {product.name_department || "غير محدد"}
      </div>

      {/* 5. الحالة */}
      <div className="w-[10%] flex justify-center items-center">
        <button
          onClick={toggleStatus}
          disabled={isUpdating}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
            isActive ? "bg-green-500" : "bg-gray-200"
          } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          title={isActive ? "نشط" : "غير نشط"}
        >
          <span className="sr-only">Toggle status</span>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isActive ? "-translate-x-5" : "-translate-x-0.5"
            }`}
          />
          {isUpdating && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 size={12} className="animate-spin text-white" />
            </span>
          )}
        </button>
      </div>

      {/* 6. السعر الأساسي */}
      <div className="w-[8%] text-purple-700 font-bold flex justify-center items-baseline gap-1">
        <span>{product.price || 0}</span>
        <span className="text-[10px] text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* 7. سعر التجزئة السعودي */}
      <div className="w-[12%] text-blue-600 font-bold flex justify-center items-baseline gap-1">
        <span>{product.retail_price || 0}</span>
        <span className="text-[10px] text-gray-400 font-normal">ر.س</span>
      </div>

      {/* 8. سعر التجزئة اليمني */}
      <div className="w-[13%] text-green-600 font-bold flex justify-center items-baseline gap-1">
        <span>{product.retail_price_ye_new || 0}</span>
        <span className="text-[10px] text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* 9. إجراءات */}
      <div className="w-[9%] flex items-center justify-end gap-2 pl-2">
        <Link href={`products/${product.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg">
          <Pencil size={18} />
        </Link>
        <button onClick={() => setIsModalOpen(true)} className="text-gray-400 hover:text-red-600 transition-colors p-2 bg-gray-50 hover:bg-red-100 rounded-lg">
          <Trash2 size={18} />
        </button>
      </div>

      <DeleteConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handelDelete}
        title="حذف المنتج"
        message={`هل أنت متأكد من حذف المنتج "${product.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  )

}

export default ProductsRow