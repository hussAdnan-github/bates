import React from "react";
import CardProduct from "../shared/CardProduct";
import { getProduts } from "@/actions/product";
import InfiniteProductList from "./InfiniteProductList";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function FeaturedProducts() {
  const products = await getProduts();
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "1";

  if (!products || !products.data) {
    console.error("Failed to fetch products or products.data is missing");
    return (
      <section className="py-16 bg-white" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <p>عذراً، لم نتمكن من تحميل المنتجات حالياً.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-primary">
            منتجات مميزة
          </h2>
        </div>

        <InfiniteProductList show={4} initialData={products.data} type_money={type_money} />
      </div>
    </section>
  );
}

export default FeaturedProducts;
