"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Shield, UserCircle2 } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { editeUser, getUserId, postUser } from "@/actions/users";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
const userSchema = z
  .object({
    username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
    phone: z.string().min(9, "رقم الهاتف غير صحيح"),
    ext: z.string().optional(),
    userType: z.enum(["1", "2", "3"]).optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    isActive: z.boolean().default(true).optional(),
    isStaff: z.boolean().default(false).optional(),
    // avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

function page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { editeid } = useParams();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserId(editeid);

        console.log(data);
        reset({
          username: data?.data?.username,
          phone: data?.data?.phone,
          ext: data?.data?.ext,
          userType: data?.data?.taype_custom,
          isActive: data?.data?.is_active ?? true,
          isStaff: data?.data?.is_staff ?? false,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [editeid]);

  // if (loading) return <p>Loading...</p>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (data) => {
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== "" && value !== undefined && value !== null) {
        if (key !== "confirmPassword") {
          acc[key] = value;
        }
      }
      return acc;
    }, {});

    const result = await editeUser(filteredData, editeid);

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
      queryClient.invalidateQueries({ queryKey: ["Users"] });
      toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت تعديل مستخدم بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
      router.back();
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل مستخدم `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
          <UserCircle2 size={24} />

          <span className="font-bold text-lg">تفاصيل الحساب</span>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* اسم المستخدم */}
            <InputField
              label="اسم المستخدم"
              placeholder="مثال: mohammed_ali"
              {...register("username")}
              error={errors.username?.message}
            />
            {/* رقم الهاتف */}
            <InputField
              label="رقم الهاتف"
              placeholder="+967 XXX XXX XXX"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <InputField
              label=".ext"
              placeholder="إضافة ملحق"
              {...register("ext")}
            />

            <div className="flex flex-col gap-2 w-full text-right">
              <label className="text-gray-600 text-sm font-medium">
                نوع المستخدم
              </label>
              <select
                {...register("userType")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
              >
                <option value={"1"}>تاجر جملة الجملة</option>
                <option value={"2"}>تاجر جملة</option>
                <option value={"3"}>تاجر تجزئة</option>
              </select>
              {errors.userType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.userType?.message}
                </p>
              )}
            </div>

            <InputField
              label="كلمة المرور (أختياري)"
              placeholder="اتركه فارغاً للحفاظ على الكلمة الحالية"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <InputField
              label="تأكيد كلمة المرور"
              placeholder="تأكيد كلمة المرور"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            {/* ملحوظة */}
            <p className="text-xs text-gray-400 mt-4 text-right">
              اتركها فارغة إذا كنت لا تريد تغييرها.
            </p>
            <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
              <Shield size={24} />
              <span className="font-bold text-lg"> الصلاحيات</span>
            </div>
            <div className="px-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-gray-300   transition-all">
                <div className="flex flex-col gap-0.5">
                  <label
                    htmlFor="active-status"
                    className="text-slate-700 font-semibold text-sm cursor-pointer"
                  >
                    حالة النشاط
                  </label>
                  {/* <span className="text-slate-400 text-xs">تفعيل أو تعطيل هذا المستخدم</span> */}
                </div>

                <Controller
                  name="isStaff"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="active-status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="
          data-[state=checked]:bg-purple-900 
          data-[state=unchecked]:bg-slate-200
          transition-colors
        "
                    />
                  )}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-gray-300   transition-all">
                <div className="flex flex-col gap-0.5">
                  <label
                    htmlFor="active-status"
                    className="text-slate-700 font-semibold text-sm cursor-pointer"
                  >
                    فريق العمل؟
                  </label>
                  {/* <span className="text-slate-400 text-xs">تفعيل أو تعطيل هذا المستخدم</span> */}
                </div>

                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="active-status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="
          data-[state=checked]:bg-purple-900 
          data-[state=unchecked]:bg-slate-200
          transition-colors
        "
                    />
                  )}
                />
              </div>
            </div>
            {/* <div className="flex flex-col items-center py-10 gap-4">
              <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="relative w-36 h-36 rounded-full border-[5px] border-gray-100 shadow-xl overflow-hidden bg-white flex items-center justify-center transition-all hover:scale-105">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircle2 size={80} className="text-gray-200" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, field.onChange)}
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#FFC107] hover:bg-[#e0ac00] text-[#2D1B50] font-bold px-8 py-5 rounded-xl shadow-md"
                    >
                      تغيير الصورة
                    </Button>
                  </>
                )}
              />
            </div> */}
            {/* زر الحفظ (إضافي من عندي ليكتمل النموذج) */}
            <div className="mt-8 pt-6 gap-2 border-t border-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>
              <Link
                href={"/dashboard/users"}
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
