import { formatTimestamp } from "@/utils/time";
import { isBefore, isEqual, isSameHour, isSameMinute } from "date-fns";
import { z } from "zod";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    weekId: z.string(),
    from: z.date(),
    to: z.date(),
  })
  .refine(({ from, to }) => !(isSameHour(from, to) && isSameMinute(from, to)), {
    path: ["from"],
    message: "Start time cannot be equal to End time.",
  })
  .refine(({ from, to }) => isBefore(from, to), {
    path: ["to"],
    message: "End time cannot be before Start time.",
  });

export type TaskSchema = z.infer<typeof taskSchema>;
