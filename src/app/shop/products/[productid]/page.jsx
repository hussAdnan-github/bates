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
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const currencyName = type_money === "3" ? "ر.س" : type_money === "1" ? "يمني قديم" : "ر.س";

  const breadcrumbs = ["الرئيسية", `${product.data.name_department}`  ,`${product.data.name}` ];

  return (
    <div className="bg-white min-h-screen pb-20" dir="rtl">
       <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500">
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={index}>
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-gray-800 font-bold"
                  : "hover:text-[var(--primary_color)] cursor-pointer"
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
           <ImagesProduct
            mainImage={product.data.image}
            images={product.data.images}
            title={product.data.name}
          />
          <div className="flex flex-col space-y-8 text-right max-w-2xl">
            {/* العنوان والفئة */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                {product.data.name}
              </h1>
            </div>
 <div className="grid grid-cols-2 gap-4 pt-6 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <span className="font-medium">موديل المنتج:</span>
                <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                  {product.data.model}
                </span>
              </div>
             
            </div>
            {/* الوصف */}
            <p className="text-lg leading-relaxed text-gray-600 border-r-4 border-gray-100 pr-4">
              {product.data.description}
            </p>

            {/* السعر */}
            {product.data.prices ? (
              <div className="flex items-center gap-8 pt-4 pb-6 mb-2">
                {product.data.prices?.retail_price !== undefined && product.data.prices?.retail_price !== null && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold mb-1">سعر التجزئة</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[var(--secondary_color)]">
                        {product.data.prices.retail_price}
                      </span>
                      <span className="text-lg font-bold text-gray-500">{currencyName}</span>
                    </div>
                  </div>
                )}
                {product.data.prices?.wholesale_price !== undefined && product.data.prices?.wholesale_price !== null && (
                  <div className="flex flex-col border-r-2 border-gray-100 pr-8">
                    <span className="text-xs text-gray-400 font-bold mb-1">سعر الجملة</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-gray-600">
                        {product.data.prices.wholesale_price}
                      </span>
                      <span className="text-sm font-bold text-gray-400">{currencyName}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-baseline gap-2 pt-4 pb-6 mb-2">
                <span className="text-4xl font-black text-[#145463]">
                  {product.data.price}
                </span>
                <span className="text-xl font-bold text-gray-400">{currencyName}</span>
              </div>
            )}

            {/* قسم الأكشن المطور */}
            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
              <ProductActionSection 
                productId={product.data.id} 
                product={{
                  id: product.data.id,
                  products_name: product.data.name,
                  products_price: product.data.price,
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
