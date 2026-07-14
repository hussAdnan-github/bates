"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Building2, Image, Camera, Upload } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { Textarea } from "@/components/ui/textarea";
import { editeCompany, getCompaniesId } from "@/actions/companies";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getUsers } from "@/actions/users";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { companySchema } from "@/lib/validations/companySchema";
 
function page() {
  const { editeid } = useParams();
  const [usersList, setUsersList] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCompaniesId(editeid);

        console.log(data);
        reset({
          nameAr: data?.data?.name_ar || "",
          nameEn: data?.data?.name_en || "",
          description: data?.data?.description || "",
          website: data?.data?.website || "",
          number: data?.data?.number || "",
          primary_color: data?.data?.primary_color || "",
          secondary_color: data?.data?.secondary_color || "",
          custom_user: data?.data?.custom_user || [],
        });

        if (data?.data?.logo) {
          setImagePreview(data.data.logo);
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
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",
      description: "",
      website: "",
      number: "",
      primary_color: "",
      secondary_color: "",
      custom_user: [],
    },
  });
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUsers();

        setUsersList(res?.data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.nameAr) formData.append("name_ar", data.nameAr);
    if (data.nameEn) formData.append("name_en", data.nameEn);
    if (data.description) formData.append("description", data.description);
    if (data.website) formData.append("website", data.website);
    if (data.number) formData.append("number", data.number);
    if (data.primary_color) formData.append("primary_color", data.primary_color);
    if (data.secondary_color) formData.append("secondary_color", data.secondary_color);
    
    if (data.custom_user && data.custom_user.length > 0) {
      data.custom_user.forEach((userId) => {
        formData.append("custom_user", userId);
      });
    }

    if (profileFile) {
      formData.append("logo", profileFile);
    }

    const result = await editeCompany(formData, editeid);

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
      <BackPage title={`تعديل الشركة `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <Building2 size={24} />
            <span className="font-bold text-lg">تفاصيل الشركة</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="اسم الشركة (بالعربية)"
              placeholder="اسم الشركة بالعربية"
              {...register("nameAr")}
              error={errors.nameAr?.message}
            />

            <InputField
              label="اسم الشركة (بالإنجليزية)"
              placeholder="اسم الشركة بالإنجليزية"
              {...register("nameEn")}
              error={errors.nameEn?.message}
            />

            <InputField
              label="رابط الموقع"
              placeholder="https://example.com"
              {...register("website")}
              error={errors.website?.message}
            />

            <InputField
              label="رقم أو ترتيب الشركة (اجباري)"
              type="number"
              placeholder="1"
              {...register("number")}
              error={errors.number?.message}
            />

            <div className="flex flex-col gap-2 w-full text-right">
                <label className="text-gray-600 text-sm font-medium">اللون الأساسي</label>
                <input
                  type="color"
                  {...register("primary_color")}
                  className="w-full h-12 rounded-lg cursor-pointer border border-gray-200"
                />
              </div>
              <div className="flex flex-col gap-2 w-full text-right">
                <label className="text-gray-600 text-sm font-medium">اللون الثانوي</label>
                <input
                  type="color"
                  {...register("secondary_color")}
                  className="w-full h-12 rounded-lg cursor-pointer border border-gray-200"
                />
              </div>

            <div className="md:col-span-2">
              <label className="text-gray-600 text-sm font-medium mb-2 block text-right">
                وصف الشركة
              </label>
              <Textarea
                placeholder="اكتب وصف الشركة"
                {...register("description")}
                error={errors.description?.message}
              />
            </div>
            </div>

            <div>
              <Controller
                name="custom_user"
                control={control}
                render={({ field }) => (
                  <select
                    multiple
                    value={field.value}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value),
                      );
                      field.onChange(values);
                    }}
                    className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50"
                  >
                    {loading ? (
                      <option disabled>جاري تحميل المستخدمين...</option>
                    ) : (
                      usersList.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ))
                    )}
                  </select>
                )}
              />
            </div>
            <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
              <Image size={24} />
              <span className="font-bold text-lg">شعار الشركة</span>
            </div>

            <div className="flex flex-col items-center justify-center mb-8 mt-10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#FFC107]">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-gray-300 w-8 h-8 group-hover:text-[#FFC107] transition-colors" />
                  )}
                </div>
                <label htmlFor="company-logo" className="absolute bottom-0 right-0 bg-purple-900 text-white p-2 rounded-full cursor-pointer hover:bg-orange-400 hover:text-white transition-all shadow-lg">
                  <Upload size={14} />
                  <input id="company-logo" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <span className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">تغيير الشعار (اختياري)</span>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href={"/dashboard/companies"}
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
