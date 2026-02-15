"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
  

export default function CompanyFilter({ companies }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
   const activeCompany = searchParams.get("department__company") || "";

  const handleFilter = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "") {
      params.delete("department__company");
    } else {
      params.set("department__company", id);
    }
    params.delete("page");   
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        onClick={() => handleFilter("")}
        className={` whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all ${
          activeCompany === "" 
          ? "bg-[#F18721] text-white shadow-md" 
          : "bg-gray-100 text-gray-600 hover:bg-orange-50"
        }`}
      >
        كل الشركات
      </Button>

      {companies.map((com) => (
        <Button
          key={com.id}
          onClick={() => handleFilter(com.id.toString())}
          className={`hover:bg-primary whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all ${
            activeCompany === com.id.toString()
            ? "bg-secondary text-white font-bold"
            : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-secondary"
          }`}
        >
          {com.name_ar}
        </Button>
      ))}
    </div>
  );
}