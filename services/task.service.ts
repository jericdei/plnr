import { db } from "@/db";
import { tasks } from "@/db/schema";
import { formatTimestamp } from "@/utils/time";
import { areIntervalsOverlapping, format } from "date-fns";
import { sql } from "drizzle-orm";

interface CreateTaskValues {
  weekId: string;
  title: string;
  from: Date;
  to: Date;
}

export async function getTasks(weekId: string, day: Date) {
  return await db.query.tasks.findMany({
    where: (tasks, { eq, and }) =>
      and(
        eq(tasks.weekId, weekId),
        eq(sql`strftime('%d', date(${tasks.from}))`, format(day, "dd"))
      ),
  });
}

export async function createTask(values: CreateTaskValues) {
  const currentTasks = await getTasks(values.weekId, values.from);

  const overlapping = currentTasks.some((task) =>
    areIntervalsOverlapping(
      { start: task.from, end: task.to },
      { start: values.from, end: values.to }
    )
  );

  if (overlapping) {
    throw new Error("Cannot create task. The time intervals are overlapping.");
  }

  await db
    .insert(tasks)
    .values({
      ...values,
      from: formatTimestamp(values.from),
      to: formatTimestamp(values.to),
    })
    .execute();
}
