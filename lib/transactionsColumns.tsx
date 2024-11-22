"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Transaction = {
  id: string;
  name: string;
  type: string;
  amount: string;
};

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return (
        <div className="text-right font-medium text-red-500">{formatted}</div>
      );
    },
  },
];
