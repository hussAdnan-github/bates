"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, Plus, ShoppingCart } from "lucide-react";
import { postProductBasket } from "@/actions/baskets";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";

function ButtonCart({ id, quantity, show = 1, product }) {
 const queryClient = useQueryClient();
 const addItemLocal = useCartStore((state) => state.addItem);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const dataForm = new FormData();
      dataForm.append("product", id);
      dataForm.append("quantity", quantity);
      const result = await postProductBasket(dataForm);
      if (!result.success) throw new Error("unauthorized");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basketShow"] });
      toast.success("تمت الإضافة للسلة بنجاح", { position: "top-center" });
    },
    onError: (err) => {
      // إذا فشل الطلب (بسبب عدم تسجيل الدخول مثلاً)، نضيف للسلة المحلية
      if (product) {
        addItemLocal(product, quantity);
        toast.success("تمت الإضافة للسلة بنجاح", { position: "top-center" });
      } else {
        toast.error("يرجى تسجيل الدخول أولاً");
      }
    },
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className={`
        relative overflow-hidden transition-all duration-300 active:scale-95
        ${show === 1 
          ? "bg-primary-transparent hover:bg-primary text-primary hover:text-white h-10 w-10 md:w-auto px-4 rounded-xl" 
          : "bg-primary hover:bg-primary-hover text-white h-14 w-full md:flex-1 text-lg font-bold rounded-2xl shadow-lg shadow-primary-transparent/50"
        }
      `}
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <div className="flex items-center justify-center gap-3">
          <ShoppingCart size={show === 1 ? 18 : 24} />
          <span className={show === 1 ? "hidden md:block" : "block"}>
            إضافة للسلة
          </span>
        </div>
      )}
    </Button>
  );
}

export default ButtonCart;