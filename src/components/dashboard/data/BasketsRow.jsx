import React from "react";
import { Edit, Clock, Truck, Ban, Edit3, CheckCircle, XCircle, CreditCard, Wallet } from "lucide-react";
import Link from "next/link";

function BasketsRow({ basket }) {
  const statusConfig = {
    1: { text: "جاري المعالجة", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", icon: Clock },
    2: { text: "تم الشحن", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", icon: Truck },
    3: { text: "تم الإلغاء", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: Ban },
    4: { text: "تم التعديل", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", icon: Edit3 },
    5: { text: "تم القبول", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle },
    6: { text: "تم الرفض", color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", icon: XCircle },
  };

  const paymentConfig = {
    1: { text: "عند الاستلام", color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", icon: Wallet },
    2: { text: "تحويل بنكي", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", icon: CreditCard },
  };

  const PremiumBadge = ({ config }) => {
    if (!config) return <span className="text-gray-400 font-medium text-xs">غير محدد</span>;
    const Icon = config.icon;
    return (
      <div className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border ${config.bg} ${config.border} ${config.color} shadow-sm hover:shadow transition-all`}>
        {Icon && <Icon size={14} strokeWidth={2.5} />}
        <span className="text-xs font-bold">{config.text}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* إجراءات */}
      <div className="flex justify-center gap-3 w-[10%]">
        <Link href={`/dashboard/baskets/${basket.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
          <Edit size={18} />
        </Link>
      </div>

      {/* تاريخ الطلب */}
      <div className="w-[20%] text-center text-gray-600 font-medium text-sm">
        {basket.created_at ? new Date(basket.created_at).toLocaleDateString("ar-EG") : "غير محدد"}
      </div>
      
      {/* نوع الدفع */}
      <div className="w-[15%] text-center">
         <PremiumBadge config={paymentConfig[basket.type_payment]} />
      </div>

      {/* حالة الطلب */}
      <div className="w-[15%] text-center">
        <PremiumBadge config={statusConfig[basket.status]} />
      </div>

      {/* الإجمالي */}
      <div className="w-[15%] text-center text-purple-700 font-bold">
        {basket.total_price || 0} <span className="text-xs text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* العميل */}
      <div className="w-[15%] text-center flex flex-col items-center justify-center" dir="rtl">
        <span className="font-bold text-gray-800 line-clamp-1">{basket.name_user || "غير متوفر"}</span>
        {basket.user_phone && (
          <span className="text-xs text-gray-500 line-clamp-1" dir="ltr">{String(basket.user_phone).split(',')[0]}</span>
        )}
      </div>

      {/* رقم الطلب */}
      <div className="flex flex-row-reverse items-center gap-3 w-[10%] justify-end">
        <span className="font-bold text-gray-800">#{basket.id}</span>
      </div>
    </div>
  );
}

export default BasketsRow;
