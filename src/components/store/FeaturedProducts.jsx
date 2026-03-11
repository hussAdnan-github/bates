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

async function FeaturedProducts() {
  // 1. جلب البيانات مع معالجة الخطأ الأساسية
  const products = await getProduts().catch((err) => {
    console.error("Error fetching products:", err);
    return null;
  });

  // 2. التحقق من وجود البيانات قبل عرض المكونات
  // هذا يمنع خطأ "Cannot read properties of undefined (reading 'data')"
  if (!products || !products.data) {
    return (
      <section className="py-16 bg-white" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">لا توجد منتجات مميزة حالياً.</p>
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

        {/* 3. تمرير البيانات بأمان */}
        <InfiniteProductList 
          initialData={products.data} 
        />
      </div>
    </section>
  );
}

export default FeaturedProducts;