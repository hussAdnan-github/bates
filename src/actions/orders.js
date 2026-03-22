"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getOrdsers(status) {
   const params = new URLSearchParams();

  if (status) params.append("status", status);
  const result = await request(`/baskets/orders/?${params.toString()}`, "GET");
  console.log(result)
  return result.data;
}

export async function getOrdsersId(id) {
  const result = await request(`/baskets/orders/${id}`, "GET");

 

  return result.data;
}
export async function postProductBasket(formData) {
  const result = await request(`baskets/basketItem/`, "POST", formData, true);
  // const currentCount = Number(cookieStore.get("basket_count")?.value || 0);
  // cookieStore.set("basket_count", (currentCount + 1).toString());
  if (result.success) {
    revalidatePath("/dashboard/baskets");
  }
  return result;
}

export async function editProductBasket(formData, id) {
  console.log(id);
  const result = await request(
    `baskets/basketItem/${id}/`,
    "PATCH",
    formData,
    true,
  );
  console.log(result);

  return result;
}
export async function putOrder(formData, id) {
  console.log(formData , id)
  const result = await request(`baskets/orders/${id}/`, "PATCH", formData, false);
console.log(result)
  return result;
}
export async function deleteBasket(id) {
  console.log(`baskets/basketItem/${id}/`);
  const result = await request(`baskets/basketItem/${id}/`, "DELETE");
  console.log(result);

  return result;
}
