// "use client";  
// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { LayoutDashboard, Users, Building2, Tag, Box, ShoppingCart, FileText, Globe } from 'lucide-react';

// const SidebarItem = ({ icon: Icon, label, href, active }) => (
//   <Link href={href}>
//     <div className={`flex items-center gap-3 p-3 mb-1 cursor-pointer transition-all rounded-l-lg
//       ${active 
//         ? 'bg-purple-50 text-purple-900 border-r-4 border-purple-900' 
//         : 'text-gray-500 hover:bg-gray-50 hover:text-purple-700'}`}>
//       <Icon size={20} />
//       <span className="font-medium">{label}</span>
//     </div>
//   </Link>
// );

// const Sidebar = () => {
//   const pathname = usePathname();

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'نظرة عامة', href: '/dashboard' },
//     { icon: Users, label: 'المستخدمين', href: '/dashboard/users' },
//     { icon: Building2, label: 'الشركات', href: '/dashboard/companies' },
//     { icon: Tag, label: 'الأقسام', href: '/dashboard/departments' },
//     { icon: Box, label: 'المنتجات', href: '/dashboard/products' },
//     { icon: ShoppingCart, label: 'الطلبات', href: '/dashboard/baskets' },
//     { icon: FileText, label: 'الفواتير', href: '/dashboard/bills' },
//   ];

//   return (
//     <aside className="fixed  right-0 top-0 w-64 bg-white h-screen border-l border-gray-200 flex flex-col z-50">
//       <div className="p-6 text-2xl font-bold text-purple-900 border-b mb-4">
//        <Link href={'/dashboard'}>
//         BTS Dashboard
//        </Link>
//       </div>
      
//       <nav className="flex-1 pr-4">  
//         {menuItems.map((item) => (
//           <SidebarItem 
//             key={item.href} 
//             {...item}   
//             active={pathname === item.href} 
//           />
//         ))}
//       </nav>

//       <div className="p-4 border-t">
//         <button className="flex items-center justify-center gap-2 w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-bold">
//           <Globe size={18} />
//           <span>العودة للموقع</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Users, Building2, Tag, 
  Box, ShoppingCart, FileText, Globe, ChevronLeft 
} from 'lucide-react';
import { motion } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, href, active }) => (
  <Link href={href} className="block group">
    <div className={`
      relative flex items-center gap-3 px-4 py-3.5 mx-3 mb-2 cursor-pointer transition-all duration-300 rounded-2xl
      ${active 
        ? 'bg-[#2D1B50] text-white shadow-lg shadow-indigo-100' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-[#2D1B50]'}
    `}>
      {/* أيقونة العنصر */}
      <Icon size={20} className={`${active ? 'text-[#FFC107]' : 'text-gray-400 group-hover:text-[#2D1B50]'} transition-colors`} />
      
      <span className={`font-bold text-sm ${active ? 'opacity-100' : 'opacity-80'}`}>
        {label}
      </span>

      {/* مؤشر صغير للحالة النشطة */}
      {active && (
        <motion.div 
          layoutId="activeSide"
          className="absolute left-3 w-1.5 h-1.5 rounded-full bg-[#FFC107]"
        />
      )}
    </div>
  </Link>
);

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: 'نظرة عامة', href: '/dashboard' },
    { icon: Users, label: 'المستخدمين', href: '/dashboard/users' },
    { icon: Building2, label: 'الشركات', href: '/dashboard/companies' },
    { icon: Tag, label: 'الأقسام', href: '/dashboard/departments' },
    { icon: Box, label: 'المنتجات', href: '/dashboard/products' },
    { icon: ShoppingCart, label: 'الطلبات', href: '/dashboard/baskets' },
    { icon: FileText, label: 'الفواتير', href: '/dashboard/bills' },
  ];

  return (
    <aside className="fixed right-0 top-0 w-72 bg-white h-screen border-l border-gray-100 flex flex-col z-50 shadow-sm" dir="rtl">
      
      {/* اللوجو بتصميم احترافي */}
      <div className="p-8 mb-4">
       <Link href={'/dashboard'} className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-[#2D1B50] rounded-xl flex items-center justify-center text-[#FFC107] font-black text-xl shadow-lg transition-transform group-hover:rotate-12">
          B
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-[#2D1B50] tracking-tighter">BTS</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest -mt-1">Dashboard</span>
        </div>
       </Link>
      </div>
      
      {/* القائمة البرمجية */}
      <nav className="flex-1 overflow-y-auto px-2">
        <p className="px-6 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">القائمة الرئيسية</p>
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.href} 
            {...item}   
            active={pathname === item.href} 
          />
        ))}
      </nav>

      {/* الجزء السفلي: العودة للموقع */}
      <div className="p-6 border-t border-gray-50">
        <Link href="/shop" className="group">
          <div className="flex items-center justify-between gap-2 w-full p-4 bg-gray-50 text-[#2D1B50] rounded-2xl hover:bg-[#FFC107] transition-all duration-300 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-gray-400 group-hover:text-[#2D1B50]" />
              <span className="font-black text-sm">عرض المتجر</span>
            </div>
            <ChevronLeft size={16} className="text-gray-300 group-hover:text-[#2D1B50] transition-transform group-hover:-translate-x-1" />
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;