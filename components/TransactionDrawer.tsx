"use client";
import { Plus } from "lucide-react";
import { TransactionForm } from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import useTransactionsDrawer from "@/store/useTransactionDrawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const TransactionDrawer = () => {
  const { openState, setOpenState } = useTransactionsDrawer();

  return (
    <Sheet open={openState}>
      <SheetTrigger onClick={() => setOpenState(true)}>
        <Button variant={"outline"} size={"icon"}>
          <Plus size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new transaction</SheetTitle>
        </SheetHeader>

        <TransactionForm />
      </SheetContent>
    </Sheet>
  );
};
export default TransactionDrawer;
