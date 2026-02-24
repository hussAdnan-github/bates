"use server";

import request from "@/lib/apiService";

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
  const result = await request(
    `companies/companies/?page=${page}`,
    "GET",
  ); 
  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch data");
  }
  
  return result.data;
}

export async function getCompaniesId(id) {
  const result = await request(`companies/companies/${id}`, "GET");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
export async function postcCompany(formData) {
   console.log(formData)
  const result = await request(`companies/companies/`, "POST", formData, false);
 console.log(result)

  return result;
}
export async function editeCompany(formData, id) {
  const result = await request(`companies/companies/${id}/`, "PUT", formData, false);

  return result;
}
export async function deleteCompany(id) {
  const result = await request(`companies/companies/${id}/`, "DELETE");

  if (!result.success) {
    throw new Error(result.errors || "Failed to fetch branch data");
  }

  return result.data;
}
