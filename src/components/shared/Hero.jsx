import React from 'react'
import { Button } from '../ui/button';

function Hero() {
  return (
    <section id='/' className="relative w-full bg-[#5B4477] py-20 md:py-44 px-4" dir="rtl">
      <div className="container mx-auto text-center">
        {/* العنوان الرئيسي - Heading */}
        <h1 className="text-white text-3xl md:text-6xl font-black mb-6 leading-tight drop-shadow-sm">
          اكسسوارات تدوم... وقوة لا تُهزم.
        </h1>

        {/* النص الفرعي - Subtitle */}
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
          محمد باتيس للتجارة يقدم لكم أقوى اكسسوارات الجوال في اليمن بضمان حقيقي.
        </p>

        {/* زر الإجراء - Call to Action Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-[#FFC107] hover:bg-[#ffca2c] text-[#2D1B50] font-bold text-lg px-10 py-7 rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            اكتشف فروعنا
          </Button>
        </div>
      </div>

      {/* لمسة جمالية اختيارية: خلفية خفيفة جداً لإضافة عمق */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </section>
  );
}

export default Hero