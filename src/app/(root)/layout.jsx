import Navbar from "@/components/layout/Navbar";
import "../globals.css";
import Footer from "@/components/layout/Footer";

export default function LocalLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
