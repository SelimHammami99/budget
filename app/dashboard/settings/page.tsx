"use client";

import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies } from "@/lib/currencies";
import useCurrencyStore from "@/store/useCurrencyStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  const { currency, setCurrency } = useCurrencyStore();
  const { toast } = useToast();

  const form = useForm({});

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="w-full">
            <h1 className="font-bold text-xl tracking-tighter mb-2">
              Settings
            </h1>

            <Separator />
          </div>
        </div>
      </header>

      <div className="flex flex-col mt-5 gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              setCurrency(form.getValues().currency);
              toast({
                description: "Currency updated successfully",
              });
            })}
            className="w-2/3 space-y-6"
          >
            <FormField
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={currency}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency, index) => (
                        <SelectItem
                          onChange={() => setCurrency(currency.currency_code)}
                          key={index}
                          value={currency.currency_code}
                        >
                          <span>{currency.symbol} - </span>
                          {currency.currency_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
