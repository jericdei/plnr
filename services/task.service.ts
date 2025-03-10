import { currentTimestamp } from "@/constants/drizzle";
import { db } from "@/db";
import { tasks } from "@/db/schema";
import { formatTimestamp } from "@/utils/time";
import { areIntervalsOverlapping, format } from "date-fns";
import { eq, sql } from "drizzle-orm";

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

export async function getUpcomingTask(weekId: string, day: Date) {
  const task = await db.query.tasks.findFirst({
    where: (tasks, { gte, eq, and }) =>
      and(
        eq(tasks.weekId, weekId),
        eq(sql`strftime('%d', date(${tasks.from}))`, format(day, "dd")),
        gte(sql`time(${tasks.from})`, sql`time(CURRENT_TIMESTAMP)`),
        eq(tasks.isDone, false)
      ),
    orderBy: tasks.from,
  });

  return task ?? null;
}

export async function getTask(id: number) {
  return await db.query.tasks.findFirst({
    where: (tasks, { eq }) => eq(tasks.id, id),
  });
}

export async function upsertTask(values: CreateTaskValues, id?: string) {
  const currentTasks = await getTasks(values.weekId, values.from);

  const overlapping = currentTasks.some((task) =>
    areIntervalsOverlapping(
      { start: task.from, end: task.to },
      { start: values.from, end: values.to }
    )
  );

  if (!id && overlapping) {
    throw new Error("Cannot create task. The time intervals are overlapping.");
  }

  const data = {
    ...values,
    from: formatTimestamp(values.from),
    to: formatTimestamp(values.to),
    updatedAt: currentTimestamp,
  };

  const action = id
    ? db
        .update(tasks)
        .set(data)
        .where(eq(tasks.id, parseInt(id)))
    : db.insert(tasks).values(data);

  return await action.execute();
}

export async function deleteTask(id: number) {
  return await db.delete(tasks).where(eq(tasks.id, id)).execute();
}
