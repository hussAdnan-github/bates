import * as z from "zod";

export const departmentSchema = z.object({
  name: z.string().min(3, "اسم القسم يجب أن يكون 3 أحرف على الأقل"),
  number: z.string().optional().or(z.literal("")),
  // جعل اختيار الشركات مصفوفة من الأرقام
  company: z
    .array(z.number())
    .min(1, "يجب اختيار شركة واحدة على الأقل")
    .optional()
    .or(z.array(z.any()).length(0)), // يسمح بمصفوفة فارغة إذا لزم الأمر
});