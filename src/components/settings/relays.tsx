"use client";

import { Input } from "@/components/ui/input";
import { PlusIcon, ServerIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const FormSchema = z.object({
  search: z.string().min(1),
});

export default function Relays() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: Submit search
    console.log(data);
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex space-x-1.5">
                  <div>
                    <div className="relative grow">
                      <Input
                        className="pl-8"
                        {...field}
                        placeholder="Search relays"
                      />
                      <ServerIcon
                        className="absolute left-3 top-1/2 -translate-y-1/2 
                      text-muted-foreground h-4 w-4 pointer-events-none"
                      />
                    </div>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="submit"
                            size="icon"
                            className="shrink-0"
                          >
                            <PlusIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add relay</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </section>
  );
}
