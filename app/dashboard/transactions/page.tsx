import { db } from "@/db";
import { transactions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { DataTable } from "@/components/TransactionsTable";
import { Separator } from "@/components/ui/separator";
import { transactionsColumns } from "@/lib/transactionsColumns";
import TransactionDrawer from "@/components/TransactionDrawer";

export default async function Page() {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) return null;

  const userTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId));

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="w-full">
            <div className="flex flex-row items-center w-full justify-between mb-2">
              <h1 className="font-bold text-xl tracking-tighter">
                Transactions
              </h1>
              <TransactionDrawer />
            </div>
            <Separator />
          </div>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-5 w-full">
          <DataTable columns={transactionsColumns} data={userTransactions} />
        </div>
      </div>
    </>
  );
}
