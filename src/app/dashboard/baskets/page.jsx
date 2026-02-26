"use client";
import React, { Suspense } from "react"; // 1. استيراد Suspense
import { Building2 } from "lucide-react";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import BasketsRow from "@/components/dashboard/data/BasketsRow";
import { useQuery } from "@tanstack/react-query";
import { getBaskets } from "@/actions/baskets";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/dashboard/Pagination";

const ITEMS_PER_PAGE = 21;

// 2. انقل المنطق كله إلى مكون داخلي
function BasketsList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const { data, isLoading, error } = useQuery({
    queryKey: ["Company", currentPage],
    queryFn: () => getBaskets(currentPage),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#145463] text-lg animate-pulse">جارٍ تحميل البيانات...</p>
      </div>
    );

  if (error)
    return <p className="text-center p-10 text-red-500">حدث خطأ: {error.message}</p>;

  const baskets = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;

  return (
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Building2 />
          <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
        </div>
        <SearchInput placeholder="البحث برقم الطلب او العميل  ..." onSearch={handleSearch} />
        <FiltersDropdown
          placeholder="كل الحالات"
          options={[
            { label: "تاجر", value: "merchant" },
            { label: "عميل", value: "customer" },
          ]}
          onChange={handleStatusChange}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[10%] text-right pl-10">رقم الطلب</div>
          <div className="w-[10%] text-center"> العميل</div>
          <div className="w-[20%] text-center"> الإجمالي</div>
          <div className="w-[20%] text-center"> حالة الطلب</div>
          <div className="w-[20%] text-center">نوع الدفع</div>
          <div className="w-[20%] text-center pr-2">تاريخ الطلب</div>
          <div className="w-[10%] text-center pr-2">إجراءات</div>
        </div>
        <div className="flex flex-col">
          {baskets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg shadow-md text-gray-500 text-center">
              <p className="text-lg">🚫 لا توجد فروع متاحة حاليًا</p>
            </div>
          ) : (
            baskets.map((bask) => <BasketsRow key={bask.id} basket={bask} />)
          )}
        </div>
      </div>

      <div className="flex justify-between items-center flex-row-reverse mt-8">
        <Pagination
          nameApi="/dashboard/users"
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
        <div>{`عرض 1 - ${ITEMS_PER_PAGE} من إجمالي ${totalCount} نتيجة`}</div>
      </div>
    </div>
  );
}

// 3. الصفحة الأساسية التي يتم تصديرها
export default function BasketsPage() {
  return (
    // تغليف المكون بـ Suspense لحل مشكلة الـ Build
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <BasketsList />
    </Suspense>
  );
}