"use client";

import { AlertTriangle } from "lucide-react";
import React, { useEffect } from "react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title = "تأكيد الحذف", message = "هل أنت متأكد من عملية الحذف؟ لا يمكن التراجع عن هذا الإجراء." }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all duration-300 scale-100">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4 border-4 border-red-100">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
            {message}
          </p>
          
          <div className="flex justify-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors"
            >
              تراجع
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-red-200"
            >
              نعم، احذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
