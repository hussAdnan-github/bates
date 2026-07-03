import Navbar from "@/components/layout/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import CurrencyButton from "@/components/layout/CurrencyButton";

export default function LocalLayout({ children }) {
  return (
    <div>
      <StoreNavbar 
        currencyButtonDesktop={<CurrencyButton />}
        currencyButtonMobile={<CurrencyButton isMobile={true} />}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
