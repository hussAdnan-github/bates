// "use client";

 
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Eye, EyeOff, Upload } from "lucide-react";
// import { useState } from "react";
// function page() {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <section
//       className="min-h-screen py-16 bg-gray-50/50 flex items-center justify-center"
//       dir="rtl"
//     >
//       <div className="container mx-auto px-4">
//         <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
//           {/* العناوين */}
//           <div className="text-center mb-10">
//             <h1 className="text-3xl font-black text-[#2D1B50] mb-3">
//               إنشاء حساب جديد
//             </h1>
//             <p className="text-gray-500 text-sm">
//               انضم إلينا الآن واستمتع بأفضل العروض.
//             </p>
//           </div>

//           <form className="space-y-5">
//             {/* اسم المستخدم */}
//             <div className="space-y-2">
//               <Label htmlFor="username" className="text-[#2D1B50] font-bold">
//                 اسم المستخدم
//               </Label>
//               <Input
//                 id="username"
//                 placeholder="مثال: mohammed_ali"
//                 className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
//               />
//             </div>

//             {/* رقم الواتس اب */}
//             <div className="space-y-2">
//               <Label htmlFor="whatsapp" className="text-[#2D1B50] font-bold">
//                 رقم الواتس اب
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="whatsapp"
//                   type="tel"
//                   placeholder="+967 XXX XXX XXX"
//                   className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12 text-left dir-ltr"
//                 />
//               </div>
//             </div>

//             {/* كلمة المرور */}
//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-[#2D1B50] font-bold">
//                 كلمة المرور
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="ادخل كلمة مرور قوية"
//                   className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {/* شروط كلمة المرور كما في الصورة */}
//               {/* <div className="text-[10px] text-gray-400 leading-tight space-y-1 mt-2 px-1">
//                 <p>
//                   • Your password   be too similar to your other personal
//                   information.
//                 </p>
//                 <p>• Your password must contain at least 8 characters.</p>
//                 <p>• Your password   be a commonly used password.</p>
//                 <p>• Your password   be entirely numeric.</p>
//               </div> */}
//             </div>

//             {/* تأكيد كلمة المرور */}
//             <div className="space-y-2">
//               <Label
//                 htmlFor="confirm-password"
//                 className="text-[#2D1B50] font-bold"
//               >
//                 تأكيد كلمة المرور
//               </Label>
//               <Input
//                 id="confirm-password"
//                 type="password"
//                 placeholder="تأكيد كلمة المرور"
//                 className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] h-12"
//               />
//             </div>

//             {/* صورة الملف الشخصي */}
//             <div className="space-y-2">
//               <Label htmlFor="profile-pic" className="text-[#2D1B50] font-bold">
//                 صورة الملف الشخصي (اختياري)
//               </Label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
//                   <div className="flex items-center gap-3 text-gray-400">
//                     <Upload size={20} />
//                     <span className="text-sm">
//                       اختيار ملف / لم يتم اختيار أي ملف
//                     </span>
//                   </div>
//                   <input id="profile-pic" type="file" className="hidden" />
//                 </label>
//               </div>
//             </div>

//             {/* زر إنشاء الحساب */}
//             <Button className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-extrabold text-lg h-14 rounded-xl shadow-md transition-all active:scale-[0.98] mt-4">
//               إنشاء الحساب
//             </Button>

//             {/* رابط تسجيل الدخول */}
//             <div className="text-center mt-6">
//               <p className="text-sm text-gray-600">
//                 لديك حساب بالفعل؟{" "}
//                 <Link
//                   href="/login"
//                   className="text-[#2D1B50] font-bold hover:underline"
//                 >
//                   تسجيل الدخول
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default page;

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Upload, User, Lock, Phone, Camera, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // دالة لمعاينة الصورة عند اختيارها
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="min-h-screen py-12 bg-[#F8F9FA] flex items-center justify-center relative overflow-hidden px-4" dir="rtl">
      
      {/* دوائر الخلفية للتناسق مع صفحة الدخول */}
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
          
          {/* رأس الصفحة */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[#2D1B50] mb-3">انضم لـ <span className="text-[#FFC107]">BTS</span></h1>
            <p className="text-gray-500 font-medium">خطوة واحدة تفصلك عن أفضل تجربة تسوق</p>
          </div>

          <form className="space-y-6">
            
            {/* قسم رفع الصورة بتصميم حديث */}
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
              {/* اسم المستخدم */}
              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="mohammed_ali"
                    className="h-12 pr-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5"
                  />
                </div>
              </div>

              {/* رقم الواتس اب */}
              <div className="space-y-2">
                <Label className="text-gray-600 font-bold mr-1 text-xs">رقم الواتس اب</Label>
                <div className="relative" dir="ltr">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="tel"
                    placeholder="+967 7xx xxx xxx"
                    className="h-12 pl-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5 text-left"
                  />
                </div>
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label className="text-gray-600 font-bold mr-1 text-xs">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="كلمة مرور قوية"
                  className="h-12 pr-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-2">
              <Label className="text-gray-600 font-bold mr-1 text-xs">تأكيد كلمة المرور</Label>
              <div className="relative">
                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="أعد كتابة كلمة المرور"
                  className="h-12 pr-11 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#2D1B50]/5"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D1B50]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* زر الإرسال */}
            <Button className="w-full bg-[#2D1B50] hover:bg-[#1a1030] text-white font-black text-lg h-14 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-4">
              إكمال عملية التسجيل
            </Button>

            {/* الرابط السفلي */}
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