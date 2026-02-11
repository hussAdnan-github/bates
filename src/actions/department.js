"use server";

import request from "@/lib/apiService";

export async function getDepartment(company) {
  const params = new URLSearchParams();

  if (company) params.append("company", company);
  console.log(
    "first ",
    `departments/departments/?pagination=false&${params.toString()}`,
  );
  const result = await request(
    `departments/departments/?pagination=false&${params.toString()}`,
    "GET",
  );

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }

  return result.data;
}

// export async function getId(id) {
//   const result = await request(`Branch/GetBranchById?id=${id}`, "GET");

//   if (!result.success) {
//     throw new Error(result.errors || "Failed to fetch branch data");
//   }

//   return result.data;
// }
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
