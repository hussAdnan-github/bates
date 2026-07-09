// "use client";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// function StoreHero() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//    const slides = [
//     {
//       title: "عروض خاصة لفترة محدودة",
//       subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
//     },
//     {
//       title: "عروض خاصة لفترة محدودة",
//       subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
//     },
//     {
//       title: "عروض خاصة لفترة محدودة",
//       subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
//     },
//   ];

//    useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="w-full   min-h-[650px] md:h-[650px]" dir="rtl">
//       <div className="lg:col-span-8  flex items-center justify-center overflow-hidden">
//         <Image
//           src="/images/heroStore.jpg"
//           alt="Vidvie Store"
//           fill
//           className="object-cover"
//           priority
//         />
//         {/* <div className="absolute inset-0 bg-black/45" /> */}

//         {/* محتوى النصوص المتقلبة */}
//         <div className=" mt-30  z-10 text-center px-6 max-w-3xl">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentSlide}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             >
//               <h1 className="text-white text-4xl md:text-7xl font-black mb-6 drop-shadow-md leading-tight">
//                 {slides[currentSlide].title}
//               </h1>
//               <p className="text-white/90 text-xl md:text-2xl mb-10 font-medium">
//                 {slides[currentSlide].subtitle}
//               </p>
//             </motion.div>
//           </AnimatePresence>

//           <Button
//             size="lg"
//             className="bg-secondary hover:bg-secondary-hover text-white px-12 py-8 text-xl font-bold rounded-md shadow-xl"
//           >
//             <Link href={"/products"}>اكتشف العروض</Link>
//           </Button>

//           {/* نقاط التنقل السفلية */}
//           <div className="  flex justify-center mt-12 gap-3">
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentSlide === index ? "bg-secondary w-8" : "bg-white/50"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default StoreHero;


"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

function StoreHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "عروض خاصة لفترة محدودة",
      subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد بأسعار تنافسية",
    },
    {
      title: "أحدث التقنيات بين يديك",
      subtitle: "اكتشف تشكيلة واسعة من مستلزمات الهواتف الذكية الأصلية",
    },
    {
      title: "جودة نضمنها لك",
      subtitle: "تسوق الآن واحصل على توصيل سريع لجميع فروعنا",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // زدنا الوقت قليلاً ليتمكن المستخدم من القراءة
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden" dir="rtl">
      {/* الخلفية مع طبقة التعتيم */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroStore.jpg"
          alt="Vidvie Store"
          fill
          className="object-cover"
          priority
        />
        {/* التعتيم المتدرج لجعل النص يبرز بقوة */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#2D1B50]/80 via-[#2D1B50]/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" /> 
      </div>

      {/* المحتوى */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl text-right">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block bg-[var(--primary_color)] text-[var(--secondary_color)] px-4 py-1 rounded-full text-sm font-bold mb-4"
              >
                وصل حديثاً
              </motion.span>
              
              <h1 className="text-white text-4xl md:text-7xl font-black mb-6 leading-[1.2] drop-shadow-xl">
                {slides[currentSlide].title}
              </h1>
              
              <p className="text-white/90 text-lg md:text-2xl mb-10 font-light leading-relaxed max-w-xl">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[var(--primary_color)] hover:bg-[var(--primary_color)]/60 text-[var(--secondary_color)] px-10 py-7 text-xl font-bold rounded-xl shadow-2xl shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Link href="/products">اكتشف العروض</Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[var(--secondary_color)] px-10 py-7 text-xl font-bold rounded-xl backdrop-blur-sm transition-all"
            >
              <Link href="/orders">طلباتي</Link>
            </Button>
          </div>

          {/* نقاط التنقل (Dots) المحسنة */}
          <div className="flex justify-start mt-16 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentSlide === index 
                  ? "bg-[var(--primary_color)] w-10 h-2" 
                  : "bg-white/30 w-2 h-2 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreHero;