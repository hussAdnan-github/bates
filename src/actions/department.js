"use server";

import request from "@/lib/apiService";
import { revalidatePath, revalidateTag } from "next/cache";
export async function getDepartmentsList() { 
  const result = await request(`departments/departments/?pagination=false`, "GET", null, false, {
    next: { revalidate: 3600, tags: ["departments"] },
    skipAuth: true,
  });
  return result.data;
}

export async function getDepartment(company) {  
  const params = new URLSearchParams(); 

  if (company) params.append("company", company);
  // console.log(
  //   "first ",
  //   `departments/departments/?pagination=false&${params.toString()}`,
  // );
  const result = await request(
    `departments/departments/?pagination=false&${params.toString()}`,
    "GET",
    null,
    false,
    {
      next: { revalidate: 3600, tags: ["departments"] },
      skipAuth: true,
    }
  );
 

  return result.data;
}
export async function getDepartmentDashboard(page = 1 , company , search) {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (company) params.append("company", company);
  if (search) params.append("search", search);

  const result = await request(`departments/departments/?${params.toString()}`, "GET");

  return result.data; 
}
export async function getDepartmentId(id) {
  const result = await request(`departments/departments/${id}`, "GET");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
export async function postDepartment(formData) {
  console.log(formData)
  const result = await request(`departments/departments/`, "POST", formData, true);
  if (result.success) {
    revalidatePath("/dashboard/departments");  
    revalidateTag("departments");
  }
  return result;
}
export async function editeDepartment(formData, id) {
  const result = await request(`departments/departments/${id}/`, "PATCH", formData, true);

  if (result.success) {
    revalidatePath("/dashboard/departments");
    revalidatePath(`/dashboard/departments/${id}`); 
    revalidateTag("departments");
  }
  return result;  
}
export async function deleteDepartment(id) {
  const result = await request(`departments/departments/${id}/`, "DELETE");
 
 if (result.success) {
    revalidatePath("/dashboard/departments");  
    revalidateTag("departments");
  }
  return result.data;
}
