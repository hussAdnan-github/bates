"use server";

import request from "@/lib/apiService";

export async function getProduts(
  price,
  department,
  department__company,
  page = 1,
) {
  const params = new URLSearchParams();
  if (price) params.append("price", price);
  if (department) params.append("department", department);
  if (department__company) params.append("department__company", department__company);
  params.append("page", page.toString());
  
  const result = await request(
    `products/products/?${params.toString()}`,
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
