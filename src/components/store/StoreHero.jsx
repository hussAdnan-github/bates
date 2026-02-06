 
'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

function StoreHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // مصفوفة النصوص المتغيرة
  const slides = [
    {
      title: "عروض خاصة لفترة محدودة",
      subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
    },
    {
       title: "عروض خاصة لفترة محدودة",
      subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
    },
    {
         title: "عروض خاصة لفترة محدودة",
      subtitle: "كل ما تحتاجه من متطلباتك أصبح في مكان واحد",
    },
  ];

  // تبديل النصوص تلقائياً كل 4 ثوانٍ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

    

  return (
    <section
      className="w-full   min-h-[650px] md:h-[650px]"
      dir="rtl"
    >
       <div className="lg:col-span-8  flex items-center justify-center overflow-hidden">
         <Image
          src="/images/heroStore.jpg"
          alt="Vidvie Store"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/45" /> */}

        {/* محتوى النصوص المتقلبة */}
        <div className=" mt-30  z-10 text-center px-6 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-white text-4xl md:text-7xl font-black mb-6 drop-shadow-md leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-white/90 text-xl md:text-2xl mb-10 font-medium">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <Button
            size="lg"
            className="bg-[#F18721] hover:bg-[#d9771a] text-white px-12 py-8 text-xl font-bold rounded-md shadow-xl"
          >
           <Link href={'/shop/products'}>
            اكتشف العروض
           </Link>
          </Button>

          {/* نقاط التنقل السفلية */}
          <div className="  flex justify-center mt-12 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-[#F18721] w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

       
      
    </section>
  );
}

export default StoreHero;
