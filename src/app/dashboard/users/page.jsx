"use client";
import React, { use, useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/actions/users";

import Pagination from "@/components/dashboard/Pagination";
import { useFiltter } from "@/hooks/useFiltter";


const ITEMS_PER_PAGE = 21;

function page({ searchParams: searchParamsPage }) {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    updateFilters,
    getQueryParam,
  } = useFiltter(searchParamsPage);

  const isActive = getQueryParam("is_active") || "";
  const typeCustom = getQueryParam("type_custom") || "";

  const handleStatusChange = (val) => updateFilters({ is_active: val });
  const handleRoleChange = (val) => updateFilters({ type_custom: val });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Users", currentPage, isActive, typeCustom, searchTerm],
    queryFn: () => getUsers(currentPage, isActive, typeCustom, searchTerm),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#145463] text-lg animate-pulse">
          جارٍ تحميل البيانات...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center p-10 text-red-500">حدث خطأ: {error.message}</p>
    );
  if (!data) return null;

  const users = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;

  return (
    <div className="p-6" dir="rtl">
      {/* 1. Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">إدارة المستخدمين</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">تصفح وإدارة جميع مستخدمي النظام</p>
          </div>
        </div>
        
        <Link href={"users/new"} className="bg-[#2D1B4D] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold shadow-md hover:shadow-lg">
          <span className="text-xl leading-none">+</span>
          <span>إضافة مستخدم</span>
        </Link>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex-1 w-full">
          <SearchInput
            placeholder="البحث بالاسم أو البريد..."
            value={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <FiltersDropdown
            value={typeCustom}
            options={[
              { label: "كل الانواع", value: "" },
              { label: "تاجر جملة الجملة", value: 1 },
              { label: "تاجر جملة", value: 2 },
              { label: "تاجر تجزئة", value: 3 },
            ]}
            onChange={handleRoleChange}
          />
          <FiltersDropdown
            value={isActive}
            options={[
              { label: "كل الحالات", value: "" },
              { label: "نشط", value: "true" },
              { label: "غير نشط", value: "false" },
            ]}
            onChange={handleStatusChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center w-full bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-500 text-sm font-bold">
          <div className="w-[25%] text-right pr-4">المستخدم</div>
          <div className="w-[20%] text-center">رقم الهاتف</div>
          <div className="w-[15%] text-center">نوع التاجر</div>
          <div className="w-[10%] text-center">الحالة</div>
          <div className="w-[15%] text-center">الرتبة</div>
          <div className="w-[15%] text-left pl-4">إجراءات</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg shadow-md text-gray-500 text-center">
              <p className="text-lg">🚫 لا توجد فروع متاحة حاليًا</p>
            </div>
          ) : (
            users.map((user) => (
              <UserRow key={user.id} user={user} onDelete={refetch} />
            ))
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

export default page;
