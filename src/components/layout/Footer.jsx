import React from 'react'
import { Facebook, Instagram, Twitter } from "lucide-react"; // أيقونات التواصل الاجتماعي
import Link from 'next/link';

function Footer() {
// const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#2D2D2D] py-8 border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* حقوق النشر - جهة اليمين */}
          <p className="text-gray-300 text-sm md:text-base text-center md:text-right">
            © 2024 شركة محمد باتيس للتجارة. جميع الحقوق محفوظة.
          </p>

          {/* أيقونات التواصل الاجتماعي - جهة اليسار */}
          <div className="flex items-center gap-4">
            <Link 
              href="#" 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-[#FFC107] transition-colors duration-300 shadow-md"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            
            <Link 
              href="#" 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-[#FFC107] transition-colors duration-300 shadow-md"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>

            <Link 
              href="#" 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2D2D] hover:bg-[#FFC107] transition-colors duration-300 shadow-md"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer