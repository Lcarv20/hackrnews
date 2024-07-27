import React from "react";
import { InputSelect } from "@/components/ui/input-select";
import { useNostrWatch } from "@/lib/hooks/nostr-watch";
import { z } from "zod";

export const relaySingleInputSchema = z.object({
  label: z.string().refine((val) => val.length === 0 || val.length > 4, {
    message: "Invalid relay.",
  }),
  value: z.string().refine((val) => val.length === 0 || val.length > 4, {
    message: "Invalid relay.",
  }),
});

export const RelayInput = React.forwardRef<
  React.ElementRef<typeof InputSelect>,
  React.ComponentPropsWithoutRef<typeof InputSelect>
>((props, ref) => {
  const { relayList, pending } = useNostrWatch();
  return (
    <InputSelect ref={ref} options={relayList} isLoading={pending} {...props} />
  );
});

RelayInput.displayName = "RelayInput";
