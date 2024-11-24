import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  type: text("type"),
  amount: varchar("amount", { length: 256 }),
  description: text("description"),
  userId: varchar("user_id"),
});
