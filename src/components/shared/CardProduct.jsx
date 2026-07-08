

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonCart from "../store/ButtonCart";

function CardProduct({ id, image, title, prices, model, images, type_money = "3" }) {
console.log(prices.retail_price, "prices")
  const allImages = [image, ...images.map((img) => img.image)];
  const [currentIndex, setCurrentIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

   const currencyName = type_money === "3" ? "ر.س" : type_money === "1" ? "يمني قديم" : "ر.س";

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      return;
    }

    const numValue = parseInt(value);
    if (numValue > 0) {
      setQuantity(numValue);
    }
  };

  // وظيفة للتأكد من أن القيمة ليست فارغة عند خروج المستخدم من الحقل
  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };

  return (
    <div className="group bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden relative">

      {/* 1. منطقة الصورة */}
      <div className="relative aspect-square overflow-hidden bg-[#FBFBFB] p-2 md:p-4">

        {/* قائمة الصور الجانبية */}
        <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 md:gap-2 bg-white/40 backdrop-blur-md p-1 md:p-1.5 rounded-full border border-white/50 transition-all duration-500
          opacity-100 translate-x-0 
          md:opacity-0 md:group-hover:opacity-100 md:translate-x-5 md:group-hover:translate-x-0">

          {allImages.slice(0, 4).map((imgSrc, index) => (
            <button
              key={index}
              onMouseEnter={() => setCurrentIndex(index)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`relative w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden transition-all duration-300 border-2 ${currentIndex === index
                ? "border-[var(--primary_color)] scale-110"
                : "border-transparent opacity-70"
                }`}
            >
              <Image src={imgSrc} alt="thumb" fill className="object-cover" />
            </button>
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
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className="bg-[var(--primary_color)] text-[var(--secondary_color)] text-[9px] md:text-[10px] font-black px-2 py-0.5 md:px-3 md:py-1 rounded-lg backdrop-blur-sm">
            {model}
          </span>
        </div>
      </div>

      {/* 2. منطقة المعلومات */}
      <div className="p-3 md:p-5 flex flex-col flex-grow bg-white">
        <Link href={`/shop/products/${id}`}>
          <h3 className="text-xs md:text-base lg:text-lg font-bold text-gray-800 line-clamp-2 mb-1 md:mb-2 group-hover:text-[var(--primary_color)] transition-colors leading-tight min-h-[32px] md:min-h-[48px]">
            {title}
          </h3>
        </Link>

        <div className="flex flex-col gap-3 mt-auto pt-2">
           <div className="flex items-center justify-between">
            <div className="flex flex-row gap-4">
              {prices?.retail_price && (
                <div className="flex items-center gap-0.5">
                  <span className="text-sm md:text-xl lg:text-2xl font-black text-[var(--secondary_color)]">
                    {prices.retail_price}
                  </span>
                  <span className="text-[8px] md:text-xs font-bold text-gray-400">{currencyName}</span>
                </div>
              )}
              {prices?.wholesale_price && (
                <div className="flex items-center gap-0.5">
                  <span className="text-sm md:text-xl lg:text-sm font-black text-gray-500">
                    {prices.wholesale_price}
                  </span>
                  <span className="text-[8px] md:text-xs font-bold text-gray-400">{currencyName}</span>
                </div>
              )}
            </div>

            {/* 2. حقل إدخال العدد (Quantity Input) */}
            <div className="flex items-center gap-2">
              <label className="hidden md:block text-[10px] font-bold text-gray-400">الكمية:</label>
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation(); // منع الانتقال لصفحة المنتج عند النقر للكتابة
                }}
                min="1"
                className="w-12 h-8 md:w-16 md:h-10 bg-gray-50 border border-gray-200 rounded-lg text-center text-xs md:text-sm font-bold text-gray-700 focus:outline-none focus:border-[var(--primary_color)] focus:ring-1 focus:ring-[var(--primary_color)] transition-all"
              />
            </div>
          </div>

          {/* زر السلة - نمرر له الكمية المدخلة */}
          <div className="w-full">
            <ButtonCart 
              id={id} 
              quantity={Number(quantity)} 
              show={1} 
              product={{
                id,
                products_name: title,
                products_price: prices.price,
                products_image: image,
                products_model: model,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;