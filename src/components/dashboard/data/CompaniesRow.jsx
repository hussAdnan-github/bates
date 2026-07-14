'use client'
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deleteCompany } from "@/actions/companies";
import { toast } from "sonner";
import DeleteConfirmModal from "../DeleteConfirmModal";
 
function CompaniesRow({ company, onDelete }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handelDelete = async () => {
    const results = await deleteCompany(company.id);
    toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت الحذف بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
    onDelete();
  }
  return (
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. الشركة */}
      <div className="w-[30%] flex items-center gap-3 pr-2">
        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
          <img src={company.logo || "/placeholder.png"} alt={company.name_ar} className="w-8 h-8 object-contain" />
        </div>
        <span className="font-bold text-gray-800 line-clamp-1">{company.name_ar || "بدون اسم"}</span>
      </div>

      {/* 2. الترتيب */}
      <div className="w-[15%] text-center font-bold text-gray-700">
        {company.number || "-"}
      </div>

      {/* 3. الموقع الإلكتروني */}
      <div className="w-[20%] text-center text-gray-500 font-medium" dir="ltr">
        {company.website || "-"}
      </div>

      {/* 4. عدد المستخدمين */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {company.custom_user?.length || 0}
      </div>

      {/* 5. إجراءات */}
      <div className="w-[15%] flex items-center justify-end gap-2 pl-2">
        <Link href={`companies/${company.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg">
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
        title="حذف الشركة"
        message={`هل أنت متأكد من حذف الشركة "${company.name_ar}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  )
    
} 

export default CompaniesRow