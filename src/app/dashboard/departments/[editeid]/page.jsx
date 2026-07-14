"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Bookmark, Building2, UserCircle2, Camera, Upload } from "lucide-react";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { editeDepartment, getDepartmentId } from "@/actions/department";
import { useQueryClient } from "@tanstack/react-query";
import { getCompanies } from "@/actions/companies";
import { toast } from "sonner";
import Link from "next/link";
import { departmentSchema } from "@/lib/validations/departmentSchema";
 
function page() {
  const { editeid } = useParams();
  const [comaniesList, setComaniesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getDepartmentId(editeid);
        const res = await getCompanies();

        setComaniesList(res?.data?.results || []);

        reset({
          name: data?.data?.name,
          number: data?.data?.number?.toString() || "",
          company: data?.data?.company || [],
        });

        if (data?.data?.icons) {
          setImagePreview(data.data.icons);
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
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      number: "",
      company: [],
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.number) formData.append("number", data.number);
    
    if (data.company && data.company.length > 0) {
      data.company.forEach((id) => {
        formData.append("company", id);
      });
    } else {
      formData.append("company", ""); // Or handle empty array based on backend needs
    }

    if (iconFile) {
      formData.append("icons", iconFile);
    }

    const result = await editeDepartment(formData, editeid);

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
      queryClient.invalidateQueries({ queryKey: ["Departments"] });

      toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت تعديل القسم بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
      router.back();
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`تعديل القسم `} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
          <Bookmark size={24} />
          <span className="font-bold text-lg">تفاصيل قسم</span>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* اسم القسم */}
            <InputField
              label="اسم القسم"
              placeholder="ادخل اسم القسم"
              {...register("name")}
              error={errors.name?.message}
            />

            {/* الرقم */}
            <InputField
              label="رقم أو ترتيب القسم (اجباري)"
              placeholder="1"
              type="number"
              {...register("number")}
              error={errors.number?.message}
            />
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-gray-600 text-sm font-medium">
                {" "}
                الشركات المتربطة
              </label>
              <div>
                <Controller
                  name="company"
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
                        comaniesList.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name_ar + " " + company.name_en}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                />
              </div>
            </div>
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
                <label htmlFor="icon-pic" className="absolute bottom-0 right-0 bg-purple-900 text-white p-2 rounded-full cursor-pointer hover:bg-orange-400 hover:text-white transition-all shadow-lg">
                  <Upload size={14} />
                  <input id="icon-pic" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <span className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">أيقونة القسم (اختياري)</span>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href={"/dashboard/departments"}
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
