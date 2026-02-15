import React from "react";
import {
  ArrowRight,
  Building2,
  Image,
  PhoneOutgoing,
  UserCircle2,
  Users2Icon,
} from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { Textarea } from "@/components/ui/textarea";
async function page({ params }) {
  const companyId = (await params).editeid;

  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل الشركة `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <Building2 size={24} />
            <span className="font-bold text-lg">تفاصيل الشركة</span>
          </div>

          <form className="space-y-2">
            {/* اسم المستخدم */}
            <InputField
              label="اسم الشركة (بالعربية)"
              placeholder="اسم الشركة بالعربية"
            />
            <InputField
              label="اسم الشركة (بالإنجليزية)"
              placeholder="اسم الشركة بالإنجليزية"
            />

            {/* رقم الهاتف */}
            <InputField label="الموقع الإلكتروني" placeholder="@gmail.com" />
            <label className="text-gray-600 text-sm font-medium">
              وصف الشركة
            </label>
            <Textarea placeholder="اكتب وصف الشركة" />

            <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
              <Image size={24} />
              <span className="font-bold text-lg">شعار الشركة</span>
            </div>

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
