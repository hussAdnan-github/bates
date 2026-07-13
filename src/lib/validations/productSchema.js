 import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج يجب أن يكون 3 أحرف على الأقل"),
  
  // استخدام coerce يحول النص إلى رقم تلقائياً
  price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0, "السعر لا يمكن أن يكون سالباً"),
  
  wholesale_price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0),
  
  retail_price: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0),
  
  model: z.string().min(1, "يرجى إدخال الموديل"),
  
  department: z.coerce.number({ invalid_type_error: "يرجى اختيار القسم" }).min(1, "يرجى اختيار القسم"),

  serial_number: z.coerce.string().min(1, "رقم أو ترتيب المنتج إجباري"),
  
  description: z.string().optional().or(z.literal("")),
  status: z.coerce.number().optional(),
  number: z.coerce.number().optional().or(z.string().optional()),
  retail_price_ye_new: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0).optional(),
  retail_price_ye_old: z.coerce.number({ invalid_type_error: "يجب إدخال سعر صحيح" }).min(0).optional(),

  // في التعديل غالباً ما تكون الصورة اختيارية
  image: z.any().optional(),
});