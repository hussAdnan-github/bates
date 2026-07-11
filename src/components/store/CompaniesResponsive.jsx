"use client";

import React from "react";
import { Building2 } from "lucide-react";
import CompanyFilter from "../shared/CompanyFilter";

export default function CompaniesResponsive({ companies, activeCompanyId }) {
  return (
    <div className="bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm space-y-2 md:space-y-3">
      <div className="flex items-center gap-1.5 md:gap-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
          <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[var(--secondary_color)]" />
        </div>
        <h3 className="font-bold text-[var(--secondary_color)] text-[10px] sm:text-[12px] md:text-sm">تصفية حسب الشركة</h3>
      </div>
      <CompanyFilter companies={companies} activeCompanyId={activeCompanyId} />
    </div>
  ); 
}
 