 import * as z from "zod";

export const userSchema = z
  .object({
    username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
    first_name: z.string().optional().or(z.literal("")),
    last_name: z.string().optional().or(z.literal("")),
    email: z.string().optional().or(z.literal("")),
    phone: z.string().min(9, "رقم الهاتف غير صحيح"),
    ext: z.string().optional().or(z.literal("")),  
    userType: z.enum(["1", "2", "3"], {
      errorMap: () => ({ message: "يرجى اختيار نوع المستخدم" }),
    }).optional().or(z.literal("")),
    type_money: z.enum(["1", "2", "3"]).optional().or(z.literal("")),
    place: z.string().optional().or(z.literal("")),
     password: z
      .string()
      .optional()
      .or(z.literal("")), 
    confirmPassword: z
      .string()
      .optional()
      .or(z.literal("")),   
    isActive: z.boolean().default(true),
    isStaff: z.boolean().default(false),
  })
  .refine((data) => {
     if (data.password && data.password.length > 0) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });