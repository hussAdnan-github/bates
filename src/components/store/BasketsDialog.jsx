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
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import OrdersDialog from "./OrdersDialog";
import { getBaskets } from "@/actions/baskets";
import QuantityBasket from "./QuantityBasket";

const BasketsDialog = async ({ children }) => {
  const orders = await getBaskets();
 
  return (
    <Dialog className="w-[10000px]">
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="
    w-[75vw]
    !max-w-none
    max-h-[90vh]
    overflow-y-auto
    bg-white
  "
        dir="rtl"
      >
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-center text-gray-800 mb-6">
              سلة التسوق الخاصة بك
            </DialogTitle>
          </DialogHeader>

          {/* جدول المنتجات (Desktop) */}
          <div className="hidden md:block">
            <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 rounded-t-lg text-sm font-bold text-gray-500 text-center">
              <div className="col-span-4 text-right">المنتج</div>
              <div className="col-span-2">السعر</div>
              <div className="col-span-2">الكمية</div>
              <div className="col-span-2">الموديل</div>
              <div className="col-span-2">الإجمالي</div>
              <div className="col-span-2"></div>
            </div>
            {orders.data.results.map((order, index) => (
                order.basketitems.map((item)=>
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-100 text-center">
                <div className="col-span-4 flex items-center gap-4 text-right">
                  <div className="relative w-16 h-16 border rounded-md overflow-hidden bg-white shrink-0">
                    <Image
                      src={item.products_image}
                      alt="product"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className=" text-gray-800 text-sm">
                 {item.products_name}
                  </span>
                </div>
                <div className="col-span-2  text-gray-700">{item.products_price} ر.س</div>
              <QuantityBasket number = {item.quantity}/>
                <div className="col-span-2  text-secondary">{item.products_model} ر.س</div>
                <div className="col-span-1">
                  <button className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
                )
            ))}
            {/* صف المنتج */}
          </div>

          {/* ملخص الطلب */}
          <div className="mt-8 bg-gray-50/50 border rounded-xl p-6">
            <h3 className="text-lg font-black text-center mb-6">ملخص الطلب</h3>
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600 font-bold">
                <span>المجموع الفرعي</span>
                <span>42.00 ر.س</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>الضرائب (15%)</span>
                <span>0.00 ر.س</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-black">
                <span className="text-gray-800">المجموع الإجمالي</span>
                <span className="text-secondary">42.00 ر.س</span>
              </div>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
            <OrdersDialog>
              <Button className="bg-secondary hover:bg-secondary-hover h-12 px-8 text-lg font-bold rounded-lg order-1 md:order-2">
                التقدم لإتمام الشراء
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </OrdersDialog>

            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#64748b] hover:bg-[#475569] text-white border-none h-12 px-8 text-lg font-bold rounded-lg order-2 md:order-1"
              >
                متابعة التسوق
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketsDialog;
