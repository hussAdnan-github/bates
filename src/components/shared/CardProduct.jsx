import Image from "next/image";
import Link from "next/link";
import React from "react";

function CardProduct({id , image , title , price}) {
  return (
    <Link
     
      href={`/shop/products/${id}`}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
 
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5 flex flex-col flex-grow text-center items-center">
        <h3 className="text-lg font-bold text-gray-700 line-clamp-2 h-14 flex items-center mb-2 group-hover:text-[#F18721] transition-colors">
          {title}
        </h3>
        <div className="flex items-baseline gap-1 mt-auto">
          <span className="text-xl font-extrabold text-[#F18721]">
            {price}
          </span>
          <span className="text-sm font-bold text-[#F18721]">ر.س</span>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct;
