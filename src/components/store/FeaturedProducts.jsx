import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardProduct from "../shared/CardProduct";
import { getProduts } from "@/actions/product";

async function FeaturedProducts() {
  const products = await getProduts();

  // const products = [
  //   {
  //     id: 1,
  //     title: "سماعات راس",
  //     price: "58.00",
  //     image: "/images/product.jpg", // ضع مسارات صورك هنا
  //   },
  //   {
  //     id: 2,
  //     title: "سماعات راس",
  //     price: "58.00",
  //     image: "/images/product.jpg", // ضع مسارات صورك هنا
  //   },
  //   {
  //     id: 3,
  //     title: "سماعات راس",
  //     price: "58.00",
  //     image: "/images/product.jpg", // ضع مسارات صورك هنا
  //   },
  //   {
  //     id: 4,
  //     title: "سماعات راس",
  //     price: "58.00",
  //     image: "/images/product.jpg", // ضع مسارات صورك هنا
  //   },
  //   {
  //     id: 5,
  //     title: "سماعات راس",
  //     price: "58.00",
  //     image: "/images/product.jpg", // ضع مسارات صورك هنا
  //   },
  //   {
  //     id: 6,
  //     title: "توصيلات قماش تايبسي 2 متر فيدفي",
  //     price: "4.50",
  //     image: "/images/product.jpg",
  //   },
  //   {
  //     id: 7,
  //     title: "خازن فيدفي قوة 20 ألف ملي أمبير شحن سريع",
  //     price: "45.00",
  //     image: "/images/product.jpg",
  //   },
  //   {
  //     id: 8,
  //     title: "شاحن 18W شحن سريع مخرج USB مع وصلة تايبسي",
  //     price: "10.50",
  //     image: "/images/product.jpg",
  //   },
  // ];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        {/* رأس القسم */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-[#F18721]">
            منتجات مميزة
          </h2>
          {/* <Link
            href="/products"
            className="text-[#F18721] font-bold hover:underline"
          >
            عرض الكل
          </Link> */}
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.data.results.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              title={product.name }
              image={product.image}
              price={product.price}
              model={product.model}
              images={product.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
