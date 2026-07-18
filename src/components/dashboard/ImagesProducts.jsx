"use client";

import React, { useState } from "react";
import { Image, PlusCircle, Trash2 } from "lucide-react";
import InputField from "./InputField";

export default function ImagesProducts({ onChange, onRemove }) {
  const [imageFields, setImageFields] = useState([
    { id: Date.now(), label: "صورة إضافية 1" },
  ]);

  const addImageField = () => {
    const newId = Date.now();
    setImageFields([
      ...imageFields,
      { id: newId, label: `صورة إضافية ${imageFields.length + 1}` },
    ]);
  };

  const removeField = (id) => {
    if (imageFields.length > 0) {
      setImageFields(imageFields.filter((field) => field.id !== id));
      // إخبار الأب بحذف الصورة من القائمة لديه أيضاً
      if (onRemove) onRemove(id);
    }
  };
  return (
    <div className="overflow-hidden bg-gray-50/50 rounded-xl border border-dashed border-gray-200 mt-4">
       <div className="p-4 border-b border-gray-100 flex items-center justify-start gap-2 text-purple-900">
        <Image size={20} />
        <span className="font-bold">معرض صور المنتج (إضافي)</span>
      </div>

      <div className="p-6 space-y-4">
         {imageFields.map((field, index) => (
          <div key={field.id} className="relative group flex items-start gap-2">
            <div className="flex-1">
              <InputField
                label={field.label}
                type="file"
                accept="image/*"
                onChange={(e) => {
                   if (e.target.files?.[0]) {
                    onChange(e.target.files, field.id);
                  }
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="mt-8 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
              title="حذف الحقل"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addImageField}
          className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-purple-200 rounded-lg text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group"
        >
          <PlusCircle size={18} />
          <span className="font-medium text-sm">إضافة صورة أخرى للمعرض</span>
        </button>
      </div>
    </div>
  );
}