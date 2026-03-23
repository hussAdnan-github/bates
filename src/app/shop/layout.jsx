import Navbar from "@/components/layout/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import { cookies } from "next/headers";

export default function LocalLayout({ children }) {
  return (
    <div>
      <StoreNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
