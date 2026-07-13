"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
export async function getUsers(page = 1, isActive, typeCustom, searchQuery) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (isActive) params.append("is_active", isActive);
  if (typeCustom) params.append("type_custom", typeCustom);
  if (searchQuery) params.append("search", searchQuery);



  const result = await request(`users/?${params.toString()}`, "GET");

  return result.data;
}
export async function getUserId(id) {
  const result = await request(`users/${id}/`, "GET");
  return result.data;
}
export async function postUser(formData) {
  const result = await request(`users/`, "POST", formData, true);
  if (result.success) {
    revalidatePath("/dashboard/users");
  }
  return result;
}
export async function editeUser(formData, id) {
  const result = await request(`users/${id}/`, "PATCH", formData, true);
  if (result.success) {
    revalidatePath("/dashboard/users");
    revalidatePath(`/dashboard/users/${id}`);
  }
  return result;
}
export async function deleteUser(id) {
  const result = await request(`users/${id}/`, "DELETE");
  revalidatePath("/dashboard/users");
  return result.data;
}

import { cookies } from "next/headers";

export async function changeCurrency(formData) {
  const result = await request(`change_mony/`, "PATCH", formData, true);
  if (result.success) {
    const type_money = formData.get("type_money");
    const cookieStore = await cookies();
    cookieStore.set("type_money", type_money, {
      path: "/",
    });
    revalidatePath("/");
  }
  return result;
}
