"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNostrWatch } from "@/lib/hooks/nostr-watch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Command } from "cmdk";
import { ServerIcon } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  source: z.string().refine((val) => val.length === 0 || val.length > 4, {
    message: "Invalid relay.",
  }),
  user: z.number(),
});

export default function Page() {
  const { relayList } = useNostrWatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Controller
        control={form.control}
        name="source"
        render={({ field }) => <RelayInput {...field} />}
      />
      <Input type="text" />

      <Button>Submit</Button>
    </form>
  );
}

export interface InputProps
  extends React.ComponentPropsWithRef<typeof Command.Input> {
  onChange?: (...event: any[]) => void;
}

const RelayInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onChange, ...props }, ref) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    function handleChange(data: string) {
      setSearch(data);
      onChange && onChange(data);
    }

    return (
      <Command className="relative group" label="Relay Input">
        <ServerIcon
          className={cn(
            "size-4 absolute left-2 inset-y-0 my-auto pointer-events-none opacity-50",
            "group-focus-within:scale-110 transition",
          )}
        />
        <Command.Input
          {...props}
          ref={ref}
          name="source"
          value={search}
          onValueChange={handleChange}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
          onKeyDown={() => {
            setOpen(true);
          }}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            "disabled:opacity-50 peer",
            className,
          )}
        />

        <Command.List
          hidden={!open}
          className={cn(
            "top-full mt-2 border w-full absolute",
            "bg-popover z-50",
          )}
        >
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group
            className={cn(
              "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
              className,
            )}
          >
            <Command.Item
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
                className,
              )}
            >
              a
            </Command.Item>
            <Command.Item
              onSelect={(data) => {
                setOpen(false);
                handleChange(data);
              }}
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
                className,
              )}
            >
              baliato
            </Command.Item>
            <Command.Item
              className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
                className,
              )}
            >
              c
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    );
  },
);

RelayInput.displayName = "Input";
