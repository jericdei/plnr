import { z } from "zod";

export const taskSchema = z.object({
  title: z.string(),
  weekId: z.string(),
  from: z.date(),
  to: z.date(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
