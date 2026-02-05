import React from "react";
import { ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

function Features() {
  const features = [
    {
      title: "جودة فائقة",
      description: "مصنوعة من أفضل المواد لتحمل أصعب الظروف.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "شحن فائق السرعة",
      description: "تقنيات شحن حديثة توفر لك أسرع وقت ممكن.",
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      bgColor: "bg-orange-50",
    },
    {
      title: "ضمان معتمد",
      description: "نثق في منتجاتنا ونقدم ضماناً حقيقياً للعملاء.",
      icon: <CheckCircle2 className="w-8 h-8 text-green-500" />,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50/50" dir="rtl">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2D1B50] mb-16">
          لماذا تختار منتجات باتيس؟
        </h2>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* الأيقونة مع الخلفية الدائرية */}
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </div>

              {/* نصوص البطاقة */}
              <h3 className="text-xl font-bold text-[#2D1B50] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
