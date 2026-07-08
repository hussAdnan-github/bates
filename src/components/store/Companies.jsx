// import React from "react";
// import { getCompanies } from "@/actions/companies";
// import CompanyFilter from "../shared/CompanyFilter";
 
// async function Companies() {
//   const companies = await getCompanies();

//   return (
//     <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
//       <h3 className="font-black text-gray-800 text-sm">تصفية حسب الشركة</h3>
//        <CompanyFilter companies={companies.data.results} />
//     </div>
//   );
// }

// export default Companies;


import React from "react";
import { getCompanies } from "@/actions/companies";
import CompanyFilter from "../shared/CompanyFilter";
import { Building2 } from "lucide-react"; // أيقونة الشركة

async function Companies({ activeCompanyId }) {
  const companies = await getCompanies();

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-[var(--secondary_color)]" />
        </div>
        <h3 className="font-black text-[var(--secondary_color)] text-sm md:text-base">تصفية حسب الشركة</h3>
      </div>
       
      <CompanyFilter companies={companies?.data?.results || []} activeCompanyId={activeCompanyId} />
    </div>
  );
}

export default Companies;