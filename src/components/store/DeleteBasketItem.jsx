"use client";
import { deleteBasket } from "@/actions/baskets";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DeleteBasketItem({ id }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await deleteBasket(id);
      if (!result.success) {
        throw new Error(result.message || "فشل في الحذف");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basketShow"] });
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

  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
    >
      {isPending ? (
        <span className="animate-pulse text-sm">جارٍ الحذف...</span>
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </Button>
  );
}

export default DeleteBasketItem;
