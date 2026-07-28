"use server";
import { cookies } from "next/headers";

const BASE_URL = process.env.API_URL?.replace(/\/$/, "");

async function request(
  endpoint,
  method = "GET",
  data = null,
  isFormData = false,
  options = {},
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    // const type_money = cookieStore.get("type_money")?.value || "3";

    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const fullUrl = `${BASE_URL}${cleanEndpoint}`;
    const headers = {};
    // const headers = {
    //   "type_money": type_money,
    //   "Currency": type_money
    // };

    if (token && !options.skipAuth) {
      headers["Authorization"] = `Token ${token}`;
    }

 
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    const fetchOptions = {
      method,
      headers,
      body: data ? (isFormData ? data : JSON.stringify(data)) : null,
    };

    if (options.next) {
      fetchOptions.next = options.next;
    } else if (options.cache) {
      fetchOptions.cache = options.cache;
    } else {
      fetchOptions.cache = "no-store";
    }

    const response = await fetch(fullUrl, fetchOptions);
    const text = await response.text();

    let resultData = null;
    if (text) {
      try {
        resultData = JSON.parse(text);
      } catch (e) {
        resultData = text;
      }
    }

     if (!response.ok) {
      let serverGeneralMessage = "حدث خطأ في الاتصال بالخادم";
      let fieldErrors = null;

      if (resultData && typeof resultData === "object") {
     
        if (resultData.errors) {
          fieldErrors = resultData.errors;
          serverGeneralMessage = resultData.message || "يرجى التحقق من البيانات المدخلة";
        }
      
        else if (resultData.message) {
          serverGeneralMessage = resultData.message;
        }
     
        else if (resultData.error) {
          serverGeneralMessage = resultData.error;
        }
       
        else {
          fieldErrors = resultData;
        }
      } else if (typeof resultData === "string") {
        serverGeneralMessage = resultData;
      }

      return {
        success: false,
        message: serverGeneralMessage, 
        errors: fieldErrors,           
        status: response.status,
      };
    }
    return {
      success: true,
      data: resultData
    };

  } catch (error) {
    console.error(`Fetch Error (${endpoint}):`, error.message);
    return {
      success: false,
      message: "تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.",
      errors: null,
    };
  }
}

export default request;