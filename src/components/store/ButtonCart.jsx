"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { postProductBasket } from "@/actions/baskets";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function ButtonCart({ id , quantity, show = 1 }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handelProductId = async () => {
    setLoading(true);

    const dataForm = new FormData();
    dataForm.append("product", id);
    dataForm.append("quantity", quantity);

    const result = await postProductBasket(dataForm);
    router.refresh();
    if (result.success) {
      toast.success(
        <div>
          <strong>تمت الإضافة الى السلة ✅</strong>
        </div>,
        {
          duration: 4000,
          style: {
            backgroundColor: "green",
            color: "#145463",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      );
    } else {
      toast.error(
        <div>
          <strong>حدث خطأ!</strong> <br />
          <span style={{ color: "#145463" }}>{ErrorMessage}</span> <br />
          <small>فشل في الإضافة، يرجى المحاولة مرة أخرى.</small>
        </div>,
        {
          duration: 5000,
          style: {
            backgroundColor: "red",
            color: "#000000",

            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
      );
    }
    setLoading(false);
  };
  return (
    <>
      {show === 1 ? (
        <Button
          disabled={loading}
          onClick={handelProductId}
          className="flex items-center justify-center bg-[#F8F9FA] hover:bg-[#FFC107] text-[#2D1B50] w-8 h-8 md:w-auto md:px-4 md:py-2 rounded-xl transition-all duration-300 font-bold shadow-sm group/btn"
        >
          <span className="hidden md:block text-sm mr-2">أضف</span>
          <Plus className="w-4 h-4 md:hidden" />
          <ShoppingCart className="hidden md:block w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        </Button>
      ) : (
        <Button
          disabled={loading}
          onClick={handelProductId}
          className="bg-[#F18721] hover:bg-[#d9771a] h-14 text-xl font-bold rounded-xl shadow-lg shadow-orange-100 flex gap-3 w-full md:w-fit px-12"
        >
          <ShoppingCart size={24} />
          الاضافة الى السلة
        </Button>
      )}
    </>
  );
}

export default ButtonCart;
