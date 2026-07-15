import { Suspense } from "react";
import { getProduts, getBanners } from "@/actions/product";
import Companies from "@/components/store/Companies";
import Department from "@/components/store/Department";
import HeroCarousel from "@/components/store/HeroCarousel";
import { getDepartment } from "@/actions/department";
import InfiniteProductList from "@/components/store/InfiniteProductList";
import { getCompanies } from "@/actions/companies";
import { cookies } from "next/headers";
import { Loader2 } from "lucide-react";

async function HeroSection({ companyId }) {
  const bannersData = await getBanners(companyId);
  const allBanners = bannersData?.data?.results || bannersData?.results || (Array.isArray(bannersData) ? bannersData : []);
  
  // تصفية البنرات لتعرض فقط البنرات التابعة للشركة المحددة (إذا وجدت)
  const filteredBanners = companyId 
    ? allBanners.filter(banner => banner.companies && banner.companies.includes(Number(companyId)))
    : allBanners;

  return <HeroCarousel banners={filteredBanners} />;
}

async function ProductsSection({ price, department, company, type_money }) {
  const products = await getProduts(price, department, company);
  return (
    <InfiniteProductList
      show={3}
      initialData={products?.data || {}}
      price={price}
      department={department}
      department__company={company}
      type_money={type_money}
    />
  );
}

export default async function page({ searchParams }) {
  const { price, department, department__company } = await searchParams;

  const cookieStore = await cookies();
  const savedCompanyId = cookieStore.get("active_company_id")?.value;

  let effectiveCompany = department__company || savedCompanyId;

  if (!effectiveCompany) {
    const companiesData = await getCompanies();
    const defaultCompany = companiesData?.data?.results?.[0];
    if (defaultCompany) {
      effectiveCompany = defaultCompany.id.toString();
    }
  }

  let departmentData = null;
  let effectiveDepartment = department;

  if (!effectiveDepartment) {
    departmentData = await getDepartment(effectiveCompany);
    if (departmentData?.data?.length > 0) {
      effectiveDepartment = departmentData.data[0].id.toString();
    }
  } else {
    // نجلب الأقسام لعرضها حتى لو كان القسم محددًا
    departmentData = await getDepartment(effectiveCompany);
  }

  const type_money = cookieStore.get("type_money")?.value || "3";

  return (
    <div className="bg-gray-50/50 min-h-screen" dir="rtl">
      {/* السلايدر بعرض الصفحة بالكامل */}
      <div className="w-full mb-6">
        <Suspense 
          fallback={
            <div className="w-full h-[200px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          }
        >
          <HeroSection companyId={effectiveCompany} />
        </Suspense>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <main className="w-full order-1 lg:order-2">
            <Companies activeCompanyId={effectiveCompany} />
            <div className="">
              <Department department={departmentData} />
            </div>

            <Suspense 
              fallback={
                <div className="flex justify-center items-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-[var(--primary_color)] animate-spin" />
                    <p className="text-gray-500 font-bold animate-pulse">جاري تحميل المنتجات...</p>
                  </div>
                </div>
              }
            >
              <ProductsSection 
                price={price} 
                department={effectiveDepartment} 
                company={effectiveCompany} 
                type_money={type_money} 
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
