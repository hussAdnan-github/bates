"use server";

import request from "@/lib/apiService";

export async function getPlaces() {
  const result = await request(`place/`, "GET");
  return result.data;
}
