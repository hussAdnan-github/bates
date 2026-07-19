"use client";
import React, { use, useEffect, useState } from "react";
import { Building2, Plus, Users, PackageSearch } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import ProductsRow from "@/components/dashboard/data/ProductsRow";
import { useQuery } from "@tanstack/react-query";
import { getProduts, getProdutsDash } from "@/actions/product";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/dashboard/Pagination";
import { getDepartmentsList } from "@/actions/department";
import { useFiltter } from "@/hooks/useFiltter";
import { set } from "zod";
const ITEMS_PER_PAGE = 21;

function page({ searchParams: searchParamsPage }) {
  const [DepartmentList, setDepartmentList] = useState([]);

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    updateFilters,
    getQueryParam,
  } = useFiltter(searchParamsPage);

  const department__company =
    getQueryParam("department__company") || "";
  const status = getQueryParam("status") || "";


  useEffect(() => {
    async function fetchDepartment() {
      try {
        const res = await getDepartmentsList();

        setDepartmentList(res?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    }

    fetchDepartment();
  }, []);
  const searchParams = use(searchParamsPage);


  const handleRoleChange = (val) => updateFilters({ department__company: val });
  const handleStatusChange = (val) => updateFilters({ status: val });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Product", currentPage, department__company, status, searchTerm],
    queryFn: () =>
      getProdutsDash(currentPage, department__company, status, searchTerm),
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
  const products = data?.data?.results || [];
  const totalCount = data?.data?.count || 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const hasNextPage = data?.data?.next;
  const hasPrevPage = data?.data?.previous;
  return (
    <div className="p-6" dir="rtl">
      {/* 1. Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 text-orange-700 rounded-xl">
            <PackageSearch size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">إدارة المنتجات</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">تصفح وإدارة جميع منتجات المتجر</p>
          </div>
        </div>
        
        <Link href={"products/new"} className="bg-[#2D1B4D] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold shadow-md hover:shadow-lg">
          <span className="text-xl leading-none">+</span>
          <span>إضافة منتج</span>
        </Link>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="flex-1 w-full">
          <SearchInput
            placeholder="البحث بالاسم او الموديل..."
            value={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <FiltersDropdown
            value={department__company}
            options={[
              { label: "كل الاقسام", value: "" },
              ...DepartmentList.map((dep) => ({
                label: dep.name,
                value: dep.id.toString(),
              })),
            ]}
            onChange={handleRoleChange}
          />
          <FiltersDropdown
            value={status}
            options={[
              { label: "كل الحالات", value: "" },
              { label: "نشط", value: 1 },
              { label: "غير نشط", value: 2 },
            ]}
            onChange={handleStatusChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center w-full bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-500 text-sm font-bold">
          <div className="w-[20%] text-right pr-4">المنتج</div>
          <div className="w-[8%] text-center">الترتيب</div>
          <div className="w-[10%] text-center">الموديل</div>
          <div className="w-[10%] text-center">القسم</div>
          <div className="w-[10%] text-center">الحالة</div>
          <div className="w-[8%] text-center">الأساسي</div>
          <div className="w-[12%] text-center">تجزئة (سعودي)</div>
          <div className="w-[13%] text-center">تجزئة (يمني)</div>
          <div className="w-[9%] text-left pl-4">إجراءات</div>
        </div>

        {/* قائمة المنتجات */}
        <div className="flex flex-col">
          {products.map((product) => (
            <ProductsRow key={product.id} product={product} onDelete={refetch} />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center flex-row-reverse mt-8">
        <Pagination
          nameApi="/dashboard/products"
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
