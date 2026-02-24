"use server";

import request from "@/lib/apiService";

 

export async function getUsers(page = 1) {
  const result = await request(
    `users/?page=${page}`,
    "GET",
  );
console.log("fdsfdsf" , result.data)
  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  
  return result.data;
}

export async function getUserId(id) {
  const result = await request(`users/${id}`, "GET");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
export async function postUser(formData) {
  const result = await request(`users/`, "POST", formData, false);
  return result;
}
export async function editeUser(formData, id) {
  const result = await request(`users/${id}/`, "PUT", formData, false);
 
  return result;
}
export async function deleteUser(id) {
  console.log(id)
  const result = await request(`users/${id}/`, "DELETE");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
