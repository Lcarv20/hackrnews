"use client";

import {
  ArrowLeftFromLineIcon,
  ChevronRightIcon,
  ServerIcon,
} from "lucide-react";
import React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./add-relay-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

export default function Relays() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "group hover:border-brand hover:bg-accent transition-all",
            "flex flex-row items-center gap-4 w-full h-16",
          )}
        >
          <span className="group-hover:text-brand transition group-hover:scale-110">
            <ServerIcon />
          </span>
          <h1 className="text-lg transform transition-transform group-hover:translate-x-3">
            Relays
          </h1>
          <ChevronRightIcon className="h-7 w-7 ml-auto text-muted-foreground transition-all group-hover:scale-125" />
        </Button>
      </SheetTrigger>

      <SheetContent className="min-w-full border flex flex-col">
        <SheetHeader className="pt-8">
          <SheetTitle
            className="items-center gap-2 justify-center flex border-b-4 border-dotted
                border-brand pb-2 text-xl font-bold"
          >
            <span className="text-brand">
              <ServerIcon />
            </span>
            Relays
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <RelayForm />
        </div>
        <SheetFooter className="mt-auto flex-col items-start">
          <SheetClose asChild>
            <Button variant="outline" size="icon">
              <ArrowLeftFromLineIcon />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const formSchema = z.object({
  relay: z
    .string()
    .min(1, "Field cannot be empty")
    .regex(
      /^(?:(?:(?:wss|ws):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
      {
        message: "Invalid Format",
      },
    ),
});

function RelayForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relay: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="relay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a relay</FormLabel>
              <div className="flex gap-2">
                <div className="relative grow">
                  <FormControl>
                    <Input
                      className="pl-8"
                      placeholder="wss://..."
                      {...field}
                    />
                  </FormControl>
                  <ServerIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 
                text-muted-foreground h-4 w-4 pointer-events-none"
                  />
                </div>
                <SubmitButton />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
