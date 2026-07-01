"use client";

import { WifiOff } from "lucide-react";
import Link from "next/link";

export default function OfflinePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900"
      dir="rtl"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center mx-4">
        <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-[#2D1B50] mb-4">
          أنت غير متصل بالإنترنت
        </h1>
        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
          عذراً، يبدو أنك فقدت الاتصال بالإنترنت. يرجى التحقق من اتصال شبكة Wi-Fi
          أو بيانات الجوال ثم المحاولة مرة أخرى.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-lg px-8 py-3.5 rounded-xl shadow-lg shadow-yellow-200/50 transition-all hover:shadow-yellow-200/80 active:scale-95 mb-3"
        >
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="block w-full text-center py-3 font-semibold text-[#2D1B50] border-2 border-transparent hover:border-gray-100 rounded-xl transition-all"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
