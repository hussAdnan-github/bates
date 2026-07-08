"use client";
import { deleteBasket } from "@/actions/baskets";
import { Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/useCartStore";

function DeleteBasketItem({ id, refresh, isLocal = false }) {
  const queryClient = useQueryClient();
  const removeItemLocal = useCartStore((state) => state.removeItem);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await deleteBasket(id);
      if (!result.success) {
        throw new Error(result.message || "فشل في الحذف");
      }
      return result;
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: [refresh] });
      toast.success("تمت حذف المنتج من السلة", { position: "top-center" });
    },
    onError: (error) => {
      toast.error(
        <div>
          <strong>حدث خطأ!</strong> <br />
          <small>{error.message}</small>
        </div>,
        {
          style: {
            backgroundColor: "#ef4444",
            color: "#fff",
            direction: "rtl",
          },
        },
      );
    },
  });

  const handleDelete = () => {
    if (isLocal) {
      removeItemLocal(id);
      toast.success("تمت حذف المنتج من السلة", { position: "top-center" });
    } else {
      mutate();
    }
  };

  return (
    <Button
      disabled={isPending && !isLocal}
      onClick={handleDelete}
      className="text-gray-900 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors bg-gray-200"
    >
      {(isPending && !isLocal) ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </Button>
  );
}

export default DeleteBasketItem;
