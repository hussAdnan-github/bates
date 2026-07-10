"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ImagesProduct({ mainImage, images, title }) {
  const allImages = [{ image: mainImage }, ...(images || [])];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setSelectedImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  useEffect(() => {
    if (isHovered || allImages.length <= 1) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // تغيير الصورة كل 4 ثواني

    return () => clearInterval(interval);
  }, [isHovered, nextImage, allImages.length]);

  if (!allImages.length) return null;

  return (
    <div className="space-y-6">
      {/* الصورة الكبيرة */}
      <div 
        className="relative aspect-square rounded-[2rem] border border-gray-100 overflow-hidden bg-white shadow-xl shadow-gray-200/40 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={allImages[selectedImage].image}
              alt={title || "Product Image"}
              fill
              className="object-contain p-8 sm:p-12 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* مؤشر تقدم الصور (النقاط في الأسفل) */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-gray-100 z-10">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`transition-all duration-500 rounded-full ${
                  selectedImage === idx
                    ? "w-8 h-2 bg-[var(--primary_color)]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* الصور المصغرة (Thumbnails) */}
      {allImages.length > 1 && (
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 styled-scrollbar px-1 snap-x">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white transition-all duration-300 snap-center ${
                selectedImage === index
                  ? "border-2 border-[var(--primary_color)] shadow-xl shadow-[#2D1B50]/10 scale-105"
                  : "border border-gray-100 hover:border-gray-300 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.image}
                alt={`thumbnail-${index}`}
                fill
                className={`object-contain p-2 transition-transform duration-500 ${selectedImage === index ? "scale-110" : ""}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagesProduct;
