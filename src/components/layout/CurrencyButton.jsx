import { cookies } from "next/headers";
import CurrencyDropdown from "./CurrencyDropdown";

export default async function CurrencyButton({ isMobile }) {

  const cookieStore = await cookies();
  const taype_custom = cookieStore.get("taype_custom")?.value;

  if (taype_custom !== "3") return null;
   
  return <CurrencyDropdown isMobile={isMobile} />;
}
