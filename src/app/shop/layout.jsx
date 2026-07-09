import Navbar from "@/components/layout/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import CurrencyButton from "@/components/layout/CurrencyButton";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function LocalLayout({ children }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");
  const isLoggedIn = !!(
    authToken && 
    authToken.value && 
    authToken.value !== "undefined" && 
    authToken.value !== "null" && 
    authToken.value.trim() !== ""
  );
  console.log("=== LAYOUT AUTH CHECK ===", authToken, isLoggedIn);

  return (
    <div>
      <StoreNavbar 
        currencyButtonDesktop={<CurrencyButton />}
        currencyButtonMobile={<CurrencyButton isMobile={true} />}
        isLoggedIn={isLoggedIn}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
