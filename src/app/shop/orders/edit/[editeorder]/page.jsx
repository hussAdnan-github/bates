import React from "react";
import { Phone, Hash, Calendar, CreditCard } from "lucide-react";
import { getBillsId } from "@/actions/bills";
import { notFound } from "next/navigation";
import PrintButton from "@/components/dashboard/PrintButton";

const OrderDetails = async ({ params }) => {
  const { editeorder } = await params;

  return <div>{orderId}</div>;
};

export default OrderDetails;
