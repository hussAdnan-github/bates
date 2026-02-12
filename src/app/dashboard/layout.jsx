import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <div className="flex-1 flex flex-col mr-64">
        <DashboardNavbar />
        <main className="  bg-white m-8 mt-24">{children}</main>
      </div>
    </div>
  );
}
