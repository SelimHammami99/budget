"use client";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TransactionForm } from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import useTransactionsDrawer from "@/store/useTransactionDrawer";

const TransactionDrawer = () => {
  const { openState, setOpenState } = useTransactionsDrawer();

  return (
    <Drawer open={openState}>
      <DrawerTrigger onClick={() => setOpenState(true)}>
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
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default TransactionDrawer;
