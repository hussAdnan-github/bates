import Navbar from "@/components/layout/Navbar";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import ProvidersQuery from "@/provider/QueryClientProvider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata = {
  title: "BTS - اكسسوارات الجوال",
  description: "محمد باتيس للتجارة - أفضل واقوى اكسسوارات الجوال في اليمن",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const primaryColor = cookieStore.get("primary_color")?.value || "#2D1B4D";
  const secondaryColor = cookieStore.get("secondary_color")?.value || "#FFC107";
  console.log(primaryColor);
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          "--primary_color": primaryColor,
          "--secondary_color": secondaryColor,
        }}
        className={`${ibmPlexSansArabic.variable} ${cairo.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <main>
          <ProvidersQuery>{children}</ProvidersQuery>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
