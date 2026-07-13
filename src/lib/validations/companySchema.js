import * as z from "zod";

export const companySchema = z.object({
  nameAr: z.string().min(3, "اسم الشركة بالعربي يجب أن يكون 3 أحرف على الأقل"),
  nameEn: z.string().min(3, "اسم الشركة بالانجليزي يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(3, "الوصف يجب أن يكون 3 أحرف على الأقل"),
  // مصفوفة من الأرقام للمستخدمين
  custom_user: z.array(z.number()).min(1, "يجب اختيار مستخدم واحد على الأقل"),
  // إذا كنت ستضيف شعار لاحقاً
  logo: z.any().optional(),
  website: z.string().url("رابط الموقع غير صحيح").or(z.literal("")).optional(),
  number: z.coerce.string().min(1, "رقم أو ترتيب الشركة إجباري"),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
});