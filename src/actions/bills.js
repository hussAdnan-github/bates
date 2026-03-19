"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getBills(page = 1, type = "", search = "") {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (type) params.append("type", type);
  if (search) params.append("search", search);
  const result = await request(`/billsbills/?${params.toString()}`, "GET");
  console.log(result.data);
  return result.data;
}

export async function getBillsId(id) {
  const result = await request(`/billsbills/${id}`, "GET");
  console.log(id)
  return result.data;
}
export async function postProductBasket(formData) {
  const cookieStore = await cookies();

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
// export async function put(formData, id) {
//   const result = await request(`Branch/id?id=${id}`, "PUT", formData, false);

//   return result;
// }
export async function deleteBasket(id) {
  console.log(`baskets/basketItem/${id}/`);
  const result = await request(`baskets/basketItem/${id}/`, "DELETE");
  console.log(result);

  return result;
}
