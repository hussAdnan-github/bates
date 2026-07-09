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
    <>
      <StoreNavbar 
        currencyButtonDesktop={<CurrencyButton />}
        currencyButtonMobile={<CurrencyButton isMobile={true} />}
        isLoggedIn={isLoggedIn}
      />
      <main>{children}</main>
    </>
  );
}
