import Navbar from "@/components/layout/Navbar";
import { Cairo } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import { QueryClientProvider } from "@tanstack/react-query";
import ProvidersQuery from "@/provider/QueryClientProvider";
import { Toaster } from "sonner";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "BTS - اكسسوارات الجوال",
  description: "محمد باتيس للتجارة - أفضل واقوى اكسسوارات الجوال في اليمن",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <main>
          <ProvidersQuery>{children}</ProvidersQuery>
          <Toaster />

        </main>
      </body>
    </html>
  );
}
