"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
export async function getAllProduts() {
  const result = await request(`products/products/?pagination=false`, "GET", null, false, {
    next: { revalidate: 300, tags: ["products"] },
    skipAuth: true,
  });
  return result.data;
} 
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

  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 300, tags: ["products"] },
      skipAuth: true,
    }
  );

  return result.data;
}
export async function getSearchProduts(search) {
  const params = new URLSearchParams();
  params.append("search", search);
  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 300, tags: ["products"] },
      skipAuth: true,
    }
  );

  return result.data;
}

export async function getProdutsId(id) {
  const result = await request(`products/products/${id}`, "GET");

  return result.data;
}

export async function getProdutsDash(
  page = 1,
  department__company = "",
  status = "",
  searchTerm = "",
) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (department__company) params.append("department", department__company);
  if (status) params.append("status", status);
  if (searchTerm) params.append("search", searchTerm);

  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
  );

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  return result.data;
}
export async function postProdut(formData) {
  console.log(formData);
  const result = await request(`products/products/`, "POST", formData, true);

  if (result.success) {
    revalidatePath("/dashboard/products");
  }
  return result;
}
export async function putProdut(formData, id) {
  console.log(formData);
  const result = await request(
    `products/products/${id}/`,
    "PUT",
    formData,
    true,
  );
  if (result.success) {
    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
  }
  return result;
}

export async function patchProduct(formData, id) {
  console.log(formData);
  const result = await request(
    `products/products/${id}/`,
    "PATCH",
    formData,
    true,
  );
  console.log(result);
  if (result.success) {
    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}`);
  }
  return result;
}
export async function deleteProdut(id) {
  const result = await request(`products/products/${id}/`, "DELETE");
  revalidatePath("/dashboard/products");
  return result.data;
}

export async function getBanners(companyId) {
  const params = new URLSearchParams();
  if (companyId) {
    params.append("companies", companyId);
  }

  const result = await request(
    `products/banners/?${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 3600, tags: ["banners"] },
      skipAuth: true,
    }
  );

  return result.data;
}
