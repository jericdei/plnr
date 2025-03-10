import { InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const currentTimestamp = sql`CURRENT_TIMESTAMP`;

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    currentTimestamp
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(currentTimestamp)
    .$onUpdate(() => currentTimestamp),
};

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  weekId: text("week_id").notNull(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  isDone: integer("is_done", { mode: "boolean" }).default(false),
  ...timestamps,
});

export type Task = InferSelectModel<typeof tasks>;
