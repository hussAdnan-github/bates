"use client"; // لضمان عمل الـ State في Next.js (App Router)
import { putOrder } from "@/actions/orders";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ResponseOrder = ({ orderId, typeRequest = "3" }) => {
  const [status, setStatus] = useState(typeRequest);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataForm = new FormData();
    dataForm.append("user_type_request", status);
    const result = await putOrder(dataForm, orderId);
    if (!result.success) {
      if (result.errors) {
        Object.entries(result.errors).map(([field, message]) =>
          toast.error(
            <div style={{ direction: "rtl", textAlign: "right" }}>
              <strong>{message}</strong>
            </div>,
            { duration: 4000 },
          ),
        );
      } else {
        toast.error(
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <strong>حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى</strong>
          </div>,
          { duration: 4000 },
        );
      }
    } else {
      setLoading(false);
      toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت استجابة ردك بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.refresh();
      router.back();
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
      dir="rtl"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          {/* خيارات الحالة (الجانب الأيسر في RTL) */}
          <div className="w-full md:w-64 space-y-4 pt-2">
            <h3 className="text-gray-800 font-bold text-sm mb-4">
              يرجى تحديد ردك على التعديل
            </h3>

            <div className="space-y-3">
              {/* خيار: قبول الطلب */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="1"
                  checked={status === 1}
                  onChange={() => setStatus(1)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-black transition-colors">
                  قبول الطلب
                </span>
              </label>

              {/* خيار: رفض الطلب */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="2"
                  checked={status === 2}
                  onChange={() => setStatus(2)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-black transition-colors">
                  رفض الطلب
                </span>
              </label>

              {/* خيار: معلق */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value="3"
                  checked={status === 3}
                  onChange={() => setStatus(3)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-black transition-colors">
                  معلق
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* أزرار التحكم السفلى */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded shadow-sm transition-all text-sm font-medium"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-8 py-2 text-white bg-[#f58220] hover:bg-[#e67610] rounded shadow-sm transition-all text-sm font-medium"
          >
            {Loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <div> إرسال الرد</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResponseOrder;
