import * as z from "zod";

export const departmentSchema = z.object({
  name: z.string().min(3, "اسم القسم يجب أن يكون 3 أحرف على الأقل"),
  // جعل اختيار الشركات مصفوفة من الأرقام
  company: z
    .array(z.number())
    .min(1, "يجب اختيار شركة واحدة على الأقل")
    .optional()
    .or(z.literal([])), // يسمح بمصفوفة فارغة إذا لزم الأمر
});