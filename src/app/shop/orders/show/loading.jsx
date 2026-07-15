import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" dir="rtl">
      <Loader2 className="w-12 h-12 text-[var(--primary_color)] animate-spin" />
      <h2 className="text-xl font-bold text-gray-700 animate-pulse">جاري تحميل تفاصيل الطلب...</h2>
      <p className="text-sm text-gray-500">يرجى الانتظار لحظات</p>
    </div>
  );
}
