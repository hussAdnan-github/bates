"use client";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { deleteDepartment } from "@/actions/department";

const DepartmentsRow = ({ department, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handelDelete = async () => {
    const results = await deleteDepartment(department.id);

    onDelete(); 
    setIsModalOpen(false);
    toast.success(
      <div style={{ direction: "rtl", textAlign: "right" }}>
        <strong>تمت الحذف بنجاح ✅</strong>
      </div>,
      { duration: 4000 },
    );
  };
  return (
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. اسم القسم */}
      <div className="w-[30%] flex items-center gap-3 pr-2">
        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
          <img src={department.icons || "/placeholder.png"} alt={department.name || "قسم"} className="w-8 h-8 object-contain" />
        </div>
        <span className="font-bold text-gray-800 line-clamp-1">{department.name || "بدون اسم"}</span>
      </div>

      {/* 2. الترتيب */}
      <div className="w-[15%] text-center font-bold text-gray-700">
        {department.number || "-"}
      </div>

      {/* 3. الشركة التابع لها */}
      <div className="w-[20%] text-center text-gray-500 font-medium line-clamp-1" dir="rtl">
        {department.name_company ? Object.values(department.name_company).join(" - ") : "غير محدد"}
      </div>

      {/* 4. عدد المنتجات */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {department.product_count || 0}
      </div>

      {/* 5. إجراءات */}
      <div className="w-[15%] flex items-center justify-end gap-2 pl-2 text-left">
        <Link href={`departments/${department.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg">
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
        title="حذف القسم"
        message={`هل أنت متأكد من حذف القسم "${department.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
};

export default DepartmentsRow;
