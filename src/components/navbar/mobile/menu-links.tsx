"use client";

import { Button } from "@/ui/buttons";
import { closeHandler } from "@/utils/fns/modals";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

export default function MenuLinks({ dialogId }: { dialogId: string }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2 focus-within:ring-primary">
      {routes.map((route) => (
        <Link href={route.path} key={route.name}>
          <Button
            onClick={() => closeHandler(dialogId, true)}
            tabIndex={-1}
            flat
            className={twJoin(
              "justify-start gap-3 w-full",
              "active:bg-primary/30",
            )}
          >
            {route.icon}
            <span
              className={twJoin(
                pathname === route.path &&
                "underline underline-offset-2 decoration-primary decoration-2",
              )}
            >
              {route.name}
            </span>
          </Button>
        </Link>
      ))}
    </div>
  );
}
