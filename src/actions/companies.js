"use server";

import request from "@/lib/apiService";
import { revalidatePath } from "next/cache";

//  export async function getCompanies() {
//   const result = await request(
//     `companies/companies/`,
//     "GET",
//   );

//   if (!result.success) {
//     throw new Error(result.errors || "Failed to fetch data");
//   }

//   return result.data;
// }

export async function getCompanies(page = 1) {
  const result = await request(`companies/companies/?page=${page}`, "GET");

  return result.data;
}

export async function getCompaniesId(id) {
  const result = await request(`companies/companies/${id}`, "GET");
  return result.data;
}
export async function postcCompany(formData) {
  const result = await request(`companies/companies/`, "POST", formData, true);
   if (result.success) {
    revalidatePath("/dashboard/companies");  
  }
  return result;
}
export async function editeCompany(formData, id) {
  const result = await request(
    `companies/companies/${id}/`,
    "PATCH",
    formData,
    true,
  );
  if (result.success) {
    revalidatePath("/dashboard/companies");
    revalidatePath(`/dashboard/companies/${id}`);  
  }
  return result;
}
export async function deleteCompany(id) {
  const result = await request(`companies/companies/${id}/`, "DELETE");
revalidatePath("/dashboard/companies");
  return result.data;
}
