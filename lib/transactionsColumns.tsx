"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, SquareArrowOutUpRight } from "lucide-react";
import useCurrencyStore from "@/store/useCurrencyStore";
import useTransactionsDrawer from "@/store/useTransactionDrawer";
import useEditableTransaction from "@/store/useEditableTransaction";
import { getCurrencyCountry } from "@/helpers/getCurrency";
import { currencies } from "./currencies";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import useTransactionMode from "@/store/useTransactionMode";

export type Transaction = {
  id: string;
  name: string;
  type: string;
  amount: string;
  description: string;
  date: string;
};

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { currency } = useCurrencyStore();
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat(
        getCurrencyCountry(currency, currencies),
        {
          style: "currency",
          currency: currency,
        }
      ).format(amount);

      return (
        <Badge
          className="text-right font-medium text-white"
          style={{
            backgroundColor: `${
              row.original.type.toLowerCase() === "expense" ? "red" : "green"
            }`,
          }}
        >
          {row.original.type.toLowerCase() === "expense" ? "- " : "+ "}
          {formatted}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{format(row.original.date, "PPP")}</div>;
    },
  },
  {
    id: "update",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setOpenState } = useTransactionsDrawer();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setEditableTransaction } = useEditableTransaction();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setMode } = useTransactionMode();

      return (
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setOpenState(true);
            setEditableTransaction(row.original);
            setMode("update");
          }}
        >
          <SquareArrowOutUpRight />
        </Button>
      );
    },
  },
];
