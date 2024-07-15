import {
  ArrowLeftFromLineIcon,
  ChevronRightIcon,
  ServerIcon,
} from "lucide-react";
import React from "react";
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
import { RelayForm } from "./add-relay-form";
import { DEFAULT_RELAYS, pool } from "@/lib/nostr";
import { cookies } from "next/headers";
import { kinds } from "nostr-tools";

function retriveRelays() {
  const userRelays = cookies().get("relays")?.value;
  if (userRelays) {
    return JSON.parse(userRelays);
  }
  return DEFAULT_RELAYS;
}

export default async function Relays() {
  const userRelays = retriveRelays();

  const relays = pool.get(userRelays, {
    kinds: [kinds.RelayList],
  });

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
