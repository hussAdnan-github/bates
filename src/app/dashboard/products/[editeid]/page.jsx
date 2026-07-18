"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowRight, Image, UserCircle2, Trash2, Loader2, AlertTriangle } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import ImagesProducts from "@/components/dashboard/ImagesProducts";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getProdutsId, putProdut, postProductImage, deleteProductImage } from "@/actions/product";
import { getDepartmentDashboard } from "@/actions/department";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { productSchema } from "@/lib/validations/productSchema";

function page() {
  const { editeid } = useParams();
  const [loading, setLoading] = useState(true);
  const [extraImages, setExtraImages] = useState({});
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [existingSubImages, setExistingSubImages] = useState([]);
  const [DepartmentList, setDepartmentList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeletingImg, setIsDeletingImg] = useState(false);
  const [imgToDelete, setImgToDelete] = useState(null);
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

        if (data?.data?.image) {
          setMainImagePreview(data.data.image);
        }
        if (data?.data?.images) {
          setExistingSubImages(data.data.images);
        }
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

    // تم إزالة إضافة الصور الفرعية هنا لأنها تُرفع فوراً

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

  const handleInstantUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading(
      <div style={{ direction: "rtl", textAlign: "right" }}><strong>جاري رفع الصورة...</strong></div>
    );

    const imgData = new FormData();
    imgData.append("product", editeid);
    imgData.append("image", file);

    try {
      const uploadResult = await postProductImage(imgData);
      if (uploadResult.success && uploadResult.data) {
        const newImage = uploadResult.data.data || uploadResult.data;
        setExistingSubImages((prev) => [...prev, newImage]);
        toast.success(
          <div style={{ direction: "rtl", textAlign: "right" }}><strong>تم رفع الصورة بنجاح ✅</strong></div>,
          { id: toastId }
        );
      } else {
        toast.error(
          <div style={{ direction: "rtl", textAlign: "right" }}><strong>فشل رفع الصورة</strong></div>,
          { id: toastId }
        );
      }
    } catch (error) {
      toast.error(
        <div style={{ direction: "rtl", textAlign: "right" }}><strong>حدث خطأ أثناء الرفع</strong></div>,
        { id: toastId }
      );
    } finally {
      setIsUploading(false);
      e.target.value = null;
    }
  };

  const handleDeleteSubImage = async () => {
    if (!imgToDelete) return;

    setIsDeletingImg(true);
    const toastId = toast.loading(
      <div style={{ direction: "rtl", textAlign: "right" }}><strong>جاري الحذف...</strong></div>
    );

    try {
      const result = await deleteProductImage(imgToDelete);
      if (result.success !== false) { // Assuming DELETE might not return typical JSON
        setExistingSubImages((prev) => prev.filter((img) => img.id !== imgToDelete));
        toast.success(
          <div style={{ direction: "rtl", textAlign: "right" }}><strong>تم حذف الصورة بنجاح ✅</strong></div>,
          { id: toastId }
        );
      } else {
        toast.error(
          <div style={{ direction: "rtl", textAlign: "right" }}><strong>فشل حذف الصورة</strong></div>,
          { id: toastId }
        );
      }
    } catch (error) {
      toast.error(
        <div style={{ direction: "rtl", textAlign: "right" }}><strong>حدث خطأ أثناء الحذف</strong></div>,
        { id: toastId }
      );
    } finally {
      setIsDeletingImg(false);
      setImgToDelete(null);
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
              <div className="flex flex-col gap-2">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      label="الصورة الرئيسية"
                      type="file"
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                        if (e.target.files?.[0]) {
                          setMainImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  )}
                />
                {mainImagePreview && (
                  <div className="mt-2 w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center shadow-sm">
                    <img src={mainImagePreview} alt="Main Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

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
                {...register("number")}
                error={errors.number?.message}
              />

              <InputField
                label="الرقم التسلسلي"
                placeholder="أختياري"
                type="number"
                {...register("serial_number")}
                error={errors.serial_number?.message}
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

            {existingSubImages?.length > 0 && (
              <div className="overflow-hidden bg-gray-50/50 rounded-xl border border-dashed border-gray-200 mt-4 p-6">
                <label className="text-gray-700 font-bold text-sm mb-4 flex items-center gap-2">
                  <Image size={20} className="text-purple-900" />
                  الصور الفرعية الحالية
                </label>
                <div className="flex flex-wrap gap-4">
                  {existingSubImages.map((img, idx) => (
                    <div key={idx} className="relative group w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <img
                        src={typeof img === 'string' ? img : img.image}
                        alt="Sub image"
                        className="w-full h-full object-cover"
                      />
                      {img.id && (
                        <button
                          type="button"
                          onClick={() => setImgToDelete(img.id)}
                          disabled={isUploading || isDeletingImg}
                          className="absolute top-1 right-1 bg-white/90 text-red-500 hover:text-red-700 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                          title="حذف الصورة"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-hidden bg-purple-50/30 rounded-xl border border-dashed border-purple-200 mt-4 p-6">
              <div className="flex flex-col items-center justify-center gap-3">
                <label className={`
                    flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all cursor-pointer
                    ${isUploading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-purple-100 text-purple-700 hover:bg-purple-200 shadow-sm'}
                 `}>
                  {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Image size={18} />}
                  {isUploading ? 'جاري الرفع...' : 'اختر صورة فرعية جديدة لإضافتها فوراً'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleInstantUpload}
                    disabled={isUploading}
                  />
                </label>
                <p className="text-xs text-gray-500">سيتم رفع الصورة و إضافتها مباشرة دون الحاجة للضغط على حفظ البيانات</p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href={"/dashboard/products"}
                className="bg-white text-gray-700 border border-gray-200 px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                الغاء
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || isUploading || isDeletingImg}
                className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "جاري الحفظ..." : isUploading || isDeletingImg ? "يُرجى الانتظار..." : "حفظ البيانات"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <AlertDialog open={!!imgToDelete} onOpenChange={(open) => !open && setImgToDelete(null)}>
        <AlertDialogContent className="bg-white" dir="rtl">
          <AlertDialogHeader className="flex flex-col items-center justify-center gap-2 mb-2">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-2">
              <AlertTriangle className="text-red-500 w-8 h-8" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-gray-800 text-center">
              هل أنت متأكد من الحذف؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-center mt-2 text-base">
              هذا الإجراء سيقوم بحذف الصورة الفرعية للمنتج بشكل نهائي، ولا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row justify-center gap-3 mt-4 sm:justify-center">
            <AlertDialogCancel className="mt-0 w-32 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold rounded-xl h-11">
              إلغاء
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubImage}
              className="bg-red-500 text-white hover:bg-red-600 w-32 font-bold rounded-xl h-11"
            >
              حذف الصورة
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default page;
