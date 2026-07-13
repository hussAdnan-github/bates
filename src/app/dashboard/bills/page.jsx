"use client";

import React, { use, useEffect, useState } from "react";
import { Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import ProductsRow from "@/components/dashboard/data/ProductsRow";
import BasketsRow from "@/components/dashboard/data/BillsRowRow";
import BillsRowRow from "@/components/dashboard/data/BillsRowRow";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBills } from "@/actions/bills";
import Pagination from "@/components/dashboard/Pagination";
import { useFiltter } from "@/hooks/useFiltter";
import { set } from "zod";
const ITEMS_PER_PAGE = 21;

function BillsList({ searchParams: searchParamsPage }) {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    updateFilters, 
    getQueryParam,
  } = useFiltter(searchParamsPage);

  const type = getQueryParam("type") || "";
 

 

 

 
  const handleTypeChange = (val) => updateFilters({type: val});
  const handleSearch = (val) => setSearchTerm(val);
  const { data, isLoading, error } = useQuery({
    queryKey: ["bills", currentPage, type, searchTerm],
    queryFn: () => getBills(currentPage, type, searchTerm),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#145463] text-lg animate-pulse">
          جارٍ تحميل البيانات...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center p-10 text-red-500">حدث خطأ: {error.message}</p>
    );

  const bills = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;

 
   
  return (
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Building2 />
          <h1 className="text-3xl font-bold">إدارة الفواتير</h1>
        </div>
        <SearchInput
          placeholder="البحث برقم الطلب او ال عميل..."
          value={searchTerm}
          onSearch={setSearchTerm}
        />
        <FiltersDropdown
          // taype_custom
          value={type}
          options={[
            { label: "كل الأنواع", value: "" },

            { label: "نقد", value: 1 },
            { label: "أجل", value: 2 },
          ]}
          onChange={handleTypeChange}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[10%] text-right pl-10">رقم الفاتورة</div>
          <div className="w-[20%] text-center"> العميل</div>
          <div className="w-[20%] text-center"> الإجمالي</div>
          <div className="w-[20%] text-center"> نوع الفاتورة</div>
          <div className="w-[20%] text-center"> تاريخ الإصدار</div>
          <div className="w-[10%] text-center pr-2">إجراءات</div>
        </div>

        {/* قائمة الفواتير */}
        <div className="flex flex-col">
          {bills.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white text-gray-500 text-center">
              <p className="text-lg">  لا توجد فواتير متاحة حاليًا</p>
            </div>
          ) : (
            bills.map((bill) => (
              <BillsRowRow key={bill.id} bills={bill} />
            ))
          )}
        </div>
        <div className="flex justify-between items-center flex-row-reverse mt-8">
          <Pagination
            nameApi="/dashboard/bills"
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
          <div className="text-sm text-gray-500">
            {`عرض 1 - ${bills.length} من إجمالي ${totalCount} نتيجة`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillsList;
