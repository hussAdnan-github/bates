"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react'

function page() {
 const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يتم معالجة بيانات الدخول
    console.log("محاولة تسجيل الدخول...");
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50/30 py-12 px-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
        
        {/* العنوان */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D1B50] text-center mb-10">
          تسجيل الدخول
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* حقل اسم المستخدم */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-bold pr-1">
              اسم المستخدم
            </Label>
            <Input 
              id="username" 
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
            <Input 
              id="password" 
              type="password"
              placeholder="أدخل كلمة المرور"
              className="h-12 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] transition-all bg-white"
              required
            />
          </div>

          {/* زر تسجيل الدخول */}
          <Button 
            type="submit" 
            className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-lg h-12 rounded-lg shadow-sm transition-transform active:scale-[0.98] mt-4"
          >
            تسجيل الدخول
          </Button>

          {/* رابط إنشاء حساب */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <Link href="/signUp" className="text-[#2D1B50] font-bold hover:underline">
                إنشاء حساب
              </Link>
            </p>
          </div>

        </form>
      </div>
    </section>
  );
}

export default page