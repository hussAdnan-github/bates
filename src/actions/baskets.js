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

  console.log(result.data)

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
export async function putBasket(formData, id) {
  console.log(formData, id)
  const result = await request(`baskets/baskets/${id}/`, "PATCH", formData, true);
  console.log(result)

  return result;
}
export async function deleteProductBasket(id) {
  console.log(`baskets/basketItem/${id}/`);
  const result = await request(`baskets/basketItem/${id}/`, formData, "DELETE", true);
  console.log(result);

  return result;
}
export async function deleteBasket(id) {
  console.log(`baskets/basketItem/${id}/`);
  const result = await request(`baskets/basketItem/${id}/`, "DELETE");
  console.log(result);

  return result;
}
export async function editOrderBasket(formData, id) {
  console.log(id);
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