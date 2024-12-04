import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    amount: v.string(),
    description: v.string(),
    name: v.string(),
    type: v.string(),
    userId: v.optional(v.string()),
  }),
});
