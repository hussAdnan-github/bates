 

import React from "react";
import { getCompanies } from "@/actions/companies";
import CompaniesResponsive from "./CompaniesResponsive";

async function Companies({ activeCompanyId }) {
  const companies = await getCompanies();

  return (
    <CompaniesResponsive 
      companies={companies?.data?.results || []} 
      activeCompanyId={activeCompanyId} 
    />
  );
}

export default Companies;