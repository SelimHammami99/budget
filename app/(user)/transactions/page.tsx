import { TransactionForm } from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DataTable } from "@/components/TransactionsTable";
import { transactionsColumns } from "@/lib/transactionsColumns";

export default async function Page() {
  const { userId }: { userId: string | null } = await auth();

  if (!userId) return null;

  const userTransactions = await db
    .select()
    .from(transactions)
    .where(eq(transactions.userId, userId));

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row items-center w-full justify-center gap-5">
        <h1 className="font-bold text-xl tracking-tighter">Transactions</h1>

        <Drawer>
          <DrawerTrigger>
            <Button variant={"outline"} size={"icon"}>
              <Plus size={24} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-xl">
              <DrawerHeader>
                <DrawerTitle>Add a new transaction</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter className="flex justify-center items-center">
                <TransactionForm />
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="mt-5 w-full">
        <DataTable columns={transactionsColumns} data={userTransactions} />
      </div>
    </div>
  );
}
