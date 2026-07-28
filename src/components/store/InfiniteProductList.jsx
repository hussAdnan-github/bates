"use client";
import React, { useState, useEffect } from "react";
import CardProduct from "@/components/shared/CardProduct";
import { useInView } from "react-intersection-observer";
import { getProduts } from "@/actions/product";
import { PackageX } from "lucide-react";

function InfiniteProductList({
  show = 3,
  initialData,
  price = "",
  department = "",
  department__company = "",
  type_money = "3",
}) {
  const [products, setProducts] = useState(initialData.results);
  const [nextPage, setNextPage] = useState(initialData.next);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    setProducts(initialData.results);
    setNextPage(initialData.next);
  }, [initialData]);

  const loadMoreProducts = async () => {
    if (nextPage && !loading) {
      setLoading(true);

      let pageNumber = nextPage;
      if (typeof nextPage === 'string') {
        const match = nextPage.match(/page=(\d+)/);
        if (match) pageNumber = match[1];
      }

      const data = await getProduts(
        price,
        department,
        department__company,
        pageNumber,
      );
      if (data) {
        setProducts((prev) => [...prev, ...data.data.results]);
        setNextPage(data.data.next);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView]);

  return (
    <div>
      {initialData.results.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center min-h-[300px] bg-gray-50/50 dark:bg-zinc-900/20 rounded-3xl border border-gray-100 dark:border-zinc-800/50 my-8 py-12 px-4 shadow-sm">
          <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-full flex justify-center items-center mb-6 shadow-sm border border-gray-50 dark:border-zinc-700/50">
            <PackageX className="w-12 h-12 text-gray-300 dark:text-zinc-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">لا يوجد منتجات هنا</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center max-w-md text-base leading-relaxed">
            عذراً، لم نتمكن من العثور على أي منتجات في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً أو تغيير خيارات البحث.
          </p>
        </div>
      )}
      <div className={show === 4 ? `grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6` : `grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
        {products.map((product, index) => (
          <CardProduct
            key={product.id}
            id={product.id}
            title={product.name}
            image={product.image}
            prices={product.prices}
            model={product.model}
            images={product.images}
            type_money={type_money}
            priority={index < 4}
          />
        ))}
      </div>

      <div ref={ref} className="h-10 flex justify-center items-center mt-10">
        {loading && (
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        )}
        {!nextPage && products.length > 0 && (
          <p className="text-gray-500">لا توجد منتجات أخرى</p>
        )}
      </div>
    </div>
  );
}

export default InfiniteProductList;
