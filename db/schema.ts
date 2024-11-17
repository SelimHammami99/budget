import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  income: varchar("income", { length: 256 }),
  expense: varchar("expense", { length: 256 }),
  userId: varchar("user_id"),
});
