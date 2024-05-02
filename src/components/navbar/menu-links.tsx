"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MENU_ROUTES } from "@/lib/constants";

export default function MenuLinks() {
  const pathname = usePathname();

  return (
    <div className="">
      {MENU_ROUTES.map((route) => (
        <Link
          key={route.name}
          href={route.href}
          className={buttonVariants({
            variant: "link",
            size: "sm",
            className: "text-foreground gap-2",
          })}
        >
          <span className={cn(route.href === pathname && "text-brand")}>
            {route.icon}
          </span>
          <span
            className={cn(
              pathname === route.href &&
              "underline underline-offset-4 decoration-2 decoration-brand",
            )}
          >
            {route.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
