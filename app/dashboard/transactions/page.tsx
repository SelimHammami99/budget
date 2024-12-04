"use client";
import { TransactionTable } from "@/components/TransactionsTable";
import { Separator } from "@/components/ui/separator";
import { transactionsColumns } from "@/lib/transactionsColumns";
import TransactionDrawer from "@/components/TransactionDrawer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Page() {
  const transactions = useQuery(api.transaction.getTransactions);

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
          {transactions && (
            <TransactionTable
              columns={transactionsColumns}
              data={transactions.map((transaction) => ({
                id: transaction._id,
                name: transaction.name,
                type: transaction.type,
                amount: transaction.amount,
                description: transaction.description,
              }))}
            />
          )}
        </div>
      </div>
    </>
  );
}
