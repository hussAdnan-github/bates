"use client";

import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import CardProduct from "@/components/shared/CardProduct";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [priceRange, setPriceRange] = useState([1000]);

  const categories = [
    "كل الفئات",
    "استاندات فيدفي",
    // "خوازن باوربنك فيدفي",
    // "ساعات ذكية فيدفي",
    // "سماعات بلوتوث فيدفي",
    // "سماعات سلكية فيدفي",
    // "شنط فيدفي",
    // "شواحن سيارة",
    // "شواحن فيدفي",
    // "فلاشات وذاكر فيدفي",
    // "كابلات فيدفي",
    // "موصلات كهرباء وأجهزة إلكترونية",
    // "هبات وموزعات فيدفي",
  ];

  const products = [
    {
      id: 1,
      title: "سماعات راس",
      price: "58.00",
      image: "/images/product.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 2,
      title: "سماعات راس",
      price: "58.00",
      image: "/images/product.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 3,
      title: "سماعات راس",
      price: "58.00",
      image: "/images/product.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 4,
      title: "سماعات راس",
      price: "58.00",
      image: "/images/product.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 5,
      title: "سماعات راس",
      price: "58.00",
      image: "/images/product.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 6,
      title: "توصيلات قماش تايبسي 2 متر فيدفي",
      price: "4.50",
      image: "/images/product.jpg",
    },
    {
      id: 7,
      title: "خازن فيدفي قوة 20 ألف ملي أمبير شحن سريع",
      price: "45.00",
      image: "/images/product.jpg",
    },
    {
      id: 8,
      title: "شاحن 18W شحن سريع مخرج USB مع وصلة تايبسي",
      price: "10.50",
      image: "/images/product.jpg",
    },
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen py-10" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-800 mb-8">
          جميع المنتجات
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- القائمة الجانبية (Filters Sidebar) --- */}
          <aside className="w-full lg:w-1/4 space-y-8 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-xl mb-4">الفئات</h3>
              <Separator className="mb-4" />
              <div className="flex flex-col gap-3">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    className="text-right text-gray-600 hover:text-[#F18721] hover:font-bold transition-all text-sm"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h3 className="font-black text-xl mt-10 mb-4">السعر</h3>
              <Separator className="mb-4" />
              <div className="space-y-6 flex justify-center flex-col">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>السعر الأقصى:</span>
                </div>
                <Slider
                  defaultValue={[1000]}
                  max={1000}
                  step={10}
                  onValueChange={(val) => setPriceRange(val)}
                  className="py-4"
                />
                  <span className="text-[#F18721] text-center">{priceRange[0]} ر.س</span>

                <Button className="w-full bg-[#F18721] hover:bg-[#d9771a] font-bold py-6 text-lg">
                  تطبيق الفلتر
                </Button>
              </div>
            </div>
          </aside>

          {/* --- المحتوى الرئيسي (Top Filter + Grid) --- */}
          <main className="w-full lg:w-3/4 order-1 lg:order-2 space-y-6">
            {/* فلتر الشركة العلوي */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-black text-gray-700">
                تصفية حسب الشركة:
              </span>
              {/* <div className="flex gap-3">
                <Button className="bg-[#F18721] hover:bg-[#d9771a] rounded-full px-6">
                  كل الشركات
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-gray-200"
                >
                  فيدفي يمن
                </Button>
              </div> */}
            </div>

            {/* شبكة المنتجات */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default page;
