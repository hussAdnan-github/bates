import React from 'react'
import Image from "next/image";

function Branches() {
  const branchData = [
    {
      name: "فرع صنعاء",
      location: "شارع التحرير - جوار مول سيتي ستار",
      // استبدل المسار بمسار الصورة الحقيقي لديك في مجلد public
      image: "/images/sanaa-branch.png", 
    },
    {
      name: "فرع المكلا",
      location: "شارع المستشفى - مقابل برج العرب",
      image: "/images/mukalla-branch.png",
    },
    {
      name: "فرع القطن",
      location: "السوق العام - بجانب صرافة العمقي",
      image: "/images/qatn-branch.png",
    },
  ];

  return (
    <section id='branches' className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D1B50] mb-16">
          نقاط البيع الرئيسية
        </h2>

        {/* شبكة الفروع */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchData.map((branch, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md"
            >
              {/* حاوية الصورة - تحسين الأداء باستخدام next/image */}
              <div className="relative w-full h-32 mb-6 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={branch.image}
                  alt={branch.name}
                  fill
                  className="object-contain" // لتظهر الصور (اللغويات) كاملة بدون قص
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* تفاصيل الفرع */}
              <h3 className="text-xl font-bold text-[#2D1B50] mb-2">
                {branch.name}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {branch.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Branches