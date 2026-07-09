"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Headset, BadgeCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  
  return (
    <section className="relative py-6 bg-gray-50/50 overflow-hidden" dir="rtl">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFC107]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2D1B50]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 lg:max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse"></span>
              <span className="text-sm font-bold text-gray-600">تعرف على متجرنا</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2D1B50] mb-6 leading-tight">
              نحن نبتكر تجربة <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#FFC107] to-orange-400">
                تسوق استثنائية
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
              نحن منصة رائدة متخصصة في تقديم أفضل المنتجات التقنية والإلكترونية بأعلى معايير الجودة. 
              نسعى دائماً لتوفير أحدث التقنيات لعملائنا، بالتعاون مع كبرى الشركات العالمية مثل <strong className="text-[#2D1B50]">UGREEN</strong> و <strong className="text-[#2D1B50]">VIDVE</strong> لضمان توفير منتجات أصلية ومضمونة تلبي كافة احتياجاتك.
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-[#2D1B50] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#3a2366] transition-colors shadow-lg shadow-[#2D1B50]/20 group">
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex-1 w-full lg:w-auto relative"
          >
            <div className="relative aspect-[4/5] max-w-[500px] mx-auto w-full">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFC107] to-orange-200 rounded-[3rem] rotate-3 scale-105 opacity-20 blur-lg"></div>
              <div className="absolute inset-0 border-2 border-[#FFC107]/30 rounded-[3rem] -rotate-3 transition-transform duration-500 hover:rotate-0"></div>
              
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-white group">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="تقنيات حديثة" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B50]/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#FFC107] rounded-full flex items-center justify-center text-[#2D1B50] font-black text-xl">
                    100%
                  </div>
                  <div>
                    <p className="font-bold text-[#2D1B50]">منتجات مضمونة</p>
                    <p className="text-xs text-gray-500 font-medium">جودة عالية دائماً</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
