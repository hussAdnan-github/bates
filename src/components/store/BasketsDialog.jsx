"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  ArrowLeft,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { editOrderBasket, getBaskets } from "@/actions/baskets";
import QuantityBasket from "./QuantityBasket";
import DeleteBasketItem from "./DeleteBasketItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useCurrency } from "@/hooks/useCurrency";

const BasketsDialog = ({ isLoggedIn }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const currencySymbol = useCurrency();

  useEffect(() => {
    setMounted(true);
  }, []);

  const localCart = useCartStore((state) => state.localCart);
  const getCartCount = useCartStore((state) => state.getCartCount);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["basketShow"],
    queryFn: () => getBaskets(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1, // لا تحاول كثيراً إذا كان غير مسجل الدخول
  });

  // التحقق من حالة السلة في السيرفر
  const isServerEmpty = !orders?.data?.results || orders.data.results.length === 0 || orders.data.results[0]?.basketitems?.length === 0;

  const serverCartItems = orders?.data?.results?.[0]?.basketitems || [];

  // نعرض المنتجات المحلية إذا كانت سلة السيرفر فارغة (للزوار)، غير ذلك نعرض سلة السيرفر
  const isLocal = isServerEmpty && localCart.length > 0;
  const displayItems = isLocal ? localCart : serverCartItems;

  const displayCount = mounted ? (isLocal ? localCart.length : (
    orders?.data?.results?.reduce((total, order) => total + (order.basketitems?.length || 0), 0) || 0
  )) : 0;

  const displayTotal = mounted ? (isLocal ?
    localCart.reduce((total, item) => {
      const priceStr = String(item.products_price || "0");
      const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
      return total + (priceNum * item.quantity);
    }, 0)
    : (orders?.data?.results?.[0]?.total_price || 0)) : 0;

  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      const formData = new FormData();
      formData.append("in_progress", 1);
      return editOrderBasket(formData, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basketShow"] });
      setOpen(false);
      router.push("/shop/orders");
    },
  });

  const handleCheckout = () => {
    if (!isLoggedIn) {
      // غير مسجل دخول، نوجهه لصفحة الدخول ليتم دمج السلة بعدها
      setOpen(false);
      router.push("/signUp");
    } else {
      // مسجل دخول، نحوله إلى الطلبات
      if (orders?.data?.results?.[0]?.id) {
        mutate(orders.data.results[0].id);
      } else {
        setOpen(false);
        router.push("/shop/orders");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className="relative p-2.5 cursor-pointer hover:bg-gray-50 rounded-xl transition-all group"
        >
          <ShoppingCart className="h-6 w-6 text-white md:text-gray-700 group-hover:text-primary transition-colors" />
          {displayCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-[var(--primary_color)] w-5 h-5 flex items-center justify-center text-[11px] font-bold rounded-full border-2 border-[var(--primary_color)] md:border-[var(--secondary_color)] shadow-sm">
              {displayCount}
            </span>
          )}
        </div>
      </DialogTrigger>

      <DialogContent
        className="w-[95vw] sm:w-[85vw] md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl md:rounded-3xl p-0"
        dir="rtl"
      >
        <div className="p-4 md:p-8">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-2xl font-black text-center text-[#2D1B50] mb-4 md:mb-8 flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-[var(--primary_color)]" />
              سلة التسوق الخاصة بك
            </DialogTitle>
          </DialogHeader>

          {isLoading && !isLocal ? (
            <div className="flex flex-col justify-center items-center py-16 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--primary_color)]" />
              <p className="text-gray-500 text-sm font-medium animate-pulse">جارٍ جلب سلتك...</p>
            </div>
          ) : displayCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-full mb-6 shadow-inner">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-gray-800 mb-2">
                سلتك فارغة حالياً
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-8 max-w-sm leading-relaxed">
                يبدو أنك لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك حتى
                الآن. تصفح منتجاتنا المميزة.
              </p>
              <DialogTrigger asChild>
                <Button className="bg-[#2D1B50] hover:bg-[#3a2366] text-white rounded-xl px-8 h-12 text-sm font-bold shadow-lg shadow-[#2D1B50]/20 transition-all active:scale-95">
                  تصفح المنتجات
                </Button>
              </DialogTrigger>
            </div>
          ) : (
            <>
              {/* ديسكتوب */}
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 bg-gray-50/80 p-4 rounded-2xl text-xs font-bold text-gray-500 text-center border border-gray-100 mb-4">
                  <div className="col-span-5 text-right pr-4">المنتج</div>
                  <div className="col-span-2">السعر</div>
                  <div className="col-span-2">الكمية</div>
                  <div className="col-span-2">الموديل</div>
                  <div className="col-span-1"></div>
                </div>

                <div className="space-y-3">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 items-center p-3 border border-gray-100 rounded-2xl text-center hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="col-span-5 flex items-center gap-4 text-right pr-2">
                        <div className="relative w-16 h-16 border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 shrink-0 p-1">
                          <Image
                            src={item.products_image}
                            alt="product"
                            fill
                            className="object-contain mix-blend-multiply"
                          />
                        </div>
                        <span className="text-gray-800 text-sm font-bold line-clamp-2 leading-tight">
                          {item.products_name}
                        </span>
                      </div>
                      <div className="col-span-2 text-[var(--secondary_color)] font-black text-base">
                        {item.products_price} <span className="text-xs text-gray-400 font-bold">{currencySymbol}</span>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <QuantityBasket number={item.quantity} id={item.id} isLocal={isLocal} />
                      </div>
                      <div className="col-span-2 text-gray-500 font-medium text-xs bg-gray-50 py-1 px-2 rounded-lg inline-block">
                        {item.products_model}
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <DeleteBasketItem id={item.id} refresh={"basketShow"} isLocal={isLocal} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* موبايل */}
              <div className="md:hidden space-y-3">
                {displayItems.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm relative">
                    <div className="relative w-20 h-20 bg-gray-50/50 border border-gray-100 rounded-xl p-1 shrink-0">
                      <Image
                        src={item.products_image}
                        alt=""
                        fill
                        className="object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="pr-1">
                        <p className="font-bold text-xs text-[#2D1B50] line-clamp-2 leading-tight mb-1.5">
                          {item.products_name}
                        </p>
                        <p className="font-black text-[13px] text-[var(--secondary_color)]">
                          {item.products_price} <span className="text-[9px] text-gray-400 font-bold">{currencySymbol}</span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                        <QuantityBasket number={item.quantity} id={item.id} isLocal={isLocal} />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <DeleteBasketItem id={item.id} refresh={"basketShow"} isLocal={isLocal} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 md:p-6">
                <div className="space-y-3 md:space-y-4">
                  {/* <div className="flex justify-between text-gray-500 text-xs md:text-sm font-bold">
                    <span>المجموع الفرعي</span>
                    <span>{displayTotal} {currencySymbol}</span>
                  </div> */}
                  <Separator className="bg-gray-200/60" />
                  <div className="flex justify-between items-center text-base md:text-xl font-black">
                    <span className="text-[#2D1B50]">المجموع الإجمالي</span>
                    <span className="text-[var(--secondary_color)] bg-[var(--primary_color)]/10 px-3 py-1 md:px-4 md:py-1.5 rounded-xl border border-[var(--primary_color)]/20">
                      {displayTotal} <span className="text-xs text-gray-500 font-bold">{currencySymbol}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-3 md:gap-4">
                <Button
                  onClick={handleCheckout}
                  disabled={isPending}
                  className="bg-[#2D1B50] hover:bg-[#3a2366] shadow-lg shadow-[#2D1B50]/20 transition-all duration-300 hover:-translate-y-0.5 h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-black rounded-xl w-full md:w-auto order-1 md:order-2 flex items-center justify-center gap-2 text-white border-none group active:scale-95"
                >
                  التقدم لإتمام الشراء
                  {isPending ? (
                    <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                  ) : (
                    <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  )}
                </Button>

                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 h-10 md:h-12 px-6 text-xs md:text-sm font-bold rounded-xl w-full md:w-auto order-2 md:order-1 transition-all active:scale-95"
                  >
                    متابعة التسوق
                  </Button>
                </DialogTrigger>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketsDialog;
