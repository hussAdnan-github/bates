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

  const companiesData = await getCompanies();
  const ugreenCompany = companiesData?.data?.results?.find(
    (c) =>
      c.name_en?.toLowerCase().includes("ugreen") ||
      c.name_ar?.toLowerCase().includes("ugreen") ||
      c.name_ar?.includes("يوجرين")
  );

  let effectiveCompany = department__company;
  if (!effectiveCompany && ugreenCompany) {
    effectiveCompany = ugreenCompany.id.toString();
  }

  const [products, departmentData, bannersData] = await Promise.all([
    getProduts(price, department, effectiveCompany),
    getDepartment(effectiveCompany),
    getBanners(effectiveCompany),
  ]);

  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";

  return (
    <div className="bg-gray-50/50 min-h-screen  " dir="rtl">
      {/* السلايدر بعرض الصفحة بالكامل */}
      <div className="w-full mb-6">
        <HeroCarousel banners={bannersData?.results || (Array.isArray(bannersData) ? bannersData : [])} />
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
            <div className="lg:hidden w-full mb-4 px-2">
              {/* <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center py-7 border-2 border-gray-100 rounded-2xl shadow-sm bg-white"
                  >
                    <div className="flex items-center gap-2 font-bold text-[var(--secondary_color)]">
                      <SlidersHorizontal className="w-5 h-5 text-[var(--primary_color)]" />
                      تصفية النتائج
                    </div>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                      تعديل
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] overflow-y-auto bg-white px-4"
                  dir="rtl"
                >
                  <SheetHeader className="text-right border-b pb-4 mb-6">
                    <SheetTitle className="flex items-center gap-2 text-[var(--secondary_color)]">
                      <Filter className="w-5 h-5 text-[var(--primary_color)]" />
                      خيارات التصفية
                    </SheetTitle>
                  </SheetHeader>
                  <FilterContent departmentData={departmentData} />
                </SheetContent>
              </Sheet> */}
            </div>

            <InfiniteProductList
              show={3}
              initialData={products.data}
              price={price}
              department={department}
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
