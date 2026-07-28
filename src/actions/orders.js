"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getOrdsers(status) {
  const params = new URLSearchParams();

  if (status) params.append("status", status);
  const result = await request(`/baskets/orders/?${params.toString()}`, "GET");
 
  return result.data;
}

export async function getOrdsersId(id) {
  const result = await request(`/baskets/orders/${id}`, "GET");



  return result.data;
}
export async function postProductBasket(formData) {
  const result = await request(`baskets/basketItem/`, "POST", formData, true);
 
  if (result.success) {
    revalidatePath("/dashboard/baskets");
  }
  return result;
}

export async function editProductBasket(formData, id) {
 
  const result = await request(
    `baskets/basketItem/${id}/`,
    "PATCH",
    formData,
    true,
  );
 

  return result;
}
export async function putOrder(formData, id) {
  const result = await request(`baskets/orders/${id}/`, "PATCH", formData, false);
  if (result?.success) {
    revalidatePath("/shop/orders");
  }
  return result;
}
export async function deleteBasket(id) {
   const result = await request(`baskets/basketItem/${id}/`, "DELETE");
 
  return result;
}
