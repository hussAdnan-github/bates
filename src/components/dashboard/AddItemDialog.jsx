"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Loader2, ShoppingCart } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { getAllProduts } from "@/actions/product";
import { postProductBasket } from "@/actions/baskets";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddItemDialog({ id }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setloading2] = useState(false);
  // const [productsList, setProductsList] = useState([]);
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const { data: productsList = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduts,
    enabled: open,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
  const onSubmit = async (data) => {
    setloading2(true);
    const dataForm = new FormData();

    dataForm.append("basket", id);
    dataForm.append("product", data.productId);
    dataForm.append("quantity", data.quantity);
    const result = await postProductBasket(dataForm);
    if (!result.success) {
      if (result.errors) {
        Object.entries(result.errors).map(([field, message]) =>
          toast.error(
            <div style={{ direction: "rtl", textAlign: "right" }}>
              <strong>{message}</strong>
            </div>,
            { duration: 4000 },
          ),
        );
      } else {
        toast.error(
          <div style={{ direction: "rtl", textAlign: "right" }}>
            <strong>حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى</strong>
          </div>,
          { duration: 4000 },
        );
      }
    } else {
      setloading2(false);
      queryClient.invalidateQueries({ queryKey: ["basketsId"] });

      toast.success(
        <div style={{ direction: "rtl", textAlign: "right" }}>
          <strong>تمت تعديل الطلب بنجاح ✅</strong>
        </div>,
        { duration: 4000 },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFC107] text-black hover:bg-[#e0ab06] gap-2 font-bold shadow-sm">
          <Plus size={18} />
          إضافة عنصر آخر
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px] bg-white rounded-2xl"
        dir="rtl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-right text-[#2D1B4D] font-bold text-xl">
              إضافة منتج جديد للطلب
            </DialogTitle>
            <DialogDescription className="text-right italic text-gray-500">
              اختر المنتج من القائمة وحدد الكمية المطلوبة.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-6">
            {/* حقل اختيار المنتج */}
            <div className="grid gap-2 text-right">
              <Label htmlFor="product" className="font-bold text-gray-700">
                المنتج
              </Label>
              <Controller
                name="productId"
                control={control}
                rules={{ required: "يجب اختيار منتج" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full border ${
                      errors.productId ? "border-red-500" : "border-gray-200"
                    } rounded-lg p-3 bg-gray-50`}
                  >
                    <option value="">--- اختر المنتج ---</option>

                    {isLoading ? (
                      <option disabled>جاري التحميل...</option>
                    ) : (
                      productsList?.data?.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.model}) - {product.price} ر.س
                        </option>
                      ))
                    )}
                  </select>
                )}
              />
              {errors.productId && (
                <span className="text-red-500 text-xs">
                  {errors.productId.message}
                </span>
              )}
            </div>

            {/* حقل الكمية */}
            <div className="grid gap-2 text-right">
              <Label htmlFor="quantity" className="font-bold text-gray-700">
                الكمية
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                {...register("quantity", { required: true, min: 1 })}
                className="focus:ring-2 focus:ring-[#2D1B4D]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex-row-reverse">
            <Button
              type="submit"
              disabled={loading2}
              className="bg-[#2D1B4D] hover:bg-[#3d2568] w-full py-6 text-lg font-bold rounded-xl transition-all"
            >
              {loading2 ? (
                <Loader2 className="animate-spin text-white" size={24} />
              ) : (
                <div className="text-white">اضافة منتج</div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
