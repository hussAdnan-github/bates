"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_URL?.replace(/\/$/, "");

async function request(
  endpoint,
  method = "GET",
  data = null,
  isFormData = false,
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    // console.log("first  " ,token)
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const fullUrl = `${BASE_URL}${cleanEndpoint}`;

    const headers = {};

    if (token) {
      console.log("tokent find");
      headers["Authorization"] = `Token  ${token}`;
    }

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const options = {
      method,
      headers,
      cache: "no-store",
      body: data ? (isFormData ? data : JSON.stringify(data)) : null,
    };
    console.log("first   ", options);
    const response = await fetch(fullUrl, options);

    const text = await response.text();
    let resultData = null;

    if (text) {
      try {
        resultData = JSON.parse(text);
      } catch (e) {
        resultData = text; // إذا لم يكن JSON، نحتفظ به كنص
      }
    }

    // التحقق من نجاح الطلب (Status 200-299)
    if (!response.ok) {
      let serverMessage = "حدث خطأ في الاتصال بالخادم";

      if (resultData) {
        if (typeof resultData === "string") serverMessage = resultData;
        else if (resultData.message) serverMessage = resultData.message;
        else if (resultData.error) serverMessage = resultData.error;
        else if (resultData.errors)
          serverMessage = Object.values(resultData.errors).flat().join(" ، ");
        else if (Array.isArray(resultData[""]))
          serverMessage = resultData[""].join(" ، ");
      }

      return { success: false, errors: serverMessage, status: response.status };
    }

    return { success: true, data: resultData };
  } catch (error) {
    console.error(`Fetch Error (${endpoint}):`, error.message);
    return {
      success: false,
      errors:
        "تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت أو الرابط الأساسي.",
    };
  }
}

export default request;
