"use client";

import React from "react";
import { Eye, Pencil, Loader2, SearchX } from "lucide-react";
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
    error,
  } = useQuery({
    queryKey: ["orders", currentStatus],
    queryFn: () => getOrdsers(currentStatus === "all" ? "" : currentStatus),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
        <p className="text-gray-500 animate-pulse text-lg">
          جارٍ تحميل طلباتك...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-20 bg-red-50 rounded-2xl border border-red-100 m-4">
        <p className="text-red-600 font-bold">حدث خطأ أثناء جلب البيانات</p>
      </div>
    );

  const orders = allOrders?.data?.results || [];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-right w-full md:w-auto">
          <h1 className="text-xl font-black text-gray-800">قائمة الطلبات</h1>
          <p className="text-gray-400 text-xs">إدارة ومتابعة الطلبات </p>
        </div>

        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
          <label className="font-bold text-gray-500 text-xs px-1">
            فلترة حسب حالة الطلب:
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

      {/* الجدول */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 font-bold text-sm">
                <th className="py-4 px-4 text-right">رقم الطلب</th>
                <th className="py-4 px-2">تاريخ الطلب</th>
                <th className="py-4 px-2">حالة الطلب</th>
                <th className="py-4 px-2">الإجمالي</th>
                <th className="py-4 px-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="py-5 px-4 text-right font-bold text-gray-700">
                      #{order.id}
                    </td>
                    <td className="py-5 text-gray-600 text-sm">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="py-5">
                      <StatusBadge
                        text={statusMap[order.status]?.text || "غير معروف"}
                        type={statusMap[order.status]?.type || "default"}
                      />
                    </td>
                    <td className="py-5 font-black text-gray-800">
                      {order.total_price}
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/shop/orders/show/${order.id}`}
                          className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-blue-100 shadow-sm"
                        >
                          <Eye size={18} />
                        </Link>
                        {order.status === 4 && (
                          <Link
                            href={`/shop/orders/edit/${order.id}`}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-800 hover:text-white transition-all border border-gray-100 shadow-sm"
                          >
                            <Pencil size={18} />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <SearchX size={40} className="text-gray-200" />
                      <p className="italic">
                        لا توجد طلبات متاحة لهذا التصنيف حالياً.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
