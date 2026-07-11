"use client";

import { ArrowRightLeft, Loader2, DollarSign, Banknote, Coins } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { changeCurrency } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function CurrencyDropdown({ isMobile, currentCurrency = "3" }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCurrencyChange = async (typeMoney) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("type_money", typeMoney);

    try {
      const result = await changeCurrency(formData);
      console.log(result);
      if (result.success) {
        toast.success("تم تغيير العملة بنجاح");
        
        // إشعار التطبيق لتحديث الرموز فوراً
        window.dispatchEvent(new Event("currencyChanged"));
        
        // إعادة جلب السلة والطلبات للحصول على الأسعار الجديدة
        queryClient.invalidateQueries();
        
        // تحديث المكونات الخادمة (Server Components) بدون إعادة تحميل كاملة للصفحة
        router.refresh();
      } else {
        toast.error(result.message || "حدث خطأ أثناء تغيير العملة");
      }
    } catch (error) {
      toast.error("تعذر الاتصال بالخادم");
    } finally {
      setIsPending(false);
    }
  };

  const trigger = isMobile ? (
    <div className="flex items-center gap-1.5 bg-[var(--primary_color)] text-white px-3 py-2 rounded-full shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all border border-white/20">
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--secondary_color)]" />
      ) : (
        <ArrowRightLeft className="w-3.5 h-3.5 text-[var(--secondary_color)]" />
      )}
      <span className="text-[10px] font-bold">العملة</span>
    </div>
  ) : (
    <div className="cursor-pointer hover:bg-gray-50 p-2.5 rounded-xl transition-all group relative border border-transparent hover:border-gray-100 hover:shadow-sm">
      {isPending ? (
        <Loader2 className="h-6 w-6 animate-spin text-[var(--primary_color)]" />
      ) : (
        <ArrowRightLeft className="h-6 w-6 text-gray-500 md:text-gray-700 group-hover:text-[var(--primary_color)] transition-colors" />
      )}
    </div>
  );

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 md:w-56 font-cairo bg-white p-1.5 md:p-2 rounded-2xl shadow-xl border border-gray-100/50"
      >
        <DropdownMenuLabel className="text-gray-400 text-[10px] md:text-xs text-center font-bold pb-1.5 md:pb-2 pt-1">
          اختر العملة المفضلة
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-100/80 mb-1.5 md:mb-2" />
        
        <DropdownMenuItem 
          onClick={() => handleCurrencyChange(3)} 
          className={`flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold cursor-pointer rounded-xl p-2 md:p-3 transition-all relative group ${
            currentCurrency === "3" 
              ? "bg-[var(--primary_color)]/10 text-[var(--primary_color)]" 
              : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900"
          }`}
        >
          <div className={`p-1.5 md:p-2 rounded-lg flex items-center justify-center transition-colors ${
            currentCurrency === "3"
              ? "bg-[var(--primary_color)] text-white shadow-md shadow-[var(--primary_color)]/20"
              : "bg-green-50 text-green-600 group-focus:bg-green-100"
          }`}>
            <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
          ريال سعودي
          {currentCurrency === "3" && (
            <div className="absolute left-3 w-2 h-2 rounded-full bg-[var(--primary_color)] animate-in fade-in zoom-in duration-300" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleCurrencyChange(1)} 
          className={`flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold cursor-pointer rounded-xl p-2 md:p-3 mt-1 transition-all relative group ${
            currentCurrency === "1" 
              ? "bg-[var(--primary_color)]/10 text-[var(--primary_color)]" 
              : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:text-gray-900"
          }`}
        >
          <div className={`p-1.5 md:p-2 rounded-lg flex items-center justify-center transition-colors ${
            currentCurrency === "1"
              ? "bg-[var(--primary_color)] text-white shadow-md shadow-[var(--primary_color)]/20"
              : "bg-amber-50 text-amber-600 group-focus:bg-amber-100"
          }`}>
            <Coins className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
          ريال يمني (قديم)
          {currentCurrency === "1" && (
            <div className="absolute left-3 w-2 h-2 rounded-full bg-[var(--primary_color)] animate-in fade-in zoom-in duration-300" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
