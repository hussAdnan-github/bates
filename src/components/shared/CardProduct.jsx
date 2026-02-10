"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function CardProduct({ id, image, title, price, model, images }) {
  const allImages = [image, ...images.map((img) => img.image)];
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (hovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length);
      }, 800);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [hovered, allImages.length]);

  return (
    <Link
      href={`/shop/products/${id}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {allImages.map((imgSrc, index) => (
          <Image
            key={index}
            src={imgSrc}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out absolute
        ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        <div className="flex justify-center gap-2 mt-3">
          {allImages.map((imgSrc, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all
        ${
          currentIndex === index
            ? "border-[#F18721] scale-110"
            : "border-gray-200 hover:border-[#F18721]"
        }`}
            >
              <Image
                src={imgSrc}
                alt={`${title}-${index}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow text-center items-center">
        <h3 className="text-lg font-bold text-gray-700 line-clamp-2 h-14 flex items-center mb-2 group-hover:text-[#F18721] transition-colors">
          {title}
        </h3>
        <div className="flex items-baseline gap-1 mt-auto">
          <span className="text-xl font-extrabold text-[#F18721]">{price}</span>
          <span className="text-sm font-bold text-[#F18721]">ر.س</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-[#F18721]">{model}</span>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
