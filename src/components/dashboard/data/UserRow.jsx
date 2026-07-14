'use client'
import React, { useState } from "react";
import { Pencil, Trash2, Loader2, Check, X } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
import { deleteUser, patchUser } from "@/actions/users";
import { toast } from "sonner";
import DeleteConfirmModal from "../DeleteConfirmModal";
function UserRow({ user  , onDelete}) {
  const handelDelete =async ()=>{
    const results = await deleteUser(user.id);
    onDelete();
    toast.success(
      <div style={{ direction: "rtl", textAlign: "right" }}>
        <strong>تم الحذف بنجاح ✅</strong>
      </div>,
      { duration: 4000 }
    );
  };

  const [isActive, setIsActive] = useState(user.is_active);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStatus = async () => {
    setIsUpdating(true);
    const newStatus = !isActive;
    
    // الإرسال كـ JSON لتبديل حالة نشط/غير نشط
    const payload = { is_active: newStatus };
    
    try {
      const result = await patchUser(payload, user.id, false);
      if (result.success) {
        setIsActive(newStatus);
        toast.success(
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <strong>تم {newStatus ? "تفعيل" : "إيقاف"} المستخدم بنجاح ✅</strong>
          </div>,
          { duration: 3000 }
        );
      } else {
        toast.error(
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <strong>{result.message || "فشل في تحديث حالة المستخدم"}</strong>
          </div>
        );
        console.error("API Error Details:", result.errors);
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحديث");
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. المستخدم */}
      <div className="w-[25%] flex items-center gap-3 pr-2">
        <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-sm">
          <img src={user.profile_picture || "/placeholder.png"} alt={user.username || "User"} className="w-10 h-10 object-cover" />
        </div>
        <span className="font-bold text-gray-800 line-clamp-1">{user.username || "بدون اسم"}</span>
      </div>

      {/* 2. رقم الهاتف */}
      <div className="w-[20%] text-center text-gray-500 font-medium font-mono" dir="ltr">
        {user.phone || "-"}
      </div>

      {/* 3. نوع التاجر */}
      <div className="w-[15%] flex justify-center">
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-blue-100">
          {user.taype_custom === 1 ? "جملة الجملة" : user.taype_custom === 2 ? "جملة" : user.taype_custom === 3 ? "تجزئة" : user.taype_custom || "غير محدد"}
        </span>
      </div>

      {/* 4. الحالة */}
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

      {/* 5. الرتبة */}
      <div className="w-[15%] flex justify-center">
        <StatusBadge text="مستخدم" type="role" />
      </div>

      {/* 6. إجراءات */}
      <div className="w-[15%] flex items-center justify-end gap-2 pl-2">
        <Link href={`users/${user.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg">
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
        title="حذف المستخدم"
        message={`هل أنت متأكد من حذف المستخدم "${user.username}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      />
    </div>
  );
}

export default UserRow;
