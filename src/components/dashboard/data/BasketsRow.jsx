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
    <div className="flex items-center w-full px-4 py-3 bg-white border-b border-gray-100 hover:bg-blue-50/30 transition-all text-sm">
      {/* 1. رقم الطلب */}
      <div className="w-[12%] flex items-center pr-2 text-right">
        <span className="font-bold text-gray-800 bg-gray-100 px-3 py-1 rounded-full text-xs border border-gray-200 shadow-sm">#{basket.id}</span>
      </div>

      {/* 2. العميل */}
      <div className="w-[18%] flex flex-col items-center justify-center">
        <span className="font-bold text-gray-800 line-clamp-1 text-center">{basket.name_user || "غير متوفر"}</span>
        {basket.user_phone && (
          <span className="text-xs text-gray-500 line-clamp-1 text-center font-mono" dir="ltr">{String(basket.user_phone).split(',')[0]}</span>
        )}
      </div>

      {/* 3. الإجمالي */}
      <div className="w-[15%] text-center text-purple-700 font-bold flex justify-center items-baseline gap-1">
        <span>{basket.total_price || 0}</span>
        <span className="text-[10px] text-gray-400 font-normal">ر.ي</span>
      </div>

      {/* 4. حالة الطلب */}
      <div className="w-[15%] flex justify-center">
        <PremiumBadge config={statusConfig[basket.status]} />
      </div>

      {/* 5. نوع الدفع */}
      <div className="w-[15%] flex justify-center">
        <PremiumBadge config={paymentConfig[basket.type_payment]} />
      </div>

      {/* 6. تاريخ الطلب */}
      <div className="w-[15%] flex justify-center text-gray-600 font-medium text-sm">
        <div className="bg-gray-50 px-3 py-1 rounded-md border border-gray-100 shadow-sm">
          {basket.created_at ? new Date(basket.created_at).toLocaleDateString("ar-EG") : "غير محدد"}
        </div>
      </div>

      {/* 7. إجراءات */}
      <div className="w-[10%] flex items-center justify-end gap-2 pl-2 text-left">
        <Link href={`/dashboard/baskets/${basket.id}`} className="text-gray-400 hover:text-blue-600 transition-colors p-2 bg-gray-50 hover:bg-blue-100 rounded-lg">
          <Edit size={18} />
        </Link>
      </div>
    </div>
  );
}

export default BasketsRow;
