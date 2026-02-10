"use server";

import request from "@/lib/apiService";

 

export async function getProduts(price = '' , department = '') {
  console.log("first")
  const result = await request(
    `products/products?status=&department=${department}&price=${price}`,
    "GET",
  );

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  
  return result.data;
}

export async function getProdutsId(id) {
  const result = await request(`products/products/${id}`, "GET");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
// export async function post(formData) {
//   const result = await request(`Branch`, "POST", formData, false);

//   return result;
// }
// export async function put(formData, id) {
//   const result = await request(`Branch/id?id=${id}`, "PUT", formData, false);

//   return result;
// }
// export async function deleteId(id) {
//   const result = await request(`Branch/id?id=${id}`, "DELETE");

//   if (!result.success) {
//     throw new Error(result.errors || "Failed to fetch branch data");
//   }

//   return result.data;
// }
