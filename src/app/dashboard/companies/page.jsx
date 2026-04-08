"use client";
import React, { use } from "react";
import { Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/actions/companies";
 import Pagination from "@/components/dashboard/Pagination";

const ITEMS_PER_PAGE = 21;

function page({ searchParams: searchParamsPage }) {
 const searchParams = use(searchParamsPage);

  const currentPage = Number(searchParams.page) || 1;

  const handleSearch = (val) => console.log("بحث عن:", val);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Company", currentPage],
    queryFn: () => getCompanies(currentPage),
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
  const companies = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;
  return (
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Building2 />
          <h1 className="text-3xl font-bold">إدارة الشركات</h1>
        </div>
        <SearchInput
          placeholder="البحث بأسم الشركة  ..."
          onSearch={handleSearch}
        />
      </div>
      <div className="flex justify-start mb-6">
        <Link
          href={"companies/new"}
          className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold"
        >
          <Plus size={20} />
          <span>إضافة شركة</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[20%] text-right pl-10">الشركة</div>
          <div className="w-[25%] text-center"> الموقع الإلكتروني</div>
          <div className="w-[20%] text-center"> عدد المستخدمين</div>

          <div className="w-[10%] text-center pr-2">إجراءات</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {companies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg shadow-md text-gray-500 text-center">
              <p className="text-lg">🚫 لا توجد فروع متاحة حاليًا</p>
            </div>
          ) : (
            companies.map((company) => (
              <CompaniesRow key={company.id} company={company} onDelete={refetch}/>
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

 