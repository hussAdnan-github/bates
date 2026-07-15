"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Image, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import ImagesProducts from "@/components/dashboard/ImagesProducts";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getProdutsId, putProdut } from "@/actions/product";
import { getDepartmentDashboard } from "@/actions/department";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { productSchema } from "@/lib/validations/productSchema";

function page() {
  const { editeid } = useParams();
  const [loading, setLoading] = useState(true);
  const [extraImages, setExtraImages] = useState({});
  const [DepartmentList, setDepartmentList] = useState([]);
  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProdutsId(editeid);
        const department = await getDepartmentDashboard();
        setDepartmentList(department?.data?.results || []);

        reset({
          name: data?.data?.name || "",
          price: data?.data?.price || 0,
          wholesale_price: data?.data?.wholesale_price || 0,
          retail_price: data?.data?.retail_price || 0,
          retail_price_ye_new: data?.data?.retail_price_ye_new || 0,
          retail_price_ye_old: data?.data?.retail_price_ye_old || 0,
          model: data?.data?.model || "",
          serial_number: data?.data?.serial_number || "",
          description: data?.data?.description || "",
          number: data?.data?.number || "",
          department: data?.data?.department || "",
          status: data?.data?.status !== undefined ? data?.data?.status : 1,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [editeid]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      department: "",
      wholesale_price: 0,
      retail_price: 0,
      retail_price_ye_new: 0,
      retail_price_ye_old: 0,
      model: "",
      serial_number: "",
      description: "",
      number: "",
      status: 1,
      image: null,
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;

      if (key === "image" && value?.length) {
        formData.append("image", value[0]);
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    Object.values(extraImages).forEach((file) => {
      formData.append("images", file);
    });

    const result = await putProdut(formData, editeid);

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
      queryClient.invalidateQueries({ queryKey: ["Product"] });
      toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت تعديل بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
      router.back();
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل المنتج `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <UserCircle2 size={24} />

            <span className="font-bold text-lg">تفاصيل منتج</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* اسم المستخدم */}
              <InputField
                label="اسم المنتج"
                placeholder="مثال: شاحن سريع BTS"
                {...register("name")}
                error={errors.name?.message}
              />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <InputField
                    label="الصورة الرئيسية"
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                )}
              />

              {/* رقم الهاتف */}
              <InputField
                label="السعر الأساسي"
                placeholder="0.00"
                type="number"
                step="any"
                {...register("price")}
                error={errors.price?.message}
              />
              <InputField
                label="سعر الجملة"
                placeholder="0.00"
                type="number"
                step="any"
                {...register("wholesale_price")}
                error={errors.wholesale_price?.message}
              />
              <InputField
                label="سعر التجزئة"
                placeholder="0.00"
                type="number"
                step="any"
                {...register("retail_price")}
                error={errors.retail_price?.message}
              />

              <InputField
                label="سعر التجزئة (يمني جديد)"
                placeholder="0.00"
                type="number"
                step="any"
                {...register("retail_price_ye_new")}
                error={errors.retail_price_ye_new?.message}
              />

              <InputField
                label="سعر التجزئة (يمني قديم)"
                placeholder="0.00"
                type="number"
                step="any"
                {...register("retail_price_ye_old")}
                error={errors.retail_price_ye_old?.message}
              />

              <InputField
                label="الموديل"
                placeholder="مثال :BTS"
                {...register("model")}
                error={errors.model?.message}
              />
              <InputField
                label="رقم أو ترتيب المنتج (اجباري)"
                placeholder="1"
                {...register("serial_number")}
                error={errors.serial_number?.message}
              />

              <InputField
                label="الرقم / العدد (Number)"
                placeholder="أختياري"
                type="number"
                {...register("number")}
                error={errors.number?.message}
              />

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 transition-all hover:shadow-sm">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 font-bold text-sm cursor-pointer">
                    حالة المنتج
                  </label>
                  <span className="text-gray-500 text-xs">تفعيل أو تعطيل ظهور هذا المنتج</span>
                </div>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value === 1}
                      onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
                      className="
                      data-[state=checked]:bg-purple-900 
                      data-[state=unchecked]:bg-slate-200
                      transition-colors
                    "
                    />
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium">القسم</label>
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field} // يربط value و onChange تلقائياً
                      onChange={(e) => field.onChange(Number(e.target.value))} // تحويل القيمة لرقم
                      className={`w-full border rounded-lg p-3 bg-gray-50 mt-1 ${errors.department ? "border-red-500" : "border-gray-200"
                        }`}
                    >
                      <option value="">اختر القسم</option>
                      {DepartmentList.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-600 text-sm font-medium mb-2 block">الوصف</label>
                <Textarea
                  placeholder="اكتب وصف المنتج"
                  {...register("description")}
                  error={errors.description?.message}
                  className="mt-1"
                />
              </div>
            </div>

            {/* department was moved up */}
            <ImagesProducts
              onChange={(files, id) =>
                setExtraImages((prev) => ({ ...prev, [id]: files[0] }))
              }
              onRemove={(id) =>
                setExtraImages((prev) => {
                  const newImages = { ...prev };
                  delete newImages[id];
                  return newImages;
                })
              }
            />

            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href={"/dashboard/products"}
                className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                الغاء
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
