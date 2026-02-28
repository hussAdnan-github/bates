"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";
export async function getUsers(page = 1) {
  const result = await request(`users/?page=${page}`, "GET");
  return result.data;
}

export async function getUserId(id) {
  const result = await request(`users/${id}`, "GET");
  return result.data;
}
export async function postUser(formData) {
  const result = await request(`users/`, "POST", formData, false);
   if (result.success) {
    revalidatePath("/dashboard/users");  
  }
  return result;
}
export async function editeUser(formData, id) {
  const result = await request(`users/${id}/`, "PUT", formData, false);
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
