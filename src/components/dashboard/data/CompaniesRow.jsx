import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
 
function CompaniesRow({company}) {
 return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex items-center gap-3 w-[10%]">
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
        <Link href={`companies/${company.id}`} className="text-gray-400 hover:text-blue-600 transition-colors">
          <Pencil size={18} />
        </Link>
      </div>

      

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {company.custom_user.length}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[25%] text-center text-gray-500 font-medium" dir="ltr">
        {company.website}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[20%] justify-end">
        <span className="font-bold text-gray-800">{company.name_ar}</span>
        <div className="w-10 h-10 rounded-full border overflow-hidden bg-gray-50 flex items-center justify-center">
          <img
            src={company.logo}
            alt={company.name_ar}
            className="w-8 h-8 object-contain"
          />
        </div>
      </div>
    </div>
 )
    
} 

export default CompaniesRow