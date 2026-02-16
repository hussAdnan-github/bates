import React from "react";
import { Users, ShoppingCart, Box, FileText } from "lucide-react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import Sidebar from "@/components/dashboard/Sidebar";
import RecentUsersList from "@/components/dashboard/RecentUsersList";
import OrdersChart from "@/components/dashboard/OrdersChart";

function page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-right" dir="rtl">
      <main className="  mt-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">نظرة عامة</h1>
          <p className="text-gray-500 mt-1">
            مرحباً بعودتك، admin! هذه هي آخر الإحصائيات.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="إجمالي الفواتير"
            value="1"
            icon={FileText}
            iconBgColor="bg-red-500"
          />

          <StatsCard
            title="إجمالي المنتجات"
            value="146"
            icon={Box}
            iconBgColor="bg-orange-400"
          />

          <StatsCard
            title="إجمالي المستخدمين"
            value="36"
            icon={Users}
            iconBgColor="bg-blue-500"
          />
          <StatsCard
            title="إجمالي الطلبات"
            value="20"
            icon={ShoppingCart}
            iconBgColor="bg-green-500"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  ">
           <div className="lg:col-span-2">
            <OrdersChart />
          </div>

           <div className="lg:col-span-1">
            <RecentUsersList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
