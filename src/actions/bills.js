"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getBills(page = 1, type = "", search = "") {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (type) params.append("type_bill", type);
  if (search) params.append("search", search);
  const result = await request(`/billsbills/?${params.toString()}`, "GET");
 
  return result.data;
}

export async function getBillsId(id) {
  const result = await request(`/billsbills/${id}`, "GET");
 
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
 
export async function deleteBasket(id) {
 
  const result = await request(`baskets/basketItem/${id}/`, "DELETE");
 

  return result;
}
