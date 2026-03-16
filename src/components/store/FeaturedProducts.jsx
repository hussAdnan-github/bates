// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import CardProduct from "../shared/CardProduct";
// import { getProduts } from "@/actions/product";
// import InfiniteProductList from "./InfiniteProductList";

// async function FeaturedProducts() {
//   const products = await getProduts();

//   return (
//     <section className="py-16 bg-white" dir="rtl">
//       <div className="container mx-auto px-4">
//          <div className="flex items-center justify-between mb-10">
//           <h2 className="text-2xl md:text-3xl font-black text-gray-800 relative after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-primary">
//             منتجات مميزة
//           </h2>
//           {/* <Link
//             href="/products"
//             className="text-[#F18721] font-bold hover:underline"
//           >
//             عرض الكل
//           </Link> */}
//         </div>

//         {/* شبكة المنتجات */}
//         <InfiniteProductList
//               initialData={products.data}
//               // price={price}
//               // department={department}
//             />
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.data.results.map((product) => (
//             <CardProduct
//               key={product.id}
//               id={product.id}
//               title={product.name }
//               image={product.image}
//               price={product.price}
//               model={product.model}
//               images={product.images}
//             />
//           ))}
//         </div> */}
//       </div>
//     </section>
//   );
// }

// export default FeaturedProducts;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardProduct from "../shared/CardProduct";
import { getProduts } from "@/actions/product";
import InfiniteProductList from "./InfiniteProductList";

// 1. إضافة هذا السطر لمنع الخطأ أثناء الـ Build (يجعل المكون ديناميكي)
export const dynamic = "force-dynamic";

async function FeaturedProducts() {
  // 2. استخدام try/catch أو التحقق من البيانات لتجنب TypeError
  const products = await getProduts();

  // 3. التحقق من وجود البيانات قبل تمريرها للمكون
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

        {/* شبكة المنتجات */}
        <InfiniteProductList show={4} initialData={products.data} />
      </div>
    </section>
  );
}

export default FeaturedProducts;
