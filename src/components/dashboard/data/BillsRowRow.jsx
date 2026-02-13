import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../StatusBadge";
function billsRowRow({ bills }) {
  return (
    <div className="flex flex-row-reverse items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-right">
      {/* 1. إجراءات */}
      <div className="flex items-center justify-center gap-3 w-[10%]">
        <button className="text-gray-400 hover:text-red-600 transition-colors">
          <Trash2 size={18} />
        </button>
      
      </div>
 
     <div className="w-[20%] text-center text-gray-600 font-medium">
        {bills.date}
      </div>

      <div className="w-[20%] text-center">
        <StatusBadge text="آجل" type="active" />
      </div>

      {/* 4. نوع التاجر */}
      <div className="w-[20%] text-center text-gray-600 font-medium">
        {bills.price}
      </div>

      {/* 5. رقم الهاتف */}
      <div className="w-[20%] text-center text-gray-500 font-medium" dir="ltr">
        {bills.customer}
      </div>

      {/* 6. المستخدم (الصورة والاسم) */}
      <div className="flex flex-row-reverse items-center gap-3 w-[10%] justify-end">
   
        <span className="font-bold text-gray-800">{bills.number}</span>
        
      </div>
    </div>
  );
}

export default billsRowRow;
