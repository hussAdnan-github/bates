import { cookies } from "next/headers";
import CurrencyDropdown from "./CurrencyDropdown";

export default async function CurrencyButton({ isMobile }) {

  const cookieStore = await cookies();
  const taype_custom = cookieStore.get("taype_custom")?.value;
  const currentCurrency = cookieStore.get("type_money")?.value || "3";

  if (taype_custom !== "3") return null;

  return <CurrencyDropdown isMobile={isMobile} currentCurrency={currentCurrency} />;
}
