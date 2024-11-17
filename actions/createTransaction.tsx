"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { transactions } from "@/db/schema";

export async function createTransactions(formData: FormData) {
  const { userId }: { userId: string | null } = await auth();
  const transaction = {
    name: formData.get("name") as string,
    income: formData.get("income") as string,
    expense: formData.get("expense") as string,
    userId,
  };

  const newTransaction = await db.insert(transactions).values(transaction);
}
