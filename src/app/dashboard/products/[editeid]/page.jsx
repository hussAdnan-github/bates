import React from "react";
import { ArrowRight, Image, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import ImagesProducts from "@/components/dashboard/ImagesProducts";
async function page({ params }) {
  const producttId = (await params).editeid;

  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل المنتج `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <UserCircle2 size={24} />

            <span className="font-bold text-lg">تفاصيل منتج</span>
          </div>
          <form className="space-y-2">
            {/* اسم المستخدم */}
            <InputField label="اسم المنتج" placeholder="مثال: شاحن سريع BTS" />
            <InputField
              label="الصورة الرئيسية "
              placeholder="مثال: شاحن سريع BTS"
              type="file"
            />

            {/* رقم الهاتف */}
            <InputField
              label="سعر الجملة الجلمة"
              placeholder="0.00"
              type="number"
            />
            <InputField
              label="سعر  سعر الجملة"
              placeholder="0.00"
              type="number"
            />
            <InputField
              label="سعر سعر التجزئة"
              placeholder="0.00"
              type="number"
            />

            {/* .ext حقل إضافي */}
            <InputField label="الموديل" placeholder="مثال :BTS" />
            <InputField label="الرقم التسلسلي" placeholder="أختياري" />

            <ImagesProducts />

            {/* زر الحفظ (إضافي من عندي ليكتمل النموذج) */}
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end gap-4">
              <button className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200">
                حفظ البيانات
              </button>
              <button className="bg-orange-400 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200">
                الغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
