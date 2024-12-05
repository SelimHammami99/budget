import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTransaction = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    type: v.string(),
    amount: v.string(),
    userId: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("transactions", {
      name: args.name,
      description: args.description,
      type: args.type,
      amount: args.amount,
      date: args.date,
      userId: args.userId,
    });
  },
});

export const getTransactions = query({
  handler: async (ctx) => {
    return ctx.db.query("transactions").collect();
  },
});
