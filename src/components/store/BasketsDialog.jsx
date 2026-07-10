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

const BasketsDialog = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

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

  const displayCount = mounted ? (isLocal ? getCartCount() : (
    orders?.data?.results?.reduce((total, order) => total + (order.basketitems?.length || 0), 0) || 0
  )) : 0;

  const displayTotal = mounted ? (isLocal ? getCartTotal() : (orders?.data?.results?.[0]?.total_price || 0)) : 0;

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
    if (isLocal || isServerEmpty) {
      // غير مسجل دخول، نوجهه لصفحة الدخول ليتم دمج السلة بعدها
      setOpen(false);
      router.push("/login");
    } else {
      // مسجل دخول ولديه سلة سيرفر
      mutate(orders?.data?.results[0].id);
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
        className="w-[90vw] md:w-[75vw] !max-w-none max-h-[90vh] overflow-y-auto bg-white"
        dir="rtl"
      >
        <div className="p-2 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center text-gray-800 mb-6">
              سلة التسوق الخاصة بك
            </DialogTitle>
          </DialogHeader>

          {isLoading && !isLocal ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-gray-500 animate-pulse">جارٍ جلب سلتك...</p>
            </div>
          ) : displayCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-6">
                <ShoppingBag className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                سلتك فارغة حالياً
              </h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                يبدو أنك لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك حتى
                الآن.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-lg text-sm font-bold text-gray-500 text-center">
                  <div className="col-span-4 text-right">المنتج</div>
                  <div className="col-span-2">السعر</div>
                  <div className="col-span-2">الكمية</div>
                  <div className="col-span-2">الموديل</div>
                  <div className="col-span-2">الإجراء</div>
                </div>

                {displayItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-100 text-center"
                  >
                    <div className="col-span-4 flex items-center gap-4 text-right">
                      <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white shrink-0">
                        <Image
                          src={item.products_image}
                          alt="product"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-gray-800 text-sm font-medium">
                        {item.products_name}
                      </span>
                    </div>
                    <div className="col-span-2 text-gray-700">
                      {item.products_price} ر.س
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <QuantityBasket number={item.quantity} id={item.id} isLocal={isLocal} />
                    </div>
                    <div className="col-span-2 text-gray-500">
                      {item.products_model}
                    </div>
                    <div className="col-span-2">
                      <DeleteBasketItem id={item.id} refresh={"basketShow"} isLocal={isLocal} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="md:hidden space-y-4">
                {displayItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <Image
                      src={item.products_image}
                      alt=""
                      width={60}
                      height={60}
                      className="rounded object-contain"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-sm">
                        {item.products_name}
                      </p>
                      <p className="text-primary text-sm">
                        {item.products_price} ر.س
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <QuantityBasket number={item.quantity} id={item.id} isLocal={isLocal} />
                        <DeleteBasketItem id={item.id} refresh={"basketShow"} isLocal={isLocal} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gray-50/50 border rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 font-bold">
                    <span>المجموع الفرعي</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-black">
                    <span className="text-gray-800">المجموع الإجمالي</span>
                    <span className="text-primary">
                      {displayTotal} ر.س
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                <Button
                  onClick={handleCheckout}
                  disabled={isPending}
                  className="bg-gradient-to-l from-[var(--primary_color)] to-[#4B2E83] hover:from-[#4B2E83] hover:to-[var(--primary_color)] shadow-lg shadow-[var(--primary_color)]/20 hover:shadow-xl hover:shadow-[var(--primary_color)]/40 transition-all duration-500 hover:-translate-y-0.5 h-14 px-8 text-lg font-black rounded-xl w-full md:w-auto order-1 md:order-2 flex items-center justify-center gap-3 text-white border-none group"
                >
                  التقدم لإتمام الشراء
                  {isPending ? (
                     <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                     <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  )}
                </Button>

                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-slate-500 hover:bg-slate-600 text-white h-12 px-8 text-lg font-bold rounded-lg w-full md:w-auto order-2 md:order-1 border-none"
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
