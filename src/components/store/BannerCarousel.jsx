"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const defaultImages = [
  "/images/heroStore.jpg"
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % defaultImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[150px] md:h-[200px] lg:h-[260px] rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm border border-gray-100 mb-2 group bg-gray-100" dir="ltr">
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {defaultImages.map((src, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Banner ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            {/* طبقة داكنة جمالية */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent opacity-50" />
          </div>
        ))}
      </div>

      {/* التمرير المصغر (Pagination) */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" dir="rtl">
        {defaultImages.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative transition-all duration-300 rounded-md overflow-hidden ${
              currentIndex === idx 
                ? "w-12 h-8 md:w-14 md:h-9 border-2 border-[var(--primary_color)]   scale-110" 
                : "w-10 h-6 md:w-12 md:h-7 border-2 border-white/50 opacity-60 hover:opacity-100 hover:border-white"
            }`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
