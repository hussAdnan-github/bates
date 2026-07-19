

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2D1B50] text-white pt-16 pb-8 border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-4 md:px-8">

        {/* الجزء العلوي: روابط ومعلومات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 text-center md:text-right">

          {/* العمود 1: عن المؤسسة */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <Link href="/" className="text-3xl font-black tracking-tighter">
              BTS <span className="text-[#FFC107]">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              نحن في مؤسسة محمد باتيس للتجارة نسعى لتوفير أفضل مستلزمات الهواتف الذكية والتقنيات الحديثة بجودة عالية وأسعار تنافسية.
            </p>
            <div className="pt-2 space-y-6">
              {/* Ugreen */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-xs font-bold text-gray-300 mb-3">تابع وكالة Ugreen:</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                  <SocialLink href="https://www.facebook.com/ugreenye?mibextid=ZbWKwL" title="Facebook Ugreen" icon={<Facebook size={18} />} />
                  <SocialLink href="https://www.instagram.com/ugreenye?igsh=c3Rzcnhkdmg1Y3h0" title="Instagram Ugreen" icon={<Instagram size={18} />} />
                  <SocialLink href="https://www.tiktok.com/@ugreenye" title="TikTok Ugreen" icon={<TikTokIcon size={18} />} />
                  <SocialLink href="https://whatsapp.com/channel/0029VbBVwWxGzzKX6egFeC3Y" title="WhatsApp Ugreen" icon={<WhatsAppIcon size={18} />} />
                </div>
              </div>

              {/* Vidvie */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-xs font-bold text-gray-300 mb-3">تابع وكالة Vidvie:</h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
                  <SocialLink href="https://www.facebook.com/vidvieyemen?mibextid=ZbWKwL" title="Facebook Vidvie" icon={<Facebook size={18} />} />
                  <SocialLink href="https://www.instagram.com/vidvieyemen?igsh=MTF6MDUxa2FkMmZzdg==" title="Instagram Vidvie" icon={<Instagram size={18} />} />
                  <SocialLink href="https://www.tiktok.com/@vidvie.ye?_r=1&_t=ZS-97wcxFyS4To" title="TikTok Vidvie" icon={<TikTokIcon size={18} />} />
                  <SocialLink href="https://whatsapp.com/channel/0029Vb6CUSi7j6fzJEEP433S" title="WhatsApp Vidvie" icon={<WhatsAppIcon size={18} />} />
                </div>
              </div>
            </div>
          </div>

          {/* العمود 2: فروعنا */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-6 text-[#FFC107]">فروعنا ومكاتبنا</h4>
            <ul className="space-y-5 text-gray-400 w-full">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin size={20} className="text-[#FFC107] md:mt-1 shrink-0" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm mb-1">المركز الرئيسي - صنعاء</span>
                  <span className="text-sm leading-relaxed">شارع القصر - خلف البنك العربي</span>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin size={20} className="text-[#FFC107] md:mt-1 shrink-0" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm mb-1">مكتب عدن</span>
                  <span className="text-sm leading-relaxed">المنصورة - شارع القصر - جوار المتحدون فون الدور الثالث</span>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin size={20} className="text-[#FFC107] md:mt-1 shrink-0" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm mb-1">مكتب المكلا</span>
                  <span className="text-sm leading-relaxed">الغار الأحمر - مقابل المؤسسة الاقتصادية</span>
                </div>
              </li>
            </ul>
          </div>

          {/* العمود 3: خدمة العملاء */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold mb-6 text-[#FFC107]">خدمة العملاء</h4>
            <ul className="space-y-6 text-gray-400 w-full">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors text-center md:text-right">
                <div className="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#FFC107]" />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm mb-1">خدمة عملاء Ugreen</span>
                  <a href="tel:771125554" className="text-lg font-black text-[#FFC107] tracking-wider" dir="ltr">771 125 554</a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors text-center md:text-right">
                <div className="w-10 h-10 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#FFC107]" />
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white font-bold text-sm mb-1">خدمة عملاء Vidvie</span>
                  <a href="tel:784311180" className="text-lg font-black text-[#FFC107] tracking-wider" dir="ltr">784 311 180</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* الجزء السفلي: الحقوق ووسائل الدفع */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-sm text-center md:text-right">
            © {2025} مؤسسة محمد باتيس للتجارة. جميع الحقوق محفوظة.
          </p>

          {/* أيقونات وسائل الدفع (Dummy Icons for UI) */}
          <div className="flex items-center gap-3 grayscale opacity-50 hover:opacity-100 transition-opacity">
            {/* <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">VISA</div>
            <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">MASTER</div>
            <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-black">MADA</div> */}
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

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.9 4.54-2.5 6.09-1.99 1.95-4.8 2.65-7.46 2.05-2.52-.57-4.52-2.58-5.26-5.08-.73-2.47-.36-5.26 1.18-7.38 1.4-1.92 3.65-3.05 5.99-3.21 1.09-.07 2.18-.04 3.27-.04v4.06c-1.32-.12-2.73-.01-3.87.68-1.07.65-1.74 1.83-1.8 3.07-.06 1.25.5 2.53 1.42 3.29.98.81 2.37 1.08 3.59.81 1.4-.31 2.47-1.45 2.79-2.85.15-.65.18-1.33.18-2.01V.02z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default Footer;