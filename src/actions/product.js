"use server";

import request from "@/lib/apiService";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export async function getAllProduts() {
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const result = await request(`products/products/?pagination=false&type_money=${type_money}`, "GET", null, false, {
    next: { revalidate: 300, tags: ["products"] }
  });
  return result.data;
}
export async function getProduts(
  price,
  department,
  department__company,
  page = 1,
) {
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const params = new URLSearchParams();
  if (price) params.append("price", price);
  if (department) params.append("department", department);
  if (department__company)
    params.append("department__company", department__company);
  params.append("page", page.toString());
  params.append("type_money", type_money);

  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 300, tags: ["products"] }
    }
  );

  return result.data;
}
export async function getSearchProduts(search) {
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("type_money", type_money);
  const result = await request(
    `products/products/?${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 300, tags: ["products"] }
    }
  );

  return result.data;
}

export async function getProdutsId(id) {
  const cookieStore = await cookies();
  const type_money = cookieStore.get("type_money")?.value || "3";
  const result = await request(`products/products/${id}/?type_money=${type_money}`, "GET");

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
  // console.log("formData" ,formData);
  const result = await request(`products/products/`, "POST", formData, true);

  if (result.success) {
    revalidatePath("/dashboard/products");
    revalidateTag("products");
  }


  return result;
}

export async function postProductImage(formData) {
  const result = await request(`products/products_images/`, "POST", formData, true);

  if (result.success) {
    revalidateTag("products");
  }
  return result;
}
export async function deleteProductImage(id) {
  const result = await request(`products/products_images/${id}/`, "DELETE", null, false, { skipAuth: false });
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
    revalidateTag("products");
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
    revalidateTag("products");
  }
  return result;
}
export async function deleteProdut(id) {
  const result = await request(`products/products/${id}/`, "DELETE");
  if (result.success) {
    revalidatePath("/dashboard/products");
    revalidateTag("products");
  }
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
