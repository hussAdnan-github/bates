import React from "react";
import { Button } from "../ui/button";
import { getCompanies } from "@/actions/companies";

async function Companies() {
  const companies = await getCompanies();

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <span className="font-black text-gray-700">تصفية حسب الشركة:</span>
      <div className="flex gap-3">
        <Button className="bg-[#F18721] hover:bg-[#d9771a] rounded-full px-6">
          كل الشركات
        </Button>
        {companies.data.results.map((com, index) => (
          <button
            key={index}
            className="text-right text-gray-600 hover:text-[#F18721] hover:font-bold transition-all text-sm"
          >
            {com.name_ar}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Companies;
