// "use client";
// import React from "react";
// import { Building2, Plus, Users } from "lucide-react";
// import UserRow from "@/components/dashboard/data/UserRow";
// import Link from "next/link";
// import SearchInput from "@/components/dashboard/SearchInput";
// import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
// import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
// import ProductsRow from "@/components/dashboard/data/ProductsRow";
// import { useQuery } from "@tanstack/react-query";
// import { getProduts, getProdutsDash } from "@/actions/product";
// import { useSearchParams } from "next/navigation";
// import Pagination from "@/components/dashboard/Pagination";
// const ITEMS_PER_PAGE = 21;

// function page() {
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const handleSearch = (val) => console.log("بحث عن:", val);
//   const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
//   const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["Product", currentPage],
//     queryFn: () => getProdutsDash(currentPage),
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//     placeholderData: (previousData) => previousData,
//   });

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-[#145463] text-lg animate-pulse">
//           جارٍ تحميل البيانات...
//         </p>
//       </div>
//     );

//   if (error)
//     return (
//       <p className="text-center p-10 text-red-500">حدث خطأ: {error.message}</p>
//     );
//   const products = data?.data?.results || [];
//   const totalCount = data?.data?.count || 0;

//   const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

//   const hasNextPage = data?.data?.next;
//   const hasPrevPage = data?.data?.previous;
//   return (
//     <div className="p-6 " dir="rtl">
//       <div className="flex flex-row justify-between mb-6">
//         <div className="flex items-center me-4">
//           <Building2 />
//           <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
//         </div>
//         <SearchInput
//           placeholder="البحث بالاسم او الموديل  ..."
//           onSearch={handleSearch}
//         />
//         <FiltersDropdown
//           placeholder="كل الأقسام"
//           options={[
//             { label: "تاجر", value: "merchant" },
//             { label: "عميل", value: "customer" },
//           ]}
//           onChange={handleRoleChange}
//         />
//         <FiltersDropdown
//           placeholder="كل الحالات"
//           options={[
//             { label: "تاجر", value: "merchant" },
//             { label: "عميل", value: "customer" },
//           ]}
//           onChange={handleStatusChange}
//         />
//       </div>
//       <div className="flex justify-start mb-6">
//         <Link
//           href={"products/new"}
//           className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold"
//         >
//           <Plus size={20} />
//           <span>إضافة منتج</span>
//         </Link>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
//           <div className="w-[40%] text-right pl-10">المنتج</div>
//           <div className="w-[20%] text-center"> القسم</div>
//           <div className="w-[20%] text-center"> السعر</div>
//           <div className="w-[20%] text-center pr-2">إجراءات</div>
//         </div>

//         {/* قائمة المستخدمين */}
//         <div className="flex flex-col">
//           {products.map((product) => (
//             <ProductsRow key={product.id} product={product} onDelte={refetch}/>
//           ))}
//         </div>
//       </div>
//            <div className="flex justify-between items-center flex-row-reverse mt-8">
//         <Pagination
//           nameApi="/dashboard/products"
//           currentPage={currentPage}
//           totalPages={totalPages}
//           hasNextPage={hasNextPage}
//           hasPrevPage={hasPrevPage}
//         />
//         <div>{`عرض 1 - ${ITEMS_PER_PAGE} من إجمالي ${totalCount} نتيجة`}</div>
//       </div>
//     </div>
//   );
// }

// export default page;

"use client";
import React, { Suspense } from "react"; // 1. استيراد Suspense
import { Building2, Plus } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import ProductsRow from "@/components/dashboard/data/ProductsRow";
import { useQuery } from "@tanstack/react-query";
import { getProdutsDash } from "@/actions/product";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/dashboard/Pagination";

const ITEMS_PER_PAGE = 21;

// 2. المكون الذي يحتوي على المنطق
function ProductsList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Product", currentPage],
    queryFn: () => getProdutsDash(currentPage),
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
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Building2 />
          <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
        </div>
        <SearchInput
          placeholder="البحث بالاسم او الموديل  ..."
          onSearch={handleSearch}
        />
        <FiltersDropdown
          placeholder="كل الأقسام"
          options={[
            { label: "تاجر", value: "merchant" },
            { label: "عميل", value: "customer" },
          ]}
          onChange={handleRoleChange}
        />
        <FiltersDropdown
          placeholder="كل الحالات"
          options={[
            { label: "تاجر", value: "merchant" },
            { label: "عميل", value: "customer" },
          ]}
          onChange={handleStatusChange}
        />
      </div>
      <div className="flex justify-start mb-6">
        <Link
          href={"products/new"}
          className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold"
        >
          <Plus size={20} />
          <span>إضافة منتج</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[40%] text-right pl-10">المنتج</div>
          <div className="w-[20%] text-center"> القسم</div>
          <div className="w-[20%] text-center"> السعر</div>
          <div className="w-[20%] text-center pr-2">إجراءات</div>
        </div>

        <div className="flex flex-col">
          {products.map((product) => (
            <ProductsRow key={product.id} product={product} onDelete={refetch}/>
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

// 3. التصدير الأساسي مع Suspense
export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#145463] text-lg">جارٍ التحميل...</p>
      </div>
    }>
      <ProductsList />
    </Suspense>
  );
}