"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonCart from "../store/ButtonCart";

function CardProduct({ id, image, title, price, model, images }) {
  const allImages = [image, ...images.map((img) => img.image)];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden relative">
      
      {/* 1. منطقة الصورة */}
      <div className="relative aspect-square overflow-hidden bg-[#FBFBFB] p-2 md:p-4">
        
        {/* قائمة الصور الجانبية (تظهر فقط في الديسكتوب) */}
        <div className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 flex-col gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-5 group-hover:translate-x-0">
          {allImages.slice(0, 4).map((imgSrc, index) => (
            <button
              key={index}
              onMouseEnter={() => setCurrentIndex(index)}
              className={`relative w-7 h-7 rounded-full overflow-hidden transition-all duration-300 border-2 ${
                currentIndex === index ? "border-[#FFC107] scale-110" : "border-transparent opacity-70"
              }`}
            >
              <Image src={imgSrc} alt="thumb" fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* نقاط التنقل في الموبايل (بدلاً من الصور الجانبية) */}
        <div className="flex md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 z-20 gap-1">
          {allImages.slice(0, 4).map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all ${currentIndex === index ? "w-4 bg-[#FFC107]" : "w-1 bg-gray-300"}`} 
            />
          ))}
        </div>

        {/* الصورة الأساسية */}
        <Link href={`/shop/products/${id}`} className="relative block w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={allImages[currentIndex]}
                alt={title}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          </AnimatePresence>
        </Link>

        {/* الموديل / البراند */}
        <div className="absolute top-2 right-2 md:top-4 md:right-auto md:left-4">
           <span className="bg-[#2D1B50]/10 text-[#2D1B50] text-[9px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-lg backdrop-blur-sm">
             {model}
           </span>
        </div>
      </div>

      {/* 2. منطقة المعلومات */}
      <div className="p-3 md:p-5 flex flex-col flex-grow bg-white">
        <Link href={`/shop/products/${id}`}>
          <h3 className="text-xs md:text-base lg:text-lg font-bold text-gray-800 line-clamp-2 mb-1 md:mb-2 group-hover:text-[#2D1B50] transition-colors leading-tight min-h-[32px] md:min-h-[48px]">
            {title}
          </h3>
        </Link>
        
        <p className="hidden md:block text-[10px] lg:text-xs text-gray-400 mb-4 line-clamp-1">
          أفضل خيار من فئة مستلزمات الهواتف
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5">
               <span className="text-sm md:text-xl lg:text-2xl font-black text-[#2D1B50]">
                {price}
              </span>
              <span className="text-[8px] md:text-xs font-bold text-gray-400">ر.س</span>
            </div>
          </div>

          {/* زر الإضافة - ذكي (أيقونة فقط في الموبايل، نص وأيقونة في الديسكتوب) */}
        
            <ButtonCart id={id} quantity={1} show={1}/>
        
        
          {/* <button className="flex items-center justify-center bg-[#F8F9FA] hover:bg-[#FFC107] text-[#2D1B50] w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-xl transition-all duration-300 font-bold shadow-sm group/btn">
            <span className="hidden md:block text-sm mr-2">أضف</span>
            <Plus className="w-4 h-4 md:hidden" />
            <ShoppingCart className="hidden md:block w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;