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

export default function CurrencyDropdown({ isMobile }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCurrencyChange = async (typeMoney) => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("type_money", typeMoney);

    try {
      const result = await changeCurrency(formData);
      if (result.success) {
        toast.success("تم تغيير العملة بنجاح");
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
    <div className="flex flex-col items-center gap-1 flex-1 text-gray-400 cursor-pointer w-full transition-all hover:text-[var(--primary_color)]">
      {isPending ? (
        <Loader2 className="w-6 h-6 animate-spin text-[var(--primary_color)]" />
      ) : (
        <ArrowRightLeft className="w-6 h-6" />
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
        className="w-56 font-cairo bg-white p-2 rounded-2xl shadow-xl border border-gray-100/50"
      >
        <DropdownMenuLabel className="text-gray-400 text-xs text-center font-bold pb-2 pt-1">
          اختر العملة المفضلة
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-100/80 mb-2" />
        
        <DropdownMenuItem 
          onClick={() => handleCurrencyChange(1)} 
          className="flex items-center gap-3 font-bold cursor-pointer rounded-xl p-3 focus:bg-[var(--primary_color)] focus:text-white transition-all text-gray-700 group"
        >
          <div className="bg-green-50 text-green-600 p-2 rounded-lg flex items-center justify-center group-focus:bg-white/20 group-focus:text-white transition-colors">
            <DollarSign className="w-4 h-4" />
          </div>
          ريال سعودي
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleCurrencyChange(2)} 
          className="flex items-center gap-3 font-bold cursor-pointer rounded-xl p-3 focus:bg-[var(--primary_color)] focus:text-white transition-all text-gray-700 mt-1 group"
        >
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg flex items-center justify-center group-focus:bg-white/20 group-focus:text-white transition-colors">
            <Banknote className="w-4 h-4" />
          </div>
          ريال يمني (جديد)
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleCurrencyChange(3)} 
          className="flex items-center gap-3 font-bold cursor-pointer rounded-xl p-3 focus:bg-[var(--primary_color)] focus:text-white transition-all text-gray-700 mt-1 group"
        >
          <div className="bg-amber-50 text-amber-600 p-2 rounded-lg flex items-center justify-center group-focus:bg-white/20 group-focus:text-white transition-colors">
            <Coins className="w-4 h-4" />
          </div>
          ريال يمني (قديم)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
