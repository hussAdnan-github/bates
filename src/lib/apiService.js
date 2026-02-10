// 'use server'
// import { cookies } from 'next/headers';
// import axios from 'axios';

// const BASE_URL = process.env.API_URL;
 
// async function request(endpoint, method = 'GET', data = null, isFormData = false) {
 
//   const cookieStore = await cookies();
//   const token = cookieStore.get('auth_token')?.value;
 
 
 
// const headers = {};

//  if (token) {
//   headers['Authorization'] = `Bearer ${token}`;
// }
//   if (!isFormData) headers['Content-Type'] = 'application/json';

//   try {
//     console.log(`${BASE_URL}/${endpoint}`)
//     const response = await axios({ url: `${BASE_URL}/${endpoint}`, method, data, headers });
    
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error(`API Error (${endpoint}):`, error.response?.data || error.message);

//     const errData = error.response?.data;

//     let serverMessage = "حدث خطأ في الاتصال بالخادم";

//     if (errData) {

//        if (typeof errData === 'string') {
//         serverMessage = errData;
//       }

//        else if (errData.message) {
//         serverMessage = errData.message;
//       }

//        else if (errData.error) {
//         serverMessage = errData.error;
//       }

//        else if (Array.isArray(errData[""])) {
//         serverMessage = errData[""].join(" ، ");
//       }

//        else if (errData.errors) {
//         serverMessage = Object.values(errData.errors).flat().join(" ، ");
//       }
//     }
//     console.log(`Extracted server message: ${serverMessage}`);
//     return { success: false, errors: serverMessage };
//   }

// }

// export default request;


'use server'
import { cookies } from 'next/headers';

// تنظيف الرابط الأساسي
const BASE_URL = process.env.API_URL?.replace(/\/$/, "");

async function request(endpoint, method = 'GET', data = null, isFormData = false) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${cleanEndpoint}`;

  // إعداد الهيدرز
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // إذا لم تكن البيانات FormData، نرسلها كـ JSON
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  // إعداد خيارات الطلب
  const options = {
    method,
    headers,
    // في fetch، يجب تحويل البيانات إلى string إذا كانت JSON
    body: data ? (isFormData ? data : JSON.stringify(data)) : null,
    // خيار إضافي لـ Next.js إذا أردت التحكم بالكاش
    // next: { revalidate: 60 } 
  };

  try {
    const response = await fetch(fullUrl, options);
    
    // محاولة قراءة البيانات كـ JSON
    // ملاحظة: الـ backend قد لا يرجع JSON دائماً في حالات الخطأ
    let resultData = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      resultData = await response.json();
    }

    // في fetch، الـ catch لا يلتقط أخطاء 404 أو 500، لذا يجب التحقق من response.ok
    if (!response.ok) {
      throw { response: { data: resultData }, message: `HTTP error! status: ${response.status}` };
    }

    return { success: true, data: resultData };

  } catch (error) {
    const errData = error.response?.data;
    let serverMessage = "حدث خطأ في الاتصال بالخادم";

    if (errData) {
      if (typeof errData === 'string') serverMessage = errData;
      else if (errData.message) serverMessage = errData.message;
      else if (errData.error) serverMessage = errData.error;
      else if (Array.isArray(errData[""])) serverMessage = errData[""].join(" ، ");
      else if (errData.errors) serverMessage = Object.values(errData.errors).flat().join(" ، ");
    }

    console.error(`API Error (${endpoint}):`, serverMessage);
    return { success: false, errors: serverMessage };
  }
}

export default request;