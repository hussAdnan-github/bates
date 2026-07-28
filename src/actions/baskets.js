"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getBaskets(page = 1, status = null, search = "") {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (status) params.append("status", status);
  if (search) params.append("search", search); 
  const result = await request(`/baskets/baskets/?${params.toString()}`, "GET");
  return result?.data ?? null;

}
export async function getBasketsAll() {

  const result = await request(`baskets/baskets/?pagination=false`, "GET");
  return result?.data ?? null;

}
export async function getBasketsId(id) {
  const result = await request(`/baskets/baskets/${id}`, "GET");
 

  return result?.data ?? null;
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
export async function putBasket(formData, id) {
 
  const result = await request(`baskets/baskets/${id}/`, "PATCH", formData, true);
 

  return result;
}
export async function deleteProductBasket(id) {
 
  const result = await request(`baskets/basketItem/${id}/`, formData, "DELETE", true);
 

  return result;
}
export async function deleteBasket(id) {
  
  const result = await request(`baskets/basketItem/${id}/`, "DELETE");
 

  return result;
}
export async function editOrderBasket(formData, id) {
 
  const result = await request(
    `baskets/baskets/${id}/`,
    "PATCH",
    formData,
    true,
  );

  if (result.success) {
    revalidatePath("/shop/orders");
  }

  return result;
}