"use client";
import { TransactionTable } from "@/components/TransactionsTable";
import { Separator } from "@/components/ui/separator";
import { transactionsColumns } from "@/lib/transactionsColumns";
import TransactionDrawer from "@/components/TransactionDrawer";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import useSelectedTransactions from "@/store/useSelectedTransactions";
import { useState } from "react";

export default function Page() {
  const transactions = useQuery(api.transaction.getTransactions);
  const { selectedTransactions, setSelectedTransactions } =
    useSelectedTransactions();
  const deleteTransaction = useMutation(api.transaction.deleteTransaction);
  const [disabled, setDisabled] = useState(true);

  const deleteTransactionHandler = () => {
    deleteTransaction({
      id: Object.keys(selectedTransactions)[0],
    });
    setDisabled(true);
    setSelectedTransactions({});
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 mt-9">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="w-full">
            <div className="flex flex-row items-center w-full justify-between mb-2">
              <h1 className="font-bold text-xl tracking-tighter">
                Transactions
              </h1>
            </div>
            <Separator />
            <div className="flex flex-row items-center w-full justify-end mt-2 gap-2">
              <Button
                size={"icon"}
                onClick={deleteTransactionHandler}
                variant={"destructive"}
                disabled={
                  Object.keys(selectedTransactions).length === 0
                    ? true
                    : false && disabled
                }
              >
                <Trash2 />
              </Button>
              <TransactionDrawer />
            </div>
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
                date: transaction.date,
              }))}
            />
          )}
        </div>
      </div>
    </>
  );
}
