'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function Contact() {
 const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال البيانات (API call)
    console.log("تم إرسال الرسالة بنجاح");
  };

  return (
    <section id='contact' className="py-20 bg-gray-50/30" dir="rtl">
      <div className="container mx-auto px-4">
        {/* العناوين */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B50] mb-4">
            تواصل معنا
          </h2>
          <p className="text-gray-500 text-lg">
            هل لديك استفسار؟ فريقنا جاهز لمساعدتك!
          </p>
        </div>

        {/* نموذج التواصل */}
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* حقل الاسم */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#2D1B50] font-bold">الاسم </Label>
              <Input 
                id="name" 
                placeholder="أدخل اسمك " 
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] py-6 text-right"
                required
              />
            </div>

            {/* حقل الواتساب */}
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-[#2D1B50] font-bold">رقم الواتساب</Label>
              <Input 
                id="whatsapp" 
                type="tel"
                placeholder="777 000 000" 
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] py-6 text-right"
                required
              />
            </div>

            {/* حقل البريد الإلكتروني */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2D1B50] font-bold">البريد الإلكتروني (اختياري)</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="@gmail.com" 
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] py-6 text-right"
              />
            </div>

            {/* حقل الرسالة */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#2D1B50] font-bold">رسالتك</Label>
              <Textarea 
                id="message" 
                placeholder="اكتب رسالتك ..." 
                className="bg-gray-50 border-gray-200 focus:border-[#2D1B50] focus:ring-[#2D1B50] min-h-[150px] text-right"
                required
              />
            </div>

            {/* زر الإرسال */}
            <Button 
              type="submit" 
              className="w-full bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-lg py-7 rounded-lg shadow-md transition-all active:scale-[0.98]"
            >
              إرسال الرسالة
            </Button>
            
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact