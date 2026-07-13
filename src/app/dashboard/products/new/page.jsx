"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Image, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import ImagesProducts from "@/components/dashboard/ImagesProducts";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getDepartmentDashboard } from "@/actions/department";
import { postProdut } from "@/actions/product";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { productSchema } from "@/lib/validations/productSchema";
 

function page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [extraImages, setExtraImages] = useState({});

  const [DepartmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getDepartmentDashboard();
        console.log(DepartmentList);
        setDepartmentList(res?.data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);
  const {
    register,
    control,
    handleSubmit,
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
    Object.keys(data).forEach((key) => {
      if (key === "image" && data.image) {
        formData.append("image", data.image);
      } else if (key !== "image") {
        if (data[key] !== null && data[key] !== "") {
           formData.append(key, data[key]);
        }
      }
    });
    Object.values(extraImages).forEach((file) => {
      formData.append("images", file);
    });
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const result = await postProdut(formData);

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
          <strong>تمت اضافة منتج جديد بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
      router.back();
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`إضافة منتج جديد`} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <UserCircle2 size={24} />

            <span className="font-bold text-lg">تفاصيل منتج</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
              {...register("price")}
              error={errors.price?.message}
            />
            <InputField
              label="سعر الجملة"
              placeholder="0.00"
              type="number"
              {...register("wholesale_price")}
              error={errors.wholesale_price?.message}
            />
            <InputField
              label="سعر التجزئة"
              placeholder="0.00"
              type="number"
              {...register("retail_price")}
              error={errors.retail_price?.message}
            />

            <InputField
              label="سعر التجزئة (يمني جديد)"
              placeholder="0.00"
              type="number"
              {...register("retail_price_ye_new")}
              error={errors.retail_price_ye_new?.message}
            />

            <InputField
              label="سعر التجزئة (يمني قديم)"
              placeholder="0.00"
              type="number"
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
              type="number"
              {...register("serial_number")}
              error={errors.serial_number?.message}
            />
            
            <InputField
              label="الرقم   "
              placeholder="أختياري"
              type="number"
              {...register("number")}
              error={errors.number?.message}
            />

            <div>
              <label className="text-gray-600 text-sm font-medium">الحالة</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={`w-full border rounded-lg p-3 bg-gray-50 mt-1 ${
                      errors.status ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value={1}>نشط</option>
                    <option value={0}>غير نشط</option>
                  </select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-600 text-sm font-medium">الوصف</label>
              <Textarea
                placeholder="اكتب وصف المنتج"
                {...register("description")}
                error={errors.description?.message}
                className="mt-1"
              />
            </div>
            <div>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}  
                    onChange={(e) => field.onChange(Number(e.target.value))}  
                    className={`w-full border rounded-lg p-3 bg-gray-50 ${
                      errors.department ? "border-red-500" : "border-gray-200"
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
                <p className="text-red-500 text-sm">
                  {errors.department.message}
                </p>
              )}
            </div>
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

            {/* زر الحفظ (إضافي من عندي ليكتمل النموذج) */}
            <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>
              <Link
                href={"/dashboard/products"}
                className="bg-orange-400 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200"
              >
                الغاء
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
