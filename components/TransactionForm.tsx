"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
import { CalendarIcon, Minus, Plus } from "lucide-react";
import { DrawerClose } from "./ui/drawer";
import useCurrencyStore from "@/store/useCurrencyStore";
import { currencies } from "@/lib/currencies";
import { getCurrencySymbol } from "@/helpers/getCurrency";
import useTransactionsDrawer from "@/store/useTransactionDrawer";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import useEditableTransaction from "@/store/useEditableTransaction";
import useTransactionMode from "@/store/useTransactionMode";

interface FormData {
  name: string;
  description: string;
  type: string;
  amount: string;
  date: string;
}

interface TransactionData {
  name: string;
  description: string;
  type: string;
  amount: string;
  userId: string;
  date: string;
}

const FormSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().required("Type is required"),
  amount: yup.string(),
  date: yup.string(),
});

export function TransactionForm() {
  const { currency } = useCurrencyStore();
  const { user } = useUser();
  const { setOpenState } = useTransactionsDrawer();
  const { editableTransaction, setEditableTransaction } =
    useEditableTransaction();

  const { mode } = useTransactionMode();

  const [chosenAmount, setChosenAmount] = React.useState(
    editableTransaction.amount ? Number(editableTransaction.amount) : 10
  );
  const [chosenDate, setChosenDate] = React.useState<Date | undefined>(
    new Date()
  );

  const createTransaction = useMutation(api.transaction.createTransaction);
  const updateTransaction = useMutation(api.transaction.updateTransaction);

  const submitHandler = async (data: FormData) => {
    if (mode === "create") {
      await createTransaction({
        name: data.name,
        description: data.description,
        type: data.type,
        amount: chosenAmount.toString(),
        userId: user?.id || "",
        date: chosenDate && chosenDate.toISOString(),
      } as TransactionData);
    } else {
      await updateTransaction({
        name: data.name,
        description: data.description,
        type: data.type,
        amount: chosenAmount.toString(),
        userId: user?.id || "",
        date: chosenDate && chosenDate.toISOString(),
      });
    }
  };

  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      ...editableTransaction,
    },
  });

  function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("type", data.type);

    submitHandler(data);

    setOpenState(false);
    setChosenAmount(10);
    form.reset();
  }

  const onAmountClick = (adjustment: number) => {
    setChosenAmount(Math.max(10, Math.min(10000, chosenAmount + adjustment)));
  };

  const onClose = () => {
    setOpenState(false);
    setEditableTransaction({
      id: "",
      name: "",
      description: "",
      type: "",
      amount: "",
      date: "",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-5"
      >
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
          name="date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      type="button"
                      className={cn(
                        "pl-3 text-left font-normal w-full",
                        chosenDate && "text-muted-foreground"
                      )}
                    >
                      {mode === "create" && editableTransaction.date
                        ? format(editableTransaction.date, "PPP")
                        : "Select a date"}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={chosenDate}
                    onSelect={setChosenDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                      onClick={() => onAmountClick(-10)}
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
                      onClick={() => onAmountClick(10)}
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
        <div className="flex flex-row gap-4">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <DrawerClose className="w-full" onClick={onClose}>
            <Button variant="outline" className="w-full" type="button">
              Cancel
            </Button>
          </DrawerClose>
        </div>
      </form>
    </Form>
  );
}
