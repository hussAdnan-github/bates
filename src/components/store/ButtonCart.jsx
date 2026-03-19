"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, Plus, ShoppingCart } from "lucide-react";
import { postProductBasket } from "@/actions/baskets";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function ButtonCart({ id, quantity, show = 1 }) {
 const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const dataForm = new FormData();
      dataForm.append("product", id);
      dataForm.append("quantity", quantity);
      const result = await postProductBasket(dataForm);
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basketShow"] });
      toast.success("تمت الإضافة للسلة بنجاح", { position: "top-center" });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className={`
        relative overflow-hidden transition-all duration-300 active:scale-95
        ${show === 1 
          ? "bg-gray-100 hover:bg-[#FFC107] text-gray-800 h-10 w-10 md:w-auto px-4 rounded-xl" 
          : "bg-[#F18721] hover:bg-[#d9771a] text-white h-14 w-full md:flex-1 text-lg font-bold rounded-2xl shadow-lg shadow-orange-200"
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