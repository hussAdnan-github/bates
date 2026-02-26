import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
function BasketsRow({ basket }) {
  const statusMap = {
    1: { text: "جاري معالجة طلبك", type: "active" },
    2: { text: "تم شحن طلبك", type: "success" },
    3: { text: "تم إلغاء طلبك", type: "danger" },
    4: { text: "تم تعديل الطلب", type: "warning" },
    5: { text: "تم قبول طلبك", type: "success" },
    6: { text: "تم رفض طلبك", type: "danger" },
  };
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex justify-center gap-3 w-[10%]">
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="w-[20%] text-center text-gray-600 font-medium">
        {basket.date}
      </div>
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {basket.type}
      </div>

      <div className="w-[20%] text-center">
        <StatusBadge
          text={statusMap[basket.status]?.text}
          type={statusMap[basket.status]?.type}
        />
      </div>

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {basket.price}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[10%] text-center text-gray-500 font-medium" dir="ltr">
        {basket.customer}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[10%] justify-end">
        <span className="font-bold text-gray-800">{basket.number}</span>
      </div>
    </div>
  );
}

export default BasketsRow;
