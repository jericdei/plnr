import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema";

export const database = openDatabaseSync("db.db");

export const db = drizzle(database, {
  schema,
  logger: true,
});
