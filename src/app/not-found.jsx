"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Smartphone, Home, ShoppingBag, Search, WifiOff, Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans" dir="rtl">
      
      {/* 1. أيقونة الجوال المتحركة مع تأثير الشاشة المكسورة */}
      <div className="relative mb-12">
        <motion.div
          animate={{ 
            rotate: [0, -5, 5, -5, 5, 0],
            y: [0, -10, 0] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="relative z-10"
        >
          <Smartphone size={160} className="text-blue-600 drop-shadow-2xl" strokeWidth={1} />
          
          {/* نص الـ 404 داخل الجوال */}
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <span className="text-4xl font-black text-slate-800 tracking-tighter">404</span>
          </div>
        </motion.div>

        {/* أيقونات عائمة (إكسسوارات مفقودة) */}
        <motion.div 
          animate={{ x: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 -right-8 text-yellow-500"
        >
          <Zap size={32} />
        </motion.div>
        
        <motion.div 
          animate={{ x: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity }}
          className="absolute bottom-4 -left-12 text-red-400"
        >
          <WifiOff size={40} />
        </motion.div>
      </div>

      {/* 2. النصوص التسويقية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
        عذراً، الصفحة التي تبحث عنها غير متوفرة حالياً

        </h1>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          نعتذر عن هذا الإزعاج. قد يكون الرابط قد تغير أو تم نقله، ولكننا دائماً هنا لمساعدتك في العثور على أفضل الإكسسوارات لجوالك .
        </p>
      </motion.div>

      {/* 3. أزرار التنقل (Call to Actions) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link 
          href="/" 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-200"
        >
          <Home size={20} />
          الرئيسية
        </Link>
        
        <Link 
          href="/shop" 
          className="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-700 hover:text-blue-600 px-8 py-3 rounded-2xl font-bold transition-all"
        >
          <ShoppingBag size={20} />
          تسوق 
        </Link>
      </motion.div>

     

 
    </div>
  );
}