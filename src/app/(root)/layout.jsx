import Navbar from "@/components/layout/Navbar";
import { Cairo } from "next/font/google"; // استبدال Geist بخط عربي احترافي
import '../globals.css'
import Footer from "@/components/layout/Footer";

// إعداد الخط العربي
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
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />

      </body>
    </html>
  );
}