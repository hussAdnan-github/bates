// import React from 'react'
// import { Facebook, Instagram, Twitter } from "lucide-react"; // أيقونات التواصل الاجتماعي
// import Link from 'next/link';

// function Footer() {
// // const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-primary py-8 border-t border-white/5" dir="rtl">
//       <div className="container mx-auto px-4 md:px-6">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
//           {/* حقوق النشر - جهة اليمين */}
//           <p className="text-gray-300 text-sm md:text-base text-center md:text-right">
//             © 2024 شركة محمد باتيس للتجارة. جميع الحقوق محفوظة.
//           </p>

//           {/* أيقونات التواصل الاجتماعي - جهة اليسار */}
//           <div className="flex items-center gap-4">
//             <Link 
//               href="#" 
//               className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-secondary transition-colors duration-300 shadow-md"
//               aria-label="Facebook"
//             >
//               <Facebook size={20} />
//             </Link>
            
//             <Link 
//               href="#" 
//               className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-secondary transition-colors duration-300 shadow-md"
//               aria-label="Instagram"
//             >
//               <Instagram size={20} />
//             </Link>

//             <Link 
//               href="#" 
//               className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-secondary transition-colors duration-300 shadow-md"
//               aria-label="Twitter"
//             >
//               <Twitter size={20} />
//             </Link>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2D1B50] text-white pt-16 pb-8 border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* الجزء العلوي: روابط ومعلومات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* العمود 1: عن الشركة */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter">
              BTS <span className="text-[#FFC107]">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              نحن في شركة محمد باتيس للتجارة نسعى لتوفير أفضل مستلزمات الهواتف الذكية والتقنيات الحديثة بجودة عالية وأسعار تنافسية.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div className='flex flex-col  items-center md:items-start'>
            <h4 className="text-lg font-bold mb-6 text-[#FFC107]">روابط سريعة</h4>
            <ul className="space-y-4">
              <FooterLink href="/shop">المتجر الرئيسي</FooterLink>
              <FooterLink href="/shop/products">أحدث المنتجات</FooterLink>
              <FooterLink href="/orders">تتبع الطلبات</FooterLink>
              <FooterLink href="/offers">العروض الخاصة</FooterLink>
            </ul>
          </div>

          {/* العمود 3: الدعم والمساعدة */}
          <div className='flex flex-col  items-center md:items-start'>
            <h4 className="text-lg font-bold mb-6 text-[#FFC107]">الدعم والمساعدة</h4>
            <ul className="space-y-4">
              <FooterLink href="/terms">الشروط والأحكام</FooterLink>
              <FooterLink href="/privacy">سياسة الخصوصية</FooterLink>
              <FooterLink href="/shipping">معلومات الشحن</FooterLink>
              <FooterLink href="/contact">اتصل بنا</FooterLink>
            </ul>
          </div>

          {/* العمود 4: تواصل معنا */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#FFC107]">تواصل معنا</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-[#FFC107]" />
                <span className="text-sm">المملكة العربية السعودية، جدة</span>
              </li>
              <li className="flex items-center gap-3 text-right" dir="ltr">
                <span className="text-sm">+966 500 000 000</span>
                <Phone size={18} className="text-[#FFC107]" />
              </li>
              <li className="flex items-center gap-3 text-right" dir="ltr">
                <span className="text-sm">info@bts-store.com</span>
                <Mail size={18} className="text-[#FFC107]" />
              </li>
            </ul>
          </div>
        </div>

        {/* الجزء السفلي: الحقوق ووسائل الدفع */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm text-center md:text-right">
            © {currentYear} شركة محمد باتيس للتجارة. جميع الحقوق محفوظة.
          </p>
          
          {/* أيقونات وسائل الدفع (Dummy Icons for UI) */}
          <div className="flex items-center gap-3 grayscale opacity-50 hover:opacity-100 transition-opacity">
            <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">VISA</div>
            <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">MASTER</div>
            <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">MADA</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// مكونات فرعية لتحسين نظافة الكود (Sub-components)
function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm flex items-center gap-2 group">
        <span className="w-0 h-[1.5px] bg-[#FFC107] transition-all group-hover:w-2"></span>
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }) {
  return (
    <Link 
      href={href} 
      className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#FFC107] hover:text-[#2D1B50] hover:-translate-y-1 transition-all duration-300"
    >
      {icon}
    </Link>
  );
}

export default Footer;