 
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";

const OrderDetailsDialog = ({ children }) => {


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* تم زيادة العرض هنا باستخدام max-w-6xl و w-[95vw] */}
      <DialogContent
        className="
    w-[65vw]
    !max-w-none
    max-h-[90vh]
    overflow-y-auto
  "
        dir="ltr"
      >
        {/* قسم معلومات الطلب (أعلى يسار الصورة) */}
        <div className="flex flex-col items-end gap-2 text-right mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">21:23 2026-02-05</span>
            <span className="text-gray-500">:تاريخ الطلب</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#F18721] text-white px-4 py-1 rounded-full text-xs font-bold">
              جاري معالجة طلبك
            </span>
            <span className="text-gray-500">:حالة الطلب</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <span className="font-bold">الدفع عند الاستلام</span>
            <span className="text-gray-500">:طريقة الدفع</span>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 text-right mb-6">
            محتويات الطلب
          </DialogTitle>
        </DialogHeader>

        {/* جدول محتويات الطلب */}
        <div className="border rounded-xl overflow-hidden mb-6">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 text-sm font-bold text-gray-500 text-center">
            <div className="col-span-6 text-right">المنتج</div>
            <div className="col-span-2">السعر</div>
            <div className="col-span-2">الكمية</div>
            <div className="col-span-2">الإجمالي الفرعي</div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-center p-4 bg-white text-center border-t">
            <div className="col-span-6 flex items-center justify-end gap-4 text-right">
              <span className="font-bold text-gray-800 text-sm">
                خازن فيدفي قوة 10 ألف ملي أمبير شحن سريع
              </span>
              <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white shrink-0">
                <Image
                  src="/p-powerbank.jpg"
                  alt="product"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="col-span-2 font-bold text-gray-700">29.50 ر.س</div>
            <div className="col-span-2 font-bold text-gray-700">1</div>
            <div className="col-span-2 font-bold text-gray-700">29.50 ر.س</div>
          </div>
        </div>

        {/* صندوق المجموع الإجمالي */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-[#F18721]">
              29.50 <span className="text-lg">ر.س</span>
            </div>
            <div className="text-2xl font-black text-gray-800">
              المجموع الإجمالي
            </div>
          </div>
        </div>

        {/* زر العودة */}
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button className="bg-[#64748b] hover:bg-[#475569] text-white h-12 px-8 text-lg font-bold rounded-lg flex gap-2">
              <ArrowRight size={20} className="rotate-180" />
              العودة إلى قائمة الطلبات
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
