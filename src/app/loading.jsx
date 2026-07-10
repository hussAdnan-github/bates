"use client";

import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white" dir="rtl">


      <div className="relative mb-8">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-blue-100 rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: [0, 0.1, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-blue-50 rounded-full"
        />

        {/* أيقونة الجوال الرئيسية */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 bg-white p-4 rounded-2xl shadow-sm"
        >
          <Smartphone size={48} className="text-blue-600" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* نصوص التحميل الاحترافية */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-slate-800 mb-2"
        >
          جاري تحضير المتجر
        </motion.h2>

        <div className="flex items-center justify-center gap-1">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            className="text-sm text-slate-400"
          >
            نبحث لك عن أفضل الإكسسوارات
          </motion.span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-blue-600 rounded-full"
              />
            ))}
          </span>
        </div>
      </div>

      {/* خط التقدم السفلي (Progress Bar) ناعم جداً */}
      <div className="mt-12 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-blue-600 to-transparent"
        />
      </div>

      {/* شعار المتجر الصغير في الأسفل (اختياري) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10"
      >
        <p className="text-xs font-medium text-slate-400 tracking-[0.2em] uppercase">
          Quality & Protection
        </p>
      </motion.div>
    </div>
  );
}