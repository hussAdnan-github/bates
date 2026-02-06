"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, ChevronLeft } from "lucide-react";
function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage, setSelectedImage] = useState(0);

   const product = {
    title: "شنطة لابتوب 16 انش",
    price: "42.00",
    model: "BH01",
    inStock: true,
    category: "شنط فيدفي",
    images: [
      "/images/product.jpg",  
      "/images/product.jpg",
      "/images/product.jpg",
      "/images/product.jpg",
    ],
  };

  const breadcrumbs = ["الرئيسية", "شنط فيدفي", "شنطة لابتوب 16 انش"];

  return (
    <div className="bg-white min-h-screen pb-20" dir="rtl">
      {/* --- Breadcrumbs (مسار التنقل) --- */}
      <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-gray-800 font-bold"
                  : "hover:text-[#F18721] cursor-pointer"
              }
            >
              {item}
            </span>
            {index < breadcrumbs.length - 1 && (
              <ChevronLeft size={14} className="rotate-180" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* --- الجانب الأيمن: معرض الصور --- */}
          <div className="space-y-4">
            {/* الصورة الكبيرة */}
            <div className="relative aspect-square rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-contain p-8 transition-all duration-500"
                priority
              />
            </div>
            {/* الصور المصغرة (Thumbnails) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
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
                    src={img}
                    alt={`thumbnail-${index}`}
                    fill
                    className="object-cover p-1"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- الجانب الأيسر: تفاصيل المنتج --- */}
          {/* <div className="flex flex-col space-y-6 text-right">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
              {product.title}
            </h1>

            <div className="text-3xl font-black text-[#F18721]">
              {product.price} <span className="text-xl">ر.س</span>
            </div>

             <div className="flex items-center gap-4">
              <span className="font-bold text-gray-700">الكمية:</span>
              <div className="flex items-center border rounded-lg bg-gray-50">
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="p-3 hover:text-[#F18721] transition-colors"
                >
                  <Plus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-lg border-x py-2 bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="p-3 hover:text-[#F18721] transition-colors"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>

             <Button className="bg-[#F18721] hover:bg-[#d9771a] h-14 text-xl font-bold rounded-xl shadow-lg shadow-orange-100 flex gap-3 w-full md:w-fit px-12">
              <ShoppingCart size={24} />
             </Button>

             <div className="space-y-3 pt-6 border-t border-gray-100">
              <p className="text-gray-600 font-medium">
                رمز المنتج (model):{" "}
                <span className="text-gray-900 font-bold">{product.model}</span>
              </p>
              <p className="text-gray-600 font-medium">
                التوفر:{" "}
                <span className="text-green-600 font-bold">
                  متوفر في المخزون
                </span>
              </p>
              <p className="text-gray-600 font-medium">
                الفئة:{" "}
                <span className="text-[#F18721] font-bold cursor-pointer hover:underline">
                  {product.category}
                </span>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
