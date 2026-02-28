"use server";

import request from "@/lib/apiService";

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
  );


  return result.data;
}
export async function getDepartmentDashboard(page = 1) {
  const result = await request(`departments/departments/?page=${page}`, "GET");

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
  const result = await request(`departments/departments/`, "POST", formData, false);
  if (result.success) {
    revalidatePath("/dashboard/departments");  
  }
  return result;
}
export async function editeDepartment(formData, id) {
  const result = await request(`departments/departments/${id}/`, "PUT", formData, false);

  if (result.success) {
    revalidatePath("/dashboard/departments");
    revalidatePath(`/dashboard/departments/${id}`); 
  }
  return result;  
}
export async function deleteDepartment(id) {
  const result = await request(`departments/departments/${id}/`, "DELETE");

 if (result.success) {
    revalidatePath("/dashboard/departments");  
  }
  return result.data;
}
