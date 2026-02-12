import React from "react";
import { getCompanies } from "@/actions/companies";
import CompanyFilter from "../shared/CompanyFilter";
 
async function Companies() {
  const companies = await getCompanies();

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <h3 className="font-black text-gray-800 text-sm">تصفية حسب الشركة</h3>
       <CompanyFilter companies={companies.data.results} />
    </div>
  );
}

export default Companies;