"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Upload, User, Lock, Phone, Camera, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// بناء المخطط (Schema) للتحقق من صحة البيانات باستخدام Zod
const registerSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح").or(z.literal("")).optional(),
  phone: z.string().min(9, "رقم الهاتف غير صالح"),
  password: z.string().min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل"),
  password2: z.string(),
}).refine((data) => data.password === data.password2, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["password2"],
});

function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("password2", data.password2);
      if (data.email) formData.append("email", data.email);
      if (data.first_name) formData.append("first_name", data.first_name);
      if (data.last_name) formData.append("last_name", data.last_name);
      formData.append("phone", data.phone);
      
      // if (profileFile) {
      //   formData.append("profile_picture", profileFile);
      // }
 
      const res = await fetch("https://bts.pythonanywhere.com/api/register/", {
        method: "POST",
        body: formData,
      });
     console.log(Object.fromEntries(formData));
      const responseData = await res.json();
 console.log(responseData);
      if (res.ok && (responseData.success || responseData.token || !responseData.error)) {
        toast.success("تم إنشاء الحساب بنجاح!");
        router.replace("/login");
      } else {
        const errorMsg = responseData.error || Object.values(responseData).flat()[0] || "حدث خطأ أثناء التسجيل";
        toast.error(typeof errorMsg === 'string' ? errorMsg : "تأكد من صحة البيانات المدخلة");
      }
    } catch (err) {
      toast.error("حدث خطأ في الاتصال. يرجى التحقق من الإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-12 bg-[#F8F9FA] flex items-center justify-center relative overflow-hidden px-4" dir="rtl">

      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#FFC107] rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#2D1B50] rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl z-10"
      >
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[#2D1B50] mb-3">انضم لـ <span className="text-[#FFC107]">BTS</span></h1>
            <p className="text-gray-500 font-medium">خطوة واحدة تفصلك عن أفضل تجربة تسوق</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#FFC107]">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="text-gray-300 w-8 h-8 group-hover:text-[#FFC107] transition-colors" />
                  )}
                </div>
                <label htmlFor="profile-pic" className="absolute bottom-0 right-0 bg-[#2D1B50] text-white p-2 rounded-full cursor-pointer hover:bg-[#FFC107] hover:text-[#2D1B50] transition-all shadow-lg">
                  <Upload size={14} />
                  <input id="profile-pic" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <span className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">صورة الحساب (اختياري)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">الاسم الأول</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("first_name")}
                    placeholder="الاسم الأول"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.first_name ? "border-red-500" : "border-gray-100"}`}
                  />
                </div>
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">الاسم الأخير</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("last_name")}
                    placeholder="الاسم الأخير"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.last_name ? "border-red-500" : "border-gray-100"}`}
                  />
                </div>
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("username")}
                    placeholder="mohammed_ali"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.username ? "border-red-500" : "border-gray-100"}`}
                  />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">البريد الإلكتروني (اختياري)</Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="example@mail.com"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl text-left focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.email ? "border-red-500" : "border-gray-100"}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600 font-bold mr-1 text-xs">رقم الواتس اب</Label>
              <div className="relative" dir="ltr">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+967 7xx xxx xxx"
                  className={`h-12 pl-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 text-left ${errors.phone ? "border-red-500" : "border-gray-100"}`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 text-right">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة مرور قوية"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.password ? "border-red-500" : "border-gray-100"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    {...register("password2")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="أعد كتابة كلمة المرور"
                    className={`h-12 pr-11 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 ${errors.password2 ? "border-red-500" : "border-gray-100"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D1B50] hover:bg-[#1a1030] text-white font-black text-lg h-14 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "جاري التسجيل..." : "إكمال عملية التسجيل"}
            </Button>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500 font-medium">
                تمتلك حساباً بالفعل؟{" "}
                <Link href="/login" className="text-[#FFC107] font-black hover:underline underline-offset-4">
                  سجل دخولك هنا
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default SignUpPage;