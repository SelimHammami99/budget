"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Minus, Plus } from "lucide-react";
import { DrawerClose } from "./ui/drawer";
import useCurrencyStore from "@/store/useCurrencyStore";
import { currencies } from "@/lib/currencies";
import { getCurrencySymbol } from "@/helpers/getCurrency";
import useTransactionsDrawer from "@/store/useTransactionDrawer";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const FormSchema = z.object({
  name: z.string({
    required_error: "Please enter a name.",
  }),
  description: z.string({
    required_error: "Please enter a description.",
  }),
  type: z.string({
    required_error: "Please select a type.",
  }),
  amount: z.string({
    required_error: "Please choose an amount.",
  }),
});

export function TransactionForm() {
  const { currency } = useCurrencyStore();
  const { setOpenState } = useTransactionsDrawer();
  const [chosenAmount, setChosenAmount] = React.useState(10);
  const createTransaction = useMutation(api.transaction.createTransaction);
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      amount: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("amount", chosenAmount.toString());
    createTransaction({
      name: data.name,
      description: data.description,
      type: data.type,
      amount: chosenAmount.toString(),
      userId: user?.id || "",
    });
    setOpenState(false);
    setChosenAmount(10);
    form.reset();
  }

  function onClick(adjustment: number) {
    setChosenAmount(Math.max(10, Math.min(10000, chosenAmount + adjustment)));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"Expense"} key={"Expense"}>
                    Expense
                  </SelectItem>
                  <SelectItem value={"Income"} key={"Income"}>
                    Income
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={() => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(-10)}
                      disabled={chosenAmount <= 10}
                      type="button"
                    >
                      <Minus />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-6xl font-bold tracking-tighter">
                        {chosenAmount} {getCurrencySymbol(currency, currencies)}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                      disabled={chosenAmount >= 10000}
                      type="button"
                    >
                      <Plus />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
        <DrawerClose className="w-full" onClick={() => setOpenState(false)}>
          <Button variant="outline" className="w-full" type="button">
            Cancel
          </Button>
        </DrawerClose>
      </form>
    </Form>
  );
}
