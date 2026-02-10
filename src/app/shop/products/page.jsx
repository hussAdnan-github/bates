import { Separator } from "@/components/ui/separator";

import CardProduct from "@/components/shared/CardProduct";
import { getProduts } from "@/actions/product";

import Companies from "@/components/store/Companies";
import SliderPrice from "@/components/store/SliderPrice";
import Categories from "@/components/store/Department";
import Department from "@/components/store/Department";
import { getDepartment } from "@/actions/department";

async function page({ searchParams }) {
  const { price, department } = await searchParams;
 
  const [products, departmentData] = await Promise.all([
    getProduts(price, department),
    getDepartment(),
  ]);

  return (
    <div className="bg-gray-50/50 min-h-screen py-10" dir="rtl">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-800 mb-8">
          جميع المنتجات
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 space-y-8 order-2 lg:order-1">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-black text-xl mb-4">الفئات</h3>
              <Separator className="mb-4" />
              <Department department={departmentData}/>
              <h3 className="font-black text-xl mt-10 mb-4">السعر</h3>
              <Separator className="mb-4" />
              <SliderPrice />
            </div>
          </aside>

          <main className="w-full lg:w-3/4 order-1 lg:order-2 space-y-6">
            {/* فلتر الشركة العلوي */}
            <Companies />
            {/* شبكة المنتجات */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.data.results.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.image}
                  price={product.price}
                  model={product.model}
                  images={product.images}
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
