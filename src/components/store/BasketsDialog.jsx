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
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import OrdersDialog from "./OrdersDialog";
import { editOrderBasket, getBaskets } from "@/actions/baskets";
import QuantityBasket from "./QuantityBasket";
import DeleteBasketItem from "./DeleteBasketItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BasketsDialog = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["basketShow"],
    queryFn: () => getBaskets(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const basketcountNumber =
    orders?.data?.results?.reduce((total, order) => {
      return total + (order.basketitems?.length || 0);
    }, 0) || 0;

  const subtotal =
    orders?.data?.results?.reduce((acc, order) => {
      return (
        acc +
        order.basketitems.reduce((itemAcc, item) => {
          return itemAcc + Number(item.products_price) * item.quantity;
        }, 0)
      );
    }, 0) || 0;

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

  const createOrder = (id) => {
    mutate(id);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className="relative p-2.5 cursor-pointer hover:bg-gray-50 rounded-xl transition-all group"
        >
          <ShoppingCart className="h-6 w-6 text-white md:text-gray-700 group-hover:text-primary transition-colors" />
          {basketcountNumber > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white lg:text-[var(--primary_color)] w-5 h-5 flex items-center justify-center text-[11px] font-bold rounded-full border-2 border-[var(--secondary_color)]  lg:border-[var(--secondary_color)] shadow-sm">
              {basketcountNumber}
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

          {isLoading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-gray-500 animate-pulse">جارٍ جلب سلتك...</p>
            </div>
          ) : basketcountNumber === 0 ? (
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

                {orders.data.results.map((order) =>
                  order.basketitems.map((item) => (
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
                        <QuantityBasket number={item.quantity} id={item.id} />
                      </div>
                      <div className="col-span-2 text-gray-500">
                        {item.products_model}
                      </div>
                      <div className="col-span-2">
                        <DeleteBasketItem id={item.id} refresh={"basketShow"}/>
                      </div>
                    </div>
                  )),
                )}
              </div>

              <div className="md:hidden space-y-4">
                {orders.data.results
                  .flatMap((o) => o.basketitems)
                  .map((item) => (
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
                          <QuantityBasket number={item.quantity} id={item.id} />
                          <DeleteBasketItem id={item.id} refresh={"basketShow"}/>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-8 bg-gray-50/50 border rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 font-bold">
                    <span>المجموع الفرعي</span>
                    {/* <span>{subtotal.toFixed(2)} ر.س</span> */}
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-black">
                    <span className="text-gray-800">المجموع الإجمالي</span>
                    <span className="text-primary">
                      {orders?.data?.results[0].total_price} ر.س
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
                {/* <Link
                  className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white h-12 px-8 text-lg font-bold rounded-lg w-full md:w-auto order-1 md:order-2 text-center"
                  href={`/shop/orders`}
                  onClick={() => setOpen(false)} // 4. الإغلاق عند الضغط
                >
                  التقدم لإتمام الشراء
                </Link> */}

                <Button
                  onClick={() => createOrder(orders?.data?.results[0].id)}
                  className="bg-[var(--primary_color)] hover:bg-[var(--primary_color)]/90 h-12 px-8 text-lg font-bold rounded-lg w-full md:w-auto order-1 md:order-2"
                >
                  التقدم لإتمام الشراء
                  <ArrowLeft className="mr-2 h-5 w-5" />
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
