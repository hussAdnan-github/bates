"use client";

 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Upload } from "lucide-react";
import { useState } from "react";
function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section
      className="min-h-screen py-16 bg-gray-50/50 flex items-center justify-center"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          {/* العناوين */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[#2D1B50] mb-3">
              إنشاء حساب جديد
            </h1>
            <p className="text-gray-500 text-sm">
              انضم إلينا الآن واستمتع بأفضل العروض.
            </p>
          </div>

          <form className="space-y-5">
            {/* اسم المستخدم */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#2D1B50] font-bold">
                اسم المستخدم
              </Label>
              <Input
                id="username"
                placeholder="مثال: mohammed_ali"
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
              />
            </div>

            {/* رقم الواتس اب */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-[#2D1B50] font-bold">
                رقم الواتس اب
              </Label>
              <div className="relative">
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="+967 XXX XXX XXX"
                  className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12 text-left dir-ltr"
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2D1B50] font-bold">
                كلمة المرور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="ادخل كلمة مرور قوية"
                  className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* شروط كلمة المرور كما في الصورة */}
              {/* <div className="text-[10px] text-gray-400 leading-tight space-y-1 mt-2 px-1">
                <p>
                  • Your password   be too similar to your other personal
                  information.
                </p>
                <p>• Your password must contain at least 8 characters.</p>
                <p>• Your password   be a commonly used password.</p>
                <p>• Your password   be entirely numeric.</p>
              </div> */}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-[#2D1B50] font-bold"
              >
                تأكيد كلمة المرور
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="تأكيد كلمة المرور"
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
              />
            </div>

            {/* صورة الملف الشخصي */}
            <div className="space-y-2">
              <Label htmlFor="profile-pic" className="text-[#2D1B50] font-bold">
                صورة الملف الشخصي (اختياري)
              </Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Upload size={20} />
                    <span className="text-sm">
                      اختيار ملف / لم يتم اختيار أي ملف
                    </span>
                  </div>
                  <input id="profile-pic" type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* زر إنشاء الحساب */}
            <Button className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-extrabold text-lg h-14 rounded-xl shadow-md transition-all active:scale-[0.98] mt-4">
              إنشاء الحساب
            </Button>

            {/* رابط تسجيل الدخول */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="text-[#2D1B50] font-bold hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default page;
