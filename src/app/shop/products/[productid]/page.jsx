import React from "react";

import { ShoppingCart, Plus, Minus, ChevronLeft } from "lucide-react";
import ImagesProduct from "@/components/store/ImagesProduct";
import { getProdutsId } from "@/actions/product";
import QuantityProduct from "@/components/store/QuantityProduct";
import { Button } from "@/components/ui/button";
import ButtonCart from "@/components/store/ButtonCart";
import ProductActionSection from "@/components/store/ProductActionSection";
async function page({ params }) {

  const Productid = (await params).productid;

  const product = await getProdutsId(Productid);
  const breadcrumbs = ["الرئيسية", `${product.data.name_department}`  ,`${product.data.name}` ];

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
          {/* --- الجانب الأيمن: معرض الصور --- */}
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
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#145463]">
                {product.data.price}
              </span>
              <span className="text-xl font-bold text-gray-400">ر.س</span>
            </div>

            {/* قسم الأكشن المطور */}
            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
              <ProductActionSection productId={product.data.id} />
            </div>

            {/* تفاصيل إضافية */}
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
