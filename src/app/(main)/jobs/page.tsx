"use client";

import { RelayInput } from "@/components/relay-input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  source: z.object({
    label: z.string(),
    value: z.string(),
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>();

  return (
    <form
      className="space-y-3"
      onSubmit={form.handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Controller
        name="source"
        control={form.control}
        render={({ field }) => (
          <RelayInput placeholder={"Select Relay"} {...field} />
        )}
        rules={{ required: true }}
      />
      <Button>Submit</Button>
    </form>
  );
}
