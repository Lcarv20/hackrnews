"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, ServerIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  relay: z
    .string()
    .transform((value) => {
      if (!value.startsWith("ws://") && !value.startsWith("wss://")) {
        value = "wss://" + value;
      }
      return value;
    })
    .refine((value) => value.split(".").length >= 2),
});

export function RelayForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relay: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="shrink-0"
            type="submit"
            size="icon"
            disabled={pending}
          >
            {pending ? <LoaderIcon className="animate-spin" /> : <PlusIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add relay</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const LoaderIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-loader-pinwheel", className)}
    >
      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
      <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
      <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
