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
  if (department__company)
    params.append("department__company", department__company);
  params.append("page", page.toString());
  console.log("dsfdf", `products/products/?${params.toString()}`);
  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
  );

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  return result.data;
}
export async function getSearchProduts(search) {
  const params = new URLSearchParams();
   params.append("search", search);
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

export async function getProdutsDash(page = 1) {
  const result = await request(`products/products/?page=${page}`, "GET");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  return result.data;
}
export async function postProdut(formData) {
  console.log(formData)
  const result = await request(`products/products/`, "POST", formData, true);
console.log(result)
  return result;
}
export async function putProdut(formData, id) {
  console.log(formData)
      const result = await request(`products/products/${id}/`, "PUT", formData, true);
console.log(result)
  return result;
}
export async function deleteProdut(id) {
  const result = await request(`products/products/${id}/`, "DELETE");

   

  return result.data;
}
