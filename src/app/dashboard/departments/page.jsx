"use client";
import React, { use, useEffect, useState } from "react";
import { Bookmark, Building2, Plus, Users } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import DepartmentsRow from "@/components/dashboard/data/DepartmentsRow";
import { useQuery } from "@tanstack/react-query";
import { getDepartmentDashboard } from "@/actions/department";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/dashboard/Pagination";
import { getCompanies } from "@/actions/companies";
import { useFiltter } from "@/hooks/useFiltter";

const ITEMS_PER_PAGE = 21;

function page({ searchParams: searchParamsPage }) {
  const [CompaniestList, setCompaniestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    updateFilters,
    getQueryParam,
  } = useFiltter(searchParamsPage);


  const companyParmeter = getQueryParam("company") || "";





  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await getCompanies();
        console.log(CompaniestList);
        setCompaniestList(res?.data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartment();
  }, []);





  const handleRoleChange = (val) => updateFilters({ company: val });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Departments", currentPage, companyParmeter, searchTerm],
    queryFn: () =>
      getDepartmentDashboard(currentPage, companyParmeter, searchTerm),
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

  const departments = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;
  return (
    <div className="p-6" dir="rtl">
      {/* 1. Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 text-teal-700 rounded-xl">
            <Bookmark size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">إدارة الأقسام</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">تصفح وإدارة جميع الأقسام والفئات</p>
          </div>
        </div>
        
        <Link href={"departments/new"} className="bg-[#2D1B4D] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold shadow-md hover:shadow-lg">
          <span className="text-xl leading-none">+</span>
          <span>إضافة قسم</span>
        </Link>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex-1 w-full">
          <SearchInput
            placeholder="البحث باسم القسم..."
            value={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <FiltersDropdown
            value={companyParmeter}
            options={[
              { label: "كل الشركات", value: "" },
              ...CompaniestList.map((comp) => ({
                label: comp.name_ar,
                value: comp.id.toString(),
              })),
            ]}
            onChange={handleRoleChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center w-full bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-500 text-sm font-bold">
          <div className="w-[30%] text-right pr-4">اسم القسم</div>
          <div className="w-[15%] text-center">الترتيب</div>
          <div className="w-[20%] text-center">الشركة التابع لها</div>
          <div className="w-[20%] text-center">عدد المنتجات</div>
          <div className="w-[15%] text-left pl-4">إجراءات</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {departments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white rounded-lg shadow-md text-gray-500 text-center">
              <p className="text-lg">🚫 لا توجد فروع متاحة حاليًا</p>
            </div>
          ) : (
            departments.map((depart) => (
              <DepartmentsRow
                key={depart.id}
                department={depart}
                onDelete={refetch}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-between items-center flex-row-reverse mt-8">
        <Pagination
          nameApi="/dashboard/departments"
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
