"use client";
import React, { useState, useEffect } from "react";
import CardProduct from "@/components/shared/CardProduct";
import { useInView } from "react-intersection-observer";
import { getProduts } from "@/actions/product";

function InfiniteProductList({ initialData, price = "", department ="" , department__company =""}) {
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
      const data = await getProduts(price, department, department__company ,nextPage);
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
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

       <div ref={ref} className="h-10 flex justify-center items-center mt-10">
        {loading && (
          <div className="w-8 h-8 border-4 border-[#F18721] border-t-transparent rounded-full animate-spin"></div>
        )}
        {!nextPage && products.length > 0 && (
          <p className="text-gray-500">لا توجد منتجات أخرى</p>
        )}
      </div>
    </>
  );
}

export default InfiniteProductList;