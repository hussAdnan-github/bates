
import { getProduts, getBanners } from "@/actions/product";
import Companies from "@/components/store/Companies";
import Department from "@/components/store/Department";
import HeroCarousel from "@/components/store/HeroCarousel";
import { getDepartment } from "@/actions/department";
import InfiniteProductList from "@/components/store/InfiniteProductList";
import { getCompanies } from "@/actions/companies";
import { cookies } from "next/headers";

export const metadata = {
  title: "المنتجات | اكسسوارات الجوال وقطع الغيار - BTS اليمن، صنعاء",
  description: "تصفح أحدث المنتجات واكسسوارات الجوال وقطع الغيار بأسعار التجزئة والجملة في مؤسسة محمد باتيس للتجارة باليمن، صنعاء.",
  keywords: ["منتجات", "اكسسوارات", "جوالات", "اليمن", "صنعاء", "بيع جملة", "تجزئة", "BTS"],
};
async function HeroSection({ companyId }) {
  const bannersData = await getBanners(companyId);
  const allBanners = bannersData?.data?.results || bannersData?.results || (Array.isArray(bannersData) ? bannersData : []);
  
  // تصفية البنرات لتعرض فقط البنرات التابعة للشركة المحددة (إذا وجدت)
  const filteredBanners = companyId 
    ? allBanners.filter(banner => banner.companies && banner.companies.includes(Number(companyId)))
    : allBanners;

  return <HeroCarousel banners={filteredBanners} companyId={companyId} />;
}

async function ProductsSection({ price, department, company, type_money }) {
  const products = await getProduts(price, department, company);
  return (
    <InfiniteProductList
      show={4}
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
          <HeroSection companyId={effectiveCompany} />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <main className="w-full order-1 lg:order-2">
            <Companies activeCompanyId={effectiveCompany} />
            <div className="">
              <Department department={departmentData} />
            </div>

              <ProductsSection 
                price={price} 
                department={effectiveDepartment} 
                company={effectiveCompany} 
                type_money={type_money} 
              />
          </main>
        </div>
      </div>
    </div>
  );
}
