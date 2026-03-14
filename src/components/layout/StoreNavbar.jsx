// import React from "react";
// import Link from "next/link";
// import { Search, ShoppingCart, LogOut, Menu } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import SearchBar from "../store/SearchBar";

// import BasketsDialog from "../store/BasketsDialog";
// import { cookies } from "next/headers";
// import LogoutButton from "../store/LogoutButton";

// async function StoreNavbar() {
//   const cookieStore = await cookies();
//   const basketcountNumber = cookieStore.get("basket_count")?.value || 0;

//   const navLinks = [
//     { title: "الرئيسية", href: "/shop" },
//     { title: "المنتجات", href: "/shop/products" },
//     { title: "الطلبات", href: "/orders" },
//   ];

//   return (
//     <nav
//       className="w-full bg-white border-b sticky top-0 z-50 shadow-sm"
//       dir="rtl"
//     >
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="hidden md:flex items-center gap-10">
//           {navLinks.map((link) => (
//             <Link
//               key={link.title}
//               href={link.href}
//               // تم التغيير من hover:text-[#2D1B50] إلى hover:text-primary
//               className="text-lg font-bold text-gray-700 hover:text-primary transition-colors"
//             >
//               {link.title}
//             </Link>
//           ))}
//         </div>

//         {/* ... باقي الكود (الموبايل) ... */}

//         <div className="flex items-center gap-2 md:gap-5">
//           <SearchBar />

//           <BasketsDialog>
//             <div className="relative me-8 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors group">
//               {/* تم التغيير من group-hover:text-[#F18721] إلى group-hover:text-primary */}
//               <ShoppingCart className="h-7 w-7 text-gray-700 group-hover:text-secondary transition-colors" />

//               <Badge className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center p-0 text-[10px] rounded-full border-2 border-white">
//                 {basketcountNumber}
//               </Badge>
//             </div>
//           </BasketsDialog>
//           <div>
//             <LogoutButton />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default StoreNavbar;



import React from "react";
import Link from "next/link";
import { ShoppingCart, LogOut, Package, Home, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchBar from "../store/SearchBar";
import BasketsDialog from "../store/BasketsDialog";
import { cookies } from "next/headers";
import LogoutButton from "../store/LogoutButton";

async function StoreNavbar() {
  const cookieStore = await cookies();
  const basketcountNumber = cookieStore.get("basket_count")?.value || 0;

  const navLinks = [
    { title: "الرئيسية", href: "/shop", icon: <Home className="w-4 h-4" /> },
    { title: "المنتجات", href: "/shop/products", icon: <LayoutGrid className="w-4 h-4" /> },
    { title: "الطلبات", href: "/orders", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm"
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
        {/* جهة اليمين: اللوجو والروابط */}
        <div className="flex items-center gap-12">
          <Link href="/shop" className="text-2xl font-black text-[#2D1B50] tracking-tighter">
            BTS <span className="text-[#FFC107] text-sm">STORE</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="flex items-center gap-2 text-[15px] font-bold text-gray-500 hover:text-[#2D1B50] transition-all duration-200 group"
              >
                <span className="text-gray-400 group-hover:text-[#FFC107] transition-colors">
                  {link.icon}
                </span>
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        {/* جهة اليسار: الأدوات (بحث، سلة، خروج) */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* شريط البحث */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          <div className="flex items-center border-r pr-4 md:pr-6 gap-2 md:gap-4">
            
            {/* سلة التسوق */}
            <BasketsDialog>
              <div className="relative p-2.5 cursor-pointer hover:bg-gray-50 rounded-xl transition-all group">
                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-[#2D1B50] transition-colors" />
                {Number(basketcountNumber) > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-[#2D1B50] text-[#FFC107] w-5 h-5 flex items-center justify-center p-0 text-[11px] font-bold rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {basketcountNumber}
                  </Badge>
                )}
              </div>
            </BasketsDialog>

            {/* زر تسجيل الخروج */}
            <div className="flex items-center">
               <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      
      {/* شريط الموبايل السفلي للبحث (اختياري) */}
      <div className="sm:hidden px-4 pb-3">
         <SearchBar />
      </div>
    </nav>
  );
}

export default StoreNavbar;