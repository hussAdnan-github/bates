"use server";

import request from "@/lib/apiService";
import { cookies } from "next/headers";

export async function getBaskets(page = 1) {
  const result = await request(`baskets/baskets/?page=${page}`, "GET");
   
  return result.data;
}
  
// export async function getId(id) {
//   const result = await request(`Branch/GetBranchById?id=${id}`, "GET");

//   if (!result.success) {
//     throw new Error(result.errors || "Failed to fetch branch data");
//   }

//   return result.data;
// }
export async function postProductBasket(formData) {
    const cookieStore = await cookies();
  
  console.log("sadsad", formData);
  const result = await request(`baskets/basketItem/`, "POST", formData, true);
  const currentCount = Number(cookieStore.get("basket_count")?.value || 0);
  cookieStore.set("basket_count", (currentCount + 1).toString());
 if (result.success) {
    revalidatePath("/dashboard/baskets");  
  }
  return result;
}
export async function put(formData, id) {
  const result = await request(`Branch/id?id=${id}`, "PUT", formData, false);

  return result;
}
// export async function deleteId(id) {
//   const result = await request(`Branch/id?id=${id}`, "DELETE");

//   if (!result.success) {
//     throw new Error(result.errors || "Failed to fetch branch data");
//   }

//   return result.data;
// }
