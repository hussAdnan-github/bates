import React from "react";
import { ArrowRight, Package, Calendar, CreditCard, CheckCircle2 } from "lucide-react";
import { getOrdsersId } from "@/actions/orders";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";


const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100 ${className}`}>
    <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
      <Icon size={20} className="text-[var(--primary_color)]" />
    </div>
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-[var(--primary_color)]">{value}</p>
    </div>
  </div>
);
const statusMap = {
  1: { text: "جاري معالجة طلبك", type: "active" },
  2: { text: "تم شحن طلبك", type: "success" },
  3: { text: "تم إلغاء طلبك", type: "danger" },
  4: { text: "تم تعديل الطلب", type: "warning" },
  5: { text: "تم قبول طلبك", type: "success" },
  6: { text: "تم رفض طلبك", type: "danger" },
};
const typeMap = {
  1: { text: "الدفع عند الاستلام", type: "active" },
  2: { text: "تحويل المبلغ", type: "success" },

};
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
const OrderDetails = async ({ params }) => {
  const { showorder } = await params;
  const allOrders = await getOrdsersId(showorder);

  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value;
  const currencySymbol = type_money === "1" ? "ريال يمني (قديم)" : "ر.س";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 dir-rtl" dir="rtl">
      {/* الرأس: العنوان وزر العودة */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[var(--primary_color)] flex items-center gap-2">
            تفاصيل الطلب <span className="text-secondary">#{allOrders.data.id}</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            عرض حالة وتفاصيل مشترياتك
          </p>
        </div>
        <Link href={`/shop/orders`} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary_color)] text-white rounded-xl hover:bg-gray-700 transition-all text-sm font-medium shadow-lg shadow-gray-200">
          <ArrowRight size={18} />
          العودة للطلبات
        </Link>
      </div>

      {/* بطاقة معلومات الطلب السريعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <InfoItem
          icon={Calendar}
          label="تاريخ الطلب"
          value={formatDate(allOrders.data.created_at)}
        />
        <InfoItem
          icon={CheckCircle2}
          label="حالة الطلب"
          value={`${statusMap[allOrders.data.status].text}`}
          className="bg-orange-50/30 border-orange-100"
        />
        <InfoItem
          icon={CreditCard}
          label="طريقة الدفع"
          value={`${typeMap[allOrders.data.type_payment].text}`}
        />
      </div>

      {/* محتويات الطلب */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30">
          <h2 className="font-bold text-[var(--primary_color)] flex items-center gap-2">
            <Package size={18} />
            محتويات الطلب
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right text-xs uppercase text-gray-400 bg-gray-50/50">
                <th className="px-6 py-4 font-medium">المنتج</th>
                <th className="px-6 py-4 font-medium text-center">السعر</th>
                <th className="px-6 py-4 font-medium text-center">الكمية</th>
                <th className="px-6 py-4 font-medium text-left">
                  الإجمالي الفرعي
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {allOrders.data.basketitems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100 relative">
                        <Image
                          src={item.products_image}
                          alt={item.products_name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-bold text-gray-700 text-sm leading-relaxed max-w-[250px]">
                        {item.products_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 font-medium">
                    {item.products_price} {currencySymbol}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-md text-gray-700 font-bold text-sm">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left font-black text-[var(--primary_color)]">
                    {item.subtotal} {currencySymbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ملخص الإجمالي */}
      <div className="bg-[var(--secondary_color)]/5 border-2 border-dashed border-[var(--primary_color)] rounded-2xl p-6 flex justify-between items-center">
        <div>
          <p className="text-secondary font-bold text-lg mb-1">
            المجموع الإجمالي
          </p>
          <p className="text-gray-500 text-xs">شامل ضريبة القيمة المضافة</p>
        </div>
        <div className="text-3xl font-black text-secondary">
          {allOrders.data.total_price} <span className="text-sm">{currencySymbol}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
