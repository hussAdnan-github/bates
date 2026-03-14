// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// function CardProduct({ id, image, title, price, model, images }) {
//   const allImages = [image, ...images.map((img) => img.image)];
//   const [hovered, setHovered] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (hovered) {
//       interval = setInterval(() => {
//         setCurrentIndex((prev) => (prev + 1) % allImages.length);
//       }, 800);
//     } else {
//       setCurrentIndex(0);
//     }
//     return () => clearInterval(interval);
//   }, [hovered, allImages.length]);

//   return (
//     <Link
//       href={`/shop/products/${id}`}
//       className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div className="relative aspect-square overflow-hidden bg-gray-50">
//         {allImages.map((imgSrc, index) => (
//           <Image
//             key={index}
//             src={imgSrc}
//             alt={title}
//             fill
//             className={`object-cover transition-opacity duration-700 ease-in-out absolute
//         ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
//           />
//         ))}

//         <div className="flex justify-center gap-2 mt-3">
//           {allImages.map((imgSrc, index) => (
//             <button
//               key={index}
//               onClick={(e) => {
//                 e.preventDefault();
//                 setCurrentIndex(index);
//               }}
//               className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all
//         ${
//           currentIndex === index
//             ? "border-secondary scale-110"
//             : "border-gray-200 hover:border-secondary-hover"
//         }`}
//             >
//               <Image
//                 src={imgSrc}
//                 alt={`${title}-${index}`}
//                 fill
//                 className="object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="p-5 flex flex-col flex-grow text-center items-center">
//         <h3 className="text-lg font-bold text-gray-700 line-clamp-2 h-14 flex items-center mb-2 group-hover:text-secondary transition-colors">
//           {title}
//         </h3>
//         <div className="flex items-baseline gap-1 mt-auto">
//           <span className="text-xl font-extrabold text-secondary">{price}</span>
//           <span className="text-sm font-bold text-secondary">ر.س</span>
//         </div>
//         <div className="flex items-baseline gap-1">
//           <span className="text-xl font-extrabold text-secondary">{model}</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default CardProduct;
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CardProduct({ id, image, title, price, model, images }) {
  const allImages = [image, ...images.map((img) => img.image)];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden">
      
      {/* 1. منطقة العرض (Image Display) */}
      <div className="relative aspect-square overflow-hidden bg-[#F8F9FA] p-4">
        
        {/* قائمة الصور الجانبية (The Professional List) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 bg-white/40 backdrop-blur-md p-1.5 rounded-full border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-5 group-hover:translate-x-0">
          {allImages.map((imgSrc, index) => (
            <button
              key={index}
              onMouseEnter={() => setCurrentIndex(index)}
              className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 border-2 ${
                currentIndex === index 
                ? "border-[#FFC107] scale-110 shadow-sm" 
                : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image 
                src={imgSrc} 
                alt="thumb" 
                fill 
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* الصورة الأساسية مع انيميشن ناعم */}
        <Link href={`/shop/products/${id}`} className="relative block w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={allImages[currentIndex]}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        </Link>

        {/* علامة "وصل حديثاً" أو الموديل */}
        <div className="absolute top-4 left-4">
           <span className="bg-[#2D1B50] text-white text-[10px] font-bold px-3 py-1 rounded-full">
             {model}
           </span>
        </div>
      </div>

      {/* 2. منطقة المعلومات (Info Section) */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <Link href={`/shop/products/${id}`}>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2 group-hover:text-[#2D1B50] transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-xs text-gray-400 mb-4 line-clamp-1">
          أفضل خيار من فئة مستلزمات الهواتف الذكية
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#2D1B50]">
              {price} <span className="text-xs font-bold text-gray-400">ر.س</span>
            </span>
          </div>

          <button className="flex items-center gap-2 bg-[#F8F9FA] hover:bg-[#FFC107] text-[#2D1B50] px-4 py-2 rounded-xl transition-all duration-300 font-bold text-sm group/btn shadow-sm">
            <span>أضف</span>
            <ShoppingCart className="w-4 h-4 group-hover/btn:translate-x-[-2px] transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;