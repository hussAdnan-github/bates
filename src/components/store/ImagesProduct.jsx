"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImagesProduct({ mainImage, images, title }) {
  const allImages = [{ image: mainImage }, ...images];

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* الصورة الكبيرة */}
      <div className="relative aspect-square rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
        <Image
          src={allImages[selectedImage].image}
          alt={title}
          fill
          className="object-contain p-8 transition-all duration-500"
          priority
        />
      </div>
      {/* الصور المصغرة (Thumbnails) */}
      <div className="grid grid-cols-4 gap-4">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg border-2 overflow-hidden bg-gray-50 transition-all ${
              selectedImage === index
                ? "border-[#F18721]"
                : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <Image
              src={img.image}
              alt={`thumbnail-${index}`}
              fill
              className="object-cover p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImagesProduct;
