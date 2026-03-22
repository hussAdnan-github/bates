"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Trash2,
  User,
  Package,
  Settings,
  CreditCard,
  FileText,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FiltersDropdown from "@/components/dashboard/FiltersDropdown";
import { useParams, useRouter } from "next/navigation";
import {
  deleteProductBasket,
  getBasketsId,
  putBasket,
} from "@/actions/baskets";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { getProduts } from "@/actions/product";
import AddItemDialog from "@/components/dashboard/AddItemDialog";
import { toast } from "sonner";
import QuantityBasket from "@/components/store/QuantityBasket";
import DeleteBasketItem from "@/components/store/DeleteBasketItem";

const OrderEditPage = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const { editeid } = useParams();
  const [items, setItems] = useState([
    { id: 1, name: "منتج تجريبي 1", quantity: 2, price: 50, total: 100 },
  ]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["basketsId"],
    queryFn: () => getBasketsId(editeid),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
  useEffect(() => {
    if (data?.data) {
      setStatus(data.data.status?.toString() || "");
      setPaymentType(data.data.type_payment?.toString() || "");
    }
  }, [data]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#145463] text-lg animate-pulse">
          جارٍ تحميل البيانات...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center p-10 text-red-500">حدث خطأ: {error.message}</p>
    );
  const products = data?.data?.basketitems;

  const removeItem = async (id) => {
    const dataForm = new FormData();

    dataForm.append("basket", id);
    const result = await deleteProductBasket(dataForm);
    console.log(result);
  };

  const updateFilters = async (key, value) => {
    //  const dataForm = new FormData();
    //    dataForm.append("status", data.productId);
    //    dataForm.append("quantity", data.quantity);
    //    const result = await postProductBasket(dataForm);
    //    console.log(result)
  };
  const handleStatusChange = (val) => {
    setStatus(val);
  };
  const handleTypeChange = (val) => {
    setPaymentType(val);
  };
  const handelPatchData = async () => {
    setLoading(true);
    const dataForm = new FormData();
    dataForm.append("status", status);
    dataForm.append("type_payment", PaymentType);
    const result = await putBasket(dataForm, editeid);
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
          <strong>تمت تعديل الطلب بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6" dir="rtl">
      {/* الهيدر وزر العودة */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-black text-[#2D1B4D] flex items-center gap-2">
          <FileText className="text-[#2D1B4D]" />
          تعديل الطلب #{data?.data?.id}
        </h1>
        <Button
          variant="outline"
          className="gap-2 border-[#FFC107] text-gray-700 hover:bg-[#FFC107] hover:text-white transition-all"
        >
          <ArrowRight size={18} />
          العودة لقائمة الطلبات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* القسم الأيمن: عناصر الطلب (يأخذ مساحة أكبر) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-white border-b flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Package size={20} className="text-[#2D1B4D]" />
                عناصر الطلب
              </CardTitle>

              {/* ديالوج إضافة عنصر جديد */}
              <AddItemDialog id={editeid} />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-right font-bold">
                      المنتج
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      الكمية
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      السعر
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      الإجمالي
                    </TableHead>
                    <TableHead className="text-left font-bold">حذف؟</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-gray-800">
                        {item.products_name}
                      </TableCell>
                      <TableCell className="text-center">
                        <QuantityBasket number={item.quantity} id={item.id} />
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {item.products_price}
                      </TableCell>
                      <TableCell className="text-center font-bold text-[#2D1B4D]">
                        {item.subtotal} ر.س
                      </TableCell>
                      <TableCell className="text-left">
                        <DeleteBasketItem id={item.id} refresh = {"basketsId"}/>
                          {/* <Trash2 size={18} /> */}
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <User size={20} className="text-[#2D1B4D]" />
                معلومات العميل
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-gray-400">اسم العميل</Label>
                <p className="font-bold text-gray-800 text-lg italic">test</p>
              </div>
              <div className="space-y-1">
                <Label className="text-gray-400">رقم الهاتف</Label>
                <p className="font-bold text-gray-800 text-lg italic" dir="ltr">
                  735744778, 735744778
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* القسم الأيسر: التحديثات والملخص */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Settings size={20} className="text-[#2D1B4D]" />
                تحديث حالة الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <FiltersDropdown
                placeholder="كل الحالات"
                value={status}
                options={[
                  { label: "جاري معالجة طلبك", value: 1 },
                  { label: "تم شحن طلبك", value: 2 },
                  { label: "تم إلغاء طلبك", value: 3 },
                  { label: "تم تعديل الطلب", value: 4 },
                  { label: "تم قبول طلبك", value: 5 },
                  { label: "تم رفض طلبك", value: 6 },
                ]}
                onChange={handleStatusChange}
              />

              <FiltersDropdown
                // taype_custom
                placeholder="نوع الدفع"
                value={PaymentType}
                options={[
                  { label: "الدفع عند الاستلام", value: 1 },
                  { label: "تحويل المبلغ", value: 2 },
                ]}
                onChange={handleTypeChange}
              />
              <div className="space-y-2">
                <Label>إيصال التحويل </Label>
                <Input type="file" className="cursor-pointer" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-[#2D1B4D] text-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <CreditCard size={20} />
                ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-black">
                <span>الإجمالي الكلي:</span>
                <span>{data?.data?.total_price}</span>
              </div>
              <div className="pt-4 flex gap-2">
                <Button
                  onClick={handelPatchData}
                  className="flex-1 bg-[#FFC107] text-black hover:bg-[#e0ab06] font-bold gap-2"
                >
                  {Loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <div>
                      {" "}
                      حفظ التغييرات
                      <Save size={18} />
                    </div>
                  )}
                </Button>
                <Button
                  onClick={() => router.back()}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-none gap-2"
                >
                  <X size={18} />
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderEditPage;
