"use client";
import React from "react";
import { Bookmark, Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import DepartmentsRow from "@/components/dashboard/data/DepartmentsRow";

function page() {
   const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const departments = [
    {
      id: 1,
      name:  "أكسسوارات وملحقات كمبيوتر ",
      companyRelated: "يوقرين مستلزمات كمبيوتر وشبكات",
      numberUse: "21",
      
    },
    {
      id: 2,
      name:  "أكسسوارات وملحقات كمبيوتر ",
      companyRelated: "يوقرين مستلزمات كمبيوتر وشبكات",
      numberUse: "21",
      
    },
    {
      id: 3,
      name:  "أكسسوارات وملحقات كمبيوتر ",
      companyRelated: "يوقرين مستلزمات كمبيوتر وشبكات",
      numberUse: "21",
      
    },
  ];
  return (
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
      <Bookmark />
          <h1 className="text-3xl font-bold">إدارة الأقسام </h1>
        </div>
        <SearchInput
          placeholder="البحث بأسم القسم  ..."
          onSearch={handleSearch}
        />
         <FiltersDropdown
          placeholder="فلترة بالشركة"
          options={[
            { label: "تاجر", value: "merchant" },
            { label: "عميل", value: "customer" },
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
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[20%] text-right pl-10">اسم القسم</div>
          <div className="w-[25%] text-center">الشركة التابع لها</div>
          <div className="w-[20%] text-center">	عدد المنتجات داخل القسم</div>

          <div className="w-[10%] text-center pr-2">إجراءات</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {departments.map((depart) => (
            <DepartmentsRow key={depart.id} department={depart} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page