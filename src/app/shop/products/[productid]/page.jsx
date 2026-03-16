import React from "react";

import { ShoppingCart, Plus, Minus, ChevronLeft } from "lucide-react";
import ImagesProduct from "@/components/store/ImagesProduct";
import { getProdutsId } from "@/actions/product";
import QuantityProduct from "@/components/store/QuantityProduct";
import { Button } from "@/components/ui/button";
import ButtonCart from "@/components/store/ButtonCart";
import ProductActionSection from "@/components/store/ProductActionSection";
async function page({ params }) {
  const breadcrumbs = ["الرئيسية", "شنط فيدفي", "شنطة لابتوب 16 انش"];

  const Productid = (await params).productid;

  const product = await getProdutsId(Productid);

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
          <ImagesProduct
            mainImage={product.data.image}
            images={product.data.images}
            title={product.data.name}
          />
          {/* --- الجانب الأيسر: تفاصيل المنتج --- */}
          <div className="flex flex-col space-y-6 text-right">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
              {product.data.name}
            </h1>
            <p className="text-xl leading-relaxed text-gray-700">
              {product.data.description}
            </p>

            <div className="text-3xl font-black text-[#F18721]">
              {product.data.price} <span className="text-xl">ر.س</span>
            </div>
            <ProductActionSection productId={product.data.id} />

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <p className="text-gray-600 font-medium">
                رمز المنتج (model):{" "}
                <span className="text-gray-900 font-bold">
                  {product.data.model}
                </span>
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
                  {product.data.name_department}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
