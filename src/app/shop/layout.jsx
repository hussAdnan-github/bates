import Navbar from "@/components/layout/Navbar";
import { Cairo } from "next/font/google";
import "../globals.css";
import Footer from "@/components/layout/Footer";
import StoreNavbar from "@/components/layout/StoreNavbar";
import { QueryClientProvider } from "@tanstack/react-query";
import ProvidersQuery from "@/provider/QueryClientProvider";
import { cookies } from "next/headers";

// const cairo = Cairo({
//   subsets: ["arabic"],
//   weight: ["300", "400", "500", "700", "900"],
//   variable: "--font-cairo",
// });

// export const metadata = {
//   title: "BTS - اكسسوارات الجوال",
//   description: "محمد باتيس للتجارة - أفضل واقوى اكسسوارات الجوال في اليمن",
// };

export default async function LocalLayout({ children }) {
  const cookieStore = await cookies();

  const primaryColor = cookieStore.get("primary_color")?.value || "#361d5c";
  const secondaryColor = cookieStore.get("secondary_color")?.value || "#FFC107";

  return (
    <div
      style={{
        "--primary-color": primaryColor,
        "--secondary-color": secondaryColor,
      }}
    >
      <StoreNavbar />
      <main>
        {children}
       </main>
      <Footer />
    </div>
  );
}
