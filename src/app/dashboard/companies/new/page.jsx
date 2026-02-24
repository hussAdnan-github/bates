"use client";
import React, { useEffect, useRef, useState } from "react";
import { Building2, Check, Image, PersonStanding, UserCircle2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import InputField from "@/components/dashboard/InputField";
import BackPage from "@/components/dashboard/BackPage";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { postcCompany } from "@/actions/companies";
import { getUsers } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
 
const userSchema = z.object({
  name_ar: z.string().min(3, "اسم بالعربي يجب أن يكون 3 أحرف على الأقل"),
  name_en: z.string().min(3, "اسم بالانجليزي يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(3, "اسم بالعربي يجب أن يكون 3 أحرف على الأقل"),
  custom_user: z.array(z.number()).min(1, "يجب اختيار  واحدة على الأقل"),
}); 
function page() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
   const [errorsApi, setErrorsApi] = useState({});
  const [generalError, setGeneralError] = useState("");
    const route = useRouter();
    const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name_ar: "",
      name_en: "",
      
      description: "",
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
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const result = await postcCompany(data);
 
     if (!result.success) {
      if (result.errors) {
         setErrorsApi(result.errors); 
      } else {
         setGeneralError(result.message);
      }
    } else {
     toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت اضافة شركة بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
       queryClient.invalidateQueries({ queryKey: ["Users"] });

      route.back();
    }
  };
  const handleImageChange = (e, onChange) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto" dir="rtl">
      <BackPage title={`إضافة مستخدم جديد`} />
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section Title */}

        <div className="p-8">
          <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
            <Building2 size={24} />
            <span className="font-bold text-lg">تفاصيل الشركة</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* اسم المستخدم */}
            <InputField
              label="اسم الشركة (بالعربية)"
              placeholder="اسم الشركة بالعربية"
              {...register("name_ar")}
              error={errors.name_ar?.message}
            />

            <InputField
              label="اسم الشركة (بالإنجليزية)"
              placeholder="اسم الشركة بالإنجليزية"
              {...register("name_en")}
              error={errors.name_en?.message}
            />

            <label className="text-gray-600 text-sm font-medium">
              وصف الشركة
            </label>
            <Textarea
              placeholder="اكتب وصف الشركة"
              {...register("description")}
              error={errors.description?.message}
            />
            <div></div>

            <div className="p-6 border-b border-gray-50 flex items-center justify-start gap-2 text-purple-900">
              <PersonStanding size={24} />
              <span className="font-bold text-lg"> المستخدمون المرتبطون</span>
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
  <div className="flex flex-col items-center py-10 gap-4">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="relative w-36 h-36 rounded-full border-[5px] border-gray-100 shadow-xl overflow-hidden bg-white flex items-center justify-center transition-all hover:scale-105">
                      {preview ? (
                        <img
                          src={preview}
                          alt="image"
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
            </div>
            <div className="mt-8 pt-6 gap-2 border-t border-gray-50 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 disabled:bg-gray-400"
              >
                {isSubmitting ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>   <Link
                              href={"/dashboard/companies"}
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
