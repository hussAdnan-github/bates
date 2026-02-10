import React from "react";
import { Button } from "../ui/button";
import { getCategories } from "@/actions/categories";

export default async function Categories() {
       const categories = await getCategories();
    console.log(categories)
  return (
    <div className="flex flex-col gap-3">
      {categories.data.results.map((cat, index) => (
        <Button   
          key={index}
          className="text-right text-gray-600 hover:text-[#F18721] hover:font-bold transition-all text-sm"
        >
          {cat.name}
        </Button>
      ))}
    </div>
  );
}
