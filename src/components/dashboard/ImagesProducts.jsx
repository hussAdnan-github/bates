"use client";

import React, { useState } from "react";
import { Image, PlusCircle, Trash2 } from "lucide-react"; // استيراد الأيقونات
import InputField from "./InputField";

export default function ImagesProducts() {
  // مصفوفة لتخزين معرفات الحقول (تبدأ بـ 3 حقول افتراضية كما في مثالك)
  const [imageFields, setImageFields] = useState([1, 2, 3]);

  // وظيفة لإضافة حقل جديد
  const addImageField = () => {
    setImageFields([...imageFields, Date.now()]); // استخدام الوقت كمعرف فريد
  };

  // وظيفة لحذف حقل (اختياري ولكن مهم لتجربة المستخدم)
  const removeField = (id) => {
    if (imageFields.length > 1) {
      setImageFields(imageFields.filter((fieldId) => fieldId !== id));
    }
  };
// max-w-2xl mx-auto 
  return (
    <div className="  overflow-hidden">
       <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
        <Image size={24} />
        <span className="font-bold text-lg">تفاصيل منتج</span>
      </div>

      <div className="p-6 space-y-4">
         {imageFields.map((id, index) => (
          <div key={id} className="relative group">
            <InputField
              label={`الصورة ${index === 0 ? "الرئيسية" : index + 1}`}
              placeholder="مثال: شاحن سريع BTS"
              type="file"
            />

             {imageFields.length > 1 && (
              <button
                onClick={() => removeField(id)}
                className="absolute left-2 top-[42px] text-red-400 hover:text-red-600 transition-colors"
                title="حذف الصورة"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))}

        {/* زر إضافة صورة أخرى */}
        <button
          type="button"
          onClick={addImageField}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-purple-200 rounded-lg text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group"
        >
          <PlusCircle
            size={20}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-medium">إضافة صورة أخرى</span>
        </button>
      </div>
    </div>
  );
}
