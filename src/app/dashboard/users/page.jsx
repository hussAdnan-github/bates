import React from "react";
import { Plus } from 'lucide-react';
import UserRow from "@/components/dashboard/UserRow";
import Link from "next/link";

function page() {
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
      {/* زر إضافة مستخدم في الأعلى */}
      <div className="flex justify-start mb-6">
        <Link href={'users/new'} className="bg-[#2D1B4D] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all font-bold">
          <Plus size={20} />
          <span>إضافة مستخدم</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
 
        <div className="flex items-center justify-between bg-gray-50/80 px-4 py-4 border-b border-gray-200 text-gray-400 text-sm font-bold">
          <div className="w-[10%] text-right pr-2">إجراءات</div>
          <div className="w-[15%] text-center">مشرف؟</div>
          <div className="w-[10%] text-center">الحالة</div>
          <div className="w-[20%] text-center">نوع التاجر</div>
          <div className="w-[25%] text-center">رقم الهاتف</div>
          <div className="w-[20%] text-left pl-10">المستخدم</div>
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
