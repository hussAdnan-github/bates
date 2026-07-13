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
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Bookmark />
          <h1 className="text-3xl font-bold">إدارة الأقسام </h1>
        </div>
        <SearchInput
          placeholder="البحث بأسم القسم  ..."
          value={searchTerm}
          onSearch={setSearchTerm}
        />

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
      <div className="flex justify-start mb-6">
        <Link
          href={"departments/new"}
          className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold"
        >
          <Plus size={20} />
          <span>إضافة قسم</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-500 text-sm font-bold">
          <div className="w-[25%] text-right pl-10">اسم القسم</div>
          <div className="w-[15%] text-center">الترتيب</div>
          <div className="w-[25%] text-center">الشركة التابع لها</div>
          <div className="w-[20%] text-center"> عدد المنتجات داخل القسم</div>
          <div className="w-[15%] text-center pr-2">إجراءات</div>
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
