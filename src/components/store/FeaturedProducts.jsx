import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function FeaturedProducts() {
  // بيانات المنتجات التجريبية (يمكنك استبدالها ببيانات من الـ API لاحقاً)
  const products = [
    {
      id: 1,
      title: "سماعات راس",
      price: "58.00",
      image: "/products/headphone.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 2,
      title: "سماعات راس",
      price: "58.00",
      image: "/products/headphone.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 3,
      title: "سماعات راس",
      price: "58.00",
      image: "/products/headphone.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 4,
      title: "سماعات راس",
      price: "58.00",
      image: "/products/headphone.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 5,
      title: "سماعات راس",
      price: "58.00",
      image: "/products/headphone.jpg", // ضع مسارات صورك هنا
    },
    {
      id: 6,
      title: "توصيلات قماش تايبسي 2 متر فيدفي",
      price: "4.50",
      image: "/products/cable.jpg",
    },
    {
      id: 7,
      title: "خازن فيدفي قوة 20 ألف ملي أمبير شحن سريع",
      price: "45.00",
      image: "/products/powerbank.jpg",
    },
    {
      id: 8,
      title: "شاحن 18W شحن سريع مخرج USB مع وصلة تايبسي",
      price: "10.50",
      image: "/products/charger.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        
        {/* رأس القسم */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-[#F18721]">
            منتجات مميزة
          </h2>
          <Link href="/products" className="text-[#F18721] font-bold hover:underline">
            عرض الكل
          </Link>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* حاوية الصورة */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-5 flex flex-col flex-grow text-center items-center">
                <h3 className="text-lg font-bold text-gray-700 line-clamp-2 h-14 flex items-center mb-2 group-hover:text-[#F18721] transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-1 mt-auto">
                  <span className="text-xl font-extrabold text-[#F18721]">
                    {product.price}
                  </span>
                  <span className="text-sm font-bold text-[#F18721]">ر.س</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts