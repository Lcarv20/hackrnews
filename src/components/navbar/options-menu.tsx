"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CheckIcon,
  ChevronDownIcon,
  HandHeart,
  InfoIcon,
  LaptopIcon,
  MoonIcon,
  StickyNoteIcon,
  SunIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Profile, logout } from "@/utils/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useReward } from "react-rewards";
import { usePathname } from "next/navigation";
import { MENU_ROUTES } from "@/lib/constants";

export default function OptionsMenu({ session }: { session: Profile | null }) {
  const path = usePathname();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "inline-flex items-center gap-2",
            }),
            "p-1",
            path.includes("profile/" + session?.publickey) &&
            "ring-2 ring-brand",
          )}
        >
          <ChevronDownIcon className="h-4 w-4" />
          {session ? (
            <Avatar className="h-7 w-7 rounded-[var(--radius)]">
              <AvatarImage src={session?.picture} />
              <AvatarFallback className="text-primary-foreground bg-primary rounded-[var(--radius)]">
                {/* TODO: If there is no name generate random avatar */}
                {session.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="rounded-[var(--radius)] bg-brand text-brand-foreground p-1 w-7 h-7">
              <UserIcon className="h-5 w-5" />
            </div>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <AccountSection session={session} />
          <DropdownMenuSeparator />

          <MobileLinks path={path} />
          <DropdownMenuSeparator className="lg:hidden" />

          <SettingsSection />
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/about" onClick={() => console.log("hmmm")}>
              <InfoIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>About</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DialogTrigger className="w-full">
              <ZapIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Donate</span>
            </DialogTrigger>
          </DropdownMenuItem>
          {session && (
            <DropdownMenuItem
              className="text-red-600 focus:bg-destructive/15 focus:text-red-600"
              onClick={async () => await logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DonationDialog />
    </Dialog>
  );
}

function DisplayThemeIcon() {
  const { theme } = useTheme();
  if (theme === "light")
    return <SunIcon className="h-4 w-4 text-muted-foreground" />;
  if (theme === "dark")
    return <MoonIcon className="h-4 w-4 text-muted-foreground" />;
  return <LaptopIcon className="h-4 w-4 text-muted-foreground" />;
}

const FormSchema = z.object({
  sats: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Ammount must be bigger than 0" })
    .int({ message: "Invalid amount" })
    .min(10, "Minimum 10 sats"),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sats: 10,
    },
  });

  const { reward: confettiReward } = useReward("confettiReward", "confetti");
  const { reward: zapReward } = useReward("zapReward", "emoji", {
    emoji: ["⚡️"],
    elementSize: 15,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: Submit Sats to donation account
    toast.success(`Sats: ${data.sats}`);
    confettiReward();
    zapReward();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sats"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Sats</FormLabel>
              <FormControl>
                <div className="relative">
                  <ZapIcon className="absolute left-2 h-4 w-4 top-3 text-muted-foreground pointer-events-none" />
                  <Input
                    type="number"
                    min={10}
                    inputMode="numeric"
                    {...field}
                    pattern="[0-9]*"
                    className="pl-8"
                    onChange={(e) => {
                      if (e.target.value === "")
                        return field.onChange(undefined);
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" variant="brand">
            Submit
          </Button>
        </DialogFooter>
        <div className="relative w-full flex justify-center">
          <span id="confettiReward" />
          <span id="zapReward" />
        </div>
      </form>
    </Form>
  );
}

function AccountSection({ session }: { session: Profile | null }) {
  return (
    <>
      {session ? (
        <div>
          <DropdownMenuLabel className="truncate">
            <div>
              <span className="mr-2">👋</span> Hi,{" "}
              <b className="ml-2font-bold italic">{session.name}!</b>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${session.publickey}`}>
                <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/notes/${session.publickey}`}>
                <StickyNoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>My Notes</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>
      ) : (
        <DropdownMenuItem asChild>
          <Link href="/login">
            <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Login</span>
          </Link>
        </DropdownMenuItem>
      )}
    </>
  );
}

function SettingsSection() {
  const theme = useTheme();

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href="/settings">
          <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <DisplayThemeIcon />
          <span className="ml-2">Theme</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => theme.setTheme("system")}>
              <LaptopIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>System</span>
              {theme.theme === "system" && (
                <CheckIcon className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => theme.setTheme("light")}>
              <SunIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Light</span>
              {theme.theme === "light" && (
                <CheckIcon className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => theme.setTheme("dark")}>
              <MoonIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Dark</span>
              {theme.theme === "dark" && (
                <CheckIcon className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
}

function MobileLinks({ path }: { path: string }) {
  return (
    <DropdownMenuGroup className="lg:hidden">
      {MENU_ROUTES.map((route) => (
        <DropdownMenuItem asChild key={route.name}>
          <Link href={route.href}>
            <span
              className={cn(
                "mr-2",
                path === route.href ? "text-brand" : "text-muted-foreground",
              )}
            >
              {route.icon}
            </span>
            <span
              className={cn(
                path === route.href &&
                "underline underline-offset-4 decoration-2 decoration-brand",
              )}
            >
              {route.name}
            </span>
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  );
}

function DonationDialog() {
  return (
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <DialogTitle className="mb-4 flex items-center justify-center sm:justify-start">
          <HandHeart className="mr-2 text-brand" /> Donate
        </DialogTitle>
        <DialogDescription>All support is appreciated!</DialogDescription>
      </DialogHeader>
      <InputForm />
    </DialogContent>
  );
}
