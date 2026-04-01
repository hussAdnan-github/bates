import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
function billsRowRow({ bills }) {
  
  const statusMap = {
    1: { text: "نقد", type: "active" },
    2: { text: "أجل", type: "success" },
  };

  
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      <div className="flex items-center justify-center gap-3 w-[10%]">
        <Link
          href={`/dashboard/bills/${bills.id}`}
          className="text-gray-400 hover:text-blue-950 cursor-pointer transition-colors"
        >
          <Eye size={24} />
        </Link>
      </div>

      <div className="w-[20%] text-center text-gray-600 font-medium">
        {bills.created_at}
      </div>

      <div className="w-[20%] text-center">
        <StatusBadge
          text={statusMap[bills.type_bill]?.text}
          type={statusMap[bills.type_bill]?.type}
        />
      </div>

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {bills.total_price}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[20%] text-center text-gray-500 font-medium" dir="ltr">
        {bills.name_user}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[10%] justify-end">
        <span className="font-bold text-gray-800">#{bills.id}</span>
      </div>
    </div>
  );
}

export default billsRowRow;
