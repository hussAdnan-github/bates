"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
     setError("");
    setLoading(true);
console.log(username , password)
      try {
      const res = await fetch("/api/Account/LogIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      console.log("📥 Response from API:", data);

      if (data.success) {
        router.replace("/shop");
        router.refresh();

      } else {
        setError(data.error || "حدث خطأ أثناء تسجيل الدخول.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-[80vh] flex items-center justify-center bg-gray-50/30 py-12 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        {/* العنوان */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B50] text-center mb-10">
          تسجيل الدخول
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center font-medium">
              {error}
            </div>
          )}

          {/* حقل اسم المستخدم */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-bold pr-1">
              اسم المستخدم
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              type="text"
              placeholder="أدخل اسم المستخدم"
              className="h-12 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] transition-all bg-white"
              required
            />
          </div>

          {/* حقل كلمة المرور */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-bold pr-1">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showpassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="h-12 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] transition-all bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowpassword(!showpassword)}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showpassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* زر تسجيل الدخول */}
          <Button
            type="submit"
             disabled={loading}
            className={`w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-lg h-12 rounded-lg shadow-sm transition-transform active:scale-[0.98] mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
                    {loading ? "جاري تسجيل الدخول" : "تسجيل الدخول"}

          </Button>

          {/* رابط إنشاء حساب */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <Link
                href="/signUp"
                className="text-[#2D1B50] font-bold hover:underline"
              >
                إنشاء حساب
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default page;
