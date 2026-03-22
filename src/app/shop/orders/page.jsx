

"use client";

import React from "react";
import { Eye, Pencil, Loader2, SearchX, Calendar, Hash, Banknote } from "lucide-react";
import { getOrdsers } from "@/actions/orders";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const statusMap = {
  1: { text: "جاري معالجة طلبك", type: "active" },
  2: { text: "تم شحن طلبك", type: "success" },
  3: { text: "تم إلغاء طلبك", type: "danger" },
  4: { text: "تم تعديل الطلب", type: "warning" },
  5: { text: "تم قبول طلبك", type: "success" },
  6: { text: "تم رفض طلبك", type: "danger" },
};

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";

  const handleFilterChange = (val) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === "all") {
      params.delete("status");
    } else {
      params.set("status", val);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const {
    data: allOrders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", currentStatus],
    queryFn: () => getOrdsers(currentStatus === "all" ? "" : currentStatus),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--primary_color)]" />
        <p className="text-gray-500 animate-pulse text-lg font-bold">جارٍ تحميل طلباتك...</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-10 md:p-20 bg-red-50 rounded-2xl border border-red-100 m-4">
        <p className="text-red-600 font-bold">حدث خطأ أثناء جلب البيانات، يرجى المحاولة لاحقاً.</p>
      </div>
    );

  const orders = allOrders?.data?.results || [];

  return (
    <div className="p-3 md:p-6 space-y-6 max-w-7xl mx-auto" dir="rtl">
      {/* الهيدر المحسن */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-right">
          <h1 className="text-xl md:text-2xl font-black text-gray-800">قائمة الطلبات</h1>
          <p className="text-gray-400 text-sm mt-1">إدارة ومتابعة طلباتك بشكل فوري</p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-64">
          <label className="font-bold text-gray-600 text-xs px-1">
            فلترة حسب الحالة:
          </label>
          <FiltersDropdown
            placeholder="كل الحالات"
            defaultValue={currentStatus}
            options={[
              { label: "جاري معالجة طلبك", value: "1" },
              { label: "تم شحن طلبك", value: "2" },
              { label: "تم إلغاء طلبك", value: "3" },
              { label: "تم تعديل الطلب", value: "4" },
              { label: "تم قبول طلبك", value: "5" },
              { label: "تم رفض طلبك", value: "6" },
            ]}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* عرض البيانات للشاشات الكبيرة (Table) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 font-bold text-sm">
              <th className="py-4 px-4 text-right">رقم الطلب</th>
              <th className="py-4 px-2">التاريخ</th>
              <th className="py-4 px-2">الحالة</th>
              <th className="py-4 px-2">الإجمالي</th>
              <th className="py-4 px-4 text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="py-5 px-4 text-right font-bold text-gray-800">#{order.id}</td>
                  <td className="py-5 text-gray-600 text-sm">{formatDate(order.created_at)}</td>
                  <td className="py-5">
                    <StatusBadge
                      text={statusMap[order.status]?.text || "غير معروف"}
                      type={statusMap[order.status]?.type || "default"}
                    />
                  </td>
                  <td className="py-5 font-black text-[var(--primary_color)]">{order.total_price} ر.س</td>
                  <td className="py-5 px-4">
                    <div className="flex justify-start gap-2">
                      <ActionButtons order={order} />
                    </div>
                  </td>
                </tr>
              ))
            ) : <EmptyState />}
          </tbody>
        </table>
      </div>

      {/* عرض البيانات للشاشات الصغيرة (Card List) */}
      <div className="md:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-black text-gray-800 flex items-center gap-2">
                  <Hash size={16} className="text-gray-400" /> #{order.id}
                </span>
                <StatusBadge
                  text={statusMap[order.status]?.text || "غير معروف"}
                  type={statusMap[order.status]?.type || "default"}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 flex items-center gap-1"><Calendar size={14}/> التاريخ</span>
                  <span className="font-bold text-gray-700">{formatDate(order.created_at)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 flex items-center gap-1"><Banknote size={14}/> الإجمالي</span>
                  <span className="font-black text-[var(--primary_color)]">{order.total_price} ر.س</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-50 flex justify-end gap-3">
                 <ActionButtons order={order} mobile />
              </div>
            </div>
          ))
        ) : <EmptyState />}
      </div>
    </div>
  );
}

// مكون فرعي للأزرار لتقليل تكرار الكود
const ActionButtons = ({ order, mobile = false }) => (
  <>
    <Link
      href={`/shop/orders/show/${order.id}`}
      className={`flex items-center justify-center rounded-xl transition-all shadow-sm border
        ${mobile ? 'px-4 py-2 gap-2 bg-blue-50 text-blue-600 border-blue-100 text-sm' : 'w-10 h-10 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-100'}`}
    >
      <Eye size={18} />
      {mobile && "عرض التفاصيل"}
    </Link>
    {order.status === 4 && (
      <Link
        href={`/shop/orders/edit/${order.id}`}
        className={`flex items-center justify-center rounded-xl transition-all shadow-sm border
          ${mobile ? 'px-4 py-2 gap-2 bg-gray-50 text-gray-700 border-gray-100 text-sm' : 'w-10 h-10 bg-gray-50 text-gray-400 hover:bg-gray-800 hover:text-white border-gray-100'}`}
      >
        <Pencil size={18} />
        {mobile && "تعديل الطلب"}
      </Link>
    )}
  </>
);

const EmptyState = () => (
  <div className="py-20 text-center flex flex-col items-center gap-4 bg-white rounded-2xl md:bg-transparent">
    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
      <SearchX size={40} className="text-gray-200" />
    </div>
    <p className="text-gray-500 font-bold italic">لا توجد طلبات متاحة لهذا التصنيف حالياً.</p>
  </div>
);

export default Page;