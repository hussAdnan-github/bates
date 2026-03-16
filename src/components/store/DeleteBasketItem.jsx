"use client";
import { deleteBasket } from "@/actions/baskets";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

function DeleteBasketItem({ id }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const result = await deleteBasket(id);

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
          <span style={{ color: "white" }}>{result.errors}</span> <br />
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
    <Button
      onClick={handleDelete}
      className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
    >
      <Trash2 size={18} />
    </Button>
  );
}

export default DeleteBasketItem;
