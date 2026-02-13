"use client";
import React from "react";
import { Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";

function page() {
  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const companies = [
    {
      id: 1,
      name: "فيدفي يم",
      email: "https://vidvie.com/",
      numberUse: "21",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 2,
      name: "يوقرين مستلزمات جوالات",
      email: "https://vidvie.com/",
      numberUse: "21",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 3,
      name: "يوقرين مستلزمات كمبيوتر وشبكات",
      email: "https://vidvie.com/",
      numberUse: "21",
      avatar: "/path-to-avatar.png",
    },
  ];
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
          {companies.map((company) => (
            <CompaniesRow key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
