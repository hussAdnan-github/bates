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
    
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const fullUrl = `${BASE_URL}${cleanEndpoint}`;

    const headers = {};

    if (token && !options.skipAuth) {
      headers["Authorization"] = `Token ${token}`;
    }

    // إذا لم تكن البيانات FormData، نرسل Content-Type كـ JSON
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

    // --- معالجة حالة الخطأ (Response not OK) ---
    if (!response.ok) {
      let serverGeneralMessage = "حدث خطأ في الاتصال بالخادم";
      let fieldErrors = null;

      if (resultData && typeof resultData === "object") {
        // 1. إذا كان الخادم يرسل كائن errors (مثل مثالك)
        if (resultData.errors) {
          fieldErrors = resultData.errors;
          serverGeneralMessage = resultData.message || "يرجى التحقق من البيانات المدخلة";
        } 
        // 2. إذا كانت الرسالة مباشرة في message
        else if (resultData.message) {
          serverGeneralMessage = resultData.message;
        }
        // 3. إذا كانت الرسالة في error
        else if (resultData.error) {
          serverGeneralMessage = resultData.error;
        }
        // 4. إذا كان الكائن نفسه يمثل الأخطاء (أحياناً في Django REST)
        else {
          fieldErrors = resultData;
        }
      } else if (typeof resultData === "string") {
        serverGeneralMessage = resultData;
      }

      return {
        success: false,
        message: serverGeneralMessage, // الرسالة العامة "لقد حصل خطاء"
        errors: fieldErrors,           // كائن الأخطاء التفصيلي { name_ar: "...", ... }
        status: response.status,
      };
    }

    // --- حالة النجاح ---
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