 import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج يجب أن يكون 3 أحرف على الأقل"),
  
  // استخدام coerce يحول النص إلى رقم تلقائياً
  price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0, "السعر لا يمكن أن يكون سالباً"),
  
  wholesale_price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0),
  
  retail_price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0),
  
  model: z.string().optional().or(z.literal("")),
  
  department: z.coerce.number({ invalid_type_error: "يرجى اختيار القسم" }).min(1, "يرجى اختيار القسم"),

  serial_number: z.string().optional().or(z.literal("")),
  
  // في التعديل غالباً ما تكون الصورة اختيارية
  image: z.any().optional(),
});