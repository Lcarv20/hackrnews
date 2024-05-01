"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  BriefcaseIcon,
  HomeIcon,
  MessageSquareIcon,
  NewspaperIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ROUTES = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    name: "Articles",
    href: "/articles",
    icon: <NewspaperIcon className="h-4 w-4" />,
  },
  {
    name: "Discussions",
    href: "/discussions",
    icon: <MessageSquareIcon className="h-4 w-4" />,
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
];

export default function MenuLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex gap-2">
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
