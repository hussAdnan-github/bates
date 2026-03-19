'use client';  
import React from 'react'
import { Printer } from 'lucide-react';

function PrintButton() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrint}  
      className="flex items-center gap-2 bg-[#2D1B4D] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-md print:hidden" // 3. استخدام print:hidden
    >
      <Printer size={20} />
      <span>طباعة الفاتورة</span>
    </button>
  )
}

export default PrintButton;