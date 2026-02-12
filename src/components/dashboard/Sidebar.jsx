"use client";  
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Building2, Tag, Box, ShoppingCart, FileText, Globe } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, href, active }) => (
  <Link href={href}>
    <div className={`flex items-center gap-3 p-3 mb-1 cursor-pointer transition-all rounded-l-lg
      ${active 
        ? 'bg-purple-50 text-purple-900 border-r-4 border-purple-900' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-purple-700'}`}>
      <Icon size={20} />
      <span className="font-medium">{label}</span>
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
    <aside className="fixed  right-0 top-0 w-64 bg-white h-screen border-l border-gray-200 flex flex-col z-50">
      <div className="p-6 text-2xl font-bold text-purple-900 border-b mb-4">
        BTS Dashboard
      </div>
      
      <nav className="flex-1 pr-4">  
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.href} 
            {...item}   
            active={pathname === item.href} 
          />
        ))}
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center justify-center gap-2 w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-bold">
          <Globe size={18} />
          <span>العودة للموقع</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;