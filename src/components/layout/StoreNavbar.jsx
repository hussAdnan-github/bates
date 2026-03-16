

// import React from "react";
// import Link from "next/link";
// import { ShoppingCart, LogOut, Package, Home, LayoutGrid, Menu } from "lucide-react"; // أضفنا Menu
// import { Badge } from "@/components/ui/badge";
// import SearchBar from "../store/SearchBar";
// import BasketsDialog from "../store/BasketsDialog";
// import { cookies } from "next/headers";
// import LogoutButton from "../store/LogoutButton";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"; 
// import { Button } from "@/components/ui/button";
// import { getBaskets } from "@/actions/baskets";

//  function StoreNavbar() {
  

//   const navLinks = [
//     { title: "الرئيسية", href: "/shop", icon: <Home className="w-4 h-4" /> },
//     { title: "المنتجات", href: "/shop/products", icon: <LayoutGrid className="w-4 h-4" /> },
//     { title: "الطلبات", href: "/orders", icon: <Package className="w-4 h-4" /> },
//   ];

//   return (
//     <nav
//       className="w-full bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm"
//       dir="rtl"
//     >
//       <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        
//          <div className="flex items-center gap-4 lg:gap-12">
          
//            <div className="lg:hidden">
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="text-[#2D1B50] ">
//                   <Menu className="h-6 w-6" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[300px] bg-white" dir="rtl">
//                 <SheetHeader className="text-right border-b pb-4">
//                   <SheetTitle className="text-2xl font-black text-[#2D1B50]">
//                     BTS <span className="text-[#FFC107] text-sm">STORE</span>
//                   </SheetTitle>
//                 </SheetHeader>
                
//                 <div className="flex flex-col gap-4 mt-8">
//                   {navLinks.map((link) => (
//                     <Link
//                       key={link.title}
//                       href={link.href}
//                       className="flex items-center gap-4 p-3 text-lg font-bold text-gray-600 hover:bg-gray-50 hover:text-[#2D1B50] rounded-xl transition-all"
//                     >
//                       <span className="text-[#FFC107]">{link.icon}</span>
//                       {link.title}
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="absolute bottom-8 left-4 right-4 border-t pt-4">
//                    <p className="text-xs text-gray-400 text-center">جميع الحقوق محفوظة &copy; 2024</p>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>

//            <Link href="/shop" className="text-2xl font-black text-[#2D1B50] tracking-tighter">
//             BTS <span className="text-[#FFC107] text-sm">STORE</span>
//           </Link>

//            <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.title}
//                 href={link.href}
//                 className="flex items-center gap-2 text-[15px] font-bold text-gray-500 hover:text-[#2D1B50] transition-all duration-200 group"
//               >
//                 <span className="text-gray-400 group-hover:text-[#FFC107] transition-colors">
//                   {link.icon}
//                 </span>
//                 {link.title}
//               </Link>
//             ))}
//           </div>
//         </div>

//          <div className="flex items-center gap-2 md:gap-6">
          
//           <div className="hidden sm:block">
//             <SearchBar />
//           </div>

//           <div className="flex items-center border-r pr-2 md:pr-6 gap-2 md:gap-4">
            
//             <BasketsDialog / >
             
          

//             <div className="flex items-center">
//                <LogoutButton />
//             </div>
//           </div>
//         </div>
//       </div>
      
//        <div className="sm:hidden px-4 pb-3">
//          <SearchBar />
//       </div>
//     </nav>
//   );
// }

// export default StoreNavbar;

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Home, LayoutGrid } from "lucide-react";
import SearchBar from "../store/SearchBar";
import BasketsDialog from "../store/BasketsDialog";
import LogoutButton from "../store/LogoutButton";

function StoreNavbar() {
  const pathname = usePathname();

  return (
    <>
      {/* --- الديسكتوب: لم يتغير --- */}
      <nav className="hidden lg:block w-full bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm" dir="rtl">
        <div className="container mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/shop" className="text-2xl font-black text-[#2D1B50] tracking-tighter">
              BTS <span className="text-[#FFC107] text-sm">STORE</span>
            </Link>
            <div className="flex items-center gap-8">
               <Link href="/shop" className="font-bold text-gray-500">الرئيسية</Link>
               <Link href="/shop/products" className="font-bold text-gray-500">المنتجات</Link>
               <Link href="/orders" className="font-bold text-gray-500">الطلبات</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <SearchBar />
            <div className="flex items-center border-r pr-6 gap-4">
              <BasketsDialog />
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* --- الموبايل: الهيدر (لوجو فقط لأن الخروج نزل تحت) --- */}
      <nav className="lg:hidden w-full bg-white border-b sticky top-0 z-50" dir="rtl">
        <div className="px-4 h-14 flex items-center justify-center">
          <Link href="/shop" className="text-xl font-black text-[#2D1B50]">
            BTS <span className="text-[#FFC107] text-xs">STORE</span>
          </Link>
        </div>

        {/* البحث: مفتوح دائماً في الموبايل */}
        <div className="px-4 pb-3">
          <SearchBar /> 
        </div>
      </nav>

      {/* --- الموبايل: البار السفلي --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_15px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-16 px-2 relative" dir="rtl">
          
          {/* الرئيسية */}
          <Link href="/shop" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/shop' ? "text-[#2D1B50]" : "text-gray-400"}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </Link>

          {/* المنتجات */}
          <Link href="/shop/products" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/shop/products' ? "text-[#2D1B50]" : "text-gray-400"}`}>
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-bold">المنتجات</span>
          </Link>

          {/* السلة في المنتصف (تصميم بارز) */}
          <div className="flex-none w-16 h-16 relative -top-5">
            <div className="absolute inset-0 bg-white rounded-full p-1.5 shadow-md">
              <div className="w-full h-full bg-[#2D1B50] rounded-full flex items-center justify-center text-white">
                <BasketsDialog />
              </div>
            </div>
          </div>

          {/* الطلبات */}
          <Link href="/orders" className={`flex flex-col items-center gap-1 flex-1 ${pathname === '/orders' ? "text-[#2D1B50]" : "text-gray-400"}`}>
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-bold">طلباتي</span>
          </Link>

          {/* تسجيل الخروج بدل "المزيد" */}
          <div className="flex-1 flex justify-center">
             <LogoutButton isMobile={true} />
          </div>

        </div>
      </div>

      {/* مساحة تعويضية في الأسفل للموبايل */}
      <div className="h-20 lg:hidden"></div>
    </>
  );
}

export default StoreNavbar;