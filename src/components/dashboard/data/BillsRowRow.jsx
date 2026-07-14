import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
function billsRowRow({ bills }) {
  
  const statusMap = {
    1: { text: "نقد", type: "active" },
    2: { text: "أجل", type: "success" },
  };

  const currencyMap = {
    1: "يمني قديم",
    2: "يمني جديد",
    3: "ر.س",
  };

  const date = new Date(bills.created_at);
  const formattedDate = isNaN(date) 
    ? bills.created_at 
    : new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(date);

  return (
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. رقم الفاتورة */}
      <div className="w-[15%] flex items-center pr-2 text-right">
        <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-xs shadow-sm border border-gray-200">#{bills.id}</span>
      </div>

      {/* 2. العميل */}
      <div className="w-[20%] text-center text-gray-700 font-bold line-clamp-1" dir="rtl">
        {bills.name_user || "بدون اسم"}
      </div>

      {/* 3. الإجمالي */}
      <div className="w-[20%] text-center text-gray-800 font-bold flex flex-col items-center justify-center gap-0.5">
        <span className="text-purple-700">{bills.total_price || 0}</span>
        {bills.type_many && (
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
            {currencyMap[bills.type_many] || "غير محدد"}
          </span>
        )}
      </div>

      {/* 4. نوع الفاتورة */}
      <div className="w-[15%] flex justify-center">
        <StatusBadge
          text={statusMap[bills.type_bill]?.text || "غير محدد"}
          type={statusMap[bills.type_bill]?.type || "default"}
        />
      </div>

      {/* 5. تاريخ الإصدار */}
      <div className="w-[20%] flex justify-center text-gray-500 font-medium text-xs md:text-sm">
        <div style={{ direction: "ltr" }} className="bg-gray-50 px-3 py-1 rounded-md border border-gray-100 shadow-sm">
          {formattedDate}
        </div>
      </div>

      {/* 6. إجراءات */}
      <div className="w-[10%] flex items-center justify-end gap-2 pl-2 text-left">
        <Link
          href={`/dashboard/bills/${bills.id}`}
          className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg"
        >
          <Eye size={18} />
        </Link>
      </div>
    </div>
  );
}

export default billsRowRow;
