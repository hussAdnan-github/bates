"use client";
import React from "react";
import { Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import ProductsRow from "@/components/dashboard/data/ProductsRow";
import BasketsRow from "@/components/dashboard/data/BillsRowRow";
import BillsRowRow from "@/components/dashboard/data/BillsRowRow";

function page() {
  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const bills = [
    {
      id: 1,
      number: 20,
      customer: "test",
      department: "كيبلات",
      price: "10.00ر.س",
      type: "كيبلات",
      date: "29 Oct, 2025",
    },
    {
      id: 2,
      number: 20,
      customer: "test",
      department: "كيبلات",
      price: "10.00ر.س",
      type: "كيبلات",
      date: "29 Oct, 2025",
    },
    {
      id: 3,
      number: 20,
      customer: "test",
      department: "كيبلات",
      price: "10.00ر.س",
      type: "كيبلات",
      date: "29 Oct, 2025",
    },
  ];
  return (
    <div className="p-6 " dir="rtl">
      <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Building2 />
          <h1 className="text-3xl font-bold">إدارة الفواتير</h1>
        </div>
        <SearchInput
          placeholder="البحث برقم الفاتورة او العميل  ..."
          onSearch={handleSearch}
        />
        <FiltersDropdown
          placeholder="كل الأنواع"
          options={[
            { label: "تاجر", value: "merchant" },
            { label: "عميل", value: "customer" },
          ]}
          onChange={handleRoleChange}
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

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {bills.map((bill) => (
            <BillsRowRow key={bill.id} bills={bill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
