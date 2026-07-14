import { Separator } from "@/components/ui/separator";

import CardProduct from "@/components/shared/CardProduct";
import { getProduts, getBanners } from "@/actions/product";

import Companies from "@/components/store/Companies";
import SliderPrice from "@/components/store/SliderPrice";
import Categories from "@/components/store/Department";
import Department from "@/components/store/Department";
import HeroCarousel from "@/components/store/HeroCarousel";
import { getDepartment } from "@/actions/department";
import InfiniteProductList from "@/components/store/InfiniteProductList";
import { getCompanies } from "@/actions/companies";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";
import FilterContent from "@/components/store/FilterContent";
import { cookies } from "next/headers";

async function page({ searchParams }) {
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

  const bannersPromise = getBanners(effectiveCompany);
  const departmentDataPromise = getDepartment(effectiveCompany);

  const departmentData = await departmentDataPromise;

  let effectiveDepartment = department;
  if (!effectiveDepartment && departmentData?.data?.length > 0) {
    effectiveDepartment = departmentData.data[0].id.toString();
  }

  const productsPromise = getProduts(price, effectiveDepartment, effectiveCompany);

  const products = await productsPromise;
  const bannersData = await bannersPromise;

  const type_money = cookieStore.get("type_money")?.value || "3";
  const allBanners = bannersData?.data?.results || bannersData?.results || (Array.isArray(bannersData) ? bannersData : []);
  
  // تصفية البنرات لتعرض فقط البنرات التابعة للشركة المحددة (إذا وجدت)
  const filteredBanners = effectiveCompany 
    ? allBanners.filter(banner => banner.companies && banner.companies.includes(Number(effectiveCompany)))
    : allBanners;

  return (
    <div className="bg-gray-50/50 min-h-screen  " dir="rtl">
      {/* السلايدر بعرض الصفحة بالكامل */}
      <div className="w-full mb-6">
        <HeroCarousel banners={filteredBanners} />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* <aside className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <FilterContent departmentData={departmentData} />
            </div>
          </aside> */}

          <main className="w-full order-1 lg:order-2  ">
            <Companies activeCompanyId={effectiveCompany} />
            <div className="">
              <Department department={departmentData} />
            </div>


            <InfiniteProductList
              show={3}
              initialData={products.data}
              price={price}
              department={effectiveDepartment}
              department__company={effectiveCompany}
              type_money={type_money}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default page;
