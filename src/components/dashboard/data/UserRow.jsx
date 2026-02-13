import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
function UserRow({ user }) {
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex items-center gap-3 w-[10%]">
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
        <Link href={`users/${user.id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
          <Pencil size={18} />
        </Link>
      </div>

      {/* 2. مشرف؟ */}
      <div className="w-[15%] text-center">
        <StatusBadge text="مستخدم" type="role" />
      </div>

      {/* 3. الحالة */}
      <div className="w-[10%] text-center">
        <StatusBadge text="نشط" type="active" />
      </div>

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {user.merchantType}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[25%] text-center text-gray-500 font-medium" dir="ltr">
        {user.phone}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[20%] justify-end">
        <span className="font-bold text-gray-800">{user.name}</span>
        <div className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default UserRow;
