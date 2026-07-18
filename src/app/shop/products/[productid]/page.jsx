import React from "react";

import { ShoppingCart, Plus, Minus, ChevronLeft } from "lucide-react";
import ImagesProduct from "@/components/store/ImagesProduct";
import { getProdutsId } from "@/actions/product";
import QuantityProduct from "@/components/store/QuantityProduct";
import { Button } from "@/components/ui/button";
import ButtonCart from "@/components/store/ButtonCart";
import ProductActionSection from "@/components/store/ProductActionSection";
import { cookies } from "next/headers";

async function page({ params }) {

  const Productid = (await params).productid;

  const product = await getProdutsId(Productid);

  console.log("===== Product Images Debug =====", {
    mainImage: product.data.image,
    subImages: product.data.images
  }); 
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const currencyName = type_money === "3" ? "ر.س" : type_money === "1" ? "يمني قديم" : "ر.س";

  const breadcrumbs = ["الرئيسية", `${product.data.name_department}`  ,`${product.data.name}` ];

  return (
    <div className="bg-white min-h-screen pb-20" dir="rtl">
       <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap custom-scrollbar">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-[var(--secondary_color)] font-black text-[12px] md:text-sm shrink-0"
                  : "hover:text-[var(--primary_color)] cursor-pointer text-[12px] md:text-sm shrink-0 transition-colors"
              }
            >   
              {item}
            </span>
            {index < breadcrumbs.length - 1 && (
              <ChevronLeft size={14} className="rotate-180 shrink-0 text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-2 md:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
           <ImagesProduct
            mainImage={product.data.image}
            images={product.data.images}
            title={product.data.name}
          />
          <div className="flex flex-col space-y-6 md:space-y-8 text-right max-w-2xl mt-4 md:mt-0">
            {/* العنوان والفئة */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#2D1B50] leading-tight md:leading-tight">
                {product.data.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="inline-flex items-center gap-2 bg-gray-50/80 px-3 py-1.5 rounded-xl border border-gray-100">
                  <span className="text-[11px] md:text-xs font-bold text-gray-500">الموديل:</span>
                  <span className="text-xs md:text-sm font-black text-[var(--secondary_color)]">
                    {product.data.model}
                  </span>
                </div>
              </div>
            </div>

            {/* السعر */}
            {product.data.prices ? (
              <div className="flex flex-wrap items-center gap-6 md:gap-8 bg-[var(--primary_color)]/5 p-4 md:p-5 rounded-2xl border border-[var(--primary_color)]/10">
                {product.data.prices?.retail_price !== undefined && product.data.prices?.retail_price !== null && (
                  <div className="flex flex-col">
                    <span className="text-[11px] md:text-xs text-gray-500 font-bold mb-1">سعر التجزئة</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl md:text-4xl font-black text-[var(--secondary_color)] tracking-tight">
                        {product.data.prices.retail_price}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-gray-600">{currencyName}</span>
                    </div>
                  </div>
                )}
                {product.data.prices?.wholesale_price !== undefined && product.data.prices?.wholesale_price !== null && (
                  <div className="flex flex-col border-r-2 border-[var(--primary_color)]/10 pr-6 md:pr-8">
                    <span className="text-[11px] md:text-xs text-gray-500 font-bold mb-1">سعر الجملة</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl md:text-3xl font-black text-gray-700 tracking-tight">
                        {product.data.prices.wholesale_price}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-gray-500">{currencyName}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-baseline gap-2 bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-gray-100">
                <span className="text-2xl md:text-4xl font-black text-[var(--secondary_color)] tracking-tight">
                  {product.data.price}
                </span>
                <span className="text-xs md:text-sm font-bold text-gray-500">{currencyName}</span>
              </div>
            )}

            {/* الوصف */}
            <div className="prose prose-sm md:prose-base prose-gray">
              <p className="text-[15px] md:text-lg leading-relaxed text-gray-600 border-r-4 border-[var(--primary_color)]/60 pr-4">
                {product.data.description}
              </p>
            </div>

            {/* قسم الأكشن المطور */}
            <div className="bg-white md:bg-gray-50/50 p-2 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm md:shadow-none">
              <ProductActionSection 
                productId={product.data.id} 
                product={{
                  id: product.data.id,
                  products_name: product.data.name,
                  products_price: product.data.prices?.retail_price ?? product.data.prices?.wholesale_price ?? product.data.price ?? 0,
                  products_image: product.data.image,
                  products_model: product.data.model,
                }}
              />
            </div>

            {/* تفاصيل إضافية */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
