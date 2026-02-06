"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil } from "lucide-react";
import OrderDetailsDialog from "./OrderDetailsDialog";

const OrdersDialog = ({ children }) => {
  const orders = [
    {
      id: "#18",
      date: "05-02-2026",
      status: "جاري معالجة طلبك",
      total: "29.50 ر.س",
    },
    {
      id: "#17",
      date: "05-02-2026",
      status: "جاري معالجة طلبك",
      total: "42.00 ر.س",
    },
    {
      id: "#1",
      date: "29-10-2025",
      status: "جاري معالجة طلبك",
      total: "42.00 ر.س",
    },
    {
      id: "#1",
      date: "29-10-2025",
      status: "جاري معالجة طلبك",
      total: "42.00 ر.س",
    },
    {
      id: "#1",
      date: "29-10-2025",
      status: "جاري معالجة طلبك",
      total: "42.00 ر.س",
    },
    {
      id: "#1",
      date: "29-10-2025",
      status: "جاري معالجة طلبك",
      total: "42.00 ر.س",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
    w-[75vw]
    !max-w-none
    max-h-[90vh]
    overflow-y-auto
  "
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-gray-800 text-right mb-6">
            قائمة طلباتي
          </DialogTitle>
        </DialogHeader>

        {/* قسم الفلترة */}
        <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 mb-6 flex flex-col items-end gap-3">
          <label className="font-bold text-gray-700 text-sm">
            فلترة حسب حالة الطلب:
          </label>
          <Select dir="rtl">
            <SelectTrigger className="w-full md:w-48 bg-white">
              <SelectValue placeholder="-- الكل --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">-- الكل --</SelectItem>
              <SelectItem value="processing">جاري المعالجة</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="cancelled">ملغي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* جدول الطلبات */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-gray-500 font-bold text-sm">
                <th className="py-4 px-2">رقم الطلب</th>
                <th className="py-4 px-2">تاريخ الطلب</th>
                <th className="py-4 px-2">حالة الطلب</th>
                <th className="py-4 px-2">الإجمالي</th>
                <th className="py-4 px-2">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-5 font-bold text-gray-700">{order.id}</td>
                  <td className="py-5 text-gray-600 text-sm">{order.date}</td>
                  <td className="py-5">
                    <span className="bg-[#F18721] text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 font-black text-gray-800">
                    {order.total}
                  </td>
                  <td className="py-5">
                    <div className="flex justify-center gap-2">
                      {/* أيقونة التفاصيل */}
                      <OrderDetailsDialog>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors shadow-sm border border-blue-100 cursor-pointer">
                          <Eye size={18} />
                        </button>
                      </OrderDetailsDialog>
                      {/* أيقونة التعديل */}
                      <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors shadow-sm border border-gray-100">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialog;
