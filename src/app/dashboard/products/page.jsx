"use client";
import React from "react";
import { Building2, Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import CompaniesRow from "@/components/dashboard/data/CompaniesRow";
import ProductsRow from "@/components/dashboard/data/ProductsRow";

function page() {
  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const products = [
    {
      id: 1,
      name: "كابل قماش شحن سريع من USB-C إلى Lightning PD، بقوة 3 أمبير كحد أقصى، أسود، طوله 1 متر",
      department: "كيبلات",
      price: "10.00ر.س",
     
    },
    {
      id: 2,
      name: "كابل قماش شحن سريع من USB-C إلى Lightning PD، بقوة 3 أمبير كحد أقصى، أسود، طوله 1 متر",
      department: "كيبلات",
      price: "10.00ر.س",
     
    },
    {
      id: 3,
      name: "كابل قماش شحن سريع من USB-C إلى Lightning PD، بقوة 3 أمبير كحد أقصى، أسود، طوله 1 متر",
      department: "كيبلات",
      price: "10.00ر.س",
     
    },
  ];
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
          <div className="w-[20%] text-center">  القسم</div>
          <div className="w-[20%] text-center"> السعر</div>
          <div className="w-[20%] text-center pr-2">إجراءات</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {products.map((product) => (
            <ProductsRow key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
