import { InferSelectModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  weekId: text("week_id").notNull(),
  from: integer("from", { mode: "timestamp" }).notNull(),
  to: integer("to", { mode: "timestamp" }).notNull(),
  isDone: integer("is_done", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(CURRENT_TIMESTAMP)`
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type Task = InferSelectModel<typeof tasks>;
