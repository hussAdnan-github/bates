import React from "react";
import { Edit, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
import Link from "next/link";
function BasketsRow({ basket }) {
 
  const statusMap = {
    1: { text: "جاري معالجة طلبك", type: "active" },
    2: { text: "تم شحن طلبك", type: "success" },
    3: { text: "تم إلغاء طلبك", type: "danger" },
    4: { text: "تم تعديل الطلب", type: "warning" },
    5: { text: "تم قبول طلبك", type: "success" },
    6: { text: "تم رفض طلبك", type: "danger" },
  };
  const typeMap = {
    1: { text: "الدفع عند الاستلام", type: "success" },
    2: { text: "تحويل المبلغ", type: "active" },
     
  };
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* إجراءات */}
      <div className="flex justify-center gap-3 w-[10%]">
        <Link href={`/dashboard/baskets/${basket.id}`} className="text-gray-400 hover:text-blue-900 transition-colors">
          <Edit size={18} />
        </Link>
      </div>

      {/* تاريخ الطلب */}
      <div className="w-[20%] text-center text-gray-600 font-medium text-sm">
        {basket.created_at ? new Date(basket.created_at).toLocaleDateString("ar-EG") : "غير محدد"}
      </div>
      
      {/* نوع الدفع */}
      <div className="w-[15%] text-center text-gray-600 font-medium">
         <StatusBadge
          text={typeMap[basket.type_payment]?.text || "غير محدد"}
          type={typeMap[basket.type_payment]?.type || "default"}
        />
      </div>

      {/* حالة الطلب */}
      <div className="w-[15%] text-center">
        <StatusBadge
          text={statusMap[basket.status]?.text || "غير محدد"}
          type={statusMap[basket.status]?.type || "default"}
        />
      </div>

      {/* الإجمالي */}
      <div className="w-[15%] text-center text-gray-600 font-medium">
        {basket.total_price}
      </div>

      {/* العميل */}
      {/* <div className="w-[15%] text-center text-gray-500 font-medium" dir="rtl">
        {basket.customer || "غير متوفر"}
      </div> */}

      {/* رقم الطلب */}
      <div className="flex flex-row-reverse items-center gap-3 w-[10%] justify-end">
        <span className="font-bold text-gray-800">#{basket.id}</span>
      </div>
    </div>
  );
}

export default BasketsRow;
