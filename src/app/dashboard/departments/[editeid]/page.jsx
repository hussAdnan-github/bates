import React from "react";
import { ArrowRight, Bookmark, Building2, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { Textarea } from "@/components/ui/textarea";
async function page({ params }) {
  const departmentId = (await params).editeid;

  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل القسم `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
          <Bookmark size={24} />
          <span className="font-bold text-lg">تفاصيل  قسم</span>
        </div>

        <div className="p-8">
          <form className="space-y-2">
            {/* اسم المستخدم */}
            <InputField label="اسم القسم" placeholder="ادخل اسم القسم" />

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
