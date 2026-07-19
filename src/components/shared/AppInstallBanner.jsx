"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppInstallBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ملاحظة: قمت بإيقاف هذا الشرط مؤقتاً لتتمكن من رؤية الإشعار واختباره.
    // في النسخة النهائية، يجب إعادة تفعيل هذا الشرط حتى لا يزعج المستخدم بظهوره في كل مرة يزور فيها الموقع.
    // if (localStorage.getItem("appInstallShown")) {
    //   return;
    // }

    // التحقق مما إذا كان الموقع يعمل كتطبيق PWA
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    
    // التحقق مما إذا كان الموقع مفتوحاً داخل WebView (مثل تطبيق الـ APK)
    const isWebView = /(wv|WebView|Android.*Version\/[0-9]\.[0-9]|Line|Instagram|FBAN|FBAV)/i.test(navigator.userAgent);

    // التحقق من عرض الشاشة (موبايل فقط)
    const isMobile = window.innerWidth <= 768;

    // إظهار الإشعار فقط إذا لم يكن داخل التطبيق وكان الجهاز موبايل
    if (!isStandalone && !isWebView && isMobile) {
      // تأخير بسيط لتحسين تجربة المستخدم
      const timer = setTimeout(() => {
        setIsVisible(true);
        // تم إيقاف الحفظ مؤقتاً للاختبار
        // localStorage.setItem("appInstallShown", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // إخفاء الإشعار تلقائياً بعد فترة من الزمن
  useEffect(() => {
    let autoHideTimer;
    if (isVisible) {
      autoHideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 15000); // إخفاء بعد 15 ثانية من ظهوره
    }
    return () => clearTimeout(autoHideTimer);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleInstall = () => {
    // قم بتغيير هذا الرابط إلى رابط تحميل الـ APK الحقيقي الخاص بك لاحقاً
    window.location.href = "/app.apk"; 
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="install-banner"
          initial={{ y: 300, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 300, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 md:hidden z-[100]"
          dir="rtl"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-4 md:p-5 flex items-start gap-3 md:gap-4 relative overflow-hidden group">
            {/* لمسة جمالية للخلفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC107]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <button
              onClick={handleDismiss}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-all z-50 active:scale-95"
              aria-label="إغلاق"
            >
              <X size={16} />
            </button>

            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#2D1B50] to-[#4a3663] flex items-center justify-center shrink-0 shadow-lg shadow-[#2D1B50]/30 relative z-10 mt-1 md:mt-0">
              <Smartphone className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>

            <div className="flex-1 relative z-10 pt-1">
              <h4 className="font-black text-gray-900 text-sm md:text-lg mb-1 tracking-tight">حمّل تطبيقنا الآن!</h4>
              <p className="text-[11px] md:text-sm text-gray-500 mb-3 md:mb-4 leading-relaxed font-medium">
                تجربة تسوق أسرع، وأفضل. أحصل على افضل الأكترونيات و العرض ظمن مؤؤسسة محمد باتيس.
              </p>
              
              <button
                onClick={handleInstall}
                className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold py-2 md:py-3 px-4 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 group-hover:shadow-lg hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                تنزيل التطبيق مجاناً
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
