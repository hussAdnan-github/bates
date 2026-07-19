"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Shield, UserCircle2, Camera, Upload } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { editeUser, getUserId, postUser } from "@/actions/users";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { userSchema } from "@/lib/validations/userSchema";
import { getPlaces } from "@/actions/places";
 

function page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { editeid } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { data: placesData } = useQuery({
    queryKey: ["Places"],
    queryFn: () => getPlaces(),
    staleTime: 1000 * 60 * 60,
  });
  const places = placesData?.data?.results || placesData?.results || [];

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserId(editeid);

        console.log(data);
        const userData = data?.data?.results ? data?.data?.results[0] : (data?.data || data);
        reset({
          username: userData?.username || "",
          first_name: userData?.first_name || "",
          last_name: userData?.last_name || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          place: userData?.place || "",
          // ext: userData?.ext || "",
          userType: userData?.taype_custom?.toString() || "3",
          type_money: userData?.type_money?.toString() || "3",
          isActive: userData?.is_active ?? true,
          isStaff: userData?.is_staff ?? false,
        });

        if (userData?.profile_picture) {
          setImagePreview(userData.profile_picture);
        }
      } catch (error) {
        console.error(error);
      } finally {
        
      }
    }

    fetchUser();
  }, [editeid]);

 

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      place: "",
      // ext: "",
      userType: "3",
      type_money: "3",
      isActive: true,
      isStaff: false,
    }
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.username) formData.append("username", data.username.toLowerCase());
    if (data.email) formData.append("email", data.email);
    if (data.type_money) formData.append("type_money", data.type_money);
    if (data.first_name) formData.append("first_name", data.first_name);
    if (data.last_name) formData.append("last_name", data.last_name);
    if (data.phone) formData.append("phone", data.phone);
    if (data.userType) formData.append("taype_custom", data.userType);
    if (data.place) formData.append("place", data.place);
    
    if (data.password) {
      formData.append("password", data.password);
      formData.append("password2", data.confirmPassword);
    }

    if (profileFile) {
      formData.append("profile_picture", profileFile);
    }

    const result = await editeUser(formData, editeid);

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
      // router.back();
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* اسم المستخدم */}
            <InputField
              label="اسم المستخدم"
              placeholder="مثال: mohammed_ali"
              {...register("username")}
              error={errors.username?.message}
            />

            <InputField
              label="الاسم الأول"
              placeholder="الاسم الأول"
              {...register("first_name")}
              error={errors.first_name?.message}
            />

            <InputField
              label="الاسم الأخير"
              placeholder="الاسم الأخير"
              {...register("last_name")}
              error={errors.last_name?.message}
            />

            <InputField
              label="البريد الإلكتروني"
              placeholder="example@mail.com"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            {/* رقم الهاتف */}
            <InputField
              label="رقم الهاتف"
              placeholder="+967 XXX XXX XXX"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <div className="flex flex-col gap-2 w-full text-right">
              <label className="text-gray-600 text-sm font-medium">
                الموقع (المكان)
              </label>
              <select
                {...register("place")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
              >
                <option value="">اختر المحافظة (اختياري)</option>
                {places.map((place) => (
                  <option key={place.id} value={place.id}>
                    {place.name}
                  </option>
                ))}
              </select>
              {errors.place && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.place?.message}
                </p>
              )}
            </div>
{/* 
            <InputField
              label=".ext"
              placeholder="إضافة ملحق"
              {...register("ext")}
            /> */}

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

            <div className="flex flex-col gap-2 w-full text-right">
              <label className="text-gray-600 text-sm font-medium">
                العملة
              </label>
              <select
                {...register("type_money")}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
              >
                <option value="1">ريال يمني قديم</option>
                <option value="2">ريال يمني جديد</option>
                <option value="3">ريال سعودي</option>
              </select>
              {errors.type_money && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type_money?.message}
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
            </div>
            {/* ملحوظة */}
            <p className="text-xs text-gray-400 mt-2 text-right">
              اتركها فارغة إذا كنت لا تريد تغييرها.
            </p>

            <div className="flex flex-col items-center justify-center mb-8 mt-10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#FFC107]">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-gray-300 w-8 h-8 group-hover:text-[#FFC107] transition-colors" />
                  )}
                </div>
                <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-purple-900 text-white p-2 rounded-full cursor-pointer hover:bg-orange-400 hover:text-white transition-all shadow-lg">
                  <Upload size={14} />
                  <input id="profile-pic" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <span className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">تغيير الصورة (اختياري)</span>
            </div>

            <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
              <Shield size={24} />
              <span className="font-bold text-lg"> الصلاحيات</span>
            </div>
            <div className="px-0 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 transition-all hover:shadow-sm">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="staff-status"
                    className="text-gray-700 font-bold text-sm cursor-pointer"
                  >
                    فريق العمل؟
                  </label>
                  <span className="text-gray-500 text-xs">هل هذا المستخدم من ضمن فريق العمل؟</span>
                </div>

                <Controller
                  name="isStaff"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="staff-status"
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
         
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href={"/dashboard/users"}
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
