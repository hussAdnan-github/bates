import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoreNavbar from "@/components/layout/StoreNavbar";
import CurrencyButton from "@/components/layout/CurrencyButton";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AuthLayout({ children }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const isLoggedIn = !!(
    authToken && 
    authToken.value && 
    authToken.value !== "undefined" && 
    authToken.value !== "null" && 
    authToken.value.trim() !== ""
  );

  return (
    <div className="relative">
      <StoreNavbar 
        currencyButtonDesktop={<CurrencyButton />}
        currencyButtonMobile={<CurrencyButton isMobile={true} />}
        isLoggedIn={isLoggedIn}
        hideTopNav={true}
      />
      <div className="absolute top-6 right-6 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-200/50 text-sm font-black text-[#2D1B50] hover:bg-[#2D1B50] hover:text-[#FFC107] transition-all border border-gray-100"
        >
          <ArrowRight size={18} />
          <span>الرجوع إلى الصفحة الرئيسية</span>
        </Link>
      </div>
      <main className="pb-16 lg:pb-0">{children}</main>
    </div>
  );
}
