import { TransactionForm } from "@/components/TransactionForm";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) return null;

  const userTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId));

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-xl tracking-tighter">your transactions</h1>

      <TransactionForm />
    </div>
  );
}
