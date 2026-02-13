"use client";
import React from "react";
import { Plus, Users } from "lucide-react";
import UserRow from "@/components/dashboard/data/UserRow";
import Link from "next/link";
import SearchInput from "@/components/dashboard/SearchInput";
import FiltersDropdown from "@/components/dashboard/FiltersDropdown";

function page() {
  const handleSearch = (val) => console.log("بحث عن:", val);
  const handleRoleChange = (val) => console.log("تغيير النوع إلى:", val);
  const handleStatusChange = (val) => console.log("تغيير الحالة إلى:", val);

  const users = [
    {
      id: 1,
      name: "ITECH-Hamdi-Albasha",
      phone: "press 777758532 ,777758532",
      merchantType: "تاجر جملة الجملة",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 2,
      name: "Al-kumadi",
      phone: "press 775416016 ,775416016",
      merchantType: "تاجر جملة الجملة",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 3,
      name: "Magicalstore",
      phone: "press 773126710 ,773126710",
      merchantType: "تاجر جملة الجملة",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 4,
      name: "Altaiseratphon-Tareem",
      phone: "press 774646708 ,774646708",
      merchantType: "تاجر جملة الجملة",
      avatar: "/path-to-avatar.png",
    },
    {
      id: 5,
      name: "UNITED",
      phone: "772110241",
      merchantType: "تاجر جملة الجملة",
      avatar: "/path-to-avatar.png",
    },
  ];
  return (
    <div className="p-6 " dir="rtl">
       <div className="flex flex-row justify-between mb-6">
        <div className="flex items-center me-4">
          <Users />
          <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
        </div>
        <SearchInput
          placeholder="البحث لاأسم او البريد..."
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
        <FiltersDropdown
          placeholder="كل الحالات"
          options={[
            { label: "نشط", value: "merchant" },
            { label: "غير نشط", value: "customer" },
          ]}
          onChange={handleStatusChange}
        />
      </div>
      <div className="flex justify-start mb-6">
        <Link
          href={"users/new"}
          className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold"
        >
          <Plus size={20} />
          <span>إضافة مستخدم</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[20%] text-right pl-10">المستخدم</div>
          <div className="w-[25%] text-center">رقم الهاتف</div>
          <div className="w-[20%] text-center">نوع التاجر</div>
          <div className="w-[10%] text-center">الحالة</div>
          <div className="w-[10%] text-center pr-2">إجراءات</div>
          <div className="w-[15%] text-center">مشرف؟</div>
        </div>

        {/* قائمة المستخدمين */}
        <div className="flex flex-col">
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
