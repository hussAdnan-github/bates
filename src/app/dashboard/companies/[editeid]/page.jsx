"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Building2, Image } from "lucide-react";
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
const userSchema = z.object({
  nameAr: z.string().min(3, "اسم بالعربي يجب أن يكون 3 أحرف على الأقل"),
  nameEn: z.string().min(3, "اسم بالانجليزي يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(3, "اسم بالعربي يجب أن يكون 3 أحرف على الأقل"),
  custom_user: z.array(z.number()).min(1, "يجب اختيار  واحدة على الأقل"),
});
function page() {
  const { editeid } = useParams();
  const [usersList, setUsersList] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCompaniesId(editeid);

        console.log(data);
        reset({
          nameAr: data?.data?.name_ar,
          nameEn: data?.data?.name_en,
          description: data?.data?.description,
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
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nameAr: "",
      nameEn: "",

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
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== "" && value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const result = await editeCompany(filteredData, editeid);

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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

            <label className="text-gray-600 text-sm font-medium">
              وصف الشركة
            </label>
            <Textarea
              placeholder="اكتب وصف الشركة"
              {...register("description")}
              error={errors.description?.message}
            />

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

            <div className="mt-8 pt-6 gap-2 border-t border-gray-50 flex justify-end">
              <button className="bg-purple-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg shadow-purple-200">
                حفظ البيانات
              </button>
              <Link
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
