'use client'
import React, { useState } from "react";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
import { deleteUser, patchUser } from "@/actions/users";
import { toast } from "sonner";
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
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex items-center gap-3 w-[10%]">
        <button
        onClick={handelDelete}
        className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
        <Link
          href={`users/${user.id}`}
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Pencil size={18} />
        </Link>
      </div>

      {/* 2. مشرف؟ */}
      <div className="w-[15%] text-center">
        <StatusBadge text="مستخدم" type="role" />
      </div>

      {/* 3. الحالة */}
      <div className="w-[10%] flex justify-center items-center">
        <button
          onClick={toggleStatus}
          disabled={isUpdating}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isActive ? "bg-green-500" : "bg-gray-300"
          } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          title={isActive ? "نشط" : "غير نشط"}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isActive ? "-translate-x-1" : "-translate-x-6"
            }`}
          />
          {isUpdating && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader2 size={12} className="animate-spin text-white" />
            </span>
          )}
        </button>
      </div>

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600  ">
        {user.taype_custom === 1 ? "تاجر جملة الجملة" : user.taype_custom === 2 ? "تاجر جملة" : user.taype_custom === 3 ? "تاجر تجزئة" : user.taype_custom}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[25%] text-center text-gray-500  " dir="ltr">
        {user.phone}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[20%] justify-end">
        <span className="font-bold text-gray-800">
          {/* {`${user.first_name}  ${user.last_name}`} */}
          {user.username}
        </span>
        <div className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={user.profile_picture}
            alt={user.first_name + " " + user.last_name}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default UserRow;
