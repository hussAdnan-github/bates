import React from "react";
import { ArrowRight, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
function page() {
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
        
      <BackPage title={`إضافة مستخدم جديد`}/>
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
          <UserCircle2 size={24} />
         
          <span className="font-bold text-lg">تفاصيل  الحساب</span>
        </div>

        <div className="p-8">
          <form className="space-y-2">
            {/* اسم المستخدم */}
            <InputField label="اسم المستخدم" placeholder="مثال: mohammed_ali" />

            {/* رقم الهاتف */}
            <InputField label="رقم الهاتف" placeholder="+967 XXX XXX XXX" />

            {/* .ext حقل إضافي */}
            <InputField label=".ext" placeholder="+967 XXX XXX XXX" />

            {/* نوع المستخدم - Select */}
            <div className="flex flex-col gap-2 w-full mb-4 text-right">
              <label className="text-gray-600 text-sm font-medium">
                نوع المستخدم
              </label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none">
                 <option>تاجر جملة الجملة</option>
                <option>تاجر جملة</option>
                <option>تاجر تجزئة</option>
 
 
              </select>
            </div>

            {/* كلمة المرور */}
            <InputField
              label="كلمة المرور"
              placeholder="ادخل كلمة مرور قوية"
              type="password"
            />

            {/* تأكيد كلمة المرور */}
            <InputField
              label="تأكيد كلمة المرور"
              placeholder="تأكيد كلمة المرور"
              type="password"
            />

            {/* ملحوظة */}
            <p className="text-xs text-gray-400 mt-4 text-right">
              يرجى تعيين كلمة مرور قوية للمستخدم الجديد.
            </p>

            {/* زر الحفظ (إضافي من عندي ليكتمل النموذج) */}
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
              <button className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200">
                حفظ البيانات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
