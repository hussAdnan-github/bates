'use server'
import { cookies } from 'next/headers';
import axios from 'axios';

const BASE_URL = process.env.API_URL;
console.log(BASE_URL)
async function request(endpoint, method = 'GET', data = null, isFormData = false) {
  console.log(`endpoint ${endpoint}`)
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
 
 
 
const headers = {};

 if (token) {
  headers['Authorization'] = `Bearer ${token}`;
}
  if (!isFormData) headers['Content-Type'] = 'application/json';

  try {
    console.log(`${BASE_URL}/${endpoint}`)
    const response = await axios({ url: `${BASE_URL}/${endpoint}`, method, data, headers });
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.response?.data || error.message);

    const errData = error.response?.data;

    let serverMessage = "حدث خطأ في الاتصال بالخادم";

    if (errData) {

       if (typeof errData === 'string') {
        serverMessage = errData;
      }

       else if (errData.message) {
        serverMessage = errData.message;
      }

       else if (errData.error) {
        serverMessage = errData.error;
      }

       else if (Array.isArray(errData[""])) {
        serverMessage = errData[""].join(" ، ");
      }

       else if (errData.errors) {
        serverMessage = Object.values(errData.errors).flat().join(" ، ");
      }
    }
    console.log(`Extracted server message: ${serverMessage}`);
    return { success: false, errors: serverMessage };
  }

}

export default request;
