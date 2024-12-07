"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getTypes } from "@/helpers/getTypes";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { addDays, format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TransactionTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
        <div className="flex flex-row gap-2 w-full">
          <Input
            placeholder="Filter names..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.getColumn("name")?.setFilterValue("")}
          >
            <XIcon size={24} />
          </Button>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Input
            placeholder="Filter description..."
            value={
              (table.getColumn("description")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("description")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.getColumn("description")?.setFilterValue("")}
          >
            <XIcon size={24} />
          </Button>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Select
            onValueChange={(value) =>
              table.getColumn("type")?.setFilterValue(value)
            }
            value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {getTypes(data)?.map((type) => (
                  <SelectItem value={type} key={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.getColumn("type")?.setFilterValue("")}
          >
            <XIcon size={24} />
          </Button>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Input
            placeholder="Filter amount..."
            value={
              (table.getColumn("amount")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("amount")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => table.getColumn("amount")?.setFilterValue("")}
          >
            <XIcon size={24} />
          </Button>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <Popover>
            <PopoverTrigger asChild disabled>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-center text-center font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            disabled
            variant={"outline"}
            size={"icon"}
            onClick={() => table.getColumn("date")?.setFilterValue("")}
          >
            <XIcon size={24} />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
