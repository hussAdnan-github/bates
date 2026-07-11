"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/actions/companies";

function ThemeLogic() {
  const searchParams = useSearchParams();
  const activeCompany = searchParams.get("department__company") || "";

  // جلب الشركات في الخلفية (Client-Side) باستخدام React Query لمنع تعطيل الخادم (Non-Blocking)
  const { data: companiesData } = useQuery({
    queryKey: ["companies_theme"],
    queryFn: () => getCompanies(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const companies = companiesData?.results || companiesData?.data?.results || [];

  useEffect(() => {
    if (!companies || companies.length === 0) return;

    // فقط إذا كان هناك شركة محددة صراحة في الرابط، نقوم بتحديث الهوية البصرية
    if (activeCompany) {
      const selected = companies.find((c) => c.id.toString() === activeCompany);
      if (selected) {
        const primary = selected.primary_color || "#00A36C";
        const secondary = selected.secondary_color || "#00594B";
        
        document.documentElement.style.setProperty("--primary_color", primary);
        document.documentElement.style.setProperty("--secondary_color", secondary);
        document.cookie = `primary_color=${primary}; path=/; max-age=31536000`;
        document.cookie = `secondary_color=${secondary}; path=/; max-age=31536000`;
        document.cookie = `active_company_id=${selected.id}; path=/; max-age=31536000`;
      }
    }
  }, [activeCompany, companies]);

  return null;
}

export default function ThemeProvider({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <ThemeLogic />
      </Suspense>
      {children}
    </>
  );
}
