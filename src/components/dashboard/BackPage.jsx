'use client';
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackPage({title}) {
    const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <button
      onClick={()=>router.back()}
      className="cursor-pointer flex items-center gap-2 bg-[#FFC107] hover:bg-[#e0ab06] text-gray-900 px-4 py-2 rounded-lg font-bold transition-all shadow-sm">
        <ArrowRight size={20} />

        <span>العودة للقائمة</span>
      </button>
    </div>
  );
}

export default BackPage;
