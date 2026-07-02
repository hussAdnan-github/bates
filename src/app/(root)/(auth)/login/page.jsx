"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

function LoginPage() { 
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/Account/LogIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        if (data.user === "admin") return router.replace("/dashboard");
        router.replace("/shop");
        router.refresh();
      } else {
        setError(data.error || "اسم المستخدم أو كلمة المرور غير صحيحة");
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال. يرجى التحقق من الإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F8F9FA] relative overflow-hidden py-12 px-4" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FFC107] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2D1B50] rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px] z-10"
      >
        {/* اللوجو */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-black text-[#2D1B50] tracking-tighter">
            BTS <span className="text-[#FFC107]">STORE</span>
          </Link>
          <p className="text-gray-500 mt-2 font-medium">مرحباً بك مجدداً في متجرنا</p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
          <h1 className="text-2xl font-black text-[#2D1B50] text-center mb-8">تسجيل الدخول</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 font-medium"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {/* اسم المستخدم */}
            <div className="space-y-2">
              <Label className="text-gray-600 font-bold mr-1 text-xs uppercase tracking-wider">اسم المستخدم</Label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2D1B50] transition-colors">
                  <User size={18} />
                </div>
                <Input
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="h-14 pr-11 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#2D1B50]/5 transition-all"
                  required
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-gray-600 font-bold text-xs uppercase tracking-wider">كلمة المرور</Label>
                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-gray-400 hover:text-[#2D1B50]">نسيت الكلمة؟</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2D1B50] transition-colors">
                  <Lock size={18} />
                </div>
                <Input
                  type={showpassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 pr-11 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#2D1B50]/5 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowpassword(!showpassword)}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-[#2D1B50] transition-colors"
                >
                  {showpassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#2D1B50] hover:bg-[#1a1030] text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                "دخول للمتجر"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500 font-medium">
                عضو جديد؟{" "}
                <Link href="/signUp" className="text-[#FFC107] font-black hover:underline underline-offset-4">
                   أنشئ حسابك الآن
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default LoginPage;