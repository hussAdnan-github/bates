import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AuthLayout({ children }) {
  return (
    <div className="relative">
      <div className="absolute top-6 right-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-200/50 text-sm font-black text-[#2D1B50] hover:bg-[#2D1B50] hover:text-[#FFC107] transition-all border border-gray-100"
        >
          <ArrowRight size={18} />
          <span>الرجوع إلى الصفحة الرئيسية</span>
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
}
