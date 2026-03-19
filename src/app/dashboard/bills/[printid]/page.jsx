import React from "react";
import { Phone, Hash, Calendar, CreditCard } from "lucide-react";
import { getBillsId } from "@/actions/bills";
import { notFound } from "next/navigation";
import PrintButton from "@/components/dashboard/PrintButton";

const InvoicePage = async ({ params }) => {
  const { printid } = await params;
  const billResponse = await getBillsId(printid);

  if (!billResponse || !billResponse.success || !billResponse.data) {
    return notFound();
  }

  const bill = billResponse.data;

  const getBillType = (type) => (type === 2 ? "آجل" : "نقدي");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-YE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-gray-100 min-h-screen py-10 px-4 print:bg-white print:p-0 print:m-0 print:min-h-screen"
      dir="rtl"
    >
      {/* منطقة الزر - تختفي في الطباعة */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-start print:hidden">
        <PrintButton />
      </div>

      {/* الحاوية الرئيسية للفاتورة */}
      <div 
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden 
                   print:max-w-none print:w-full print:min-h-screen print:-mt-20 print:rounded-none print:shadow-none print:flex print:flex-col print:justify-between print:items-center"
      >
        {/* الهيدر */}
        <div className="p-8 md:p-12 print:p-10 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="bg-[#2D1B4D] text-white px-4 py-2 rounded inline-block mb-4 print:bg-[#2D1B4D]">
                <span className="text-xl font-bold tracking-widest text-white">
                  BTS LOGO
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-800">
                محمد باتيس للتجارة
              </h2>
              <p className="text-gray-500 text-sm">التجارة العامة والاستيراد</p>
            </div>

            <div className="text-left space-y-2">
              <h1 className="text-4xl font-black text-[#2D1B4D] mb-4">
                فاتورة
              </h1>
              <div className="flex items-center justify-end gap-2 text-gray-600">
                <span className="font-mono font-bold">{bill.id}</span>
                <span className="font-bold">:رقم الفاتورة</span>
                <Hash size={14} />
              </div>
              <div className="flex items-center justify-end gap-2 text-gray-600">
                <span>{formatDate(bill.created_at)}</span>
                <Calendar size={14} />
              </div>
              <div className="flex items-center justify-end gap-2 text-gray-600">
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-sm font-bold print:bg-orange-100 print:text-orange-700">
                  {getBillType(bill.type_bill)}
                </span>
                <CreditCard size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* محتوى الفاتورة (العميل والجدول) ينمو ليملأ المساحة */}
        <div className="print:flex-grow">
          <div className="px-8 md:px-12 py-8 print:py-10">
            <div className="relative p-6 rounded-xl border-r-8 border-[#2D1B4D] bg-gray-50/50 print:bg-gray-50/50">
              <h3 className="text-[#2D1B4D] font-bold mb-4">فاتورة إلى:</h3>
              <div className="space-y-1">
                <p className="text-xl font-black text-gray-800">{bill.name_user}</p>
                <p className="text-gray-600 flex items-center gap-2" dir="ltr">
                  <Phone size={14} />
                  <span>{bill.user_phone}</span>
                </p>
                <p className="text-gray-400 text-sm italic">
                  محاسب العمليات: {bill.name_user}
                </p>
              </div>
            </div>
          </div>

          <div className="px-8 md:px-12 pb-8">
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-[#2D1B4D] text-white print:bg-[#2D1B4D]">
                  <th className="p-4 text-right rounded-tr-lg w-12 text-white">#</th>
                  <th className="p-4 text-right text-white">المنتج والوصف</th>
                  <th className="p-4 text-center text-white">الكمية</th>
                  <th className="p-4 text-center text-white">سعر الوحدة</th>
                  <th className="p-4 text-left rounded-tl-lg text-white">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {bill.bill_items.map((item, i) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 text-right font-bold text-gray-400">{i + 1}</td>
                    <td className="p-4 text-right">
                      <p className="font-bold text-gray-800">{item.name_product}</p>
                      <p className="text-xs text-gray-400 font-mono">موديل: {item.name_model}</p>
                    </td>
                    <td className="p-4 text-center font-bold text-gray-700">{item.quantity}</td>
                    <td className="p-4 text-center text-gray-600">{parseFloat(item.price).toFixed(2)}</td>
                    <td className="p-4 text-left font-black text-[#2D1B4D]">{parseFloat(item.subtotal).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* التذييل والمجموع يظلان في الأسفل إذا كانت الصفحة فارغة */}
        <div className="mt-auto">
          <div className="px-8 md:px-12 pb-12 flex justify-start">
            <div className="bg-[#2D1B4D] text-white px-8 py-5 rounded-2xl flex items-center gap-8 shadow-lg print:shadow-none">
              <div className="border-l border-white/20 pl-6">
                <span className="text-sm block opacity-70 mb-1">المبلغ المطلوب سداده</span>
                <span className="text-3xl font-black tracking-tight">{parseFloat(bill.total_price).toFixed(2)}</span>
                <span className="mr-2 text-sm font-bold opacity-80 text-orange-300">ر.س</span>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center print:bg-white">
            <p className="text-gray-400 font-medium italic">شكراً لتعاملكم معنا!</p>
            <p className="text-[10px] text-gray-300">تاريخ الطباعة: {new Date().toLocaleString("ar-YE")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;