import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().optional(),
  birthday: z.date().optional(),
  photoUri: z.string().optional(),
  school: z.string().optional(),
  yearLevel: z.string().optional(),
  course: z.string().optional(),
  logoUri: z.string().optional(),
  color: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
