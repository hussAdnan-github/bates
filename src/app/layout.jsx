import Navbar from "@/components/layout/Navbar";
import { Cairo, Alexandria } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import ProvidersQuery from "@/provider/QueryClientProvider";
import ThemeProvider from "@/provider/ThemeProvider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata = {
  title: "BTS - اكسسوارات الجوال",
  description: "محمد باتيس للتجارة - أفضل واقوى اكسسوارات الجوال في اليمن",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const primaryColor = cookieStore.get("primary_color")?.value || "#00A36C";  
  const secondaryColor = cookieStore.get("secondary_color")?.value || "#00594B";  

  return (
    <html
      lang="ar"
      dir="rtl"
      style={{
        "--primary_color": primaryColor,
        "--secondary_color": secondaryColor,
      }}
    >
      <body
        className={`${alexandria.className} antialiased bg-white text-gray-900`}
      >
        <main>
          <ProvidersQuery>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </ProvidersQuery>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
